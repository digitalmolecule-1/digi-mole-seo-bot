import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { BarChart, LineChart, AreaChart, PieChart, Bar, Line, Area, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { ExternalLink, ArrowLeft, AlertTriangle, Check, Info, Download, Gauge, Globe, Link as LinkIcon, FileText, MapPin, Users, BarChart2, List, Shield, Smartphone, Zap, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { analyzeSEO, SEOAnalysisResult } from "@/utils/seoAnalysis";
import { Skeleton } from "@/components/ui/skeleton";
import SEOChatbot from "@/components/SEOChatbot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ChatbotPopup from "@/components/ChatbotPopup";

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
        const params = new URLSearchParams(location.search);
        const url = params.get("url");

        if (!url) {
          setError("No URL provided for analysis");
          setIsLoading(false);
          return;
        }

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

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
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

  const prepareKeywordData = () => {
    return analysisData?.keywords.map(k => ({
      name: k.keyword,
      value: k.count
    })) || [];
  };

  const prepareCompetitorData = () => {
    return analysisData?.competitors.map(c => ({
      name: c.domain,
      da: c.domainAuthority,
      backlinks: c.backlinks,
      overlap: c.keywordOverlap
    })) || [];
  };

  const prepareCoreWebVitalsData = () => {
    if (!analysisData) return [];
    
    const lcpScore = 100 - Math.min(100, (analysisData.performance.coreWebVitals.lcp / 4) * 100);
    const fidScore = 100 - Math.min(100, (analysisData.performance.coreWebVitals.fid / 200) * 100);
    const clsScore = 100 - Math.min(100, (analysisData.performance.coreWebVitals.cls / 0.25) * 100);
    
    return [
      { name: "LCP", value: lcpScore, fullMark: 100 },
      { name: "FID", value: fidScore, fullMark: 100 },
      { name: "CLS", value: clsScore, fullMark: 100 },
      { name: "Mobile", value: analysisData.performance.mobileScore, fullMark: 100 },
      { name: "Desktop", value: analysisData.performance.desktopScore, fullMark: 100 },
    ];
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

  const renderYesNo = (value: boolean) => {
    return value ? (
      <span className="text-green-500 flex items-center gap-1">
        <Check className="h-4 w-4" /> Yes
      </span>
    ) : (
      <span className="text-red-500 flex items-center gap-1">
        <AlertTriangle className="h-4 w-4" /> No
      </span>
    );
  };

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
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {isLoading ? (
        renderLoadingState()
      ) : analysisData ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-primary" />
                  Overall SEO Score
                </CardTitle>
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
                <CardTitle className="text-xl flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  Mobile Performance
                </CardTitle>
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
                <CardTitle className="text-xl flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Domain Authority
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className={`text-4xl font-bold ${getScoreColor(analysisData.offPage.domainAuthority)}`}>
                    {analysisData.offPage.domainAuthority}/100
                  </div>
                  <div className="text-sm text-gray-500">
                    {analysisData.offPage.backlinks.toLocaleString()} Backlinks
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-6">
              <TabsTrigger value="technical" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span className="hidden md:inline">Technical</span>
              </TabsTrigger>
              <TabsTrigger value="onpage" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span className="hidden md:inline">On-Page</span>
              </TabsTrigger>
              <TabsTrigger value="offpage" className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                <span className="hidden md:inline">Off-Page</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-1">
                <List className="h-4 w-4" />
                <span className="hidden md:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger value="local" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="hidden md:inline">Local SEO</span>
              </TabsTrigger>
              <TabsTrigger value="competitors" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Competitors</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                <span className="hidden md:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="issues" className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                <span className="hidden md:inline">Issues</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="technical" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical SEO Overview</CardTitle>
                    <CardDescription>Technical factors affecting search visibility</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>HTTPS Implementation</span>
                          {renderYesNo(analysisData.technical.isHttps)}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>XML Sitemap</span>
                          {renderYesNo(analysisData.technical.hasSitemap)}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Robots.txt</span>
                          {renderYesNo(analysisData.technical.hasRobotsTxt)}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Mobile-Friendly</span>
                          {renderYesNo(analysisData.technical.mobileCompatible)}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Schema Markup</span>
                          {renderYesNo(analysisData.technical.schemaMarkup)}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Canonical Tag</span>
                          {renderYesNo(!!analysisData.technical.canonical)}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Broken Links</span>
                          <span className={analysisData.technical.hasBrokenLinks === 0 ? "text-green-500" : "text-yellow-500"}>
                            {analysisData.technical.hasBrokenLinks} found
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Core Web Vitals</CardTitle>
                    <CardDescription>Performance metrics that affect rankings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[240px]">
                      <ChartContainer
                        config={{
                          vitals: { theme: { light: '#7f5af0', dark: '#7f5af0' } },
                        }}
                      >
                        <RadarChart data={prepareCoreWebVitalsData()} outerRadius={90}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} />
                          <Radar name="Performance" dataKey="value" stroke="#7f5af0" fill="#7f5af0" fillOpacity={0.5} />
                          <Legend />
                        </RadarChart>
                      </ChartContainer>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs text-center pt-4">
                      <div className="space-y-1">
                        <div className="font-medium">LCP</div>
                        <div className={analysisData.performance.coreWebVitals.lcp <= 2.5 ? "text-green-500" : analysisData.performance.coreWebVitals.lcp <= 4 ? "text-yellow-500" : "text-red-500"}>
                          {analysisData.performance.coreWebVitals.lcp.toFixed(1)}s
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium">FID</div>
                        <div className={analysisData.performance.coreWebVitals.fid <= 100 ? "text-green-500" : analysisData.performance.coreWebVitals.fid <= 300 ? "text-yellow-500" : "text-red-500"}>
                          {analysisData.performance.coreWebVitals.fid.toFixed(0)}ms
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-medium">CLS</div>
                        <div className={analysisData.performance.coreWebVitals.cls <= 0.1 ? "text-green-500" : analysisData.performance.coreWebVitals.cls <= 0.25 ? "text-yellow-500" : "text-red-500"}>
                          {analysisData.performance.coreWebVitals.cls.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="onpage" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>On-Page SEO Metrics</CardTitle>
                    <CardDescription>Key on-page elements for search engines</CardDescription>
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

                <Card>
                  <CardHeader>
                    <CardTitle>Heading Structure</CardTitle>
                    <CardDescription>Hierarchical organization of content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">H1 Tags ({analysisData.headings.h1.length})</h4>
                      <div className="space-y-2">
                        {analysisData.headings.h1.map((heading, i) => (
                          <div key={`h1-${i}`} className="text-sm p-2 bg-primary/10 rounded">
                            {heading}
                          </div>
                        ))}
                        {analysisData.headings.h1.length === 0 && (
                          <div className="text-sm text-muted-foreground">No H1 tags found</div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">H2 Tags ({analysisData.headings.h2.length})</h4>
                      <div className="space-y-2">
                        {analysisData.headings.h2.map((heading, i) => (
                          <div key={`h2-${i}`} className="text-sm p-2 bg-muted rounded">
                            {heading}
                          </div>
                        ))}
                        {analysisData.headings.h2.length === 0 && (
                          <div className="text-sm text-muted-foreground">No H2 tags found</div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">H3 Tags ({analysisData.headings.h3.length})</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {analysisData.headings.h3.map((heading, i) => (
                          <div key={`h3-${i}`} className="text-sm p-2 bg-muted/50 rounded truncate">
                            {heading}
                          </div>
                        ))}
                        {analysisData.headings.h3.length === 0 && (
                          <div className="text-sm text-muted-foreground">No H3 tags found</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="offpage" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Backlink Profile</CardTitle>
                    <CardDescription>External sites linking to your website</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1 text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-3xl font-bold">{analysisData.offPage.backlinks.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Total Backlinks</div>
                      </div>
                      <div className="space-y-1 text-center p-4 bg-muted/30 rounded-lg">
                        <div className="text-3xl font-bold">{analysisData.offPage.referringDomains.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Referring Domains</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Domain Authority</span>
                        <span className="font-medium">{analysisData.offPage.domainAuthority}/100</span>
                      </div>
                      <Progress value={analysisData.offPage.domainAuthority} className={getProgressColor(analysisData.offPage.domainAuthority)} />
                      
                      <div className="flex justify-between text-sm mt-4">
                        <span>Page Authority</span>
                        <span className="font-medium">{analysisData.offPage.pageAuthority}/100</span>
                      </div>
                      <Progress value={analysisData.offPage.pageAuthority} className={getProgressColor(analysisData.offPage.pageAuthority)} />
                      
                      <div className="flex justify-between text-sm mt-4">
                        <span>Social Shares</span>
                        <span className="font-medium">{analysisData.offPage.socialShares.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={Math.min(100, (analysisData.offPage.socialShares / 1000) * 100)} 
                        className="bg-blue-500" 
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Link Quality Distribution</CardTitle>
                    <CardDescription>Estimated quality of backlinks to your site</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <ChartContainer
                        config={{
                          high: { theme: { light: '#22c55e', dark: '#22c55e' } },
                          medium: { theme: { light: '#eab308', dark: '#eab308' } },
                          low: { theme: { light: '#ef4444', dark: '#ef4444' } },
                        }}
                      >
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'High Quality', value: Math.round(analysisData.offPage.referringDomains * 0.3) },
                              { name: 'Medium Quality', value: Math.round(analysisData.offPage.referringDomains * 0.5) },
                              { name: 'Low Quality', value: Math.round(analysisData.offPage.referringDomains * 0.2) },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="var(--color-high)" />
                            <Cell fill="var(--color-medium)" />
                            <Cell fill="var(--color-low)" />
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                        </PieChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Analysis</CardTitle>
                    <CardDescription>Quality and optimization of your content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Word Count</span>
                        <span className="font-medium">{analysisData.seo.wordCount.toLocaleString()} words</span>
                      </div>
                      <Progress 
                        value={Math.min(100, (analysisData.seo.wordCount / 1500) * 100)} 
                        className={analysisData.seo.wordCount >= 600 ? "bg-green-500" : "bg-yellow-500"} 
                      />
                      
                      <div className="flex justify-between text-sm mt-4">
                        <span>Keyword Density</span>
                        <span className="font-medium">{analysisData.seo.keywordDensity.toFixed(1)}%</span>
                      </div>
                      <Progress 
                        value={Math.min(100, (analysisData.seo.keywordDensity / 3) * 100)} 
                        className={
                          analysisData.seo.keywordDensity >= 0.8 && analysisData.seo.keywordDensity <= 2.5 
                            ? "bg-green-500" 
                            : "bg-yellow-500"
                        } 
                      />
                      
                      <div className="flex justify-between text-sm mt-4">
                        <span>Readability Score</span>
                        <span className="font-medium">{analysisData.seo.readabilityScore}/100</span>
                      </div>
                      <Progress 
                        value={analysisData.seo.readabilityScore} 
                        className={getProgressColor(analysisData.seo.readabilityScore)} 
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Keyword Analysis</CardTitle>
                    <CardDescription>Most frequent keywords found on the page</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
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
              </div>
            </TabsContent>

            <TabsContent value="local" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Google My Business Status</CardTitle>
                    <CardDescription>Performance of your GMB listing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 space-y-1 text-center">
                        <div className="text-sm font-medium text-muted-foreground">Verified Status</div>
                        {analysisData.local.gmb.isVerified ? (
                          <div className="flex justify-center items-center gap-1 text-green-600">
                            <Check className="h-5 w-5" />
                            <span className="font-medium">Verified</span>
                          </div>
                        ) : (
                          <div className="flex justify-center items-center gap-1 text-red-500">
                            <AlertTriangle className="h-5 w-5" />
                            <span className="font-medium">Not Verified</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 space-y-1 text-center">
                        <div className="text-sm font-medium text-muted-foreground">Reviews</div>
                        <div className="font-medium text-lg">{analysisData.local.gmb.hasReviews}</div>
                        <div className="flex items-center justify-center gap-1 text-yellow-500">
                          {'★'.repeat(Math.round(analysisData.local.gmb.rating))}
                          <span className="text-sm text-muted-foreground">({analysisData.local.gmb.rating.toFixed(1)})</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-sm">
                        <span>NAP Consistency</span>
                        {renderYesNo(analysisData.local.napConsistency)}
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span>Local Citations</span>
                        <span>{analysisData.local.localCitations} found</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Local SEO Recommendations</CardTitle>
                    <CardDescription>Improve your local search presence</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {!analysisData.local.gmb.isVerified && (
                        <div className="p-3 rounded border border-red-200 bg-red-50 dark:bg-red-950/20 text-sm">
                          <div className="font-medium flex items-center gap-1 text-red-500">
                            <AlertTriangle className="h-4 w-4" />
                            Verify your Google My Business listing
                          </div>
                          <p className="mt-1 text-muted-foreground">
                            A verified GMB listing appears more trustworthy and gives you more control over your business information.
                          </p>
                        </div>
                      )}
                      
                      {!analysisData.local.napConsistency && (
                        <div className="p-3 rounded border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 text-sm">
                          <div className="font-medium flex items-center gap-1 text-yellow-500">
                            <AlertTriangle className="h-4 w-4" />
                            Fix NAP consistency issues
                          </div>
                          <p className="mt-1 text-muted-foreground">
                            Ensure your Name, Address, and Phone number are consistent across all online directories and platforms.
                          </p>
                        </div>
                      )}
                      
                      {analysisData.local.gmb.hasReviews < 10 && (
                        <div className="p-3 rounded border border-blue-200 bg-blue-50 dark:bg-blue-950/20 text-sm">
                          <div className="font-medium flex items-center gap-1 text-blue-500">
                            <Info className="h-4 w-4" />
                            Collect more customer reviews
                          </div>
                          <p className="mt-1 text-muted-foreground">
                            Encourage satisfied customers to leave positive reviews on your Google Business Profile to improve visibility.
                          </p>
                        </div>
                      )}
                      
                      {analysisData.local.localCitations < 30 && (
                        <div className="p-3 rounded border border-blue-200 bg-blue-50 dark:bg-blue-950/20 text-sm">
                          <div className="font-medium flex items-center gap-1 text-blue-500">
                            <Info className="h-4 w-4" />
                            Build more local citations
                          </div>
                          <p className="mt-1 text-muted-foreground">
                            Get listed in more local business directories to improve your local search visibility.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="competitors" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Competitor Comparison</CardTitle>
                    <CardDescription>How you stack up against competitors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <ChartContainer
                        config={{
                          backlinks: { theme: { light: '#7f5af0', dark: '#7f5af0' } },
                          da: { theme: { light: '#22c55e', dark: '#22c55e' } },
                        }}
                      >
                        <BarChart data={prepareCompetitorData()}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" orientation="left" stroke="var(--color-da)" />
                          <YAxis yAxisId="right" orientation="right" stroke="var(--color-backlinks)" />
                          <ChartTooltip
                            content={<ChartTooltipContent />}
                          />
                          <Bar yAxisId="left" dataKey="da" name="Domain Authority" fill="var(--color-da)" />
                          <Bar yAxisId="right" dataKey="overlap" name="Keyword Overlap" fill="var(--color-backlinks)" />
                          <Legend />
                        </BarChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Competitor Backlinks</CardTitle>
                    <CardDescription>Backlink comparison with competitors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Domain</TableHead>
                          <TableHead>DA</TableHead>
                          <TableHead>Backlinks</TableHead>
                          <TableHead>Keyword Overlap</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Your Site</TableCell>
                          <TableCell>{analysisData.offPage.domainAuthority}</TableCell>
                          <TableCell>{analysisData.offPage.backlinks.toLocaleString()}</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                        {analysisData.competitors.map((competitor, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{competitor.domain}</TableCell>
                            <TableCell>{competitor.domainAuthority}</TableCell>
                            <TableCell>{competitor.backlinks.toLocaleString()}</TableCell>
                            <TableCell>{competitor.keywordOverlap}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic & Engagement</CardTitle>
                    <CardDescription>User behavior and engagement metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1 text-center p-4 bg-primary/10 rounded-lg">
                        <div className="text-3xl font-bold">{analysisData.analytics.organicTraffic.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Monthly Organic Visitors</div>
                      </div>
                      <div className="space-y-1 text-center p-4 bg-yellow-500/10 rounded-lg">
                        <div className="text-3xl font-bold">{analysisData.analytics.bounceRate}%</div>
                        <div className="text-xs text-muted-foreground">Bounce Rate</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average Session Duration</span>
                        <span className="font-medium">{Math.floor(analysisData.analytics.averageSessionDuration / 60)}m {analysisData.analytics.averageSessionDuration % 60}s</span>
                      </div>
                      <Progress 
                        value={Math.min(100, (analysisData.analytics.averageSessionDuration / 240) * 100)} 
                        className={analysisData.analytics.averageSessionDuration >= 120 ? "bg-green-500" : "bg-yellow-500"} 
                      />
                      
                      <div className="flex justify-between text-sm mt-4">
                        <span>Click-Through Rate</span>
                        <span className="font-medium">{analysisData.analytics.ctr.toFixed(1)}%</span>
                      </div>
                      <Progress 
                        value={Math.min(100, (analysisData.analytics.ctr / 10) * 100)} 
                        className={analysisData.analytics.ctr >= 3 ? "bg-green-500" : "bg-yellow-500"} 
                      />
                      
                      <div className="flex justify-between text-sm mt-4">
                        <span>Conversions</span>
                        <span className="font-medium">{analysisData.analytics.conversions} per month</span>
                      </div>
                      <Progress 
                        value={Math.min(100, (analysisData.analytics.conversions / 150) * 100)} 
                        className="bg-green-500" 
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Insights</CardTitle>
                    <CardDescription>Key metrics affecting your website performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded border border-green-200 bg-green-50 dark:bg-green-950/20 text-sm">
                        <div className="font-medium">Organic Traffic Trends</div>
                        <p className="mt-1 text-muted-foreground">
                          Your site's organic traffic is {analysisData.analytics.organicTraffic > 5000 ? "strong" : "moderate"}. 
                          {analysisData.analytics.organicTraffic < 5000 ? " Focus on creating more valuable content to increase visibility." : " Continue producing quality content to maintain growth."}
                        </p>
                      </div>
                      
                      <div className="p-3 rounded border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 text-sm">
                        <div className="font-medium">Bounce Rate Analysis</div>
                        <p className="mt-1 text-muted-foreground">
                          Your bounce rate is {analysisData.analytics.bounceRate > 70 ? "high" : analysisData.analytics.bounceRate > 50 ? "average" : "low"}.
                          {analysisData.analytics.bounceRate > 70 ? " Improve your landing pages to better engage visitors." : 
                           analysisData.analytics.bounceRate > 50 ? " There's room for improvement in user engagement." : 
                           " Your content is effectively engaging visitors."}
                        </p>
                      </div>
                      
                      <div className="p-3 rounded border border-blue-200 bg-blue-50 dark:bg-blue-950/20 text-sm">
                        <div className="font-medium">Conversion Optimization</div>
                        <p className="mt-1 text-muted-foreground">
                          Your conversion rate is approximately {(analysisData.analytics.conversions / analysisData.analytics.organicTraffic * 100).toFixed(2)}%.
                          {(analysisData.analytics.conversions / analysisData.analytics.organicTraffic * 100) < 2 ? " Optimize your CTAs and landing pages to improve conversions." : " Your conversion funnel is performing well."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="issues" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Critical SEO Issues</CardTitle>
                  <CardDescription>Problems affecting your search visibility</CardDescription>
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
                          <Badge variant={
                            issue.severity === "high" ? "destructive" : 
                            issue.severity === "medium" ? "default" : 
                            "outline"
                          }>
                            {issue.severity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <ChatbotPopup analyzedUrl={analysisData.url} />
          
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-center">Need Professional SEO Services?</CardTitle>
              <CardDescription className="text-center">
                Our expert team with 13+ years of experience can help optimize your website for better rankings, traffic, and conversions.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4 text-primary" />
                  <a href="https://www.digitalmolecule.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    www.digitalmolecule.in
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4 text-primary" />
                  <a href="mailto:info@digitalmolecule.in" className="text-primary hover:underline">
                    info@digitalmolecule.in
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+919599449323" className="text-primary hover:underline">
                    +91 9599449323
                  </a>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button>Contact Us for a Free Consultation</Button>
            </CardFooter>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default Analysis;
