
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnalysisForm from "@/components/AnalysisForm";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, BarChart3, Zap, Search, Bot } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Search className="h-10 w-10 text-digimole-purple" />,
      title: "Comprehensive SEO Analysis",
      description: "Get detailed insights into your website's SEO performance, including on-page factors, technical issues, and content quality."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-digimole-blue" />,
      title: "Performance Metrics",
      description: "Analyze your site's loading speed, mobile-friendliness, and other critical performance factors that affect your rankings."
    },
    {
      icon: <Bot className="h-10 w-10 text-digimole-purple" />,
      title: "AI-Powered Recommendations",
      description: "Receive personalized recommendations from our AI to improve your website's search engine rankings."
    },
    {
      icon: <Zap className="h-10 w-10 text-digimole-blue" />,
      title: "Real-time Analysis",
      description: "Get instant insights into your website's SEO performance without waiting for lengthy reports."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 pt-24 pb-32 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left column with text */}
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-digimole-purple/10 text-digimole-purple dark:bg-digimole-purple/20">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-digimole-purple opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-digimole-purple"></span>
                  </span>
                  Powered by AI
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
                  Supercharge Your <span className="bg-gradient-text">SEO Performance</span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                  Get comprehensive SEO analysis and AI-powered recommendations to improve your website's search engine rankings.
                </p>
              </div>
              
              <div className="pt-4">
                <AnalysisForm variant="hero" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 max-w-lg">
                {["Keyword Analysis", "Technical SEO", "Content Optimization", "Backlink Analysis"].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-digimole-purple" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right column with image */}
            <div className="flex-1 w-full max-w-xl">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-digimole-purple to-digimole-blue opacity-10 rounded-full blur-3xl"></div>
                <img 
                  src="/lovable-uploads/0273d6e2-d521-4b36-962c-a8d184633a11.png" 
                  alt="Digital Molecule SEO Bot" 
                  className="relative z-10 w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Powerful SEO Analysis Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our comprehensive suite of tools helps you identify and fix issues that are holding your website back.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-8 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-20 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Ready to Improve Your SEO?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Start your free SEO analysis today and get actionable insights to improve your website's search engine rankings.
            </p>
            
            <div className="pt-4">
              <Button 
                onClick={() => navigate('/analysis')}
                size="lg"
                className="rounded-full px-8 py-6 text-lg bg-gradient-purple-blue hover:opacity-90 transition-all"
              >
                Start Free Analysis <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
