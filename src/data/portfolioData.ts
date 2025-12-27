export interface PortfolioItem {
  id: string;
  title: string;
  url: string;
  description: string;
  category: "project" | "skill" | "about" | "contact" | "experience" | "education" | "social" | "wikipedia";
  tags: string[];
  keywords: string[];
}

export const portfolioData: PortfolioItem[] = [
  {
    id: "manga",
    title: "📖 My Journey - Manga Style",
    url: "/manga",
    description:
      "Experience Charchit's inspiring journey in an immersive manga format! From 'The Boy Who Stayed Quiet' to conquering IIT Madras - read the story that defines his spirit. 23 beautifully illustrated pages.",
    category: "about",
    tags: ["Manga", "Story", "Journey", "Inspiration"],
    keywords: ["manga", "story", "journey", "comic", "read", "book", "my story", "life story", "inspiration", "anime"],
  },
  {
    id: "wikipedia",
    title: "Charchit Sharma - Wikipedia",
    url: "/wiki/charchit-sharma",
    description:
      "Read the full Wikipedia-style article about Charchit Sharma. Learn about his journey from Roorkee, Uttarakhand to IIT Madras, his struggles, achievements, and the hunger that drives him forward.",
    category: "wikipedia",
    tags: ["Wikipedia", "Biography", "Life Story"],
    keywords: ["wikipedia", "wiki", "biography", "life", "story", "about", "charchit"],
  },
  {
    id: "about",
    title: "Charchit Sharma - The Builder from Roorkee",
    url: "charchit.dev/about",
    description:
      "Born and raised in Roorkee, Uttarakhand, Charchit is a 21-year-old dreamer pursuing BS in Data Science at IIT Madras. Selected for the Aspire Leadership Program (Harvard faculty-backed), he's driven by an insatiable hunger to learn and build.",
    category: "about",
    tags: ["Roorkee", "IIT Madras", "Harvard ALP", "Builder"],
    keywords: ["about", "me", "who", "charchit", "sharma", "background", "student", "roorkee", "uttarakhand"],
  },
  {
    id: "experience-ecell",
    title: "Campus Ambassador - E-Summit IIT Roorkee",
    url: "charchit.dev/experience/ecell",
    description:
      "Representing his hometown's prestigious institution! As Campus Ambassador for E-Summit '26, Charchit bridges the gap between IIT Roorkee and student communities across India, making entrepreneurship accessible to Tier-2/3 cities.",
    category: "experience",
    tags: ["E-Summit", "IIT Roorkee", "Leadership", "Entrepreneurship"],
    keywords: ["experience", "work", "ecell", "ambassador", "roorkee", "entrepreneurship", "summit", "esummit"],
  },
  {
    id: "education-iitm",
    title: "BS Data Science - IIT Madras (Pursuing)",
    url: "charchit.dev/education/iitm",
    description:
      "Currently pursuing India's first online BS degree from an IIT. Charchit approaches learning unconventionally, preferring hands-on problem solving over passive lectures. Expected graduation: 2028.",
    category: "education",
    tags: ["IIT Madras", "Data Science", "BS Degree"],
    keywords: ["education", "degree", "iit", "madras", "data science", "college", "university", "iitm"],
  },
  {
    id: "education-aspire",
    title: "Aspire Leadership Program - Harvard Faculty-backed",
    url: "charchit.dev/education/aspire",
    description:
      "Selected as a 2025 ALP Scholar! The Aspire Leadership Program, backed by Harvard University faculty, identifies exceptional young leaders worldwide. This opened doors to a global network of ambitious peers and mentors.",
    category: "education",
    tags: ["Harvard", "ALP", "Leadership", "Scholar"],
    keywords: ["certificate", "leadership", "aspire", "development", "harvard", "alp", "scholar"],
  },
  {
    id: "skills",
    title: "Technical Skills & Expertise",
    url: "charchit.dev/skills",
    description:
      "Full-stack builder: React, Flutter, Python, Flask, SQL. AI-augmented developer who codes as a 'cyborg'. Passionate about Three.js, blockchain, and creating beautiful 8-bit retro aesthetics.",
    category: "skill",
    tags: ["React", "Python", "AI", "Full-Stack", "Web3"],
    keywords: ["skills", "expertise", "react", "python", "flask", "flutter", "coding", "developer"],
  },
  {
    id: "contact",
    title: "Connect with Charchit",
    url: "charchit.dev/contact",
    description:
      "Want to collaborate or just chat? Reach out at charxhitsharma@gmail.com. Based in Roorkee, Uttarakhand but building for the world.",
    category: "contact",
    tags: ["Email", "LinkedIn", "Roorkee"],
    keywords: ["contact", "email", "connect", "hire", "collaborate", "reach", "message"],
  },
  {
    id: "github",
    title: "GitHub - @charchitheree",
    url: "https://github.com/charchitheree",
    description:
      "Explore Charchit's code repositories, open-source contributions, and projects. From web apps to AI experiments.",
    category: "social",
    tags: ["GitHub", "Code", "Open Source"],
    keywords: ["github", "code", "repository", "projects", "open source"],
  },
  {
    id: "linkedin",
    title: "LinkedIn - Charchit Sharma",
    url: "https://www.linkedin.com/in/charchit-sharma-398165287/",
    description:
      "Professional profile featuring Charchit's journey, achievements, and thought leadership. Read his viral posts about struggles and growth.",
    category: "social",
    tags: ["LinkedIn", "Professional", "Network"],
    keywords: ["linkedin", "professional", "network", "career", "posts"],
  },
  {
    id: "instagram",
    title: "Instagram - @heyimcharchit",
    url: "https://www.instagram.com/heyimcharchit/",
    description:
      "Follow Charchit's journey through life, tech, and travel. 8,600+ followers. Bio: 'Just a bhondu.'",
    category: "social",
    tags: ["Instagram", "Photos", "Life"],
    keywords: ["instagram", "photos", "social", "follow", "heyimcharchit"],
  },
  {
    id: "twitter",
    title: "X (Twitter) - @heyimcharchit",
    url: "https://x.com/heyimcharchit",
    description:
      "Thoughts, tech insights, and random musings. Follow Charchit on X for real-time updates.",
    category: "social",
    tags: ["Twitter", "X", "Thoughts"],
    keywords: ["twitter", "x", "tweets", "thoughts", "social"],
  },
];

export const searchSuggestions = [
  "manga",
  "my story",
  "charchit wikipedia",
  "charchit sharma",
  "about charchit",
  "who is charchit",
  "iit madras",
  "roorkee",
  "harvard alp",
  "github",
  "linkedin",
  "instagram",
  "skills",
  "contact",
  "e-summit roorkee",
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
