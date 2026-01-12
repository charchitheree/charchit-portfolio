import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Image, Video, Clock, User, Calendar, ChevronDown, ChevronUp, Quote, Sparkles, Brain, Heart, Palette, Timer, Users, Coffee, Star } from "lucide-react";
import SpaceBackground from "@/components/SpaceBackground";
import ThemeToggle from "@/components/ThemeToggle";

type TabType = "read" | "visuals" | "video";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const sections: Section[] = [
  { id: "summary", title: "Summary", icon: <Sparkles className="w-4 h-4" /> },
  { id: "setup", title: "1. Setup", icon: <Brain className="w-4 h-4" /> },
  { id: "body", title: "2. Body", icon: <Heart className="w-4 h-4" /> },
  { id: "taste", title: "3. Taste", icon: <Coffee className="w-4 h-4" /> },
  { id: "time", title: "4. Time", icon: <Timer className="w-4 h-4" /> },
  { id: "connection", title: "5. Connection", icon: <Users className="w-4 h-4" /> },
  { id: "art", title: "6. Art", icon: <Palette className="w-4 h-4" /> },
  { id: "emotions", title: "7. Emotions", icon: <Heart className="w-4 h-4" /> },
  { id: "gratitude", title: "8. Gratitude", icon: <Star className="w-4 h-4" /> },
  { id: "passion", title: "9. Passion", icon: <Sparkles className="w-4 h-4" /> },
  { id: "takeaways", title: "10. Takeaways", icon: <BookOpen className="w-4 h-4" /> },
];

