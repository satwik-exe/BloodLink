"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Search,
  Users,
  Building2,
  Calendar,
  Shield,
  Phone,
  Mail,
  MessageCircle,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react"

// FAQ Data
const donorFAQs = [
  {
    id: "donor-1",
    question: "Who can donate blood?",
    answer:
      "Generally, healthy individuals aged 18-65 years, weighing at least 50kg, can donate blood. You must be in good health, have not donated blood in the last 8 weeks, and meet other health criteria. Our eligibility checker will help determine if you're eligible.",
    category: "eligibility",
  },
  {
    id: "donor-2",
    question: "How often can I donate blood?",
    answer:
      "You can donate whole blood every 8 weeks (56 days). This waiting period allows your body to replenish the donated blood cells. Platelet donations can be made more frequently, up to 24 times per year.",
    category: "process",
  },
  {
    id: "donor-3",
    question: "What should I do before donating blood?",
    answer:
      "Eat a healthy meal 3-4 hours before donation, drink plenty of water, get a good night's sleep, and avoid alcohol for 24 hours before donation. Bring a valid photo ID and wear comfortable clothing with sleeves that can be rolled up.",
    category: "preparation",
  },
  {
    id: "donor-4",
    question: "How long does the donation process take?",
    answer:
      "The entire process typically takes 45-60 minutes, including registration, health screening, the actual donation (8-10 minutes), and recovery time. The actual blood collection only takes about 8-10 minutes.",
    category: "process",
  },
  {
    id: "donor-5",
    question: "Is blood donation safe?",
    answer:
      "Yes, blood donation is completely safe. We use sterile, single-use equipment for each donor. All equipment is disposed of after use, making it impossible to contract any infection from donating blood.",
    category: "safety",
  },
  {
    id: "donor-6",
    question: "What happens to my blood after donation?",
    answer:
      "Your blood is tested for blood type and screened for infectious diseases. If it passes all tests, it's processed into components (red cells, plasma, platelets) and distributed to hospitals where it can help save up to 3 lives.",
    category: "process",
  },
  {
    id: "donor-7",
    question: "Can I donate if I have tattoos or piercings?",
    answer:
      "You must wait 6 months after getting a tattoo or piercing before donating blood. This waiting period helps ensure your safety and the safety of blood recipients.",
    category: "eligibility",
  },
  {
    id: "donor-8",
    question: "What are the side effects of blood donation?",
    answer:
      "Most people feel fine after donating. Some may experience mild dizziness, fatigue, or bruising at the needle site. These effects are temporary and usually resolve within 24 hours. Serious side effects are very rare.",
    category: "safety",
  },
]

const hospitalFAQs = [
  {
    id: "hospital-1",
    question: "How do I register my hospital with BloodLink?",
    answer:
      "Contact our hospital relations team at hospitals@bloodlink.org or call (555) 123-BLOOD. You'll need to provide your hospital license, contact information, and blood bank certification. The registration process typically takes 3-5 business days.",
    category: "registration",
  },
  {
    id: "hospital-2",
    question: "How quickly can I get donors for emergency alerts?",
    answer:
      "Emergency alerts are sent immediately to eligible donors within your specified radius. Response times vary, but critical alerts typically receive responses within 15-30 minutes, with donors arriving within 1-2 hours.",
    category: "alerts",
  },
  {
    id: "hospital-3",
    question: "What information do I need to raise a blood shortage alert?",
    answer:
      "You need to specify the blood type needed, number of units required, urgency level, reason for request, and preferred donation timeframe. Additional details like contact person and special instructions help donors respond more effectively.",
    category: "alerts",
  },
  {
    id: "hospital-4",
    question: "How do I manage my blood inventory on the platform?",
    answer:
      "Use the inventory management dashboard to update stock levels, set minimum thresholds, and track usage patterns. The system can automatically suggest raising alerts when stock levels fall below your specified minimums.",
    category: "inventory",
  },
  {
    id: "hospital-5",
    question: "Can I see donor information before they arrive?",
    answer:
      "For privacy reasons, you'll only see limited information: blood type, approximate distance, and response status. Full donor details are only shared after they accept your alert and confirm their donation appointment.",
    category: "privacy",
  },
  {
    id: "hospital-6",
    question: "What if I need to cancel an alert?",
    answer:
      "You can cancel active alerts from your dashboard at any time. Donors who have already responded will be notified of the cancellation. It's important to cancel promptly if your blood needs are met to avoid unnecessary donor trips.",
    category: "alerts",
  },
]

