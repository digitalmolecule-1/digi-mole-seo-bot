
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
        severity: "low" as const,
        message: "Missing alt tags on images",
        recommendation: "Add descriptive alt text to all images for better accessibility.",
      },
      {
        severity: "low" as const,
        message: "URL structure is not SEO friendly",
        recommendation: "Use descriptive keywords in URLs and keep them short.",
      },
    ];

    // Randomly select 2-4 issues
    const numberOfIssues = Math.floor(Math.random() * 3) + 2;
    const selectedIssues = [...issues]
      .sort(() => 0.5 - Math.random())
      .slice(0, numberOfIssues);

    // Extract domain name
    const domain = new URL(url).hostname;
    const domainWithoutWww = domain.replace(/^www\./, "");

    // Generate mock data
    return {
      url,
      title: `${domainWithoutWww.charAt(0).toUpperCase() + domainWithoutWww.slice(1)} - Official Website`,
      description: Math.random() > 0.3 ? `Welcome to ${domainWithoutWww}, your source for quality content and services.` : null,
      performance: {
        loadTime: Math.random() * 4 + 1, // 1-5 seconds
        mobileScore: Math.floor(Math.random() * 50) + 50, // 50-100
        desktopScore: Math.floor(Math.random() * 30) + 70, // 70-100
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
    };
  } catch (error) {
    console.error("Error analyzing SEO:", error);
    throw new Error("Failed to analyze website SEO");
  }
};
