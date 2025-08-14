"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlobalFooter } from "@/components/global-footer"
import { Heart, Calendar, Users, Clock, Search, Filter, Plus, Building2 } from "lucide-react"

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterDate, setFilterDate] = useState("all")

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blood Donation Events & Camps</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find blood donation events in your area and help save lives in your community
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="backdrop-blur-md bg-white/70 border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events, locations, or organizers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 backdrop-blur-sm bg-white/50 border-white/30"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48 backdrop-blur-sm bg-white/50 border-white/30">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="ngo">NGO</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Host Event
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 backdrop-blur-md bg-white/70 border-white/20">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="live">Live Events</TabsTrigger>
          </TabsList>

          {/* Upcoming Events */}
          <TabsContent value="upcoming" className="space-y-6">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Events</h3>
                <p className="text-gray-600">Check back later for blood donation events in your area.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Events */}
          <TabsContent value="live" className="space-y-6">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Live Events</h3>
                <p className="text-gray-600">There are currently no live blood donation events in your area.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <GlobalFooter />
    </div>
  )
}
