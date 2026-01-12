import { useNavigate } from "react-router-dom";
import { Search, Menu, Globe, ChevronRight, ExternalLink } from "lucide-react";
import charchitBlackSuit from "@/assets/charchit-black-suit.jpg";
import charchitHoodie from "@/assets/charchit-hoodie.jpg";
const WikipediaPage = () => {
  const navigate = useNavigate();
  const contents = [{
    id: "early-life",
    label: "Early life",
    level: 1
  }, {
    id: "the-hunger",
    label: "The hunger to learn",
    level: 2
  }, {
    id: "education",
    label: "Education",
    level: 1
  }, {
    id: "iit-madras",
    label: "IIT Madras",
    level: 2
  }, {
    id: "harvard-alp",
    label: "Aspire Leadership Program",
    level: 2
  }, {
    id: "journey",
    label: "The journey",
    level: 1
  }, {
    id: "struggles",
    label: "Struggles and growth",
    level: 2
  }, {
    id: "builder",
    label: "The builder within",
    level: 2
  }, {
    id: "entrepreneurship",
    label: "Entrepreneurship",
    level: 1
  }, {
    id: "interests",
    label: "Personal life",
    level: 1
  }, {
    id: "philosophy",
    label: "Philosophy",
    level: 1
  }, {
    id: "see-also",
    label: "See also",
    level: 1
  }, {
    id: "references",
    label: "References",
    level: 1
  }, {
    id: "external-links",
    label: "External links",
    level: 1
  }];
  const socialLinks = [{
    name: "GitHub",
    url: "https://github.com/charchitheree",
    icon: "github"
  }, {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/charchit-sharma-398165287/",
    icon: "linkedin"
  }, {
    name: "Instagram",
    url: "https://www.instagram.com/heyimcharchit/",
    icon: "instagram"
  }, {
    name: "X (Twitter)",
    url: "https://x.com/heyimcharchit",
    icon: "twitter"
  }];
  return <div className="min-h-screen bg-[#101418] text-[#a8afb8]">
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
              <input type="text" placeholder="Search Wikipedia" className="w-full bg-[#27292d] border border-[#3c4043] rounded px-10 py-1.5 text-sm text-[#a8afb8] placeholder:text-[#72777d] focus:outline-none focus:border-[#3584e4]" />
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-[#6b9eff]">
            <button onClick={() => navigate("/")}>← Back to Search</button>
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
            {contents.map(item => <a key={item.id} href={`#${item.id}`} className={`block text-[#6b9eff] hover:underline ${item.level === 2 ? 'pl-4' : ''}`}>
                {item.level === 1 && <ChevronRight className="w-3 h-3 inline mr-1" />}
                {item.label}
              </a>)}
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
                  <img src={charchitBlackSuit} alt="Charchit Sharma - Indian student, developer and entrepreneur" className="w-full aspect-[4/5] object-cover mb-2" />
                  <p className="text-center text-xs text-[#72777d] mb-3">Sharma in 2024</p>
                </div>
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-t border-[#3c4043]">
                      <th className="text-left p-2 text-[#a8afb8] font-normal align-top w-24">Born</th>
                      <td className="p-2">
                        <span className="text-[#6b9eff]">November 8, 2004</span>
                        <span className="text-[#a8afb8]"> (age 21)</span>
                        <br />
                        <span className="text-[#6b9eff]">Roorkee</span>
                        <span className="text-[#a8afb8]">, Uttarakhand, India</span>
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
                        <span className="text-[#a8afb8]"> (BS Data Science, pursuing)</span>
                      </td>
                    </tr>
                    <tr className="border-t border-[#3c4043]">
                      <th className="text-left p-2 text-[#a8afb8] font-normal align-top">Notable programs</th>
                      <td className="p-2 text-[#6b9eff]">
                        Aspire Leadership Program (2025)
                        <br />
                        <span className="text-[#72777d] text-[10px]">Harvard Faculty-backed</span>
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
                      <th className="text-left p-2 text-[#a8afb8] font-normal align-top">Social</th>
                      <td className="p-2 space-y-1">
                        {socialLinks.map(link => <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-[#6b9eff] hover:underline text-[11px]">
                            {link.name}
                          </a>)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Lead Paragraph - Humanized */}
              <p className="mb-4">
                <strong className="font-semibold text-white">Charchit Sharma</strong> (born November 8, 2004) is an Indian student, 
                software developer, and aspiring entrepreneur from <span className="text-[#6b9eff]">Roorkee, Uttarakhand</span>. 
                He is not your typical 21-year-old. While most people his age are figuring out what they want to do with their lives, 
                Charchit has already embarked on a journey that blends technology, creativity, and an insatiable curiosity that refuses to be contained.
              </p>

              <p className="mb-4">
                Currently pursuing a <span className="text-[#6b9eff]">Bachelor of Science in Data Science and Applications</span> at 
                the <span className="text-[#6b9eff]">Indian Institute of Technology, Madras</span>, Charchit represents a new generation 
                of builders who don't just consume technology but actively shape it. He is also a scholar of the 
                <span className="text-[#6b9eff]"> Aspire Leadership Program</span> (2025 cohort), a prestigious initiative backed by 
                Harvard University faculty that identifies and nurtures exceptional young leaders from around the world.
              </p>

              <p className="mb-6">
                But behind every achievement lies a story. And Charchit's story isn't about smooth sailing. It's about stumbling, 
                learning, and getting back up. It's about a boy from Roorkee who dared to dream bigger than his circumstances allowed.
              </p>

              {/* Early Life Section */}
              <section id="early-life" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  Early life
                </h2>
                
                <p className="mb-4">
                  Charchit Sharma was born on November 8, 2004, in <span className="text-[#6b9eff]">Roorkee</span>, a historic city 
                  in <span className="text-[#6b9eff]">Uttarakhand, India</span>. Roorkee is home to IIT Roorkee, one of India's oldest 
                  and most prestigious engineering institutions, founded in 1847. Growing up in this academic atmosphere, surrounded 
                  by the foothills of the Himalayas and the legacy of engineering excellence, shaped his aspirations from an early age.
                  While other kids his age were happy with answers, Charchit always asked "why?" and then "what if?"
                </p>

                <p className="mb-4">
                  He has a younger brother, born on October 12, 2021, who has become a source of joy and responsibility in his life. 
                  The age gap means Charchit often finds himself in a protective, almost paternal role, teaching him about the world 
                  with the same enthusiasm he applies to learning about it himself.
                </p>

                <h3 id="the-hunger" className="text-xl font-serif text-white mt-4 mb-2">The hunger to learn</h3>
                
                <p className="mb-4">
                  If you were to ask Charchit what drives him, he would tell you about his "hunger." Not for food, fame, or money. 
                  But a deep, almost primal <em>sikhne ki bhookh</em> (hunger to learn). He doesn't engage in activities merely for fun. 
                  Every game he plays, every conversation he has, every late-night coding session carries purpose. He seeks value 
                  and growth in everything he does.<sup className="text-[#6b9eff]">[1]</sup>
                </p>

                <p className="mb-4">
                  This isn't the story of a prodigy who had it all figured out. This is the story of a boy who struggled with 
                  self-doubt, who sometimes felt behind his peers, who battled overthinking and perfectionism. But therein lies 
                  his strength: he cares deeply about doing things right. And that caring, though sometimes paralyzing, is what 
                  ultimately propels him forward.
                </p>
              </section>

              {/* Education Section */}
              <section id="education" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  Education
                </h2>
                
                <h3 id="iit-madras" className="text-xl font-serif text-white mt-4 mb-2">IIT Madras</h3>
                
                <p className="mb-4">
                  In 2024, Charchit embarked on one of the most significant chapters of his academic journey: enrolling in the 
                  <span className="text-[#6b9eff]"> BS in Data Science & Applications</span> program at the 
                  <span className="text-[#6b9eff]"> Indian Institute of Technology, Madras</span>. This wasn't just any degree program. 
                  IIT Madras' online BS degree is India's first and only online degree offered by an IIT, designed to democratize 
                  quality education and make world-class learning accessible to students across the country.
                </p>

                <p className="mb-4">
                  For Charchit, this program represented more than academics. It was validation. It was proof that a kid from 
                  Delhi with a laptop and a dream could stand shoulder to shoulder with the brightest minds in India. The curriculum 
                  is rigorous, demanding, and exactly what he was looking for: a challenge worthy of his ambitions.
                </p>

                <p className="mb-4">
                  His approach to learning is unconventional. Rather than passively absorbing lectures, Charchit actively hunts for 
                  knowledge. He prefers Teaching Assistant recordings and live session archives over traditional formats, always 
                  seeking the most efficient path to understanding. He doesn't want to just know the theory; he wants to solve 
                  real problems.
                </p>

                <h3 id="harvard-alp" className="text-xl font-serif text-white mt-4 mb-2">Aspire Leadership Program</h3>
                
                <p className="mb-4">
                  In 2025, Charchit was selected as a scholar for the <span className="text-[#6b9eff]">Aspire Leadership Program (ALP)</span>, 
                  a transformative leadership initiative backed by faculty from Harvard University. The program selects outstanding 
                  young individuals from around the world who demonstrate not just academic excellence but also the potential to 
                  create meaningful impact in their communities.
                </p>

                <p className="mb-4">
                  Being chosen for ALP wasn't just an achievement; it was a turning point. It connected Charchit with a global 
                  network of ambitious peers and mentors, exposing him to perspectives and opportunities that would have been 
                  unimaginable just years earlier. The program reinforced what he already believed: that potential isn't limited 
                  by geography, background, or circumstance.
                </p>
              </section>

              {/* The Journey Section */}
              <section id="journey" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  The journey
                </h2>

                <div className="float-right ml-4 mb-2 w-48">
                  <img src={charchitHoodie} alt="Charchit Sharma in casual wear" className="w-full aspect-square object-cover border border-[#3c4043]" />
                  <p className="text-xs text-[#72777d] text-center mt-1">Charchit in 2025</p>
                </div>

                <h3 id="struggles" className="text-xl font-serif text-white mt-4 mb-2">Struggles and growth</h3>
                
                <p className="mb-4">
                  Every hero's journey has its valley. For Charchit, that valley was paved with self-doubt and the relentless 
                  voice of an inner critic. He has openly shared his struggles with social anxiety and procrastination. There 
                  were days when starting felt impossible, when the gap between where he was and where he wanted to be seemed 
                  insurmountable.
                </p>

                <blockquote className="border-l-4 border-[#3c4043] pl-4 my-4 italic text-[#a8afb8]">
                  "You are not broken. You are becoming. Trust the process. Your path will make sense when you look back."
                  <footer className="text-sm text-[#72777d] mt-1">From a personal reflection document</footer>
                </blockquote>

                <p className="mb-4">
                  What makes Charchit's story compelling isn't the absence of struggle but how he navigates it. He doesn't 
                  pretend to have it all figured out. He documents his failures alongside his wins. He talks about falling 
                  short with the same honesty he applies to celebrating breakthroughs. In a world of curated perfection, 
                  his authenticity is refreshing and relatable.
                </p>

                <p className="mb-4">
                  His procrastination, he has come to understand, isn't laziness. It's a form of high-functioning anxiety, 
                  where the fear of imperfect output creates paralysis. He tackles this through structured approaches like 
                  the <span className="text-[#6b9eff]">Pomodoro Technique</span>, breaking overwhelming tasks into manageable 
                  25-minute sprints. It's not glamorous, but it works.
                </p>

                <h3 id="builder" className="text-xl font-serif text-white mt-4 mb-2">The builder within</h3>
                
                <p className="mb-4">
                  Charchit is what you might call a "Cyborg Developer." He doesn't just code; he orchestrates. His toolkit 
                  spans the entire spectrum of modern development: <span className="text-[#6b9eff]">React.js</span> and 
                  <span className="text-[#6b9eff]"> Tailwind CSS</span> for crafting beautiful web interfaces, 
                  <span className="text-[#6b9eff]"> Flutter</span> for cross-platform mobile applications, 
                  <span className="text-[#6b9eff]"> Three.js</span> for immersive 3D experiences, and Python-based backends 
                  with <span className="text-[#6b9eff]">Flask</span> and sophisticated database architectures.
                </p>

                <p className="mb-4">
                  But what truly sets him apart is how he leverages AI. He doesn't view artificial intelligence as a threat 
                  to developers but as a force multiplier. He uses prompt engineering to accelerate development, generative 
                  tools like <span className="text-[#6b9eff]">Suno AI</span> for audio creation, and AI-powered development 
                  environments to work at speeds that would have been impossible just years ago. He has explored Web3 and 
                  blockchain, building decentralized applications on Ethereum with Solidity.
                </p>

                <p className="mb-4">
                  His technical profile isn't "Full Stack" in the traditional sense. It's what has been termed "Product Stack." 
                  He learns technologies not to master syntax but to ship products. Every skill serves a purpose; every tool 
                  is a means to an end.<sup className="text-[#6b9eff]">[2]</sup>
                </p>
              </section>

              {/* Entrepreneurship Section */}
              <section id="entrepreneurship" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  Entrepreneurship
                </h2>
                
                <p className="mb-4">But what truly sets him apart is how he leverages AI. He doesn't view artificial intelligence as a threat to developers but as a force multiplier. He uses prompt engineering to accelerate development, generative tools like Suno AI for audio creation, and AI-powered development environments to work at speeds that would have been impossible just years ago. He has explored Web3 and blockchain.</p>

                <p className="mb-4">
                  He is currently nurturing his own startup ideas, including a project codenamed "AuraSync." His vision is 
                  ambitious: targeting international markets with high-end, aesthetically refined software solutions. He 
                  doesn't want to build ordinary products; he wants to create experiences that feel "Series A funded" from 
                  day one.
                </p>

                <p className="mb-4">
                  As a <span className="text-[#6b9eff]">Campus Ambassador for E-Summit '26 at IIT Roorkee</span>, Charchit has 
                  demonstrated leadership beyond his years. This role connects him with the broader Indian startup ecosystem, 
                  building a network that will serve him well as his own ventures mature.
                </p>

                <p className="mb-4">
                  His approach to LinkedIn and personal branding is strategic rather than casual. He focuses on storytelling 
                  and psychological engagement, crafting content designed not for peers but for mentors, investors, and 
                  industry leaders. He understands that in today's world, building in public is as important as building in private.
                </p>
              </section>

              {/* Personal Interests Section */}
              <section id="interests" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  Personal life
                </h2>
                
                <p className="mb-4">
                  Beyond the code and the ambition, Charchit is deeply creative. His aesthetic signature leans toward 
                  "8-bit Retro New Gen," a nostalgic blend of classic gaming visuals with modern design sensibilities. 
                  This preference permeates his work, from image generation requests to web design concepts.
                </p>

                <p className="mb-4">
                  His musical taste serves a functional purpose. He gravitates toward chillwave, lo-fi, and 8-bit retro 
                  tracks at 65-70 BPM, the tempo of a resting heartbeat, specifically curated for focus. He doesn't just 
                  listen to this music; he creates it using AI tools, exerting control over even his auditory environment.
                </p>

                <p className="mb-4">
                  In gaming, he favors constructivist titles like <span className="text-[#6b9eff]">Minecraft</span> and strategy 
                  games such as <span className="text-[#6b9eff]">Slay the Spire</span> and <span className="text-[#6b9eff]">Vampire 
                  Survivors</span>. These aren't just entertainment; they're exercises in optimization and resource management, 
                  skills that translate directly to his real-world interests.
                </p>

                <p className="mb-4">
                  He is an avid <span className="text-[#6b9eff]">anime</span> enthusiast, always hunting for new series that 
                  combine compelling storytelling with beautiful art. His close friends include Divan, Abhiman, Lakshit Pathak, 
                  Aarav Tejan, and Suraj, a circle of peers who share his drive and ambition.
                </p>
              </section>

              {/* Philosophy Section */}
              <section id="philosophy" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  Philosophy
                </h2>
                
                <p className="mb-4">
                  At his core, Charchit is a searcher. Not lost, but intentionally exploring. He thinks deeply, questions 
                  everything, and seeks meaning beyond surface-level success. This self-awareness, rare for someone his age, 
                  is perhaps his greatest asset.
                </p>

                <p className="mb-4">
                  He has been described as an "Anxious Perfectionist," someone whose procrastination stems not from laziness 
                  but from genuinely caring whether the output meets his high standards. He has learned to recognize this 
                  pattern and work with it rather than against it.
                </p>

                <blockquote className="border-l-4 border-[#3c4043] pl-4 my-4 italic text-[#a8afb8]">
                  "Your journey is not slow. It is deep. And depth takes time."
                  <footer className="text-sm text-[#72777d] mt-1">From personal reflection</footer>
                </blockquote>

                <p className="mb-4">
                  His strengths, as he has come to understand them, include curiosity, emotional intelligence, reflection, 
                  persistence, and an unshakeable desire to grow. He operates best during late-night hours, finding in the 
                  silence of night the focus that eludes him during busy days.
                </p>

                <p className="mb-4">
                  Charchit's story is still being written. He is currently in what he calls a "phase of inner construction," 
                  building foundations that may not yet be visible but will one day support extraordinary structures. For 
                  those watching his journey, the message is clear: don't count him out. The best chapters are yet to come.
                </p>
              </section>

              {/* See Also Section */}
              <section id="see-also" className="mb-6">
                <h2 className="text-2xl font-serif text-white border-b border-[#3c4043] pb-1 mb-3">
                  See also
                </h2>
                <ul className="list-disc list-inside text-[#6b9eff] space-y-1">
                  <li>Indian Institute of Technology Madras</li>
                  <li>Aspire Leadership Program</li>
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
                  <li><span className="text-[#6b9eff]">^</span> "A Deep, Honest Portrait of You" Personal analysis document, December 2025</li>
                  <li><span className="text-[#6b9eff]">^</span> "The Charchit Sharma Protocol" Comprehensive behavioral and technical thesis, December 2025</li>
                  <li><span className="text-[#6b9eff]">^</span> IIT Madras BS Degree Program official documentation</li>
                  <li><span className="text-[#6b9eff]">^</span> Aspire Leadership Program official website</li>
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
                    <a href="https://github.com/charchitheree" target="_blank" rel="noopener noreferrer" className="text-[#6b9eff] hover:underline">
                      Charchit Sharma on GitHub
                    </a>
                  </li>
                  <li>
                    <ExternalLink className="w-3 h-3 inline mr-1" />
                    <a href="https://www.linkedin.com/in/charchit-sharma-398165287/" target="_blank" rel="noopener noreferrer" className="text-[#6b9eff] hover:underline">
                      Charchit Sharma on LinkedIn
                    </a>
                  </li>
                  <li>
                    <ExternalLink className="w-3 h-3 inline mr-1" />
                    <a href="https://www.instagram.com/heyimcharchit/" target="_blank" rel="noopener noreferrer" className="text-[#6b9eff] hover:underline">
                      Charchit Sharma on Instagram
                    </a>
                  </li>
                  <li>
                    <ExternalLink className="w-3 h-3 inline mr-1" />
                    <a href="https://x.com/heyimcharchit" target="_blank" rel="noopener noreferrer" className="text-[#6b9eff] hover:underline">
                      Charchit Sharma on X (Twitter)
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
                  <span className="text-[#6b9eff] hover:underline cursor-pointer">IIT Madras students</span>
                  <span className="text-[#72777d]">|</span>
                  <span className="text-[#6b9eff] hover:underline cursor-pointer">Indian software developers</span>
                  <span className="text-[#72777d]">|</span>
                  <span className="text-[#6b9eff] hover:underline cursor-pointer">People from Delhi</span>
                  <span className="text-[#72777d]">|</span>
                  <span className="text-[#6b9eff] hover:underline cursor-pointer">Aspire Leadership Program scholars</span>
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
    </div>;
};
export default WikipediaPage;