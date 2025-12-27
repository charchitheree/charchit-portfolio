import { useState } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GeminiChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const GeminiChat = ({ isOpen, onClose }: GeminiChatProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("gemini-chat", {
        body: { message: userMessage },
      });

      if (error) throw error;

      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-foreground">AI Mode</h2>
            <p className="text-xs text-muted-foreground">Powered by Gemini</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">Ask me anything about Charchit</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              I know everything about Charchit's background, skills, education, and journey. Try asking about his projects, experience, or interests!
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {["Who is Charchit?", "What are his skills?", "Tell me about IIT Madras", "What is Harvard ALP?"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setMessage(suggestion);
                  }}
                  className="px-4 py-2 text-sm rounded-full border border-border text-muted-foreground hover:bg-secondary transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about Charchit..."
            className="flex-1 bg-secondary rounded-full px-6 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={sendMessage}
            disabled={!message.trim() || isLoading}
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;
