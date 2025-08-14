"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Heart, MapPin, Award, Calendar, Users, Map, AlertCircle } from "lucide-react"
import { DonorNavigation } from "@/components/donor-navigation"

export default function DonorDashboard() {
  const [searchRadius, setSearchRadius] = useState([10])
  const [acceptedAlerts, setAcceptedAlerts] = useState<number[]>([])
  const [declinedAlerts, setDeclinedAlerts] = useState<number[]>([])

  const handleAcceptAlert = (alertId: number) => {
    setAcceptedAlerts([...acceptedAlerts, alertId])
  }

  const handleDeclineAlert = (alertId: number) => {
    setDeclinedAlerts([...declinedAlerts, alertId])
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <DonorNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Your contribution saves lives. Thank you for being a hero.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="backdrop-blur-md bg-white/70 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Donations</p>
                  <p className="text-2xl font-bold text-gray-900">--</p>
                </div>
                <Heart className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/70 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lives Saved</p>
                  <p className="text-2xl font-bold text-gray-900">--</p>
                </div>
                <Users className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/70 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Next Eligible</p>
                  <p className="text-2xl font-bold text-gray-900">--</p>
                </div>
                <Calendar className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/70 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rank</p>
                  <p className="text-2xl font-bold text-gray-900">--</p>
                </div>
                <Award className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 backdrop-blur-md bg-white/70 border-white/20">
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
          </TabsList>

          {/* Active Alerts */}
          <TabsContent value="alerts" className="space-y-4">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span>Active Blood Shortage Alerts</span>
                </CardTitle>
                <CardDescription>Hospitals near you need your blood type urgently</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
                <p className="text-gray-600">There are currently no blood shortage alerts in your area.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donation History */}
          <TabsContent value="history" className="space-y-4">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>Your past blood donations and certificates</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Donation History</h3>
                <p className="text-gray-600">Your donation history will appear here after your first donation.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events & Camps */}
          <TabsContent value="events" className="space-y-4">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle>Upcoming Donation Events</CardTitle>
                <CardDescription>Blood donation camps and events in your area</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Events</h3>
                <p className="text-gray-600">Check back later for blood donation events in your area.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Map View */}
          <TabsContent value="map" className="space-y-4">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Map className="h-5 w-5 text-red-600" />
                  <span>Nearby Hospitals & Blood Banks</span>
                </CardTitle>
                <CardDescription>Find hospitals and blood banks in your area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="radius">Search Radius: {searchRadius[0]} km</Label>
                  <Slider
                    id="radius"
                    min={1}
                    max={50}
                    step={1}
                    value={searchRadius}
                    onValueChange={setSearchRadius}
                    className="w-full"
                  />
                </div>

                <div className="text-center py-12">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Hospitals Found</h3>
                  <p className="text-gray-600">Adjust your search radius to find hospitals and blood banks.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics */}
          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="backdrop-blur-md bg-white/70 border-white/20">
                <CardHeader>
                  <CardTitle>Donation Progress</CardTitle>
                  <CardDescription>Your journey to becoming a regular donor</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Donations this year</span>
                      <span>0/6</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Lifetime goal</span>
                      <span>0/25</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/70 border-white/20">
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Badges and milestones you've earned</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Achievements Yet</h3>
                  <p className="text-gray-600">Start donating to earn badges and achievements!</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Health Records */}
          <TabsContent value="health" className="space-y-4">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle>Health Information</CardTitle>
                <CardDescription>Your health records and donation eligibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Current Status</h3>
                      <p className="text-gray-700">Status pending</p>
                      <p className="text-sm text-gray-600 mt-1">Complete eligibility check to see your status</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Basic Information</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          Blood Type: <strong>--</strong>
                        </p>
                        <p>
                          Age: <strong>--</strong>
                        </p>
                        <p>
                          Weight: <strong>--</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Recent Health Checks</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>No recent health checks</p>
                      </div>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Schedule Health Check</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
