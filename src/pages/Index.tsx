import React from "react";
import AnalysisForm from "@/components/AnalysisForm";
import ChatbotPopup from "@/components/ChatbotPopup";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  SEO Analysis Tool
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Get a comprehensive analysis of your website's SEO performance and actionable recommendations.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <AnalysisForm variant="hero" />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full p-3 bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Comprehensive Analysis</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Analyze all key SEO factors affecting your website's performance in search results.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full p-3 bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <path d="M14 2v6h6"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                    <path d="M10 9H8"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Actionable Recommendations</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get practical tips and fixes to improve your website's search engine ranking.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full p-3 bg-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Expert Insights</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Benefit from professional SEO expertise to outrank your competitors.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Add the ChatbotPopup component */}
      <ChatbotPopup />
    </div>
  );
};

export default Index;
