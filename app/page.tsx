import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Building2, Calendar, Shield } from "lucide-react"
import { GlobalFooter } from "@/components/global-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/70 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold text-gray-900">BloodLink</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/events" className="text-gray-700 hover:text-red-600 font-medium">
                Events
              </Link>
              <Link href="/faq" className="text-gray-700 hover:text-red-600 font-medium">
                FAQ
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
            {/* Mobile menu button would go here */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Contribution <span className="text-red-600">Saves Lives</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect blood donors with hospitals in real-time. Get instant alerts for blood shortages and help save lives
            in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=donor">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                Become a Donor
              </Button>
            </Link>
            <Link href="/signup?role=hospital">
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 bg-transparent"
              >
                Hospital Registration
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="backdrop-blur-md bg-white/70 border-white/20 hover:bg-white/80 transition-all duration-300">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Real-Time Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Get instant notifications when hospitals need your blood type urgently.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/70 border-white/20 hover:bg-white/80 transition-all duration-300">
            <CardHeader className="text-center">
              <Building2 className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Hospital Network</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Connected with verified hospitals and blood banks in your area.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/70 border-white/20 hover:bg-white/80 transition-all duration-300">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Donation Events</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Find and participate in blood donation camps and events near you.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/70 border-white/20 hover:bg-white/80 transition-all duration-300">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Your health information is protected with enterprise-grade security.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Making a Real Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-red-600">10,000+</div>
              <div className="text-gray-600">Lives Saved</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-red-600">500+</div>
              <div className="text-gray-600">Partner Hospitals</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-red-600">25,000+</div>
              <div className="text-gray-600">Active Donors</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="backdrop-blur-md bg-white/70 border-white/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Save Lives?</h2>
              <p className="text-gray-600 mb-6">
                Join thousands of donors who are making a difference in their communities every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/events">
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                    Find Events Near Me
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button variant="outline" className="bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <GlobalFooter />
    </div>
  )
}
