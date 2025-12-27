import { useNavigate } from "react-router-dom";

const AboutSnippet = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-card/90 backdrop-blur-md border border-border/50 rounded-lg p-4 mb-4 shadow-lg">
      <h3 className="text-lg text-foreground font-medium mb-2">About Charchit Sharma</h3>
      <p className="text-sm text-foreground/80 leading-relaxed mb-3">
        <span className="text-google-blue font-medium">Charchit Sharma</span> is a 
        21-year-old builder from <span className="text-google-green">Roorkee, Uttarakhand</span>. 
        Currently pursuing BS in Data Science at <span className="text-google-yellow">IIT Madras</span> and 
        selected as a <span className="text-google-red">2025 Aspire Leadership Program Scholar</span> (Harvard faculty-backed). 
        He's not just a student; he's a dreamer with an insatiable hunger to learn, build, and create impact.
      </p>
      <button 
        onClick={() => navigate("/wiki/charchit-sharma")}
        className="text-sm text-google-blue hover:underline font-medium"
      >
        Read full biography on Wikipedia →
      </button>
    </div>
  );
};

export default AboutSnippet;
