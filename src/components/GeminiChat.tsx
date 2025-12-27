import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, RotateCcw, ThumbsUp, ThumbsDown, Copy, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface GeminiChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const GeminiChat = ({ isOpen, onClose }: GeminiChatProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    setStreamingContent("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ 
            message: userMessage,
            messages: messages 
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process line by line
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              accumulatedContent += content;
              setStreamingContent(accumulatedContent);
            }
          } catch {
            // Incomplete JSON, put back and wait for more
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Finalize the message
      if (accumulatedContent) {
        setMessages(prev => [...prev, { role: "assistant", content: accumulatedContent }]);
      }
      setStreamingContent("");

    } catch (error: any) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response",
        variant: "destructive",
      });
      setStreamingContent("");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard" });
  };

  const clearChat = () => {
    setMessages([]);
    setStreamingContent("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#131314] z-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[#3c4043]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-normal text-white">Gemini</span>
            <span className="text-xs text-[#8e918f] bg-[#3c4043] px-2 py-0.5 rounded">2.5 Flash</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="p-2 hover:bg-[#3c4043] rounded-full transition-colors"
              title="New chat"
            >
              <RotateCcw className="w-5 h-5 text-[#e3e3e3]" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#3c4043] rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#e3e3e3]" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.length === 0 && !streamingContent && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-normal text-white mb-2">
                Hi, I'm Gemini
              </h1>
              <p className="text-[#8e918f] text-lg mb-8">
                Ask me anything about Charchit Sharma
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                {[
                  "Who is Charchit Sharma?",
                  "What are his technical skills?",
                  "Tell me about his education",
                  "What is the Aspire Leadership Program?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setMessage(suggestion)}
                    className="p-4 text-left text-sm text-[#c4c7c5] border border-[#3c4043] rounded-xl hover:bg-[#1e1f20] transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className="mb-6">
              {msg.role === "user" ? (
                <div className="flex justify-end mb-4">
                  <div className="bg-[#3c4043] text-white px-4 py-3 rounded-2xl max-w-[80%]">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div className="group">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[#e3e3e3] leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </div>
                      <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => copyToClipboard(msg.content)}
                          className="p-2 hover:bg-[#3c4043] rounded-full"
                        >
                          <Copy className="w-4 h-4 text-[#8e918f]" />
                        </button>
                        <button className="p-2 hover:bg-[#3c4043] rounded-full">
                          <ThumbsUp className="w-4 h-4 text-[#8e918f]" />
                        </button>
                        <button className="p-2 hover:bg-[#3c4043] rounded-full">
                          <ThumbsDown className="w-4 h-4 text-[#8e918f]" />
                        </button>
                        <button className="p-2 hover:bg-[#3c4043] rounded-full">
                          <Share2 className="w-4 h-4 text-[#8e918f]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Streaming response */}
          {streamingContent && (
            <div className="mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1 animate-pulse">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-[#e3e3e3] leading-relaxed whitespace-pre-wrap">
                    {streamingContent}
                    <span className="inline-block w-2 h-5 bg-blue-400 ml-1 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && !streamingContent && (
            <div className="flex items-start gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex gap-1 py-3">
                <span className="w-2 h-2 bg-[#8e918f] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-[#8e918f] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-[#8e918f] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[#3c4043] p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-[#1e1f20] rounded-3xl px-4 py-2 border border-[#3c4043] focus-within:border-[#8ab4f8]">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask about Charchit..."
              className="flex-1 bg-transparent text-white placeholder:text-[#8e918f] outline-none py-2 text-base"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-[#3c4043] hover:bg-[#4c4f53] disabled:opacity-40 disabled:hover:bg-[#3c4043] flex items-center justify-center transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
          <p className="text-center text-xs text-[#8e918f] mt-3">
            Gemini can make mistakes, so double-check responses
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeminiChat;
