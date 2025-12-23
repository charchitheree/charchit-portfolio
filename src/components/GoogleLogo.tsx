interface GoogleLogoProps {
  name?: string;
  size?: "sm" | "md" | "lg";
}

const GoogleLogo = ({ name = "Portfolio", size = "lg" }: GoogleLogoProps) => {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl md:text-7xl",
  };

  const letters = name.split("");
  const colors = [
    "text-google-blue",
    "text-google-red",
    "text-google-yellow",
    "text-google-blue",
    "text-google-green",
    "text-google-red",
  ];

  return (
    <h1 className={`google-logo-text ${sizeClasses[size]} tracking-tight`}>
      {letters.map((letter, index) => (
        <span key={index} className={colors[index % colors.length]}>
          {letter}
        </span>
      ))}
    </h1>
  );
};

export default GoogleLogo;
