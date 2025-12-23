export interface PortfolioItem {
  id: string;
  title: string;
  url: string;
  description: string;
  category: "project" | "skill" | "about" | "contact" | "experience" | "education";
  tags: string[];
  keywords: string[];
}

export const portfolioData: PortfolioItem[] = [
  {
    id: "about",
    title: "Charchit Sharma - Data Science Student & Campus Ambassador",
    url: "charchit.dev/about",
    description:
      "Pursuing BS in Data Science and Applications at IIT Madras, with a leadership development certification from Aspire Institute. Currently serving as Campus Ambassador at E-Cell IIT Roorkee, facilitating engagement for one of India's prominent entrepreneurship summits.",
    category: "about",
    tags: ["Data Science", "IIT Madras", "Campus Ambassador"],
    keywords: ["about", "me", "who", "charchit", "sharma", "background", "student"],
  },
  {
    id: "experience-ecell",
    title: "Campus Ambassador - E-Cell IIT Roorkee",
    url: "charchit.dev/experience/ecell",
    description:
      "Driving awareness and participation for one of India's leading entrepreneurship summits. Acting as the on-ground point of contact between E-Cell IIT Roorkee and student communities. Collecting feedback from Tier-2/3 students to make the summit more inclusive.",
    category: "experience",
    tags: ["E-Cell", "IIT Roorkee", "Leadership", "Outreach"],
    keywords: ["experience", "work", "ecell", "ambassador", "roorkee", "entrepreneurship", "summit"],
  },
  {
    id: "education-iitm",
    title: "BS in Data Science - IIT Madras",
    url: "charchit.dev/education/iitm",
    description:
      "Bachelor of Science in Data Science and Applications at the Indian Institute of Technology, Madras (2024-2029). Applying structured, data-driven approaches to real-world problems and community engagement.",
    category: "education",
    tags: ["IIT Madras", "Data Science", "BS Degree"],
    keywords: ["education", "degree", "iit", "madras", "data science", "college", "university"],
  },
  {
    id: "education-aspire",
    title: "Leadership Development Certificate - Aspire Institute",
    url: "charchit.dev/education/aspire",
    description:
      "Certificate in Leadership and Personal Development from Aspire Institute (May 2025 - July 2025). Focused on developing leadership skills and personal growth strategies.",
    category: "education",
    tags: ["Leadership", "Aspire Institute", "Certificate"],
    keywords: ["certificate", "leadership", "aspire", "development", "personal growth"],
  },
  {
    id: "skills",
    title: "Skills & Expertise",
    url: "charchit.dev/skills",
    description:
      "Core competencies include Communication, Community Outreach, and Social Media Marketing. Experienced in data-driven approaches to outreach and engagement. Dedicated to fostering innovation and creating opportunities for students across India.",
    category: "skill",
    tags: ["Communication", "Community Outreach", "Social Media Marketing"],
    keywords: ["skills", "expertise", "communication", "marketing", "outreach", "data"],
  },
  {
    id: "contact",
    title: "Get In Touch - Let's Connect",
    url: "charchit.dev/contact",
    description:
      "Interested in collaborating or discussing opportunities? Reach out via email at charxhitsharma@gmail.com or connect on LinkedIn. Based in Roorkee, Uttarakhand, India.",
    category: "contact",
    tags: ["Email", "LinkedIn", "Roorkee"],
    keywords: ["contact", "email", "connect", "hire", "collaborate", "linkedin", "reach"],
  },
];

export const searchSuggestions = [
  "about charchit",
  "data science",
  "iit madras",
  "e-cell roorkee",
  "skills",
  "contact",
  "experience",
  "education",
  "leadership",
  "campus ambassador",
];

export const filterPortfolioData = (query: string): PortfolioItem[] => {
  if (!query.trim()) return portfolioData;
  
  const lowerQuery = query.toLowerCase();
  
  return portfolioData.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      item.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
  );
};
