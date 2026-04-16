
'use client';

import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const faqs = [
  {
    question: "How do I report a power outage?",
    answer: "You can report a power outage by clicking the 'File a Complaint' card on the Home screen and selecting the 'Problem Category' as 'Frequent power cuts' or 'Long power outages'."
  },
  {
    question: "How long does it take to resolve a complaint?",
    answer: "Minor issues are typically resolved within 24 hours. Major faults, such as transformer failure, may take up to 48-72 hours depending on the location and severity."
  },
  {
    question: "Can I pay my bill using the app?",
    answer: "Yes, go to the 'Pay Bills' section, select your pending bill, and click 'Pay Now' to use our secure payment gateway."
  },
  {
    question: "What should I do if my meter is not working?",
    answer: "Please file a new complaint and select 'Faulty or non-working meters' from the category list. A technician will be dispatched to inspect your meter."
  },
  {
    question: "How do I update my profile information?",
    answer: "Go to the 'Profile' tab at the bottom, click 'Edit Profile', update your details, and save the changes."
  }
];

export default function FAQPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => router.push('/home')} 
        className="text-muted-foreground hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>

      <h1 className="text-3xl font-bold tracking-tight text-white text-center mb-6">Frequently Asked Questions</h1>

      <div className="max-w-2xl mx-auto bg-black/20 backdrop-blur-lg rounded-lg border border-white/10 p-4">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
              <AccordionTrigger className="text-left text-white hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
