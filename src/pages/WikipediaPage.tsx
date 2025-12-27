import { useNavigate } from "react-router-dom";
import { Search, Menu, Globe, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import charchitPortrait from "@/assets/charchit-portrait.png";
import charchitEvent from "@/assets/charchit-event.jpg";

const WikipediaPage = () => {
  const navigate = useNavigate();

  const contents = [
    { id: "early-life", label: "Early life and education", level: 1 },
    { id: "academic", label: "Academic pursuits", level: 2 },
    { id: "iit-madras", label: "IIT Madras", level: 2 },
    { id: "harvard-alp", label: "Harvard ALP", level: 2 },
    { id: "career", label: "Career", level: 1 },
    { id: "entrepreneurship", label: "Entrepreneurship", level: 2 },
    { id: "technical-work", label: "Technical work", level: 2 },
    { id: "interests", label: "Personal interests", level: 1 },
    { id: "philosophy", label: "Philosophy", level: 1 },
    { id: "see-also", label: "See also", level: 1 },
    { id: "references", label: "References", level: 1 },
    { id: "external-links", label: "External links", level: 1 },
  ];

  return (
    <div className="min-h-screen bg-[#101418] text-[#a8afb8]">
      {/* Wikipedia Header */}
      <header className="bg-[#101418] border-b border-[#2e3338] sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu className="w-5 h-5 text-[#72777d] cursor-pointer" />
            <div className="flex items-center gap-2">
              <Globe className="w-8 h-8 text-[#a8afb8]" />
              <div>
                <span className="text-xl font-serif text-white tracking-tight">WIKIPEDIA</span>
                <p className="text-[10px] text-[#72777d]">The Free Encyclopedia</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#72777d]" />
              <input
                type="text"
                placeholder="Search Wikipedia"
                className="w-full bg-[#27292d] border border-[#3c4043] rounded px-10 py-1.5 text-sm text-[#a8afb8] placeholder:text-[#72777d] focus:outline-none focus:border-[#3584e4]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-[#6b9eff]">
            <button onClick={() => navigate("/")}>← Back to Search</button>
            <span className="text-[#72777d]">|</span>
            <span className="cursor-pointer hover:underline">Create account</span>
            <span className="cursor-pointer hover:underline">Log in</span>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto flex">
        {/* Left Sidebar - Contents */}
        <aside className="w-56 flex-shrink-0 border-r border-[#2e3338] p-4 hidden lg:block sticky top-14 h-[calc(100vh-56px)] overflow-y-auto">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Contents</span>
              <button className="text-xs text-[#6b9eff] border border-[#3c4043] px-2 py-0.5 rounded">hide</button>
            </div>
          </div>
          <nav className="space-y-1 text-sm">
            <a href="#top" className="block text-[#6b9eff] hover:underline">(Top)</a>
            {contents.map((item, index) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className={`block text-[#6b9eff] hover:underline ${item.level === 2 ? 'pl-4' : ''}`}
              >
                {item.level === 1 && <ChevronRight className="w-3 h-3 inline mr-1" />}
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-4 min-w-0">
          {/* Article Header */}
          <div className="border-b border-[#2e3338] pb-2 mb-4">
            <h1 className="text-3xl font-serif text-white mb-1">Charchit Sharma</h1>
            <div className="flex items-center gap-4 text-xs text-[#72777d]">
              <span className="text-[#6b9eff] border-b-2 border-[#6b9eff] pb-1">Article</span>
              <span className="hover:text-[#6b9eff] cursor-pointer">Talk</span>
              <div className="flex-1" />
              <span className="hover:text-[#6b9eff] cursor-pointer">Read</span>
              <span className="hover:text-[#6b9eff] cursor-pointer">View source</span>
              <span className="hover:text-[#6b9eff] cursor-pointer">View history</span>
              <span className="hover:text-[#6b9eff] cursor-pointer">Tools</span>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Article Body */}
            <article className="flex-1 text-[15px] leading-relaxed">
              <p className="text-xs text-[#72777d] italic mb-4">
                From Wikipedia, the free encyclopedia
              </p>

              {/* Infobox - Right Side */}
              <div className="float-right ml-6 mb-4 w-72 bg-[#1f2326] border border-[#3c4043] text-sm">
                <div className="bg-[#2a2d31] px-3 py-2 text-center">
                  <h3 className="text-white font-medium">Charchit Sharma</h3>
                </div>
                <div className="p-2">
                  <img 
                    src={charchitPortrait} 
                    alt="Charchit Sharma" 
                    className="w-full aspect-[4/5] object-cover mb-2"
                  />
                  <p className="text-center text-xs text-[#72777d] mb-3">Sharma in 2024</p>
                </div>
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-t border-[#3c4043]">
                      <th className="text-left p-2 text-[#a8afb8] font-normal align-top w-24">Born</th>
                      <td className="p-2">
                        <span className="text-[#6b9eff]">January 18, 2004</span>
                        <span className="text-[#a8afb8]"> (age 21)</span>
                        <br />
                        <span className="text-[#a8afb8]">Delhi, India</span>
                      </td>
                    </tr>
                    <tr className="border-t border-[#3c4043]">
                      <th className="text-left p-2 text-[#a8afb8] font-normal align-top">Nationality</th>
                      <td className="p-2 text-[#a8afb8]">Indian</td>
                    </tr>
                    <tr className="border-t border-[#3c4043]">
                      <th className="text-left p-2 text-[#a8afb8] font-normal align-top">Education</th>
                      <td className="p-2">
                        <span className="text-[#6b9eff]">IIT Madras</span>
                        <span className="text-[#a8afb8]"> (BS)</span>
                      </td>
                    </tr>
                    <tr className="border-t border-[#3c4043]">
                      <th className="text-left p-2 text-[#a8afb8] font-normal align-top">Alma mater</th>
                      <td className="p-2 text-[#6b9eff]">
                        Harvard ALP (Scholar)
                      </td>
                    </tr>
                    <tr className="border-t border-[#3c4043]">
                      <th className="text-left p-2 text-[#a8afb8] font-normal align-top">Occupation</th>
                      <td className="p-2 text-[#a8afb8]">
                        Student, Developer, Entrepreneur
                      </td>
                    </tr>
                    <tr className="border-t border-[#3c4043]">
                      <th className="text-left p-2 text-[#a8afb8] font-normal align-top">Known for</th>
                      <td className="p-2 text-[#a8afb8]">
                        Data Science<br />
                        Full-stack Development<br />
                        AI-augmented workflows
                      </td>
                    </tr>
                    <tr className="border-t border-[#3c4043]">
                      <th className="text-left p-2 text-[#a8afb8] font-normal align-top">Website</th>
                      <td className="p-2">
                        <span className="text-[#6b9eff]">instagram.com/heyimcharchit</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Lead Paragraph */}
              <p className="mb-4">
                <strong className="font-semibold text-white">Charchit Sharma</strong> (born January 18, 2004) is an Indian student, 
                software developer, and aspiring entrepreneur. He is currently pursuing a <span className="text-[#6b9eff]">Bachelor of Science in Data Science and Applications</span> at 
                the <span className="text-[#6b9eff]">Indian Institute of Technology, Madras</span> (IIT Madras), expected to graduate in 2028. 
                Sharma is also a <span className="text-[#6b9eff]">Harvard ALP Scholar</span> (2025 cohort), selected for the prestigious 
                Advanced Learning Program.
              </p>

              <p className="mb-4">
                Sharma is characterized by what has been described as a "Builder-Architect" duality—possessing the technical capability 
                to engineer full-stack solutions while simultaneously exhibiting the strategic foresight of a product manager.<sup className="text-[#6b9eff]">[1]</sup> 
                He leverages AI and automation tools extensively in his development workflow, earning the designation of a "Cyborg Developer."
              </p>

              <p className="mb-6">
                Beyond academics, Sharma has served as a Campus Ambassador for <span className="text-[#6b9eff]">E-Summit '26 at IIT Roorkee</span>, 
                demonstrating leadership capabilities and a desire to network across India's premier engineering institutions.
              </p>

              {/* Early Life Section */}
              <section id="early-life" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  Early life and education
                </h2>
                
                <p className="mb-4">
                  Charchit Sharma was born on January 18, 2004, in <span className="text-[#6b9eff]">Delhi, India</span>. He has a younger brother, 
                  born on October 12, 2021.<sup className="text-[#6b9eff]">[2]</sup> From an early age, Sharma exhibited a strong intellectual 
                  curiosity and what he describes as a "hunger to learn" (<i>sikhne ki bhookh</i>).
                </p>

                <h3 id="academic" className="text-xl font-serif text-white mt-4 mb-2">Academic pursuits</h3>
                
                <p className="mb-4">
                  Sharma's academic approach is characterized by high-efficiency learning protocols. He systematically avoids traditional 
                  lecture formats, preferring Teaching Assistant (TA) recordings and live session archives. This methodology suggests a 
                  preference for applied knowledge over theoretical exposition—focusing on understanding "how to solve the problem" rather 
                  than just the underlying theory.<sup className="text-[#6b9eff]">[3]</sup>
                </p>

                <h3 id="iit-madras" className="text-xl font-serif text-white mt-4 mb-2">IIT Madras</h3>
                
                <p className="mb-4">
                  In 2024, Sharma enrolled in the BS in Data Science & Applications program at the <span className="text-[#6b9eff]">Indian Institute of Technology, Madras</span>. 
                  His coursework has included rigorous modules such as MAD1 (Mobile App Development) and DBMS (Database Management Systems). 
                  He is currently positioned at the Diploma/Degree level within the program.
                </p>

                <h3 id="harvard-alp" className="text-xl font-serif text-white mt-4 mb-2">Harvard ALP</h3>
                
                <p className="mb-4">
                  Sharma was selected as a <span className="text-[#6b9eff]">Harvard Advanced Learning Program (ALP) Scholar</span> for the 2025 cohort. 
                  The program, which selects outstanding students worldwide, has provided Sharma with additional credentials and exposure 
                  to advanced learning methodologies. His pursuit of external validations like Harvard ALP and Google for Education 
                  certifications indicates a strategic focus on acquiring "badges of institutional authority."
                </p>
              </section>

              {/* Career Section */}
              <section id="career" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  Career
                </h2>

                <div className="float-right ml-4 mb-2 w-48">
                  <img 
                    src={charchitEvent} 
                    alt="Charchit at an event" 
                    className="w-full aspect-square object-cover border border-[#3c4043]"
                  />
                  <p className="text-xs text-[#72777d] text-center mt-1">Sharma at a tech event</p>
                </div>

                <h3 id="entrepreneurship" className="text-xl font-serif text-white mt-4 mb-2">Entrepreneurship</h3>
                
                <p className="mb-4">
                  Sharma is currently in the ideation and pre-seed stage of a startup venture, tentatively branded as "AuraSync" 
                  (with the AI-generated concept "NexusFlow" as an alternative).<sup className="text-[#6b9eff]">[4]</sup> His explicit focus is on targeting 
                  US clients and high-end markets, eschewing local, low-ticket clientele.
                </p>

                <p className="mb-4">
                  His design philosophy demands a "Silicon Valley" aesthetic—minimalist, geometric logos with blue/purple gradients, 
                  and professional typography. As one analysis noted, he wants his brand to look "Series A funded before writing a 
                  single line of production code."<sup className="text-[#6b9eff]">[5]</sup>
                </p>

                <p className="mb-4">
                  Sharma's first internship was with a startup founded by a student from IIT Roorkee, providing early exposure 
                  to high-performance startup culture.
                </p>

                <h3 id="technical-work" className="text-xl font-serif text-white mt-4 mb-2">Technical work</h3>
                
                <p className="mb-4">
                  Sharma's technical profile extends beyond typical "Full Stack" to what has been termed "Product Stack"—learning 
                  tools not to master the language, but to build the product.<sup className="text-[#6b9eff]">[6]</sup>
                </p>

                <p className="mb-4">
                  <strong className="text-white">Frontend & Mobile:</strong> Proficient in <span className="text-[#6b9eff]">React.js</span> for web development 
                  and <span className="text-[#6b9eff]">Flutter</span> for mobile applications. He has successfully tested cross-platform deployment 
                  across desktop, web, and mobile platforms. Additionally, he has shown interest in <span className="text-[#6b9eff]">Three.js</span> for 
                  immersive 3D web experiences.
                </p>

                <p className="mb-4">
                  <strong className="text-white">Backend & Data:</strong> His backend preferences lean towards Python-based frameworks, having built 
                  architectures using <span className="text-[#6b9eff]">Flask</span>, <span className="text-[#6b9eff]">Jinja2</span>, and 
                  <span className="text-[#6b9eff]"> Flask-SQLAlchemy</span>. He demonstrates understanding of RESTful API design and database 
                  engineering, including SQL indexing (B+ Trees) and schema design using tools like <span className="text-[#6b9eff]">psycopg2</span>.
                </p>

                <p className="mb-4">
                  <strong className="text-white">Web3 & Blockchain:</strong> Sharma has expanded his scope into decentralized applications (DApps), 
                  exploring <span className="text-[#6b9eff]">Ethereum</span> and <span className="text-[#6b9eff]">Solidity</span>, with practical use cases 
                  such as insurance claim processing.
                </p>

                <p className="mb-4">
                  <strong className="text-white">AI-Augmented Workflow:</strong> Sharma operates as a "Cyborg Developer," extensively utilizing 
                  prompt engineering for LLMs, generative media tools like <span className="text-[#6b9eff]">Suno AI</span> for audio generation, and 
                  development environments including VS Code, Cursor AI, and Replit.
                </p>
              </section>

              {/* Personal Interests Section */}
              <section id="interests" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  Personal interests
                </h2>
                
                <p className="mb-4">
                  Sharma's aesthetic signature is characterized by "8-bit Retro New Gen" style, consistently applied to image generation 
                  requests, animations, and web design concepts.<sup className="text-[#6b9eff]">[7]</sup> This suggests nostalgia for the classic gaming 
                  era blended with modern design sensibilities.
                </p>

                <p className="mb-4">
                  His musical preferences are highly specific and functional, favoring chillwave, lo-fi, and 8-bit retro genres at 
                  65–70 BPM (heartbeat tempo) specifically for focus. He produces such tracks using AI tools like Suno AI, indicating 
                  a desire to control even his background environment.
                </p>

                <p className="mb-4">
                  In gaming, Sharma gravitates toward constructivist titles such as <span className="text-[#6b9eff]">Minecraft</span> and strategy games 
                  like <span className="text-[#6b9eff]">Slay the Spire</span> and <span className="text-[#6b9eff]">Vampire Survivors</span>—games focused on 
                  optimization and resource management, mirroring his real-life interest in algorithms and business efficiency.
                </p>

                <p className="mb-4">
                  He is also an avid consumer of <span className="text-[#6b9eff]">anime</span> content.
                </p>
              </section>

              {/* Philosophy Section */}
              <section id="philosophy" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  Philosophy
                </h2>
                
                <p className="mb-4">
                  Sharma has been described as an "Anxious Perfectionist"—exhibiting high-functioning anxiety where procrastination 
                  stems from fear that output won't match high internal standards. He uses deep research as a preparatory mechanism, 
                  sometimes to the point of "Preparation Paralysis."<sup className="text-[#6b9eff]">[8]</sup>
                </p>

                <blockquote className="border-l-4 border-[#3c4043] pl-4 my-4 italic text-[#a8afb8]">
                  "You are not broken. You are becoming. Trust the process. Your path will make sense when you look back."
                  <footer className="text-sm text-[#72777d] mt-1">— From personal analysis document</footer>
                </blockquote>

                <p className="mb-4">
                  His core strengths include curiosity, emotional intelligence, reflection, persistence, and a profound desire to grow. 
                  He approaches LinkedIn strategically, focusing on psychological hooks and storytelling to engage readers, specifically 
                  curating content for mentors and investors rather than peers.
                </p>

                <p className="mb-4">
                  Behaviorally, Sharma follows a nocturnal productivity cycle, engaging in late-night coding sessions. He employs the 
                  <span className="text-[#6b9eff]"> Pomodoro Technique</span> for structured time-boxing and is described as an obsessive note-taker 
                  who archives knowledge extensively.
                </p>
              </section>

              {/* See Also Section */}
              <section id="see-also" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  See also
                </h2>
                <ul className="list-disc list-inside text-[#6b9eff] space-y-1">
                  <li>Indian Institute of Technology Madras</li>
                  <li>Harvard University</li>
                  <li>Data Science</li>
                  <li>Full-stack development</li>
                  <li>Web3</li>
                </ul>
              </section>

              {/* References Section */}
              <section id="references" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  References
                </h2>
                <ol className="list-decimal list-inside text-sm space-y-2 text-[#a8afb8]">
                  <li><span className="text-[#6b9eff]">^</span> "Subject Profile: Charchit Sharma - Comprehensive Behavioral & Technical Thesis", December 2025</li>
                  <li><span className="text-[#6b9eff]">^</span> Personal documentation, family records</li>
                  <li><span className="text-[#6b9eff]">^</span> "The IITM Ecosystem - Learning Methodology Analysis", Thesis Document</li>
                  <li><span className="text-[#6b9eff]">^</span> "The AuraSync & NexusFlow Initiative", Startup Documentation</li>
                  <li><span className="text-[#6b9eff]">^</span> Design Philosophy Analysis, Pre-seed Stage Documentation</li>
                  <li><span className="text-[#6b9eff]">^</span> "Technical Architecture - The Builder's Stack", Thesis Chapter 2</li>
                  <li><span className="text-[#6b9eff]">^</span> "Cultural & Aesthetic DNA", Thesis Chapter 5</li>
                  <li><span className="text-[#6b9eff]">^</span> "Psychographics & Behavioral Analysis", Thesis Chapter 4</li>
                </ol>
              </section>

              {/* External Links Section */}
              <section id="external-links" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  External links
                </h2>
                <ul className="space-y-1">
                  <li>
                    <ExternalLink className="w-3 h-3 inline mr-1" />
                    <a href="https://instagram.com/heyimcharchit" target="_blank" rel="noopener noreferrer" className="text-[#6b9eff] hover:underline">
                      Charchit Sharma on Instagram
                    </a>
                  </li>
                  <li>
                    <ExternalLink className="w-3 h-3 inline mr-1" />
                    <a href="https://linkedin.com/in/charchitsharma" target="_blank" rel="noopener noreferrer" className="text-[#6b9eff] hover:underline">
                      Charchit Sharma on LinkedIn
                    </a>
                  </li>
                  <li>
                    <ExternalLink className="w-3 h-3 inline mr-1" />
                    <a href="https://github.com/charchit" target="_blank" rel="noopener noreferrer" className="text-[#6b9eff] hover:underline">
                      Charchit Sharma on GitHub
                    </a>
                  </li>
                </ul>
              </section>

              {/* Categories */}
              <div className="border-t border-[#3c4043] pt-4 mt-8">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-[#72777d]">Categories:</span>
                  <span className="text-[#6b9eff] hover:underline cursor-pointer">2004 births</span>
                  <span className="text-[#72777d]">|</span>
                  <span className="text-[#6b9eff] hover:underline cursor-pointer">Living people</span>
                  <span className="text-[#72777d]">|</span>
                  <span className="text-[#6b9eff] hover:underline cursor-pointer">IIT Madras alumni</span>
                  <span className="text-[#72777d]">|</span>
                  <span className="text-[#6b9eff] hover:underline cursor-pointer">Indian software developers</span>
                  <span className="text-[#72777d]">|</span>
                  <span className="text-[#6b9eff] hover:underline cursor-pointer">People from Delhi</span>
                  <span className="text-[#72777d]">|</span>
                  <span className="text-[#6b9eff] hover:underline cursor-pointer">Harvard University people</span>
                </div>
              </div>
            </article>
          </div>
        </main>

        {/* Right Sidebar - Appearance */}
        <aside className="w-48 flex-shrink-0 border-l border-[#2e3338] p-4 hidden xl:block sticky top-14 h-[calc(100vh-56px)]">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-white">Appearance</span>
              <button className="text-xs text-[#6b9eff] border border-[#3c4043] px-2 py-0.5 rounded">hide</button>
            </div>
            
            <div className="space-y-4 text-xs text-[#a8afb8]">
              <div>
                <p className="mb-2">Text</p>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-1 border border-[#3c4043] rounded">Small</span>
                  <span className="text-xs px-2 py-1 bg-[#3584e4] text-white rounded">Standard</span>
                  <span className="text-sm px-2 py-1 border border-[#3c4043] rounded">Large</span>
                </div>
              </div>
              
              <div>
                <p className="mb-2">Width</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-[#3584e4] text-white rounded text-xs">Standard</span>
                  <span className="px-2 py-1 border border-[#3c4043] rounded text-xs">Wide</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-[#101418] border-t border-[#2e3338] mt-8 py-6">
        <div className="max-w-[1600px] mx-auto px-4 text-center text-xs text-[#72777d]">
          <p className="mb-2">This page was last edited on December 27, 2025</p>
          <p>Text is available under the Creative Commons Attribution-ShareAlike 4.0 License</p>
        </div>
      </footer>
    </div>
  );
};

export default WikipediaPage;
