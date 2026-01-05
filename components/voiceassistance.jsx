"use client";
import { useEffect, useState } from "react";
import {
  Heart,
  Droplets,
  HeartHandshake,
  Brain,
  User,
  Phone,
  PhoneOff,
  Loader2,
} from "lucide-react";

export default function HealthAssistantsDashboard() {
  const [callStates, setCallStates] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [listeningStates, setListeningStates] = useState({});
  const [vapiInstances, setVapiInstances] = useState({});
  const [vapiReady, setVapiReady] = useState(false);
  const [initializationError, setInitializationError] = useState(null);

  const assistants = [
    {
      id: "oncosathi",
      name: "OncoSathi",
      description:
        "Your caring voice companion for cancer support. Get guidance on symptoms, treatments, prevention tips, and emotional support whenever you need it.",
      assistantId: "a27831b7-cf3d-405f-ae5e-f8857170997d",
      icon: Heart,
      gradient: "from-pink-400 via-rose-500 to-pink-600",
      borderColor: "border-pink-500/20 hover:border-pink-500/60",
      shadowColor: "hover:shadow-pink-500/25",
      voiceGender: "Male",
      languages: "🗣️ All Indian languages | सभी भारतीय भाषाएं",
      features: [
        "12+ Indian languages",
        "Cancer types info",
        "Prevention tips",
        "Early symptoms",
        "Emotional support",
        "Treatment guidance",
      ],
    },
    {
      id: "sugarsaathi",
      name: "SugarSaathi",
      description:
        "Your trusted diabetes companion for managing blood sugar levels, diet planning, and medication reminders with personalized Indian diet suggestions.",
      assistantId: "4f31084e-8ee5-49e8-835e-2148144c334d",
      icon: Droplets,
      gradient: "from-blue-400 via-cyan-500 to-blue-600",
      borderColor: "border-blue-500/20 hover:border-blue-500/60",
      shadowColor: "hover:shadow-blue-500/25",
      voiceGender: "Male",
      languages: "🗣️ All Indian languages | सभी भारतीय भाषाएं",
      features: [
        "Multilingual support",
        "Diet plans",
        "Sugar level tips",
        "Medication reminders",
        "Indian diet focus",
        "Myths vs facts",
      ],
    },
    {
      id: "hearthelp",
      name: "HeartHelp",
      description:
        "Your heart health guardian providing guidance on recognizing heart attack signs, daily cardio tips, and blood pressure management support.",
      assistantId: "cf8cad67-7694-4aaa-886b-0bfa6f5674ff",
      icon: HeartHandshake,
      gradient: "from-red-400 via-rose-500 to-red-600",
      borderColor: "border-red-500/20 hover:border-red-500/60",
      shadowColor: "hover:shadow-red-500/25",
      voiceGender: "Male",
      languages: "🗣️ All Indian languages | सभी भारतीय भाषाएं",
      features: [
        "Multilingual support",
        "Heart attack signs",
        "Daily cardio tips",
        "Blood pressure help",
        "Emergency guidance",
        "Women's symptoms",
      ],
    },
    {
      id: "mannsaathi",
      name: "MannSaathi",
      description:
        "Your mental wellness companion offering support for depression, anxiety, guided breathing techniques, and emotional well-being guidance.",
      assistantId: "538d0d6b-c247-4b2d-8092-78eb1222c9e1",
      icon: Brain,
      gradient: "from-purple-400 via-violet-500 to-purple-600",
      borderColor: "border-purple-500/20 hover:border-purple-500/60",
      shadowColor: "hover:shadow-purple-500/25",
      voiceGender: "Female",
      languages: "🗣️ All Indian languages | सभी भारतीय भाषाएं",
      features: [
        "Female voice",
        "Depression support",
        "Anxiety help",
        "Breathing techniques",
        "24/7 support",
        "Crisis helplines",
      ],
    },
    {
      id: "naricare",
      name: "NariCare",
      description:
        "Your women's health companion providing privacy-focused guidance on periods, PCOS, pregnancy, menopause, and breastfeeding support.",
      assistantId: "4a796aaa-c3e8-4850-baf0-039e9ed082e9",
      icon: User,
      gradient: "from-emerald-400 via-teal-500 to-emerald-600",
      borderColor: "border-emerald-500/20 hover:border-emerald-500/60",
      shadowColor: "hover:shadow-emerald-500/25",
      voiceGender: "Female",
      languages: "🗣️ All Indian languages | सभी भारतीय भाषाएं",
      features: [
        "Female voice",
        "Period tracking",
        "PCOS info",
        "Pregnancy FAQs",
        "Breastfeeding tips",
        "Complete privacy",
      ],
    },
    {
      id: "jeevansaathi",
      name: "JeevanSaathi",
      description:
        "Your trusted companion for relationship counseling, fertility support, and family planning. Complete privacy and confidentiality.",
      assistantId: "60c20131-26b6-4990-8f4c-39b8d28b7a54",
      icon: Heart,
      gradient: "from-rose-400 via-pink-500 to-rose-600",
      borderColor: "border-rose-500/20 hover:border-rose-500/60",
      shadowColor: "hover:shadow-rose-500/25",
      voiceGender: "Female",
      languages: "🗣️ All Indian languages | सभी भारतीय भाषाएं",
      features: [
        "Relationship counseling",
        "Fertility support",
        "Couple's wellness",
        "Family planning",
        "Intimacy guidance",
        "Complete privacy",
      ],
    },
  ];

  useEffect(() => {
    const initializeVapi = async () => {
      try {
        // Check if API key is available
        if (!process.env.NEXT_PUBLIC_VAPI_API_KEY) {
          console.error("❌ VAPI_API_KEY is not set in environment variables");
          setInitializationError(
            "API key is missing. Please check your .env configuration."
          );
          return;
        }

        console.log("🔄 Initializing Vapi SDK...");
        const { default: Vapi } = await import("@vapi-ai/web");
        const instances = {};

        assistants.forEach((assistant) => {
          try {
            const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);

            vapiInstance.on("call-start", () => {
              console.log(`${assistant.name} Call Started`);
              setCallStates((prev) => ({ ...prev, [assistant.id]: true }));
              setLoadingStates((prev) => ({ ...prev, [assistant.id]: false }));
            });

            vapiInstance.on("call-end", () => {
              console.log(`${assistant.name} Call Ended`);
              setCallStates((prev) => ({ ...prev, [assistant.id]: false }));
              setLoadingStates((prev) => ({ ...prev, [assistant.id]: false }));
              setListeningStates((prev) => ({
                ...prev,
                [assistant.id]: false,
              }));
            });

            vapiInstance.on("speech-start", () => {
              console.log(`${assistant.name} Assistant is speaking...`);
              setListeningStates((prev) => ({
                ...prev,
                [assistant.id]: false,
              }));
            });

            vapiInstance.on("speech-end", () => {
              console.log(
                `${assistant.name} Assistant stopped - listening to you`
              );
              setListeningStates((prev) => ({ ...prev, [assistant.id]: true }));
            });

            vapiInstance.on("message", (msg) => {
              if (msg.type === "transcript") {
                if (msg.transcriptType === "partial") {
                  console.log(
                    `${assistant.name} Partial transcript:`,
                    msg.text
                  );
                } else if (msg.transcriptType === "final") {
                  console.log(`${assistant.name} Final transcript:`, msg.text);
                }
              }

              if (msg.type === "function-call") {
                console.log(
                  `${assistant.name} Function call:`,
                  msg.functionCall.name,
                  msg.functionCall.parameters
                );
              }
            });

            // Error handler for vapi instance
            vapiInstance.on("error", (error) => {
              console.error(`${assistant.name} Vapi error:`, error);
            });

            instances[assistant.id] = vapiInstance;
          } catch (instanceError) {
            console.error(
              `Failed to initialize ${assistant.name}:`,
              instanceError
            );
          }
        });

        setVapiInstances(instances);
        setVapiReady(true);
        console.log("✅ Vapi initialized successfully for all assistants");
      } catch (error) {
        console.error("❌ Failed to initialize Vapi:", error);
        setInitializationError(
          error?.message || "Failed to initialize voice assistant service"
        );
      }
    };

    initializeVapi();

    return () => {
      Object.values(vapiInstances).forEach((vapi) => {
        if (vapi && typeof vapi.stop === "function") {
          try {
            vapi.stop();
          } catch (e) {
            console.warn("Error stopping vapi instance:", e);
          }
        }
      });
    };
  }, []);

  const handleStartCall = async (assistantId, vapiAssistantId) => {
    const vapi = vapiInstances[assistantId];

    console.log("🔍 Debug Info:", {
      assistantId,
      vapiAssistantId,
      hasVapi: !!vapi,
      isReady: vapiReady,
      apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY ? "Set ✅" : "Missing ❌",
    });

    // Defensive checks - prevent the undefined error
    if (!vapiReady) {
      console.warn("⚠️ Vapi is still initializing...");
      alert(
        "Voice assistant is still initializing. Please wait a moment and try again."
      );
      return;
    }

    if (!vapi) {
      console.warn("⚠️ Vapi instance not found for assistant:", assistantId);
      alert("Voice assistant instance not found. Please refresh the page.");
      return;
    }

    if (loadingStates[assistantId]) {
      console.log("⚠️ Already processing a call for this assistant");
      return;
    }

    if (!process.env.NEXT_PUBLIC_VAPI_API_KEY) {
      alert(
        "⚠️ Vapi API key is missing!\n\nPlease check your .env configuration."
      );
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [assistantId]: true }));

    try {
      console.log(`📞 Starting call with assistant: ${vapiAssistantId}`);

      // Add timeout to prevent hanging on undefined errors
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Call start timeout - assistant may be busy")),
          30000
        );
      });

      // Race between start call and timeout
      const result = await Promise.race([
        vapi.start(vapiAssistantId),
        timeoutPromise,
      ]);

      console.log("✅ Call started successfully", result);
    } catch (error) {
      console.error("❌ Failed to start call:", error);

      // Log full error details for debugging
      console.error("Full error object:", {
        message: error?.message,
        name: error?.name,
        code: error?.code,
        stack: error?.stack,
        response: error?.response,
        data: error?.data,
        cause: error?.cause,
        // Handle undefined/null error case
        isUndefined: error === undefined,
        isNull: error === null,
        errorType: typeof error,
      });

      let userMessage = "Failed to start call.\n\n";

      // Handle undefined/null error specifically - this is the main issue reported
      if (error === undefined || error === null) {
        userMessage +=
          "⚠️ Connection issue with Vapi service.\n\n" +
          "This can happen if:\n" +
          "• The assistant is still loading\n" +
          "• Network connection is unstable\n\n" +
          "Please try again in a few moments.";
      } else if (!error || error?.message === undefined) {
        userMessage +=
          "⚠️ Assistant configuration may be incomplete.\n\nPlease check in Vapi dashboard:\n" +
          "1. System prompt is set\n" +
          "2. Voice is configured\n" +
          "3. First message is added\n" +
          "4. Model is set to gpt-4o";
      } else if (
        error?.message?.includes("ended") ||
        error?.message?.includes("Meeting")
      ) {
        userMessage +=
          "⚠️ Assistant configuration issue.\n\nPlease verify in Vapi dashboard:\n• System prompt is complete\n• Voice provider is set\n• First message exists";
      } else if (
        error?.message?.includes("Invalid API key") ||
        error?.message?.includes("Unauthorized")
      ) {
        userMessage +=
          "Your Vapi API key is invalid or expired.\n\nPlease check your .env file.";
      } else if (
        error?.message?.includes("Assistant not found") ||
        error?.message?.includes("404")
      ) {
        userMessage += `Assistant ID not found: ${vapiAssistantId}\n\nPlease verify the ID in your Vapi dashboard.`;
      } else if (
        error?.message?.includes("permission") ||
        error?.message?.includes("microphone")
      ) {
        userMessage +=
          "Please allow microphone access in your browser.\n\nClick the 🎤 icon in your address bar.";
      } else if (
        error?.message?.includes("network") ||
        error?.message?.includes("timeout")
      ) {
        userMessage +=
          "Network connection issue.\n\nPlease check your internet connection.";
      } else {
        userMessage += `Error: ${
          error?.message || "Unknown error"
        }\n\nCheck console for details.`;
      }

      alert(userMessage);

      setLoadingStates((prev) => ({ ...prev, [assistantId]: false }));
    }
  };

  const handleStopCall = async (assistantId) => {
    const vapi = vapiInstances[assistantId];
    if (!vapi || loadingStates[assistantId]) return;

    setLoadingStates((prev) => ({ ...prev, [assistantId]: true }));
    try {
      await vapi.stop();
    } catch (error) {
      console.error("Error stopping call:", error);
      setLoadingStates((prev) => ({ ...prev, [assistantId]: false }));
    }
  };

  const AssistantCard = ({ assistant }) => {
    const IconComponent = assistant.icon;
    const isCallActive = callStates[assistant.id];
    const isLoading = loadingStates[assistant.id];
    const isListening = listeningStates[assistant.id];

    return (
      <div
        className={`border-2 ${assistant.borderColor} cursor-pointer transition-all duration-300 rounded-lg bg-white/5 backdrop-blur-sm shadow-2xl `}
      >
        <div className="pt-8 pb-8 px-6 flex flex-col items-center text-center">
          <div
            className={`p-4 bg-gradient-to-r ${assistant.gradient} rounded-full mb-6 shadow-lg`}
          >
            <IconComponent className="h-10 w-10 text-white" />
          </div>

          <h2
            className={`text-2xl font-bold text-white mb-3 bg-gradient-to-r ${assistant.gradient} bg-clip-text text-transparent`}
          >
            {assistant.name}
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed text-sm">
            {assistant.description}
          </p>

          {/* Call Status Indicator */}
          {isCallActive && (
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Call Active</span>
              </div>

              {/* Listening Status */}
              {isListening && (
                <div className="flex items-center gap-2 text-blue-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                  <span className="text-xs">🎤 Listening to you...</span>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            {!isCallActive ? (
              <button
                onClick={() =>
                  handleStartCall(assistant.id, assistant.assistantId)
                }
                disabled={isLoading}
                className={`flex-1 bg-gradient-to-r ${assistant.gradient} text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${assistant.shadowColor} flex items-center justify-center gap-2`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Phone className="h-5 w-5" />
                    Start Call
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => handleStopCall(assistant.id)}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Ending...
                  </>
                ) : (
                  <>
                    <PhoneOff className="h-5 w-5" />
                    End Call
                  </>
                )}
              </button>
            )}
          </div>

          {/* Voice Gender, Languages, and Features */}
          <div className="mt-6 text-left w-full">
            {/* Voice Gender Badge */}
            {assistant.voiceGender && (
              <div className="flex items-center gap-2 mb-3 justify-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    assistant.voiceGender === "Female"
                      ? "bg-pink-900/50 text-pink-300 border border-pink-700"
                      : "bg-blue-900/50 text-blue-300 border border-blue-700"
                  }`}
                >
                  🎙️ {assistant.voiceGender} Voice
                </span>
              </div>
            )}

            {/* Languages */}
            {assistant.languages && (
              <p className="text-xs text-gray-400 mb-3 text-center">
                {assistant.languages}
              </p>
            )}

            <p className="text-sm text-gray-400 mb-3 text-center">
              {assistant.name} can help with:
            </p>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
              {assistant.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className={`w-1 h-1 bg-gradient-to-r ${assistant.gradient} rounded-full`}
                  ></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8 px-6 mt-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold  mb-4 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
          Health Voice Assistants
        </h1>

        <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Your comprehensive suite of AI-powered health companions, ready to
          provide personalized guidance, support, and expert knowledge across
          various health domains - all through natural voice conversations in
          your preferred language.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assistants.map((assistant) => (
            <AssistantCard key={assistant.id} assistant={assistant} />
          ))}
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-12 max-w-2xl mx-auto">
        Always consult with healthcare professionals for medical advice. These
        assistants provide educational information and support but are not a
        substitute for professional medical care.
      </p>
    </div>
  );
}
