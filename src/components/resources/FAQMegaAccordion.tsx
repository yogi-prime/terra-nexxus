import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  HelpCircle, 
  Search, 
  MessageSquare,
  Shield,
  DollarSign,
  Building,
  Users,
  AlertTriangle
} from "lucide-react";

const faqCategories = [
  { 
    id: "general",
    name: "General", 
    icon: HelpCircle,
    count: 8,
    color: "text-primary"
  },
  { 
    id: "investment",
    name: "Investment", 
    icon: DollarSign,
    count: 12,
    color: "text-success"
  },
  { 
    id: "payouts",
    name: "Payouts", 
    icon: Building,
    count: 6,
    color: "text-accent"
  },
  { 
    id: "exit",
    name: "Exit & Resale", 
    icon: Users,
    count: 7,
    color: "text-warning"
  },
  { 
    id: "legal",
    name: "Legal & Compliance", 
    icon: Shield,
    count: 9,
    color: "text-secondary"
  },
  { 
    id: "risk",
    name: "Risk & Security", 
    icon: AlertTriangle,
    count: 5,
    color: "text-destructive"
  }
];

const faqs = {
  general: [
    {
      q: "What is fractional real estate investment?",
      a: "Fractional real estate investment allows you to own a portion of high-value properties by pooling money with other investors. Through Terra Nexxus, you can invest as little as ₹10,000 to own fractional shares in premium residential, commercial, agricultural, and industrial properties across India."
    },
    {
      q: "How is Terra Nexxus different from REITs?",
      a: "Unlike REITs which are mutual fund-like instruments, Terra Nexxus provides direct fractional ownership through SPV/LLP structures. You get actual ownership certificates and can potentially sell your shares on our marketplace. REITs trade on stock exchanges while our platform offers more direct property exposure."
    },
    {
      q: "What types of properties can I invest in?",
      a: "Terra Nexxus offers 6 property categories: Residential (apartments, villas), Commercial (office spaces, IT parks), Agricultural (farmland, plantations), Industrial (warehouses, factories), Retail (shopping complexes), and Land Plots (residential and commercial plots)."
    },
    {
      q: "Is fractional real estate investment safe?",
      a: "We follow strict SEBI compliance guidelines, use escrow accounts for fund protection, conduct thorough due diligence on all properties, and provide legal ownership through SPV/LLP structures. However, like all investments, real estate carries market risks that investors should understand."
    }
  ],
  investment: [
    {
      q: "What is the minimum investment amount?",
      a: "The minimum investment on Terra Nexxus is ₹10,000. This low entry barrier makes premium real estate accessible to a wide range of investors who previously couldn't afford direct property ownership."
    },
    {
      q: "How do I choose which properties to invest in?",
      a: "Our platform provides detailed information for each property including location analysis, yield projections, risk assessment, tenant details, and market trends. You can filter properties by category, location, yield, and investment amount to find suitable opportunities."
    },
    {
      q: "Can I invest in multiple properties?",
      a: "Yes, we encourage diversification across different property types and locations. You can build a portfolio spanning residential, commercial, agricultural, and industrial properties to spread risk and optimize returns."
    },
    {
      q: "How long does the investment process take?",
      a: "After KYC completion, you can invest in any live property within minutes. The legal documentation and share certificate issuance typically takes 3-5 business days after successful payment."
    }
  ],
  payouts: [
    {
      q: "When will I receive rental income?",
      a: "Rental income is distributed monthly or quarterly depending on the property's lease agreement. Payouts typically begin 30-45 days after the property is fully funded and operational. The exact schedule is mentioned in each property's details."
    },
    {
      q: "How are rental yields calculated and distributed?",
      a: "Rental yields are calculated based on annual rental income divided by property value. Your share of rental income is proportional to your investment amount. For example, if you own 2% of a property generating ₹10L annual rent, you'll receive ₹20,000 annually."
    },
    {
      q: "Are there any deductions from rental income?",
      a: "Yes, TDS (Tax Deducted at Source) is applicable as per income tax regulations. Property management fees (typically 2-5%) and maintenance costs are also deducted before distribution. All deductions are transparently shown in your payout statements."
    }
  ],
  exit: [
    {
      q: "How can I exit my investment?",
      a: "You can exit through our secondary marketplace where other investors can purchase your fractional shares. Alternatively, when the property is sold (typically after 3-7 years), you'll receive your proportional share of sale proceeds."
    },
    {
      q: "Is there a lock-in period for investments?",
      a: "There's no mandatory lock-in period, but we recommend holding investments for at least 2-3 years to benefit from rental income and potential capital appreciation. Early exits through the marketplace may be subject to prevailing market conditions."
    },
    {
      q: "How is the resale price determined on the marketplace?",
      a: "Resale prices are determined by market forces - supply and demand among investors. Prices may reflect current property valuations, rental yields, and market conditions. We provide regular property valuation updates to help inform pricing decisions."
    }
  ],
  legal: [
    {
      q: "What legal structure is used for fractional ownership?",
      a: "We use Special Purpose Vehicles (SPVs) or Limited Liability Partnerships (LLPs) for each property. These legal entities own the property, and you receive shares in the entity proportional to your investment, giving you legal ownership rights."
    },
    {
      q: "Do I get any ownership documents?",
      a: "Yes, you receive a legal share certificate from the SPV/LLP confirming your fractional ownership. This document serves as proof of your investment and ownership rights in the property."
    },
    {
      q: "Is Terra Nexxus SEBI registered and compliant?",
      a: "Yes, Terra Nexxus operates under SEBI's Alternative Investment Fund (AIF) guidelines and maintains full regulatory compliance. We also follow KYC/AML protocols and maintain transparent reporting standards."
    }
  ],
  risk: [
    {
      q: "What are the main risks in fractional real estate investment?",
      a: "Key risks include property value fluctuations, rental vacancy, interest rate changes, regulatory changes, and liquidity constraints. Market conditions can affect both rental yields and property values. We provide detailed risk assessments for each property."
    },
    {
      q: "How secure is my money on the platform?",
      a: "All investor funds are held in SEBI-compliant escrow accounts with leading banks until investment completion. We maintain bank-grade security for data and transactions, and our platform undergoes regular security audits."
    },
    {
      q: "What happens if a property doesn't get fully funded?",
      a: "If a property doesn't reach its funding target within the specified timeline, all investor money is refunded with interest (if any) earned during the escrow period. No fees or penalties are charged to investors."
    }
  ]
};

