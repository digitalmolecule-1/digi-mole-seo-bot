
// This is a simplified version of an SEO analysis utility.
// In a real-world application, you would connect to actual APIs to fetch this data.

export interface SEOAnalysisResult {
  url: string;
  title: string | null;
  description: string | null;
  performance: {
    loadTime: number;
    mobileScore: number;
    desktopScore: number;
    coreWebVitals: {
      lcp: number; // Largest Contentful Paint (in seconds)
      fid: number; // First Input Delay (in ms)
      cls: number; // Cumulative Layout Shift (unitless)
    };
  };
  seo: {
    score: number;
    titleLength: number;
    descriptionLength: number;
    h1Count: number;
    h1Present: boolean;
    titlePresent: boolean;
    descriptionPresent: boolean;
    imgWithoutAlt: number;
    totalImages: number;
    keywordDensity: number;
    wordCount: number;
    readabilityScore: number;
  };
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  keywords: Array<{ keyword: string; count: number }>;
  meta: Record<string, string>[];
  issues: Array<{
    severity: "high" | "medium" | "low";
    message: string;
    recommendation: string;
  }>;
  technical: {
    isHttps: boolean;
    hasSitemap: boolean;
    hasRobotsTxt: boolean;
    hasBrokenLinks: number;
    canonical: string | null;
    mobileCompatible: boolean;
    schemaMarkup: boolean;
  };
  offPage: {
    domainAuthority: number;
    pageAuthority: number;
    backlinks: number;
    referringDomains: number;
    socialShares: number;
  };
  local: {
    gmb: {
      isVerified: boolean;
      hasReviews: number;
      rating: number;
    };
    napConsistency: boolean;
    localCitations: number;
  };
  competitors: Array<{
    domain: string;
    keywordOverlap: number;
    backlinks: number;
    domainAuthority: number;
  }>;
  analytics: {
    organicTraffic: number;
    bounceRate: number;
    averageSessionDuration: number;
    ctr: number;
    conversions: number;
  };
}

