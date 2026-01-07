import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { checkUser } from "@/lib/checkUser";
import { redirect } from "next/navigation";

export default async function Home() {
  // Check if user is logged in
  const user = await checkUser();

  // If user is logged in, redirect based on role
  if (user) {
    if (user.role === "PATIENT") {
      // Patient - redirect to dashboard
      redirect("/dashboard");
    } else if (
      user.role === "DOCTOR" &&
      user.verificationStatus === "VERIFIED"
    ) {
      // Verified doctor - redirect to doctor dashboard
      redirect("/doctor");
    } else if (
      user.role === "DOCTOR" &&
      user.verificationStatus !== "VERIFIED"
    ) {
      // Doctor awaiting verification
      redirect("/doctor/verification");
    } else if (user.role === "ADMIN") {
      // Admin user
      redirect("/admin");
    } else if (user.role === "UNASSIGNED") {
      // New user without role
      redirect("/onboarding");
    }
  }

  // Not logged in - show home page
  return (
    <div className="bg-background">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
