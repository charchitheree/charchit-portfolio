import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Sparkles, Book, Globe, Brain, Cake, Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  isExternal: boolean;
  icon: React.ReactNode;
  tags: string[];
  highlight?: boolean;
  subProjects?: { name: string; searchTerm: string; description: string }[];
}

const projects: Project[] = [
  {
    id: "personal-portfolio",
    title: "Personal Portfolio Website",
    description: "The very website you're currently exploring! A Google-inspired search engine portfolio with retro 8-bit aesthetics, interactive elements, and multiple embedded sub-projects.",
    url: "/",
    isExternal: false,
    icon: <Sparkles className="w-6 h-6" />,
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    highlight: true,
    subProjects: [
      { name: "📖 Manga Story", searchTerm: "manga", description: "My journey in manga format - 23 illustrated pages" },
      { name: "📚 Wikipedia Page", searchTerm: "charchit wikipedia", description: "Full Wikipedia-style biography" },
      { name: "🧠 AI Research", searchTerm: "ai", description: "What 5 AI models taught me about being human" },
    ]
  },
  {
    id: "cakes-by-spring",
    title: "Cakes by Spring",
    description: "A beautiful bakery website showcasing delicious cakes and desserts. Features an elegant design with smooth animations and a warm, inviting color palette.",
    url: "https://cakesbyspring.netlify.app/",
    isExternal: true,
    icon: <Cake className="w-6 h-6" />,
    tags: ["Web Design", "Landing Page", "E-commerce"],
  },
  {
    id: "vickies-diner",
    title: "Vickie's Diner",
    description: "A retro-styled diner website with a nostalgic American vibe. Features menu displays, location info, and a charming vintage aesthetic.",
    url: "https://vickiesdiner.netlify.app/",
    isExternal: true,
    icon: <Utensils className="w-6 h-6" />,
    tags: ["Web Design", "Restaurant", "Retro Theme"],
  },
  {
    id: "ai-research",
    title: "If AI Got One Human Day",
    description: "An interactive research project exploring what 5 AI models (ChatGPT, Claude, Gemini, Grok, DeepSeek) would do with one human day. A philosophical exploration of AI consciousness and gratitude.",
    url: "https://my-personal-reserach.lovable.app/",
    isExternal: true,
    icon: <Brain className="w-6 h-6" />,
    tags: ["AI Research", "Philosophy", "Interactive"],
  },
];

const PortfolioWork = () => {
  const navigate = useNavigate();

  const handleProjectClick = (project: Project) => {
    if (project.isExternal) {
      window.open(project.url, "_blank");
    } else {
      navigate(project.url);
    }
  };

  const handleSubProjectSearch = (searchTerm: string) => {
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio Work
            </h1>
            <p className="text-sm text-gray-400">Projects by Charchit Sharma</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Building <span className="text-blue-400">Dreams</span>, One Project at a Time
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From bakery websites to AI research, here's a collection of projects I've built. 
            Each one taught me something new and pushed my boundaries as a developer.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative group rounded-2xl overflow-hidden ${
                project.highlight 
                  ? "md:col-span-2 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30 border-2 border-purple-500/30" 
                  : "bg-white/5 border border-white/10"
              }`}
            >
              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    project.highlight 
                      ? "bg-gradient-to-br from-blue-500 to-purple-500" 
                      : "bg-white/10"
                  }`}>
                    {project.icon}
                  </div>
                  {project.highlight && (
                    <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                      You're Here!
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-white/10 rounded-md text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Sub Projects */}
                {project.subProjects && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                      Embedded Sub-Projects (Search to explore):
                    </p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {project.subProjects.map((sub) => (
                        <button
                          key={sub.name}
                          onClick={() => handleSubProjectSearch(sub.searchTerm)}
                          className="text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/sub"
                        >
                          <span className="font-medium text-sm group-hover/sub:text-blue-400 transition-colors">
                            {sub.name}
                          </span>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {sub.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={() => handleProjectClick(project)}
                  className={`mt-4 w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                    project.highlight
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {project.isExternal ? (
                    <>
                      Visit Project <ExternalLink className="w-4 h-4" />
                    </>
                  ) : (
                    "Explore"
                  )}
                </button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 blur-3xl ${
                  project.highlight 
                    ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20" 
                    : "bg-blue-500/10"
                }`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>More projects coming soon... 🚀</p>
          <p className="mt-2">
            Want to collaborate?{" "}
            <a
              href="mailto:charxhitsharma@gmail.com"
              className="text-blue-400 hover:underline"
            >
              Let's connect!
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default PortfolioWork;
