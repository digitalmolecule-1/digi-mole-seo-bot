
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Send, Bot, User, X, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateChatResponse, ChatMessage } from "@/utils/openai";

interface SEOChatbotProps {
  analyzedUrl: string;
}

const SEOChatbot = ({ analyzedUrl }: SEOChatbotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "system", content: `You are an SEO expert assistant. Provide helpful advice about SEO for the analyzed website. analyzed_url: ${analyzedUrl}` },
    { role: "assistant", content: `Hello! I'm your SEO assistant. I've analyzed ${new URL(analyzedUrl).hostname} and I'm ready to help you improve your website's search engine performance. What would you like to know about your site's SEO?` }
  ]);
  
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    if (!isApiKeySet) {
      toast.error("Please enter your OpenAI API key first");
      return;
    }
    
    // Add user message
    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Get AI response
      const aiResponse = await generateChatResponse([...messages, userMessage], apiKey);
      
      // Add AI response
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("Error generating chat response:", error);
      toast.error("Failed to generate response. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const setOpenAIKey = () => {
    if (!apiKey.trim() || !apiKey.startsWith("sk-")) {
      toast.error("Please enter a valid OpenAI API key");
      return;
    }
    
    setIsApiKeySet(true);
    toast.success("API key set successfully");
  };
  
  const resetApiKey = () => {
    setApiKey("");
    setIsApiKeySet(false);
  };

  return (
    <Card className="border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span>Digi SEO Assistant</span>
        </CardTitle>
        <CardDescription>
          Ask questions about your website's SEO and get expert advice
        </CardDescription>
      </CardHeader>
      
      {!isApiKeySet ? (
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm">
              <p>This feature uses OpenAI's API to generate personalized SEO recommendations.</p>
              <p className="mt-2">Please enter your OpenAI API key to continue:</p>
            </div>
            
            <div className="flex gap-2">
              <Input 
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your OpenAI API key"
                className="flex-1"
              />
              <Button onClick={setOpenAIKey}>
                Set Key
              </Button>
            </div>
            
            <div className="text-xs text-gray-500">
              Your API key is only stored in your browser and is never sent to our servers.
            </div>
          </div>
        </CardContent>
      ) : (
        <>
          <CardContent>
            <div className="h-80 overflow-y-auto pr-2 space-y-4">
              {messages.slice(1).map((message, index) => (
                <div 
                  key={index}
                  className={`flex gap-3 ${message.role === "assistant" ? "" : "justify-end"}`}
                >
                  {message.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Bot className="h-5 w-5" />
                    </div>
                  )}
                  
                  <div 
                    className={`rounded-lg max-w-[80%] px-4 py-2 ${
                      message.role === "assistant" 
                        ? "bg-muted" 
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </div>
                  </div>
                  
                  {message.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
              
              {isLoading && (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="border-t p-3 gap-2 items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={resetApiKey} 
              className="h-8 w-8"
              title="Reset API Key"
            >
              <X className="h-4 w-4" />
            </Button>
            
            <form onSubmit={handleSendMessage} className="flex gap-2 flex-1">
              <Input
                type="text"
                placeholder="Ask about your website's SEO..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default SEOChatbot;
