import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    question: "Who is Charchit Sharma?",
    answer: "Charchit Sharma is a 21-year-old student, developer, and aspiring entrepreneur from Roorkee, Uttarakhand. He's pursuing BS in Data Science at IIT Madras and is a 2025 Aspire Leadership Program Scholar (Harvard faculty-backed). Known for his 'hunger to learn' and his journey of turning struggles into growth.",
  },
  {
    question: "Where is Charchit from?",
    answer: "Charchit is from Roorkee, a city in Uttarakhand, India. Roorkee is home to IIT Roorkee, one of India's oldest and most prestigious engineering institutions. Growing up in this academic atmosphere shaped his aspirations.",
  },
  {
    question: "What is Charchit Sharma's date of birth?",
    answer: "Charchit Sharma was born on November 8, 2004 (08/11/2004), making him 21 years old as of 2025.",
  },
  {
    question: "What is the Aspire Leadership Program?",
    answer: "The Aspire Leadership Program (ALP) is a prestigious leadership initiative backed by Harvard University faculty. It selects exceptional young individuals worldwide who demonstrate academic excellence and potential to create meaningful impact. Charchit is part of the 2025 cohort.",
  },
  {
    question: "What does Charchit study?",
    answer: "Charchit is pursuing a Bachelor of Science in Data Science and Applications at the Indian Institute of Technology, Madras (IIT Madras). This is India's first and only online BS degree offered by an IIT.",
  },
];

const PeopleAlsoAsk = () => {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <h3 className="px-4 py-3 text-card-foreground text-lg font-normal">People also ask</h3>
      <Accordion type="single" collapsible className="w-full">
        {questions.map((item, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border-t border-border"
          >
            <AccordionTrigger className="px-4 py-3 text-sm text-card-foreground hover:no-underline hover:bg-accent/50 [&[data-state=open]>svg]:rotate-180">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 text-sm text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PeopleAlsoAsk;
