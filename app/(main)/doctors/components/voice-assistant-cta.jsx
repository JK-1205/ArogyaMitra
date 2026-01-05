import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Heart, Brain, Droplets } from "lucide-react";

export function VoiceAssistantCTA() {
  return (
    <Card className="border-emerald-900/20 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-5 w-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">
                AI Voice Assistants
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Get instant health guidance through natural voice conversations
              with our specialized AI assistants
            </p>
            <div className="flex gap-2 mb-4">
              <Heart className="h-4 w-4 text-pink-400" />
              <Brain className="h-4 w-4 text-purple-400" />
              <Droplets className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-muted-foreground">
                +3 more assistants
              </span>
            </div>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/voice-assistant">Try Voice Assistants →</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