const generalFAQs = [
  {
    id: "general-1",
    question: "How does BloodLink work?",
    answer:
      "BloodLink connects blood donors with hospitals in real-time. Hospitals post blood shortage alerts, and eligible donors in the area receive notifications. Donors can accept alerts and coordinate with hospitals to donate blood when and where it's needed most.",
    category: "platform",
  },
  {
    id: "general-2",
    question: "Is BloodLink free to use?",
    answer:
      "Yes, BloodLink is completely free for both donors and hospitals. Our mission is to save lives by making blood donation more efficient and accessible. The platform is supported by partnerships with healthcare organizations.",
    category: "platform",
  },
  {
    id: "general-3",
    question: "How do you protect my personal information?",
    answer:
      "We use enterprise-grade security measures to protect your data. Personal health information is encrypted and only shared with verified healthcare providers when necessary for donation coordination. We comply with all healthcare privacy regulations.",
    category: "privacy",
  },
  {
    id: "general-4",
    question: "Can I use BloodLink in my city?",
    answer:
      "BloodLink is expanding to new cities regularly. Check our coverage map or contact us to request service in your area. We prioritize expansion based on local hospital partnerships and donor interest.",
    category: "platform",
  },
  {
    id: "general-5",
    question: "How do I report a problem or get support?",
    answer:
      "Contact our support team at help@bloodlink.org, call (555) 123-HELP, or use the in-app chat feature. For urgent issues related to active donations, call our 24/7 emergency line at (555) 911-BLOOD.",
    category: "support",
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("donors")

  const getCurrentFAQs = () => {
    switch (activeTab) {
      case "donors":
        return donorFAQs
      case "hospitals":
        return hospitalFAQs
      case "general":
        return generalFAQs
      default:
        return donorFAQs
    }
  }

  const filteredFAQs = getCurrentFAQs().filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "eligibility":
        return <CheckCircle className="h-4 w-4" />
      case "process":
        return <Info className="h-4 w-4" />
      case "safety":
        return <Shield className="h-4 w-4" />
      case "preparation":
        return <Calendar className="h-4 w-4" />
      case "alerts":
        return <AlertCircle className="h-4 w-4" />
      case "inventory":
        return <Building2 className="h-4 w-4" />
      case "privacy":
        return <Shield className="h-4 w-4" />
      case "platform":
        return <Heart className="h-4 w-4" />
      case "support":
        return <HelpCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "eligibility":
        return "bg-green-100 text-green-800 border-green-200"
      case "process":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "safety":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "preparation":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "alerts":
        return "bg-red-100 text-red-800 border-red-200"
      case "inventory":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "privacy":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "platform":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "support":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/70 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold text-gray-900">BloodLink</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/events">
                <Button variant="ghost" className="text-gray-700 hover:text-red-600">
                  Events
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-red-600">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-red-600 hover:bg-red-700 text-white">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about blood donation, using BloodLink, and how our platform works
          </p>
        </div>

        {/* Search */}
        <Card className="backdrop-blur-md bg-white/70 border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 backdrop-blur-sm bg-white/50 border-white/30"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 backdrop-blur-md bg-white/70 border-white/20">
            <TabsTrigger value="donors" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>For Donors</span>
            </TabsTrigger>
            <TabsTrigger value="hospitals" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>For Hospitals</span>
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center space-x-2">
              <HelpCircle className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="donors" className="space-y-4">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-red-600" />
                  <span>Donor Questions</span>
                </CardTitle>
                <CardDescription>Everything you need to know about donating blood through BloodLink</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} className="border border-white/30 rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center space-x-3 text-left">
                          <Badge className={getCategoryColor(faq.category)}>
                            {getCategoryIcon(faq.category)}
                            <span className="ml-1 capitalize">{faq.category}</span>
                          </Badge>
                          <span className="font-medium">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-2">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hospitals" className="space-y-4">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-red-600" />
                  <span>Hospital Questions</span>
                </CardTitle>
                <CardDescription>Information for healthcare providers using BloodLink</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} className="border border-white/30 rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center space-x-3 text-left">
                          <Badge className={getCategoryColor(faq.category)}>
                            {getCategoryIcon(faq.category)}
                            <span className="ml-1 capitalize">{faq.category}</span>
                          </Badge>
                          <span className="font-medium">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-2">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general" className="space-y-4">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-red-600" />
                  <span>General Questions</span>
                </CardTitle>
                <CardDescription>About BloodLink platform, privacy, and support</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} className="border border-white/30 rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center space-x-3 text-left">
                          <Badge className={getCategoryColor(faq.category)}>
                            {getCategoryIcon(faq.category)}
                            <span className="ml-1 capitalize">{faq.category}</span>
                          </Badge>
                          <span className="font-medium">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-2">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Support */}
        <Card className="backdrop-blur-md bg-white/70 border-white/20 mt-8">
          <CardHeader>
            <CardTitle className="text-center">Still have questions?</CardTitle>
            <CardDescription className="text-center">Our support team is here to help you 24/7</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-white/50">
                <Phone className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-sm text-gray-600 mb-3">24/7 support hotline</p>
                <Button variant="outline" size="sm" className="bg-transparent">
                  (555) 123-HELP
                </Button>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/50">
                <Mail className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-sm text-gray-600 mb-3">Get detailed answers</p>
                <Button variant="outline" size="sm" className="bg-transparent">
                  help@bloodlink.org
                </Button>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/50">
                <MessageCircle className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-3">Instant support</p>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Start Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
