interface SearchResultProps {
  title: string;
  url: string;
  description: string;
  tags?: string[];
  delay?: number;
}

const SearchResult = ({
  title,
  url,
  description,
  tags = [],
  delay = 0,
}: SearchResultProps) => {
  return (
    <article
      className="mb-8 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-google-green text-sm mb-1">{url}</div>
      <h3 className="text-xl text-primary hover:underline cursor-pointer mb-1">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};

export default SearchResult;