export const FAQMegaAccordion = () => {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const currentFAQs = faqs[selectedCategory as keyof typeof faqs] || [];
  
  const filteredFAQs = searchQuery 
    ? currentFAQs.filter(faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentFAQs;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to common questions about fractional real estate investment, 
            legal processes, and platform features
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  {faqCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start text-left"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <category.icon className={`mr-3 h-4 w-4 ${selectedCategory === category.id ? "text-primary-foreground" : category.color}`} />
                      <span className="flex-1">{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                {faqCategories.find(cat => cat.id === selectedCategory)?.icon && (
                  <span className={faqCategories.find(cat => cat.id === selectedCategory)?.color}>
                    {(() => {
                      const IconComponent = faqCategories.find(cat => cat.id === selectedCategory)?.icon;
                      return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
                    })()}
                  </span>
                )}
                {faqCategories.find(cat => cat.id === selectedCategory)?.name} Questions
              </h3>
              {searchQuery && (
                <p className="text-sm text-muted-foreground mt-2">
                  Found {filteredFAQs.length} results for "{searchQuery}"
                </p>
              )}
            </div>

            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-border rounded-lg px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="prose prose-sm max-w-none text-muted-foreground">
                        {faq.a}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h4 className="text-lg font-semibold mb-2">No results found</h4>
                <p className="text-muted-foreground">
                  Try searching with different keywords or browse other categories.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support CTA */}
        <div className="mt-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our investor support team is here to help. Get personalized answers 
                to your questions about fractional real estate investment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
                <Button variant="outline" size="lg">
                  Schedule a Call
                </Button>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Email: support@terranexxus.com | Phone: 1800-XXX-XXXX</p>
                <p>Support Hours: Mon-Fri 9 AM - 7 PM, Sat 10 AM - 4 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};