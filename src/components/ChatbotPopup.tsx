
import React, { useState, useRef, useEffect } from "react";
import { X, MessageSquare, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { generateChatResponse, ChatMessage } from "@/utils/openai";

interface ChatbotPopupProps {
  analyzedUrl?: string;
}

const ChatbotPopup = ({ analyzedUrl = "" }: ChatbotPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: "system", 
      content: `You are an SEO expert assistant. Provide helpful advice about SEO for the analyzed website. analyzed_url: ${analyzedUrl}` 
    },
    { 
      role: "assistant", 
      content: analyzedUrl ? 
        `Hello! I'm your SEO assistant. I've analyzed ${analyzedUrl ? new URL(analyzedUrl).hostname : "your website"} and I'm ready to help you improve your website's search engine performance. What would you like to know about your site's SEO?` :
        "Hello! I'm your SEO assistant. Ask me anything about SEO, and I'll provide expert guidance to help improve your website's rankings."
    }
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Floating chat button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={() => setIsOpen(true)} 
          className="h-12 w-12 rounded-full shadow-lg" 
          size="icon"
        >
          <MessageSquare />
        </Button>
      </div>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`p-0 gap-0 ${isExpanded ? 'sm:max-w-[800px] h-[80vh]' : 'sm:max-w-[400px] max-h-[500px]'}`}>
          <DialogHeader className="p-4 border-b flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <DialogTitle>SEO Assistant</DialogTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleExpand}
                className="h-8 w-8"
              >
                {isExpanded ? (
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 2C5.77614 2 6 2.22386 6 2.5V5.5C6 5.77614 5.77614 6 5.5 6H2.5C2.22386 6 2 5.77614 2 5.5C2 5.22386 2.22386 5 2.5 5H5V2.5C5 2.22386 5.22386 2 5.5 2ZM9.5 2C9.77614 2 10 2.22386 10 2.5V5H12.5C12.7761 5 13 5.22386 13 5.5C13 5.77614 12.7761 6 12.5 6H9.5C9.22386 6 9 5.77614 9 5.5V2.5C9 2.22386 9.22386 2 9.5 2ZM2.5 9C2.77614 9 3 9.22386 3 9.5V12H5.5C5.77614 12 6 12.2239 6 12.5C6 12.7761 5.77614 13 5.5 13H2.5C2.22386 13 2 12.7761 2 12.5V9.5C2 9.22386 2.22386 9 2.5 9ZM12.5 9C12.7761 9 13 9.22386 13 9.5V12.5C13 12.7761 12.7761 13 12.5 13H9.5C9.22386 13 9 12.7761 9 12.5C9 12.2239 9.22386 12 9.5 12H12V9.5C12 9.22386 12.2239 9 12.5 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 2C2.77614 2 3 2.22386 3 2.5V5H5.5C5.77614 5 6 5.22386 6 5.5C6 5.77614 5.77614 6 5.5 6H2.5C2.22386 6 2 5.77614 2 5.5V2.5C2 2.22386 2.22386 2 2.5 2ZM9.5 6C9.22386 6 9 5.77614 9 5.5C9 5.22386 9.22386 5 9.5 5H12V2.5C12 2.22386 12.2239 2 12.5 2C12.7761 2 13 2.22386 13 2.5V5.5C13 5.77614 12.7761 6 12.5 6H9.5ZM2 9.5C2 9.22386 2.22386 9 2.5 9H5.5C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10H3V12.5C3 12.7761 2.77614 13 2.5 13C2.22386 13 2 12.7761 2 12.5V9.5ZM12.5 9C12.7761 9 13 9.22386 13 9.5V12.5C13 12.7761 12.7761 13 12.5 13C12.2239 13 12 12.7761 12 12.5V10H9.5C9.22386 10 9 9.77614 9 9.5C9 9.22386 9.22386 9 9.5 9H12.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {!isApiKeySet ? (
            <div className="p-6 space-y-4">
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
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[320px]">
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
              
              <div className="border-t p-3 gap-2 items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mb-2 text-xs"
                    >
                      API Key: {apiKey.substring(0, 8)}...
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3 space-y-2">
                    <p className="text-xs">Change API Key?</p>
                    <Button size="sm" onClick={resetApiKey}>Reset Key</Button>
                  </PopoverContent>
                </Popover>
                
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Ask about SEO strategies..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatbotPopup;
