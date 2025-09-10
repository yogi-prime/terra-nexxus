import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, DollarSign, TrendingUp, Scale, Shield, AlertTriangle } from 'lucide-react';

const PropertyFAQs = () => {
  const faqCategories = [
    {
      title: 'General',
      icon: <HelpCircle className="h-4 w-4" />,
      color: 'bg-primary/10 text-primary',
      faqs: [
        {
          question: 'How safe is fractional real estate investment?',
          answer: 'Fractional real estate is backed by physical assets and regulated by SEBI guidelines. Your investment is protected through SPV structures, escrow accounts, and legal documentation. All properties undergo thorough due diligence.'
        },
        {
          question: 'What happens if the property doesn\'t get fully funded?',
          answer: 'If a property doesn\'t reach its funding target within the specified timeline, all investor funds are returned to their accounts within 7-10 business days. No charges or penalties apply.'
        },
        {
          question: 'Can I invest in multiple properties?',
          answer: 'Yes, you can diversify your portfolio by investing in multiple properties across different categories, locations, and risk profiles. The minimum investment for each property is ₹50,000.'
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
          answer: 'The minimum investment amount is ₹50,000 per property. This allows you to own a fractional share in premium real estate that would otherwise be unaffordable.'
        },
        {
          question: 'How is my ownership percentage calculated?',
          answer: 'Your ownership percentage is calculated as (Your Investment ÷ Total Property Value) × 100. For example, if you invest ₹1 lakh in a ₹1 crore property, you own 0.1% of the property.'
        },
        {
          question: 'Are there any hidden charges?',
          answer: 'No hidden charges. We charge a transparent management fee of 2% annually, which covers property management, legal compliance, and platform operations. All fees are disclosed upfront.'
        }
      ]
    },
    {
      title: 'Payouts',
      icon: <TrendingUp className="h-4 w-4" />,
      color: 'bg-accent/10 text-accent',
      faqs: [
        {
          question: 'When will I receive rental payouts?',
          answer: 'Rental payouts are distributed quarterly (every 3 months) directly to your bank account. The first payout typically occurs 90-120 days after the property becomes operational.'
        },
        {
          question: 'How are rental yields calculated?',
          answer: 'Rental yields are calculated as (Annual Rental Income - Expenses) ÷ Property Value × 100. Expenses include property management, maintenance, taxes, and platform fees.'
        },
        {
          question: 'What about TDS on rental income?',
          answer: 'TDS is deducted at source as per Income Tax regulations. You\'ll receive Form 16A for TDS deducted, which can be used while filing your income tax returns.'
        }
      ]
    },
    {
      title: 'Exit',
      icon: <Scale className="h-4 w-4" />,
      color: 'bg-warning/10 text-warning',
      faqs: [
        {
          question: 'How does the resale marketplace work?',
          answer: 'You can list your shares for sale on our marketplace after a minimum holding period of 2 years. Other investors can purchase your shares at market-determined prices. The platform facilitates the transaction.'
        },
        {
          question: 'When can I exit my investment?',
          answer: 'You can exit through: 1) Resale marketplace (after 2 years), 2) Property sale by SPV (typically 5-7 years), or 3) Early exit (subject to buyer availability and potential discount).'
        },
        {
          question: 'What are the exit charges?',
          answer: 'Marketplace transactions incur a 1% fee. If the property is sold by the SPV, proceeds are distributed proportionally with no additional charges to investors.'
        }
      ]
    },
    {
      title: 'Legal',
      icon: <Shield className="h-4 w-4" />,
      color: 'bg-blue-500/10 text-blue-600',
      faqs: [
        {
          question: 'Is my ownership legally binding?',
          answer: 'Yes, your ownership is legally documented through share certificates in the property SPV. This provides you with legally enforceable rights to the property and its income.'
        },
        {
          question: 'What legal documents will I receive?',
          answer: 'You\'ll receive: SPV share certificate, investment agreement, property due diligence report, and quarterly financial statements. All documents are digitally signed and legally valid.'
        },
        {
          question: 'Who manages the property and SPV?',
          answer: 'The SPV is managed by an independent trustee, while property management is handled by professional property management companies. Terra Nexxus provides oversight and investor relations.'
        }
      ]
    },
    {
      title: 'Risk',
      icon: <AlertTriangle className="h-4 w-4" />,
      color: 'bg-destructive/10 text-destructive',
      faqs: [
        {
          question: 'What if the tenant vacates the property?',
          answer: 'Professional property management teams work to minimize vacancy periods. The SPV may have vacancy reserves, and new tenants are actively sourced. Rental income may be temporarily affected during vacancy periods.'
        },
        {
          question: 'What are the main risks involved?',
          answer: 'Key risks include: property value fluctuations, vacancy periods, interest rate changes, and market conditions. However, these are mitigated through professional management, diversification, and thorough due diligence.'
        },
        {
          question: 'Is there any insurance coverage?',
          answer: 'Yes, all properties are covered by comprehensive insurance including fire, earthquake, and third-party liability. Insurance costs are factored into the operating expenses.'
        }
      ]
    }
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>

      <div className="grid gap-6">
        {faqCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${category.color}`}>
                  {category.icon}
                </div>
                {category.title}
                <Badge variant="outline" className="ml-auto">
                  {category.faqs.length} questions
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
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
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-4">
            Our investment experts are here to help you make informed decisions.
          </p>
          <div className="flex gap-3 justify-center">
            <Badge variant="outline">Email: support@terranexxus.com</Badge>
            <Badge variant="outline">Phone: +91-11-4567-8900</Badge>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PropertyFAQs;