import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
      include: {
        transactions: {
          where: {
            type: "CREDIT_PURCHASE",
            // Only get transactions from current month
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    // ✅ FIXED: Safe name concatenation that handles null/undefined
    const name =
      [user.firstName, user.lastName]
        .filter(Boolean) // Removes null, undefined, empty strings
        .join(" ")
        .trim() || "User"; // Fallback to "User" if both are empty

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        transactions: {
          create: {
            type: "CREDIT_PURCHASE",
            packageId: "free_user",
            amount: 0,
          },
        },
      },
    });

    console.log("✅ New user created:", newUser.email, "with name:", name);

    return newUser;
  } catch (error) {
    console.error("❌ Error in checkUser:", error.message);
    throw error; // Re-throw so calling code knows something failed
  }
};
