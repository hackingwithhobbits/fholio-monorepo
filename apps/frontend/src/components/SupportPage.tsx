import { useState } from "react";
import {
  HelpCircle,
  MessageSquare,
  Book,
  Mail,
  Phone,
  Clock,
  Search,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "./ui/badge";

interface SupportPageProps {
  onPageChange: (page: string) => void;
}

export function SupportPage({ onPageChange }: SupportPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I invest in a track?",
      answer:
        "To invest in a track, browse our marketplace, select a track you're interested in, choose the number of shares you want to purchase, and complete the payment process. You'll receive a confirmation and tracking information for your investment.",
    },
    {
      question: "What returns can I expect from my investments?",
      answer:
        "Returns vary based on the track's performance, streaming numbers, and commercial success. Historical data shows an average return of 15-25% annually, but past performance doesn't guarantee future results. Each track shows projected returns based on market analysis.",
    },
    {
      question: "How do I track my portfolio performance?",
      answer:
        "Visit your Portfolio page to see real-time performance of all your investments, including current valuations, returns, and detailed analytics. You can also set up notifications for significant changes in your portfolio.",
    },
    {
      question: "What happens if a campaign doesn't reach its funding goal?",
      answer:
        "If a campaign doesn't reach its minimum funding goal by the deadline, all investments are automatically refunded to investors within 5-7 business days. No fees are charged for unsuccessful campaigns.",
    },
    {
      question: "How are royalties distributed?",
      answer:
        "Royalties are distributed quarterly based on streaming performance, radio play, sync licenses, and other revenue sources. Payments are automatically processed to your account, and you'll receive detailed reports of all earnings.",
    },
    {
      question: "Can I sell my shares before the campaign ends?",
      answer:
        "Yes, you can list your shares on our secondary marketplace. Other investors can purchase your shares at market value. There's a small transaction fee of 2.5% for secondary market sales.",
    },
  ];

  const quickActions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageSquare,
      status: "Online",
      action: "Start Chat",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      status: "24h response",
      action: "Send Email",
    },
    {
      title: "Phone Support",
      description: "Call our support hotline",
      icon: Phone,
      status: "Mon-Fri 9AM-6PM EST",
      action: "Call Now",
    },
    {
      title: "Help Center",
      description: "Browse our comprehensive guides",
      icon: Book,
      status: "Self-service",
      action: "Visit Guides",
    },
  ];

  const recentTickets = [
    {
      id: "#12345",
      subject: "Investment confirmation issue",
      status: "Resolved",
      date: "2 days ago",
    },
    {
      id: "#12344",
      subject: "Portfolio sync problem",
      status: "In Progress",
      date: "5 days ago",
    },
    {
      id: "#12343",
      subject: "Payment method update",
      status: "Resolved",
      date: "1 week ago",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get support, find answers, and connect with our team
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-4 text-lg bg-muted border-border rounded-xl"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="premium-card hover:neon-glow transition-all duration-300 cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <action.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {action.description}
                </p>
                <Badge variant="outline" className="mb-4">
                  {action.status}
                </Badge>
                <Button className="w-full fintech-gradient text-white border-0 hover:opacity-90">
                  {action.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* FAQs */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investment">
                        Investment Support
                      </SelectItem>
                      <SelectItem value="technical">
                        Technical Issues
                      </SelectItem>
                      <SelectItem value="billing">
                        Billing & Payments
                      </SelectItem>
                      <SelectItem value="account">
                        Account Management
                      </SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide as much detail as possible about your question or issue..."
                    rows={6}
                  />
                </div>

                <Button className="w-full fintech-gradient text-white border-0 hover:opacity-90">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">
                      support@fholio.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">
                      +1 (555) 123-4567
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Support Hours</div>
                    <div className="text-sm text-muted-foreground">
                      Mon-Fri: 9AM-6PM EST
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Tickets */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Your Recent Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTickets.map((ticket, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent cursor-pointer"
                  >
                    <div>
                      <div className="font-medium text-sm">
                        {ticket.subject}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {ticket.id} • {ticket.date}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          ticket.status === "Resolved" ? "secondary" : "default"
                        }
                        className="text-xs"
                      >
                        {ticket.status}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  View All Tickets
                </Button>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform</span>
                  <Badge className="bg-green-500 text-white">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payments</span>
                  <Badge className="bg-green-500 text-white">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API</span>
                  <Badge className="bg-green-500 text-white">Operational</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