// Mock data generator for SEO analysis
export const analyzeSEO = async (
  url: string
): Promise<SEOAnalysisResult> => {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    // In a real implementation, you'd fetch actual data from the URL
    // This is just a mock implementation for demonstration purposes

    // Generate random issues
    const issues = [
      {
        severity: "high" as const,
        message: "Meta description is missing",
        recommendation: "Add a concise meta description that summarizes the page content.",
      },
      {
        severity: "high" as const,
        message: "Website is not mobile friendly",
        recommendation: "Redesign your website using responsive design principles.",
      },
      {
        severity: "high" as const,
        message: "Poor Core Web Vitals scores",
        recommendation: "Improve LCP by optimizing image delivery, FID by minimizing JavaScript, and CLS by reserving space for dynamic content.",
      },
      {
        severity: "high" as const,
        message: "Missing HTTPS implementation",
        recommendation: "Install an SSL certificate and enforce HTTPS for all pages.",
      },
      {
        severity: "medium" as const,
        message: "Slow page load time",
        recommendation: "Optimize images and minimize CSS/JavaScript files.",
      },
      {
        severity: "medium" as const,
        message: "Multiple H1 tags detected",
        recommendation: "Use only one H1 tag per page for proper heading hierarchy.",
      },
      {
        severity: "medium" as const,
        message: "XML Sitemap is missing",
        recommendation: "Generate and submit an XML sitemap to Google Search Console.",
      },
      {
        severity: "medium" as const,
        message: "Low keyword density",
        recommendation: "Optimize content with relevant keywords, aiming for 1-2% keyword density.",
      },
      {
        severity: "low" as const,
        message: "Missing alt tags on images",
        recommendation: "Add descriptive alt text to all images for better accessibility.",
      },
      {
        severity: "low" as const,
        message: "URL structure is not SEO friendly",
        recommendation: "Use descriptive keywords in URLs and keep them short.",
      },
      {
        severity: "low" as const,
        message: "Low social media engagement",
        recommendation: "Add social sharing buttons and create more shareable content.",
      },
      {
        severity: "low" as const,
        message: "No schema markup detected",
        recommendation: "Implement schema.org markup for rich snippets in search results.",
      },
    ];

    // Randomly select 4-6 issues
    const numberOfIssues = Math.floor(Math.random() * 3) + 4;
    const selectedIssues = [...issues]
      .sort(() => 0.5 - Math.random())
      .slice(0, numberOfIssues);

    // Extract domain name
    const domain = new URL(url).hostname;
    const domainWithoutWww = domain.replace(/^www\./, "");

    // Generate competitor domains
    const competitors = [
      {
        domain: `competitor1-${domainWithoutWww}`,
        keywordOverlap: Math.floor(Math.random() * 40) + 20,
        backlinks: Math.floor(Math.random() * 1000) + 100,
        domainAuthority: Math.floor(Math.random() * 50) + 30,
      },
      {
        domain: `competitor2-${domainWithoutWww}`,
        keywordOverlap: Math.floor(Math.random() * 30) + 10,
        backlinks: Math.floor(Math.random() * 800) + 50,
        domainAuthority: Math.floor(Math.random() * 40) + 20,
      },
      {
        domain: `competitor3-${domainWithoutWww}`,
        keywordOverlap: Math.floor(Math.random() * 20) + 5,
        backlinks: Math.floor(Math.random() * 500) + 20,
        domainAuthority: Math.floor(Math.random() * 30) + 10,
      },
    ];

    // Generate mock data
    return {
      url,
      title: `${domainWithoutWww.charAt(0).toUpperCase() + domainWithoutWww.slice(1)} - Official Website`,
      description: Math.random() > 0.3 ? `Welcome to ${domainWithoutWww}, your source for quality content and services.` : null,
      performance: {
        loadTime: Math.random() * 4 + 1, // 1-5 seconds
        mobileScore: Math.floor(Math.random() * 50) + 50, // 50-100
        desktopScore: Math.floor(Math.random() * 30) + 70, // 70-100
        coreWebVitals: {
          lcp: Math.random() * 3 + 1, // 1-4 seconds (lower is better)
          fid: Math.floor(Math.random() * 150) + 50, // 50-200ms (lower is better)
          cls: Math.random() * 0.25, // 0-0.25 (lower is better)
        },
      },
      seo: {
        score: Math.floor(Math.random() * 40) + 60, // 60-100
        titleLength: Math.floor(Math.random() * 30) + 20, // 20-50 characters
        descriptionLength: Math.random() > 0.3 ? Math.floor(Math.random() * 100) + 50 : 0, // 50-150 characters or 0
        h1Count: Math.floor(Math.random() * 3) + 1, // 1-3
        h1Present: Math.random() > 0.2, // 80% chance of having an H1
        titlePresent: Math.random() > 0.1, // 90% chance of having a title
        descriptionPresent: Math.random() > 0.3, // 70% chance of having a description
        imgWithoutAlt: Math.floor(Math.random() * 5), // 0-5
        totalImages: Math.floor(Math.random() * 10) + 5, // 5-15
        keywordDensity: Math.random() * 2 + 0.5, // 0.5-2.5%
        wordCount: Math.floor(Math.random() * 1000) + 500, // 500-1500 words
        readabilityScore: Math.floor(Math.random() * 50) + 50, // 50-100
      },
      headings: {
        h1: [`Welcome to ${domainWithoutWww}`],
        h2: ["Our Services", "About Us", "Contact Us", "Featured Products"],
        h3: ["Service 1", "Service 2", "Our Team", "Our Mission", "Testimonials"],
      },
      keywords: [
        { keyword: domainWithoutWww.split(".")[0], count: Math.floor(Math.random() * 10) + 10 },
        { keyword: "services", count: Math.floor(Math.random() * 8) + 5 },
        { keyword: "product", count: Math.floor(Math.random() * 6) + 3 },
        { keyword: "contact", count: Math.floor(Math.random() * 5) + 2 },
        { keyword: "about", count: Math.floor(Math.random() * 4) + 2 },
      ],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: `${domainWithoutWww} - Official Website` },
        { property: "og:type", content: "website" },
      ],
      issues: selectedIssues,
      technical: {
        isHttps: Math.random() > 0.2, // 80% chance of having HTTPS
        hasSitemap: Math.random() > 0.4, // 60% chance of having sitemap
        hasRobotsTxt: Math.random() > 0.3, // 70% chance of having robots.txt
        hasBrokenLinks: Math.floor(Math.random() * 10), // 0-10 broken links
        canonical: Math.random() > 0.3 ? `https://${domain}/` : null, // 70% chance of having canonical
        mobileCompatible: Math.random() > 0.2, // 80% chance of being mobile compatible
        schemaMarkup: Math.random() > 0.5, // 50% chance of having schema markup
      },
      offPage: {
        domainAuthority: Math.floor(Math.random() * 40) + 10, // 10-50
        pageAuthority: Math.floor(Math.random() * 30) + 10, // 10-40
        backlinks: Math.floor(Math.random() * 1000) + 100, // 100-1100
        referringDomains: Math.floor(Math.random() * 100) + 10, // 10-110
        socialShares: Math.floor(Math.random() * 500) + 50, // 50-550
      },
      local: {
        gmb: {
          isVerified: Math.random() > 0.3, // 70% chance of being verified
          hasReviews: Math.floor(Math.random() * 50) + 5, // 5-55 reviews
          rating: Math.random() * 2 + 3, // 3-5 rating
        },
        napConsistency: Math.random() > 0.4, // 60% chance of having consistent NAP
        localCitations: Math.floor(Math.random() * 50) + 10, // 10-60 citations
      },
      competitors,
      analytics: {
        organicTraffic: Math.floor(Math.random() * 10000) + 1000, // 1000-11000
        bounceRate: Math.floor(Math.random() * 60) + 20, // 20-80%
        averageSessionDuration: Math.floor(Math.random() * 180) + 60, // 60-240 seconds
        ctr: Math.random() * 10 + 1, // 1-11%
        conversions: Math.floor(Math.random() * 100) + 10, // 10-110
      },
    };
  } catch (error) {
    console.error("Error analyzing SEO:", error);
    throw new Error("Failed to analyze website SEO");
  }
};