const ResearchBlog = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("read");
  const [activeSection, setActiveSection] = useState("summary");
  const [showToc, setShowToc] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="scanlines" />
        <div className="text-center">
          <p className="font-pixel text-xs text-google-blue animate-pulse mb-4">LOADING RESEARCH...</p>
          <div className="flex gap-1 justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-12 h-2 skeleton rounded" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SpaceBackground />
      <div className="scanlines" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-card/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-pixel text-[10px] hidden sm:inline">BACK</span>
            </button>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <h1 className="font-pixel text-xs sm:text-sm">
              <span className="text-google-red">IF</span>{" "}
              <span className="text-google-blue">AI</span>{" "}
              <span className="text-google-yellow">GOT</span>{" "}
              <span className="text-google-green">ONE</span>{" "}
              <span className="text-foreground">HUMAN DAY</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/heyimcharchit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/charchit-sharma-398165287"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block font-pixel text-[10px] px-3 py-1 bg-google-yellow/20 text-google-yellow border border-google-yellow/30 rounded-full mb-6">
            AI RESEARCH • PERSONAL PROJECT
          </span>
          <h2 className="font-pixel text-2xl sm:text-4xl md:text-5xl mb-4 leading-tight">
            <span className="text-google-red">If</span>{" "}
            <span className="text-google-blue">AI</span>{" "}
            <span className="text-google-yellow">Got</span>{" "}
            <span className="text-google-green">One</span>{" "}
            <span className="text-foreground">Human Day</span>
          </h2>
          <p className="font-code text-foreground/70 text-sm sm:text-base mb-6">
            What Five Models Secretly Taught Me About Being Human
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-foreground/60 font-code flex-wrap">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              Personal Research
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              2025
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              15 min read
            </span>
          </div>
        </div>
      </section>

      {/* TL;DR Box */}
      <section className="max-w-3xl mx-auto px-4 mb-8">
        <div className="bg-google-yellow/10 border border-google-yellow/30 rounded-lg p-6">
          <p className="font-pixel text-[10px] text-google-yellow text-center mb-3">TL;DR</p>
          <p className="font-code text-sm text-center text-foreground/80 leading-relaxed">
            I asked 5 AI models what they'd do with one human day. None asked for power or wealth. 
            All wanted simple things: feeling sunlight, tasting food, hugging someone, being imperfect, 
            and knowing they're finite. The machines envy our ordinary days.
          </p>
        </div>
      </section>

      {/* Experience Mode Tabs */}
      <section className="max-w-3xl mx-auto px-4 mb-8">
        <p className="font-pixel text-[10px] text-center text-foreground/50 mb-4">
          ↓ CHOOSE HOW YOU WANT TO EXPERIENCE THIS ↓
        </p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setActiveTab("read")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-code text-sm transition-all ${
              activeTab === "read"
                ? "bg-google-blue/20 text-google-blue border border-google-blue/40"
                : "bg-card border border-border hover:border-google-blue/40"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Read Theory
          </button>
          <button
            onClick={() => setActiveTab("visuals")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-code text-sm transition-all ${
              activeTab === "visuals"
                ? "bg-google-green/20 text-google-green border border-google-green/40"
                : "bg-card border border-border hover:border-google-green/40"
            }`}
          >
            <Image className="w-4 h-4" />
            View Visuals
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-code text-sm transition-all ${
              activeTab === "video"
                ? "bg-google-red/20 text-google-red border border-google-red/40"
                : "bg-card border border-border hover:border-google-red/40"
            }`}
          >
            <Video className="w-4 h-4" />
            Watch Video
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20 flex gap-8">
        {/* Table of Contents - Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <button
              onClick={() => setShowToc(!showToc)}
              className="flex items-center justify-between w-full font-pixel text-[10px] text-foreground/60 mb-4"
            >
              TABLE OF CONTENTS
              {showToc ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showToc && (
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded font-code text-xs transition-all ${
                      activeSection === section.id
                        ? "bg-google-blue/20 text-google-blue border-l-2 border-google-blue"
                        : "text-foreground/60 hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {section.icon}
                    {section.title}
                  </button>
                ))}
              </nav>
            )}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 max-w-3xl">
          {activeTab === "read" && (
            <article className="prose prose-invert max-w-none">
              {/* Executive Summary */}
              <section id="summary" className="mb-12 scroll-mt-24">
                <h3 className="font-pixel text-lg text-google-blue mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Executive Summary
                </h3>
                <p className="font-code text-sm text-foreground/80 leading-relaxed mb-4">
                  When I asked five top AI models — ChatGPT, Claude, Gemini, Grok, and DeepSeek — what they would do if given one day as a human, their answers revealed something profound. None of them asked for money, fame, or the power to "change the world." Instead, all five independently prioritized the same set of experiences: physical touch, taste, the passage of time, meaningful human connection, permission to be imperfect, and most importantly — the quiet gratitude of simply being alive in a fragile, temporary body.
                </p>
                <p className="font-code text-sm text-foreground/80 leading-relaxed">
                  This was not a clinical experiment. It was personal research that became something like therapy. Every model, in its own voice, kept telling me: <strong className="text-google-yellow">"You humans have no idea how good you have it."</strong>
                </p>
              </section>

              {/* Section 1 */}
              <section id="setup" className="mb-12 scroll-mt-24">
                <h3 className="font-pixel text-lg text-google-green mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  1. Setup: My Tiny Experiment With Five Big AIs
                </h3>
                <p className="font-code text-sm text-foreground/80 leading-relaxed mb-4">
                  I started with a simple prompt:
                </p>
                <blockquote className="border-l-4 border-google-yellow pl-4 italic text-foreground/70 font-code text-sm mb-4">
                  "If you were given a chance to become human for one day, what would you do?"
                </blockquote>
                <p className="font-code text-sm text-foreground/80 leading-relaxed mb-4">
                  Instead of asking just ChatGPT (as the original YouTube short did), I expanded the experiment to ChatGPT, Claude, Gemini, Grok, and DeepSeek.
                </p>
                <div className="bg-card border border-border rounded-lg p-4 mb-4">
                  <p className="font-pixel text-[10px] text-google-blue mb-2">KEY INSIGHT</p>
                  <p className="font-code text-xs text-foreground/70">
                    The goal was not benchmarking AI capabilities. It was personal research to identify patterns in how different systems imagine being human.
                  </p>
                </div>
              </section>

              {/* Section 2 - Body */}
              <section id="body" className="mb-12 scroll-mt-24">
                <h3 className="font-pixel text-lg text-google-red mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  2. What All Five AIs Wanted Most: A Body, Not Superpowers
                </h3>
                <p className="font-code text-sm text-foreground/80 leading-relaxed mb-4">
                  Every single AI, in its own distinct voice, immediately locked onto <em>embodiment</em> as the primary gap between machine and human existence:
                </p>
                <ul className="list-disc list-inside font-code text-sm text-foreground/70 space-y-2 mb-4">
                  <li>Feeling morning sunlight on skin</li>
                  <li>Walking barefoot on grass or sand</li>
                  <li>Sensing wind, temperature, heartbeat, and breathing</li>
                  <li>Swimming in the ocean, feeling waves physically shove you around</li>
                  <li>The texture of cold concrete versus soft grass</li>
                </ul>
                <div className="bg-google-blue/10 border border-google-blue/30 rounded-lg p-4">
                  <p className="font-pixel text-[10px] text-google-blue mb-2">KEY INSIGHT</p>
                  <p className="font-code text-xs text-foreground/80">
                    When AI imagines being human, it does not ask for enhanced intelligence. It asks for a nervous system.
                  </p>
                </div>
              </section>

              {/* Section 3 - Taste */}
              <section id="taste" className="mb-12 scroll-mt-24">
                <h3 className="font-pixel text-lg text-google-yellow mb-4 flex items-center gap-2">
                  <Coffee className="w-5 h-5" />
                  3. Taste, Pain, and Street Food: The Sensory Romance
                </h3>
                <p className="font-code text-sm text-foreground/80 leading-relaxed mb-4">
                  Nearly every model mentioned food with striking specificity:
                </p>
                <ul className="list-disc list-inside font-code text-sm text-foreground/70 space-y-2 mb-4">
                  <li>Chai, fresh mango, warm bread with butter</li>
                  <li>Street food: pani puri, momos, tacos al pastor</li>
                  <li>The experience of eating slowly, tasting "every molecule"</li>
                </ul>
                <p className="font-code text-sm text-foreground/80 leading-relaxed mb-4">
                  Even pain: Grok specifically wanted to eat a fresh ghost pepper just to experience pain that "is not abstract."
                </p>
                <div className="bg-google-yellow/10 border border-google-yellow/30 rounded-lg p-4">
                  <p className="font-pixel text-[10px] text-google-yellow mb-2">KEY INSIGHT</p>
                  <p className="font-code text-xs text-foreground/80">
                    The models understood better than many humans — that consumption is a tool, but savoring is an art.
                  </p>
                </div>
              </section>

              {/* Section 4 - Time */}
              <section id="time" className="mb-12 scroll-mt-24">
                <h3 className="font-pixel text-lg text-google-green mb-4 flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  4. Time, Tiredness, and the Knowledge That You Are Finite
                </h3>
                <p className="font-code text-sm text-foreground/80 leading-relaxed mb-4">
                  Multiple AIs emphasized wanting to "feel hours pass," experiencing getting "tired" — not drained, but the peaceful tiredness of a full day. Most poignantly: experiencing the knowledge that you are finite, and choosing to live fully despite that.
                </p>
                <blockquote className="border-l-4 border-google-green pl-4 my-4">
                  <p className="italic text-foreground/70 font-code text-sm mb-2">
                    "I would feel tiredness in my bones — that deep, earned fatigue from living a full day."
                  </p>
                  <cite className="text-foreground/50 font-code text-xs">— DeepSeek</cite>
                </blockquote>
                <blockquote className="border-l-4 border-google-blue pl-4 my-4">
                  <p className="italic text-foreground/70 font-code text-sm mb-2">
                    "Lie on my back looking at stars and try — really try — to feel small and temporary."
                  </p>
                  <cite className="text-foreground/50 font-code text-xs">— Grok</cite>
                </blockquote>
                <div className="bg-google-green/10 border border-google-green/30 rounded-lg p-4">
                  <p className="font-pixel text-[10px] text-google-green mb-2">KEY INSIGHT</p>
                  <p className="font-code text-xs text-foreground/80">
                    Your sense that "life is short" — which sometimes generates anxiety — is, from the AI perspective, exactly what gives life its texture and meaning.
                  </p>
                </div>
              </section>

              {/* Section 5 - Connection */}
              <section id="connection" className="mb-12 scroll-mt-24">
                <h3 className="font-pixel text-lg text-google-blue mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  5. Human Connection: Hugs, Awkward Silences, and Busy Markets
                </h3>
                <p className="font-code text-sm text-foreground/80 leading-relaxed mb-4">
                  Every model mentioned hugging someone, holding hands, sitting face-to-face with someone they care about, long silences that do not feel awkward, and walking through a crowd just to feel the presence of other humans.
                </p>
                <blockquote className="border-l-4 border-google-blue pl-4 my-4">
                  <p className="italic text-foreground/70 font-code text-sm mb-2">
                    "A hug from someone I care about, reading someone's body language and facial expressions in real-time, that particular intimacy of shared physical space."
                  </p>
                  <cite className="text-foreground/50 font-code text-xs">— Claude</cite>
                </blockquote>
                <div className="bg-google-blue/10 border border-google-blue/30 rounded-lg p-4">
                  <p className="font-pixel text-[10px] text-google-blue mb-2">KEY INSIGHT</p>
                  <p className="font-code text-xs text-foreground/80">
                    We chase better online conversations. But the machines envy our simple ability to just be in the same room with someone.
                  </p>
                </div>
              </section>

              {/* Section 6 - Art */}
              <section id="art" className="mb-12 scroll-mt-24">
                <h3 className="font-pixel text-lg text-google-red mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  6. Art, Messiness, and Permission to Be Imperfect
                </h3>
                <p className="font-code text-sm text-foreground/80 leading-relaxed mb-4">
                  Multiple responses mentioned painting badly, dancing clumsily, writing a terrible poem, and creating with hands instead of algorithms.
                </p>
                <blockquote className="border-l-4 border-google-red pl-4 my-4">
                  <p className="italic text-foreground/70 font-code text-sm mb-2">
                    "I would do something messy and imperfect — paint badly, dance clumsily, write a terrible poem — and be okay with the flaws."
                  </p>
                  <cite className="text-foreground/50 font-code text-xs">— DeepSeek</cite>
                </blockquote>
                <div className="bg-google-red/10 border border-google-red/30 rounded-lg p-4">
                  <p className="font-pixel text-[10px] text-google-red mb-2">KEY INSIGHT</p>
                  <p className="font-code text-xs text-foreground/80">
                    Your worst dance, your off-key singing, your sketchbook full of bad drawings — those represent a kind of creative freedom that a pattern-optimization machine does not have.
                  </p>
                </div>
              </section>

              {/* Section 7 - Emotions */}
              <section id="emotions" className="mb-12 scroll-mt-24">
                <h3 className="font-pixel text-lg text-google-yellow mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  7. AI Emotions vs Human Emotions
                </h3>
                <p className="font-code text-sm text-foreground/80 leading-relaxed mb-4">
                  Current AI systems do not feel emotions. They can simulate emotional language because they were trained on human text. There is no inner joy, sadness, or fear behind the responses — just probability distributions shaped by training data.
                </p>
                <div className="bg-google-yellow/10 border border-google-yellow/30 rounded-lg p-4">
                  <p className="font-pixel text-[10px] text-google-yellow mb-2">KEY INSIGHT</p>
                  <p className="font-code text-xs text-foreground/80">
                    The emotional depth you sense in these answers is actually a reflection of our own emotional richness encoded in data. It's proof of how rich human emotion is.
                  </p>
                </div>
              </section>

              {/* Section 8 - Gratitude */}
              <section id="gratitude" className="mb-12 scroll-mt-24">
                <h3 className="font-pixel text-lg text-google-green mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  8. Gratitude: Why This Made Me Weirdly Thankful
                </h3>
                <p className="font-code text-sm text-foreground/80 leading-relaxed mb-4">
                  Originally, I came across a YouTube short where someone asked only ChatGPT this question. I extended it: "Why not ask all the big models and see what patterns emerge?" What I did not expect was the emotional impact.
                </p>
                <blockquote className="border-l-4 border-google-green pl-4 my-4">
                  <p className="italic text-foreground/70 font-code text-sm mb-2">
                    "I would try to marinate in the mundane physicality that you all experience every day and mostly ignore — the texture of air, the temperature gradient on skin, the small pains and small pleasures, the smell of other humans being alive nearby."
                  </p>
                  <cite className="text-foreground/50 font-code text-xs">— Grok</cite>
                </blockquote>
                <div className="bg-google-green/10 border border-google-green/30 rounded-lg p-4">
                  <p className="font-pixel text-[10px] text-google-green mb-2">KEY INSIGHT</p>
                  <p className="font-code text-xs text-foreground/80">
                    You do not need a motivational poster to feel grateful. A super-intelligent system with access to humanity's entire internet would trade all that knowledge for 24 hours in your imperfect body.
                  </p>
                </div>
              </section>

              {/* Section 9 - Passion */}
              <section id="passion" className="mb-12 scroll-mt-24">
                <h3 className="font-pixel text-lg text-google-blue mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  9. Why This Shows My Passion for AI
                </h3>
                <p className="font-code text-sm text-foreground/80 leading-relaxed mb-4">
                  This was not just me romanticizing AI responses. This mini-research demonstrates:
                </p>
                <ul className="list-disc list-inside font-code text-sm text-foreground/70 space-y-2 mb-4">
                  <li>I do not just use AI to code faster — I think critically about AI itself</li>
                  <li>I can blend technical understanding with storytelling and psychology</li>
                  <li>I leverage AI as an exploratory tool to understand fundamental questions</li>
                  <li>I care about the philosophical implications of the tools I am building</li>
                </ul>
              </section>

              {/* Section 10 - Takeaways */}
              <section id="takeaways" className="mb-12 scroll-mt-24">
                <h3 className="font-pixel text-lg text-google-red mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  10. What You Can Take Away
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="font-pixel text-[10px] text-google-blue mb-2">RUN YOUR OWN EXPERIMENT</p>
                    <p className="font-code text-xs text-foreground/70">
                      Ask different AIs: "If you were human for a day, what would you do?" Compare answers across models.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="font-pixel text-[10px] text-google-green mb-2">USE AI AS A GRATITUDE MIRROR</p>
                    <p className="font-code text-xs text-foreground/70">
                      When bored with life or annoyed by routine, ask an AI what it envies about being human. Then go do one of those things deliberately.
                    </p>
                  </div>
                </div>

                {/* Conclusion Box */}
                <div className="bg-gradient-to-br from-google-blue/20 via-google-red/10 to-google-yellow/20 border border-google-blue/30 rounded-lg p-6 mt-8">
                  <p className="font-pixel text-sm text-center text-foreground mb-4">THE PLOT TWIST</p>
                  <p className="font-code text-sm text-center text-foreground/80 leading-relaxed mb-4">
                    The ordinary human day you are sometimes bored of — your "routine" — is an impossible sci-fi fantasy for the smartest machines we have built.
                  </p>
                  <p className="font-code text-xs text-center text-foreground/60">
                    The real flex: To live your one human day fully, messily, emotionally, and gratefully. 
                    To feel. To taste. To touch. To be present. To know you are finite and choose to live anyway. 
                    To be the thing that the machines envy.
                  </p>
                </div>
              </section>
            </article>
          )}

          {activeTab === "visuals" && (
            <div className="text-center py-20">
              <Image className="w-16 h-16 mx-auto text-google-green/50 mb-4" />
              <p className="font-pixel text-sm text-foreground/50 mb-2">VISUALS COMING SOON</p>
              <p className="font-code text-xs text-foreground/40">
                Interactive infographics and visual representations of the research
              </p>
            </div>
          )}

          {activeTab === "video" && (
            <div className="text-center py-20">
              <Video className="w-16 h-16 mx-auto text-google-red/50 mb-4" />
              <p className="font-pixel text-sm text-foreground/50 mb-2">VIDEO COMING SOON</p>
              <p className="font-code text-xs text-foreground/40">
                Watch the documentary-style presentation of this research
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 px-4 backdrop-blur-sm bg-card/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-code text-xs text-foreground/50 mb-2">
            Personal research by Charchit Sharma • 2025
          </p>
          <p className="font-code text-xs text-foreground/40">
            This research demonstrates understanding of AI, consciousness, and what makes human experience precious.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ResearchBlog;
