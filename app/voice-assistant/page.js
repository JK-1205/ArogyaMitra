import { checkUser } from "@/lib/checkUser";
import { redirect } from "next/navigation";
import HealthAssistantsDashboard from "@/components/voiceassistance";

export const metadata = {
  title: "Voice Assistants - ArogyaMitra",
  description: "AI-powered health voice assistants for personalized guidance",
};

export default async function VoiceAssistantPage() {
  const user = await checkUser();

  // Redirect non-patients
  if (!user || user.role !== "PATIENT") {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen">
      <HealthAssistantsDashboard />
    </div>
  );
}
