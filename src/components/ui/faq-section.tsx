import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge1";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button2";

const faqData = [
  {
    question: "What is Tailark?",
    answer: "Tailark is an AI-powered platform that helps teachers turn curriculum inputs into structured lesson plans, quizzes, and revision material instantly."
  },
  {
    question: "How do I upload my curriculum?",
    answer: "You can either paste your syllabus into the chat interface or upload it as a PDF or DOCX file. Tailark will read it and start building lessons."
  },
  {
    question: "Is it customizable for different classrooms?",
    answer: "Yes! You can specify class level, learning goals, and preferences. Tailark adapts the output accordingly."
  },
  {
    question: "Can students access the material too?",
    answer: "Yes. Teachers can share revision materials, practice questions, and assessments directly with students via PDF or links."
  },
  {
    question: "Is it free to use?",
    answer: "We offer a free trial for teachers to test the platform. Premium features like export, LMS integrations, and multi-language support are part of paid plans."
  },
  {
    question: "What languages are supported?",
    answer: "Currently, we support English and Hindi. More regional language support is coming soon."
  }
];

function FAQ() {
  return (
    <section className="w-full py-20 lg:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex gap-8 flex-col">
            <div className="flex gap-6 flex-col">
              <div>
                <Badge variant="outline">FAQ</Badge>
              </div>
              <div className="flex gap-4 flex-col">
                <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight max-w-xl text-left font-bold">
                  Everything You Need to Know
                </h2>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-normal text-gray-600 text-left font-caudex">
                  We're here to make lesson planning effortless with AI. If you're wondering how Tailark works or how it can fit into your teaching workflow, here are some quick answers.
                </p>
              </div>
              <div className="pt-2">
                <Button className="gap-4" variant="outline">
                  Any questions? Reach out <PhoneCall className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={"faq-" + index}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FAQ };
