"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, AlertTriangle, TrendingUp, Calendar, Plus, Edit } from "lucide-react"
import { HospitalNavigation } from "@/components/hospital-navigation"

export default function HospitalDashboard() {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null)

  const getStockStatus = (current: number, minimum: number, maximum: number) => {
    const percentage = (current / maximum) * 100
    if (current < minimum) return { status: "critical", color: "bg-red-500", percentage }
    if (current < minimum * 1.5) return { status: "low", color: "bg-yellow-500", percentage }
    return { status: "good", color: "bg-green-500", percentage }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Available</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case "Declined":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Declined</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
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
      <HospitalNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital Dashboard</h1>
          <p className="text-gray-600">Manage your blood inventory efficiently and connect with donors.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="backdrop-blur-md bg-white/70 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Inventory</p>
                  <p className="text-2xl font-bold text-gray-900">-- units</p>
                </div>
                <Building2 className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/70 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/70 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Matched Donors</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <Users className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/70 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">-- units</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 backdrop-blur-md bg-white/70 border-white/20">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="donors">Matched Donors</TabsTrigger>
            <TabsTrigger value="history">Alert History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Blood Inventory Management */}
          <TabsContent value="inventory" className="space-y-4">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Blood Inventory Management</CardTitle>
                    <CardDescription>Monitor and manage your blood stock levels</CardDescription>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Update Inventory
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Inventory Data</h3>
                <p className="text-gray-600">Set up your blood inventory to start tracking stock levels.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Alerts */}
          <TabsContent value="alerts" className="space-y-4">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Blood Shortage Alerts</CardTitle>
                    <CardDescription>Monitor your current emergency requests</CardDescription>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Raise New Alert
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
                <p className="text-gray-600">You currently have no active blood shortage alerts.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Matched Donors */}
          <TabsContent value="donors" className="space-y-4">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle>Matched Donors</CardTitle>
                <CardDescription>Donors who have responded to your alerts</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Matched Donors</h3>
                <p className="text-gray-600">Donors who respond to your alerts will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alert History */}
          <TabsContent value="history" className="space-y-4">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle>Past Alerts History</CardTitle>
                <CardDescription>Review your previous blood shortage alerts</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Alert History</h3>
                <p className="text-gray-600">Your past alerts will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hospital Profile */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="backdrop-blur-md bg-white/70 border-white/20">
              <CardHeader>
                <CardTitle>Hospital Profile</CardTitle>
                <CardDescription>Manage your hospital information and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Basic Information</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Name:</span> --
                        </p>
                        <p>
                          <span className="font-medium">Address:</span> --
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span> --
                        </p>
                        <p>
                          <span className="font-medium">Email:</span> --
                        </p>
                        <p>
                          <span className="font-medium">License:</span> --
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Operating Hours</h3>
                      <div className="space-y-1 text-sm">
                        <p>Not configured</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Blood Bank Capacity</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Total Capacity:</span> -- units
                        </p>
                        <p>
                          <span className="font-medium">Current Stock:</span> -- units
                        </p>
                        <p>
                          <span className="font-medium">Critical Threshold:</span> --%
                        </p>
                        <p>
                          <span className="font-medium">Low Stock Threshold:</span> --%
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Notification Settings</h3>
                      <div className="space-y-2 text-sm">
                        <p>Configure notification preferences</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4 pt-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Maintenance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
