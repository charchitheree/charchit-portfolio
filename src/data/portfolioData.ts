export interface PortfolioItem {
  id: string;
  title: string;
  url: string;
  description: string;
  category: "project" | "skill" | "about" | "contact";
  tags: string[];
  keywords: string[];
}

export const portfolioData: PortfolioItem[] = [
  {
    id: "about",
    title: "About Me - Full Stack Developer",
    url: "portfolio.dev/about",
    description:
      "Passionate full-stack developer with 5+ years of experience building modern web applications. I love creating elegant solutions to complex problems and am always learning new technologies.",
    category: "about",
    tags: ["Developer", "Creator", "Problem Solver"],
    keywords: ["about", "me", "who", "developer", "experience", "background"],
  },
  {
    id: "project-1",
    title: "E-Commerce Platform - React & Node.js",
    url: "portfolio.dev/projects/ecommerce",
    description:
      "Built a full-featured e-commerce platform with React, Node.js, and PostgreSQL. Features include real-time inventory, payment processing, and admin dashboard.",
    category: "project",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    keywords: ["ecommerce", "shop", "store", "react", "node", "project"],
  },
  {
    id: "project-2",
    title: "AI Chat Application - Next.js & OpenAI",
    url: "portfolio.dev/projects/ai-chat",
    description:
      "Developed an intelligent chat application using Next.js and OpenAI's GPT API. Features context-aware responses, conversation history, and real-time streaming.",
    category: "project",
    tags: ["Next.js", "OpenAI", "TypeScript", "Tailwind"],
    keywords: ["ai", "chat", "gpt", "nextjs", "artificial intelligence", "project"],
  },
  {
    id: "project-3",
    title: "Task Management Dashboard - Vue.js",
    url: "portfolio.dev/projects/taskboard",
    description:
      "Created a collaborative task management tool with Vue.js featuring drag-and-drop, real-time updates, team collaboration, and analytics dashboards.",
    category: "project",
    tags: ["Vue.js", "Firebase", "Vuetify", "Charts"],
    keywords: ["task", "management", "dashboard", "vue", "project", "productivity"],
  },
  {
    id: "skills",
    title: "Technical Skills & Expertise",
    url: "portfolio.dev/skills",
    description:
      "Proficient in React, TypeScript, Node.js, Python, and cloud services (AWS, GCP). Experienced with databases (PostgreSQL, MongoDB), CI/CD, and agile methodologies.",
    category: "skill",
    tags: ["Frontend", "Backend", "DevOps", "Cloud"],
    keywords: ["skills", "tech", "technologies", "stack", "programming", "languages"],
  },
  {
    id: "contact",
    title: "Get In Touch - Let's Work Together",
    url: "portfolio.dev/contact",
    description:
      "Interested in collaborating or have a project in mind? I'm always open to discussing new opportunities. Reach out via email or connect on LinkedIn.",
    category: "contact",
    tags: ["Email", "LinkedIn", "GitHub"],
    keywords: ["contact", "email", "hire", "work", "collaborate", "reach"],
  },
];

export const searchSuggestions = [
  "projects",
  "react projects",
  "about me",
  "skills",
  "contact",
  "experience",
  "ai projects",
  "frontend",
  "backend",
  "full stack",
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
