import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    question: "What does Charchit Sharma study?",
    answer: "Charchit Sharma is pursuing a BS in Data Science from the Indian Institute of Technology, Madras (IIT Madras). He is also an ALP Scholar at Harvard, focusing on advanced learning programs in technology and data science.",
  },
  {
    question: "How old is Charchit Sharma?",
    answer: "Charchit Sharma was born in 2004, making him approximately 21 years old as of 2025.",
  },
  {
    question: "What is Charchit's Instagram handle?",
    answer: "Charchit Sharma's Instagram handle is @heyimcharchit. You can find him at instagram.com/heyimcharchit where he has over 8,600 followers.",
  },
  {
    question: "What is Harvard ALP?",
    answer: "Harvard ALP (Advanced Learning Program) is a prestigious scholarship program that selects outstanding students worldwide. Charchit is part of the 2025 cohort of ALP Scholars.",
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
