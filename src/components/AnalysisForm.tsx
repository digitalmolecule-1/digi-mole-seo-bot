
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisFormProps {
  variant?: "default" | "hero";
  className?: string;
}

const AnalysisForm = ({ variant = "default", className }: AnalysisFormProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateUrl = (input: string) => {
    try {
      // Simple URL validation
      new URL(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check if URL is empty
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    // Add https if protocol is missing
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `https://${url}`;
    }

    // Validate the URL
    if (!validateUrl(formattedUrl)) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);

    try {
      // In a real implementation, you might want to check if the URL is accessible
      // For now, we'll just navigate to the analysis page
      navigate(`/analysis?url=${encodeURIComponent(formattedUrl)}`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Could not analyze this website. Please try again.");
      setIsLoading(false);
    }
  };

  const isHero = variant === "hero";

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "w-full relative", 
        isHero ? "max-w-3xl" : "max-w-lg",
        className
      )}
    >
      <div className={cn(
        "relative flex items-center",
        isHero ? "backdrop-blur-sm rounded-xl p-1.5 bg-white/40 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/20 shadow-lg" : ""
      )}>
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={isHero ? 20 : 18} />
          </div>
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your website URL (e.g., example.com)"
            className={cn(
              "pl-10 pr-4 py-2 w-full transition-shadow focus-visible:ring-offset-0",
              isHero ? "h-14 text-lg rounded-l-lg border-0 shadow-none bg-transparent" : "",
              error ? "border-red-300 focus-visible:ring-red-200" : ""
            )}
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading}
          className={cn(
            "transition-all gap-2 shrink-0",
            isHero ? "h-14 px-6 text-base rounded-r-lg bg-gradient-purple-blue hover:opacity-90" : "rounded-l-none"
          )}
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Analyze SEO
              {isHero && <ArrowRight size={18} />}
            </>
          )}
        </Button>
      </div>
      
      {error && (
        <div className="absolute -bottom-8 left-0 text-red-500 text-sm flex items-center gap-1.5 mt-1.5">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {isHero && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
          Get a comprehensive SEO audit of your website, including performance metrics, on-page SEO, 
          and actionable recommendations.
        </p>
      )}
    </form>
  );
};

export default AnalysisForm;
