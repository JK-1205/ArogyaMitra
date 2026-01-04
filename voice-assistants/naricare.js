"use client";
import { useEffect, useState } from "react";
import { User, Phone, PhoneOff, Loader2 } from "lucide-react";

export default function NariCare() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vapi, setVapi] = useState(null);

  useEffect(() => {
    const initVapi = async () => {
      try {
        const { default: Vapi } = await import("@vapi-ai/web");
        const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
          console.log("Call Started");
          setIsCallActive(true);
          setLoading(false);
        });

        vapiInstance.on("call-end", () => {
          console.log("Call Ended");
          setIsCallActive(false);
          setLoading(false);
        });

        vapiInstance.on("speech-start", () => {
          console.log("Assistant is speaking...");
        });

        vapiInstance.on("speech-end", () => {
          console.log("Assistant finished speaking.");
        });

        vapiInstance.on("message", (msg) => {
          if (msg.type === "transcript") {
            if (msg.transcriptType === "partial") {
              console.log("Partial transcript:", msg.text);
            } else if (msg.transcriptType === "final") {
              console.log("Final transcript:", msg.text);
            }
          }

          if (msg.type === "function-call") {
            console.log(
              "Function call:",
              msg.functionCall.name,
              msg.functionCall.parameters
            );
          }
        });
      } catch (error) {
        console.error("Failed to initialize Vapi:", error);
      }
    };

    initVapi();

    return () => {
      if (vapi && typeof vapi.stop === "function") {
        vapi.stop();
      }
    };
  }, []);

  const handleStartCall = async () => {
    if (!vapi || loading) return;

    setLoading(true);
    try {
      const assistantId = "250fca16-36f3-4015-a205-66122cbd90bc";
      await vapi.start(assistantId);
    } catch (error) {
      console.error("Failed to start call:", error);
      setLoading(false);
    }
  };

  const handleStopCall = async () => {
    if (!vapi || loading) return;

    setLoading(true);
    try {
      await vapi.stop();
    } catch (error) {
      console.error("Failed to stop call:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      {!isCallActive ? (
        <button
          onClick={handleStartCall}
          disabled={loading}
          className="bg-emerald-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Phone className="h-4 w-4" />
          )}
          {loading ? "Connecting..." : "Start Call"}
        </button>
      ) : (
        <button
          onClick={handleStopCall}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <PhoneOff className="h-4 w-4" />
          )}
          {loading ? "Ending..." : "Stop Call"}
        </button>
      )}
    </div>
  );
}
