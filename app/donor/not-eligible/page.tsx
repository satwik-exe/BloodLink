import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, AlertTriangle, Phone, Mail } from "lucide-react"

export default function NotEligiblePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-900">BloodLink</span>
          </div>
        </div>

        {/* Not Eligible Card */}
        <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-orange-100 rounded-full w-fit">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Currently Not Eligible</CardTitle>
            <CardDescription className="text-gray-600">
              Based on your responses, you're currently not eligible to donate blood
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-2">Common reasons for temporary ineligibility:</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Recent donation (must wait 8 weeks between donations)</li>
                <li>• Recent travel to malaria-endemic areas</li>
                <li>• Recent tattoos or piercings (6-month waiting period)</li>
                <li>• Temporary health conditions or medications</li>
                <li>• Age or weight requirements not met</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">What you can do:</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Wait for the appropriate time period and try again</li>
                <li>• Consult with your healthcare provider</li>
                <li>• Contact us if you have questions about your eligibility</li>
                <li>• Help spread awareness about blood donation</li>
              </ul>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Need help or have questions?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Call us</p>
                    <p className="text-sm text-gray-600">1-800-BLOOD-HELP</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Email us</p>
                    <p className="text-sm text-gray-600">help@bloodlink.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                  Return to Home
                </Button>
              </Link>
              <Link href="/donor/eligibility" className="flex-1">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Try Again Later</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
