"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlobalFooter } from "@/components/global-footer"
import {
  Heart,
  Calendar,
  MapPin,
  Users,
  Clock,
  Phone,
  Mail,
  Share2,
  Bookmark,
  ArrowLeft,
  Building2,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react"

// Mock event data (in real app, this would be fetched based on ID)
const eventData = {
  id: 1,
  title: "Community Blood Drive",
  date: "2024-02-15",
  time: "9:00 AM - 5:00 PM",
  location: "Community Center, 123 Main Street, Downtown",
  organizer: "Red Cross",
  organizerType: "NGO",
  description:
    "Join us for our monthly community blood drive. Help save lives in your neighborhood. This is a well-organized event with experienced medical staff and comfortable facilities.",
  longDescription:
    "Our monthly community blood drive is one of the largest in the city, typically collecting over 100 units of blood that directly help local hospitals and emergency services. We provide a comfortable, safe environment with experienced medical professionals, refreshments, and a relaxing atmosphere. All blood types are welcome, and we especially need O-negative and AB-positive donors this month.",
  expectedDonors: 150,
  registeredDonors: 87,
  bloodTypesNeeded: ["O+", "O-", "A+", "B-"],
  urgentTypes: ["O-", "B-"],
  contact: {
    phone: "(555) 123-4567",
    email: "events@redcross.org",
    website: "www.redcross.org/events",
  },
  address: {
    street: "123 Main Street",
    city: "Downtown",
    state: "CA",
    zip: "90210",
  },
  facilities: [
    "Air-conditioned facility",
    "Free parking available",
    "Wheelchair accessible",
    "Refreshments provided",
    "Medical staff on-site",
    "Private donation areas",
  ],
  requirements: [
    "Age 18-65 years",
    "Weight at least 50kg",
    "Good general health",
    "Valid photo ID required",
    "No recent tattoos (6 months)",
    "No recent travel to malaria areas",
  ],
  schedule: [
    { time: "9:00 AM - 10:00 AM", activity: "Registration & Health Screening" },
    { time: "10:00 AM - 12:00 PM", activity: "Morning Donation Session" },
    { time: "12:00 PM - 1:00 PM", activity: "Lunch Break" },
    { time: "1:00 PM - 4:00 PM", activity: "Afternoon Donation Session" },
    { time: "4:00 PM - 5:00 PM", activity: "Final Donations & Cleanup" },
  ],
  image: "/community-blood-drive.png",
}

export default function EventDetailPage() {
  const params = useParams()
  const [isRegistered, setIsRegistered] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleRegister = () => {
    setIsRegistered(true)
    // In real app, this would make an API call
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: eventData.title,
        text: eventData.description,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const getOrganizerIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "hospital":
        return <Building2 className="h-4 w-4" />
      case "ngo":
        return <Heart className="h-4 w-4" />
      case "educational":
        return <Users className="h-4 w-4" />
      case "corporate":
        return <Building2 className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getOrganizerColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "hospital":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "ngo":
        return "bg-red-100 text-red-800 border-red-200"
      case "educational":
        return "bg-green-100 text-green-800 border-green-200"
      case "corporate":
        return "bg-purple-100 text-purple-800 border-purple-200"
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
              <Link href="/faq">
                <Button variant="ghost" className="text-gray-700 hover:text-red-600">
                  FAQ
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="ghost" className="text-gray-700 hover:text-red-600">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="aspect-video w-full overflow-hidden rounded-xl mb-6">
            <img
              src={eventData.image || "/placeholder.svg"}
              alt={eventData.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                {getOrganizerIcon(eventData.organizerType)}
                <span className="text-sm text-gray-600">{eventData.organizer}</span>
                <Badge className={getOrganizerColor(eventData.organizerType)}>{eventData.organizerType}</Badge>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{eventData.title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">
                    {new Date(eventData.date).toLocaleDateString()} • {eventData.time}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{eventData.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">
                    {eventData.registeredDonors}/{eventData.expectedDonors} registered
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">8 hours duration</span>
                </div>
              </div>

              <p className="text-lg text-gray-600 mb-6">{eventData.description}</p>

              {/* Blood Types Needed */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Blood Types Needed</h3>
                <div className="flex flex-wrap gap-2">
                  {eventData.bloodTypesNeeded.map((type) => (
                    <Badge
                      key={type}
                      className={
                        eventData.urgentTypes.includes(type)
                          ? "bg-red-100 text-red-800 border-red-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {type}
                      {eventData.urgentTypes.includes(type) && <AlertCircle className="h-3 w-3 ml-1" />}
                    </Badge>
                  ))}
                </div>
                {eventData.urgentTypes.length > 0 && (
                  <p className="text-sm text-red-600 mt-2">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    {eventData.urgentTypes.join(", ")} donors urgently needed
                  </p>
                )}
              </div>
            </div>

            {/* Registration Card */}
            <Card className="backdrop-blur-md bg-white/70 border-white/20 w-full lg:w-96">
              <CardHeader>
                <CardTitle className="text-center">
                  {isRegistered ? "You're Registered!" : "Register to Donate"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isRegistered ? (
                  <div className="text-center space-y-4">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                    <p className="text-green-800">
                      Thank you for registering! We'll send you a confirmation email with details.
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-gray-900">
                        {eventData.expectedDonors - eventData.registeredDonors} spots left
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${(eventData.registeredDonors / eventData.expectedDonors) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button onClick={handleRegister} className="w-full bg-red-600 hover:bg-red-700 text-white">
                      Register Now
                    </Button>
                  </>
                )}

                <Separator />

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark className={`h-4 w-4 mr-1 ${isBookmarked ? "fill-current" : ""}`} />
                    {isBookmarked ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Contact Organizer</h4>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 backdrop-blur-md bg-white/70 border-white/20">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{eventData.longDescription}</p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Facilities & Amenities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {eventData.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle>Event Schedule</CardTitle>
                <CardDescription>Detailed timeline for the blood donation event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventData.schedule.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-white/50">
                      <div className="flex-shrink-0">
                        <Clock className="h-5 w-5 text-red-600 mt-0.5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.time}</div>
                        <div className="text-sm text-gray-600">{item.activity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle>Donation Requirements</CardTitle>
                <CardDescription>Please ensure you meet these requirements before attending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eventData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Important Note</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Please eat a good meal and stay hydrated before donating. Avoid alcohol 24 hours before
                        donation.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle>Event Location</CardTitle>
                <CardDescription>Find us at the community center</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Address</h4>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>{eventData.address.street}</p>
                      <p>
                        {eventData.address.city}, {eventData.address.state} {eventData.address.zip}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{eventData.contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{eventData.contact.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <MapPin className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Interactive map would be here</p>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <GlobalFooter />
    </div>
  )
}
