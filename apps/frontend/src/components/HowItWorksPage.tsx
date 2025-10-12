import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Play,
  TrendingUp,
  DollarSign,
  PieChart,
  Upload,
  Target,
  Shield,
  Users,
  Music,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

interface HowItWorksPageProps {
  onPageChange: (page: string) => void;
}

export function HowItWorksPage({ onPageChange }: HowItWorksPageProps) {
  const [activeTab, setActiveTab] = useState<"fans" | "artists">("fans");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToSection = (section: "fans" | "artists") => {
    setActiveTab(section);
    const element = document.getElementById(`${section}-section`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fanSteps = [
    {
      number: "01",
      title: "Discover",
      description: "Browse tracks by genre, location, and trending.",
      icon: <Music className="w-6 h-6" />,
      details:
        "Explore new music from emerging artists across all genres. Use our smart filters to find tracks by location, trending status, or investment potential.",
    },
    {
      number: "02",
      title: "Back a Track",
      description: "Invest directly in songs you believe in.",
      icon: <Target className="w-6 h-6" />,
      details:
        "Choose how much you want to invest in a track. Set your investment amount and become a stakeholder in the song's success.",
    },
    {
      number: "03",
      title: "Own a Share",
      description: "Get a piece of the royalties.",
      icon: <PieChart className="w-6 h-6" />,
      details:
        "Receive a percentage of streaming royalties based on your investment. Watch your portfolio grow as tracks gain popularity.",
    },
    {
      number: "04",
      title: "Track Your Portfolio",
      description: "Watch your music investments grow.",
      icon: <TrendingUp className="w-6 h-6" />,
      details:
        "Monitor performance with real-time analytics. See streaming data, revenue growth, and your return on investment.",
    },
  ];

  const artistSteps = [
    {
      number: "01",
      title: "Launch Your Track",
      description: "Upload and set % to share.",
      icon: <Upload className="w-6 h-6" />,
      details:
        "Upload your track, set metadata, and decide what percentage of royalties you want to share with investors.",
    },
    {
      number: "02",
      title: "Get Funded",
      description: "Fans back your music upfront.",
      icon: <DollarSign className="w-6 h-6" />,
      details:
        "Receive immediate funding from fans who believe in your music. Use the capital to promote, produce, or create more tracks.",
    },
    {
      number: "03",
      title: "Stay Independent",
      description: "Keep rights, share success.",
      icon: <Shield className="w-6 h-6" />,
      details:
        "Maintain full ownership and creative control of your music while sharing the financial upside with your supporters.",
    },
    {
      number: "04",
      title: "Build a Fanbase That Wins With You",
      description: "Grow loyalty through shared upside.",
      icon: <Users className="w-6 h-6" />,
      details:
        "Create deeper connections with fans who are financially invested in your success. Build a community that grows with you.",
    },
  ];

  const whyFholioFeatures = [
    {
      title: "Fans Back the Future",
      description:
        "Be part of music history by investing in tracks before they hit mainstream.",
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      title: "Artists Launch on Their Own Terms",
      description:
        "Get funding without giving up creative control or ownership rights.",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: "Everyone Wins",
      description:
        "When tracks succeed, both artists and fans share in the financial rewards.",
      icon: <Users className="w-8 h-8" />,
    },
  ];

  const faqs = [
    {
      question: "How do I get paid?",
      answer:
        "Fan investors receive payments through our automated royalty distribution system. Payments are processed monthly based on streaming revenue and your investment percentage.",
    },
    {
      question: "What happens if a track doesn't take off?",
      answer:
        "Not every track will be a hit, and that's part of music investing. However, you can diversify across multiple tracks to spread risk. We also provide detailed analytics to help you make informed decisions.",
    },
    {
      question: "Is this legal and secure?",
      answer:
        "Yes, all transactions are fully regulated and secure. We use enterprise-grade security and comply with financial regulations. Your investments are protected and transparent.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238A2BE2' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-pink-500/20" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            How It Works
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Two paths. One future. Fans invest, artists launch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="fintech-gradient hover:scale-105 transition-transform px-8 py-4"
              onClick={() => scrollToSection("fans")}
            >
              I'm a Fan
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:scale-105 transition-transform px-8 py-4"
              onClick={() => scrollToSection("artists")}
            >
              I'm an Artist
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-20 z-20 bg-background/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center">
            <div className="flex bg-gray-900/50 rounded-lg p-1">
              <button
                className={`px-6 py-3 rounded-md transition-all ${
                  activeTab === "fans"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("fans")}
              >
                For Fans
              </button>
              <button
                className={`px-6 py-3 rounded-md transition-all ${
                  activeTab === "artists"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("artists")}
              >
                For Artists
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Split Sections */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Fans Section */}
          <div
            id="fans-section"
            className={`${activeTab === "fans" ? "block" : "hidden"}`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                For Fans
              </h2>
              <p className="text-xl text-gray-300">
                Discover, invest, and earn from the music you love
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {fanSteps.map((step, index) => (
                <Card
                  key={index}
                  className="glass-card p-8 hover:neon-glow transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg fintech-gradient flex items-center justify-center text-white mb-4">
                        {step.icon}
                      </div>
                      <Badge
                        variant="outline"
                        className="text-purple-400 border-purple-400"
                      >
                        {step.number}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-3">{step.title}</h3>
                      <p className="text-gray-400 mb-4">{step.description}</p>
                      <p className="text-sm text-gray-500">{step.details}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Mock Portfolio Example */}
            <div className="mt-16">
              <h3 className="text-2xl mb-8 text-center">
                Your Portfolio Could Look Like This
              </h3>
              <Card className="premium-card p-6 max-w-2xl mx-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Invested</span>
                    <span className="text-white">$2,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current Value</span>
                    <span className="positive">$3,127</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Return</span>
                    <span className="positive">+27.6%</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Artists Section */}
          <div
            id="artists-section"
            className={`${activeTab === "artists" ? "block" : "hidden"}`}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                For Artists
              </h2>
              <p className="text-xl text-gray-300">
                Launch, fund, and grow while staying independent
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {artistSteps.map((step, index) => (
                <Card
                  key={index}
                  className="glass-card p-8 hover:neon-glow transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg fintech-gradient flex items-center justify-center text-white mb-4">
                        {step.icon}
                      </div>
                      <Badge
                        variant="outline"
                        className="text-purple-400 border-purple-400"
                      >
                        {step.number}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-3">{step.title}</h3>
                      <p className="text-gray-400 mb-4">{step.description}</p>
                      <p className="text-sm text-gray-500">{step.details}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Mock Funding Example */}
            <div className="mt-16">
              <h3 className="text-2xl mb-8 text-center">
                Track Funding Example
              </h3>
              <Card className="premium-card p-6 max-w-2xl mx-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Funding Goal</span>
                    <span className="text-white">$5,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Amount Raised</span>
                    <span className="positive">$4,750</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Backers</span>
                    <span className="text-white">47 fans</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Fholio Section */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Fholio?
            </h2>
            <p className="text-xl text-gray-300">
              The future of music funding is here
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyFholioFeatures.map((feature, index) => (
              <Card
                key={index}
                className="glass-card p-8 text-center hover:neon-glow transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-lg fintech-gradient flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Teaser Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Questions? We've Got Answers.</h2>
            <p className="text-xl text-gray-300">
              Everything you need to know about investing in music
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible key={index}>
                <Card className="premium-card">
                  <CollapsibleTrigger
                    className="w-full p-6 text-left hover:bg-gray-800/30 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg">{faq.question}</h3>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-6 pb-6">
                    <p className="text-gray-400">{faq.answer}</p>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
              onClick={() => onPageChange("support")}
            >
              See Full FAQ
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Join the revolution where music meets investment
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="fintech-gradient hover:scale-105 transition-transform px-8 py-4"
              onClick={() => onPageChange("auth")}
            >
              Start Backing Tracks
              <Play className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:scale-105 transition-transform px-8 py-4"
              onClick={() => onPageChange("auth")}
            >
              Launch as Artist
              <Upload className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
