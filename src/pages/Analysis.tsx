
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { BarChart, LineChart, AreaChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ExternalLink, ArrowLeft, AlertTriangle, Check, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { analyzeSEO, SEOAnalysisResult } from "@/utils/seoAnalysis";
import { Skeleton } from "@/components/ui/skeleton";
import SEOChatbot from "@/components/SEOChatbot";

const Analysis = () => {
  const [analysisData, setAnalysisData] = useState<SEOAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get URL from query parameters
        const params = new URLSearchParams(location.search);
        const url = params.get("url");

        if (!url) {
          setError("No URL provided for analysis");
          setIsLoading(false);
          return;
        }

        // Fetch analysis data
        const data = await analyzeSEO(url);
        setAnalysisData(data);
      } catch (err) {
        console.error("Error fetching analysis data:", err);
        setError("Failed to analyze the website. Please try again.");
        toast.error("Analysis failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [location.search]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getSeverityColor = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high": return "bg-red-500/10 text-red-500 border-red-200";
      case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-200";
      case "low": return "bg-blue-500/10 text-blue-500 border-blue-200";
      default: return "bg-gray-500/10 text-gray-500 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high": return <AlertTriangle className="h-4 w-4" />;
      case "medium": return <Info className="h-4 w-4" />;
      case "low": return <Check className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  // Prepare chart data
  const prepareKeywordData = () => {
    return analysisData?.keywords.map(k => ({
      name: k.keyword,
      value: k.count
    })) || [];
  };

  const renderLoadingState = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-36 rounded-lg" />
        <Skeleton className="h-36 rounded-lg" />
        <Skeleton className="h-36 rounded-lg" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-80 rounded-lg" />
        <Skeleton className="h-80 rounded-lg" />
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <AlertTriangle className="h-16 w-16 mx-auto text-red-500" />
          <h1 className="text-2xl font-bold">Analysis Error</h1>
          <p className="text-gray-500 dark:text-gray-400">{error}</p>
          <Button asChild>
            <Link to="/">Try Another URL</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold">SEO Analysis Results</h1>
          {!isLoading && analysisData && (
            <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span>Analysis for:</span>
              <a 
                href={analysisData.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline flex items-center gap-1"
              >
                {new URL(analysisData.url).hostname}
                <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          )}
        </div>
      </div>

      {isLoading ? (
        renderLoadingState()
      ) : analysisData ? (
        <div className="space-y-10">
          {/* Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Overall SEO Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className={`text-4xl font-bold ${getScoreColor(analysisData.seo.score)}`}>
                    {analysisData.seo.score}/100
                  </div>
                  <div className="text-sm text-gray-500">
                    {analysisData.seo.score >= 80 ? "Good" : 
                     analysisData.seo.score >= 60 ? "Needs Improvement" : "Poor"}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Mobile Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className={`text-4xl font-bold ${getScoreColor(analysisData.performance.mobileScore)}`}>
                    {analysisData.performance.mobileScore}/100
                  </div>
                  <div className="text-sm text-gray-500">
                    Load Time: {analysisData.performance.loadTime.toFixed(1)}s
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Desktop Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className={`text-4xl font-bold ${getScoreColor(analysisData.performance.desktopScore)}`}>
                    {analysisData.performance.desktopScore}/100
                  </div>
                  <div className="text-sm text-gray-500">
                    {analysisData.performance.desktopScore >= 80 ? "Fast" : 
                     analysisData.performance.desktopScore >= 60 ? "Average" : "Slow"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Analysis and Issues */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Keywords Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Keyword Analysis</CardTitle>
                <CardDescription>Most frequent keywords found on the page</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ChartContainer
                    config={{
                      keyword: { theme: { light: '#7f5af0', dark: '#7f5af0' } },
                    }}
                  >
                    <BarChart data={prepareKeywordData()}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent formatter={(value) => [value, 'Occurrences']} />}
                      />
                      <Bar dataKey="value" fill="var(--color-keyword)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* SEO Issues */}
            <Card>
              <CardHeader>
                <CardTitle>Critical SEO Issues</CardTitle>
                <CardDescription>Issues that need attention to improve SEO</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisData.issues.map((issue, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getSeverityIcon(issue.severity)}
                        </div>
                        <div>
                          <h4 className="font-medium">{issue.message}</h4>
                          <p className="text-sm opacity-80 mt-1">{issue.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* On-Page SEO Metrics */}
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>On-Page SEO Metrics</CardTitle>
                <CardDescription>Key on-page SEO elements found on the website</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Page Title</TableCell>
                      <TableCell>
                        {analysisData.seo.titlePresent ? (
                          <span className="text-green-500 flex items-center gap-1">
                            <Check className="h-4 w-4" /> Present
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4" /> Missing
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {analysisData.title ? (
                          <span className="text-sm">{analysisData.title.substring(0, 50)}{analysisData.title.length > 50 ? '...' : ''}</span>
                        ) : 'No title found'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Meta Description</TableCell>
                      <TableCell>
                        {analysisData.seo.descriptionPresent ? (
                          <span className="text-green-500 flex items-center gap-1">
                            <Check className="h-4 w-4" /> Present
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4" /> Missing
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {analysisData.description ? (
                          <span className="text-sm">{analysisData.description.substring(0, 80)}{analysisData.description.length > 80 ? '...' : ''}</span>
                        ) : 'No description found'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">H1 Tag</TableCell>
                      <TableCell>
                        {analysisData.seo.h1Present ? (
                          <span className="text-green-500 flex items-center gap-1">
                            <Check className="h-4 w-4" /> Present ({analysisData.seo.h1Count})
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4" /> Missing
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {analysisData.headings.h1.length > 0 ? (
                          <span className="text-sm">{analysisData.headings.h1[0].substring(0, 50)}{analysisData.headings.h1[0].length > 50 ? '...' : ''}</span>
                        ) : 'No H1 found'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Image Alt Text</TableCell>
                      <TableCell>
                        {analysisData.seo.imgWithoutAlt === 0 ? (
                          <span className="text-green-500 flex items-center gap-1">
                            <Check className="h-4 w-4" /> All images have alt text
                          </span>
                        ) : (
                          <span className="text-yellow-500 flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4" /> Missing
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {analysisData.seo.imgWithoutAlt > 0 ? (
                          <span>{analysisData.seo.imgWithoutAlt} of {analysisData.seo.totalImages} images missing alt text</span>
                        ) : (
                          <span>All {analysisData.seo.totalImages} images have alt text</span>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* SEO Chatbot */}
          <div className="pt-6">
            <SEOChatbot analyzedUrl={analysisData.url} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Analysis;
