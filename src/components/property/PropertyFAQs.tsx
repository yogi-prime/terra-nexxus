import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, DollarSign, TrendingUp, Shield } from 'lucide-react';

const brilliaFAQs = [
  {
    title: 'General',
    icon: <HelpCircle className="h-4 w-4" />,
    color: 'bg-primary/10 text-primary',
    faqs: [
      {
        question: 'How safe is investing in BRILLIA?',
        answer: 'BRILLIA investments are backed by a physical commercial property and regulated under SEBI guidelines. Funds are secured through SPV structures and escrow accounts.'
      },
      {
        question: 'What happens if the property is not fully funded?',
        answer: 'If BRILLIA does not reach its funding target within the timeline, all investor funds are refunded within 7-10 business days.'
      },
      {
        question: 'Can I invest multiple times in BRILLIA?',
        answer: 'Yes, investors can make multiple investments in BRILLIA, subject to the minimum investment requirement of ₹50,00,000.'
      }
    ]
  },
  {
    title: 'Investment',
    icon: <DollarSign className="h-4 w-4" />,
    color: 'bg-success/10 text-success',
    faqs: [
      {
        question: 'What is the minimum investment amount?',
        answer: 'The minimum investment for BRILLIA is ₹50,00,000.'
      },
      {
        question: 'How is ownership calculated?',
        answer: 'Ownership percentage = (Your Investment ÷ Total Funding Target) × 100.'
      },
      {
        question: 'Are there any hidden fees?',
        answer: 'No hidden fees. A transparent management fee of 2% annually covers property management, compliance, and platform operations.'
      }
    ]
  },
  {
    title: 'Returns & Payouts',
    icon: <TrendingUp className="h-4 w-4" />,
    color: 'bg-accent/10 text-accent',
    faqs: [
      {
        question: 'How and when will I receive rental payouts?',
        answer: 'Payouts are distributed quarterly, typically 90-120 days after the property becomes operational.'
      },
      {
        question: 'How is projected yield calculated?',
        answer: 'Projected yield = (Annual Rental Income - Expenses) ÷ Property Value × 100.'
      }
    ]
  },
  {
    title: 'Legal & Compliance',
    icon: <Shield className="h-4 w-4" />,
    color: 'bg-blue-500/10 text-blue-600',
    faqs: [
      {
        question: 'Is my investment legally protected?',
        answer: 'Yes, all investments are documented through SPV share certificates and legal agreements.'
      },
      {
        question: 'Which documents will I receive?',
        answer: 'Investors receive SPV share certificate, investment agreement, due diligence report, and quarterly financial statements.'
      }
    ]
  }
];

const PropertyFAQs = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>

      <div className="grid gap-6">
        {brilliaFAQs.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${category.color}`}>{category.icon}</div>
                {category.title}
                <Badge variant="outline" className="ml-auto">{category.faqs.length} questions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">Our investment experts are here to help you make informed decisions about BRILLIA.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Badge variant="outline">Email: support@terranexxus.com</Badge>
            <Badge variant="outline">Phone: +91-11-4567-8900</Badge>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PropertyFAQs;
