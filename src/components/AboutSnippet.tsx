import { useNavigate } from "react-router-dom";

const AboutSnippet = () => {
  const navigate = useNavigate();

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg text-card-foreground mb-2">About Charchit Sharma</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        <span className="text-card-foreground font-medium">Charchit Sharma</span> is a 
        21-year-old builder from <span className="text-card-foreground">Roorkee, Uttarakhand</span>. 
        Currently pursuing BS in Data Science at <span className="text-card-foreground">IIT Madras</span> and 
        selected as a <span className="text-card-foreground">2025 Aspire Leadership Program Scholar</span> (Harvard faculty-backed). 
        He's not just a student; he's a dreamer with an insatiable hunger to learn, build, and create impact.
      </p>
      <button 
        onClick={() => navigate("/wiki/charchit-sharma")}
        className="text-sm text-primary hover:underline"
      >
        Read full biography on Wikipedia →
      </button>
    </div>
  );
};

export default AboutSnippet;
