"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, AlertTriangle, Clock, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { HospitalNavigation } from "@/components/hospital-navigation"

export default function RaiseAlertPage() {
  const [formData, setFormData] = useState({
    bloodType: "",
    urgency: "",
    unitsNeeded: "",
    reason: "",
    additionalNotes: "",
    contactPerson: "",
    contactPhone: "",
    preferredTime: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate alert creation
    setTimeout(() => {
      toast({
        title: "Alert raised successfully",
        description: "Donors in your area will be notified immediately.",
      })
      router.push("/hospital/dashboard")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <HospitalNavigation />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-900">Raise Blood Shortage Alert</span>
          </div>
          <p className="text-gray-600">Create an emergency request to notify eligible donors in your area</p>
        </div>

        {/* Alert Form */}
        <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-600" />
              <span>Emergency Blood Request</span>
            </CardTitle>
            <CardDescription>Fill out the details to alert potential donors</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Blood Type and Urgency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type Needed *</Label>
                  <Select
                    value={formData.bloodType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, bloodType: value }))}
                  >
                    <SelectTrigger className="backdrop-blur-sm bg-white/50 border-white/30">
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unitsNeeded">Units Needed *</Label>
                  <Input
                    id="unitsNeeded"
                    type="number"
                    min="1"
                    placeholder="Enter number of units"
                    value={formData.unitsNeeded}
                    onChange={(e) => setFormData((prev) => ({ ...prev, unitsNeeded: e.target.value }))}
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                    required
                  />
                </div>
              </div>

              {/* Urgency Level */}
              <div className="space-y-3">
                <Label>Urgency Level *</Label>
                <RadioGroup
                  value={formData.urgency}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-red-300 backdrop-blur-sm bg-red-50/50 hover:bg-red-50/70 transition-colors">
                    <RadioGroupItem value="Critical" id="critical" />
                    <Label htmlFor="critical" className="flex items-center space-x-2 cursor-pointer">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <div>
                        <span className="font-medium text-red-800">Critical</span>
                        <p className="text-xs text-red-600">Immediate need</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-orange-300 backdrop-blur-sm bg-orange-50/50 hover:bg-orange-50/70 transition-colors">
                    <RadioGroupItem value="High" id="high" />
                    <Label htmlFor="high" className="flex items-center space-x-2 cursor-pointer">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <div>
                        <span className="font-medium text-orange-800">High</span>
                        <p className="text-xs text-orange-600">Within 24 hours</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-yellow-300 backdrop-blur-sm bg-yellow-50/50 hover:bg-yellow-50/70 transition-colors">
                    <RadioGroupItem value="Medium" id="medium" />
                    <Label htmlFor="medium" className="flex items-center space-x-2 cursor-pointer">
                      <Users className="h-4 w-4 text-yellow-600" />
                      <div>
                        <span className="font-medium text-yellow-800">Medium</span>
                        <p className="text-xs text-yellow-600">Within 48 hours</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Reason for Request */}
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Request *</Label>
                <Select
                  value={formData.reason}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, reason: value }))}
                >
                  <SelectTrigger className="backdrop-blur-sm bg-white/50 border-white/30">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency-surgery">Emergency Surgery</SelectItem>
                    <SelectItem value="trauma-patient">Trauma Patient</SelectItem>
                    <SelectItem value="low-inventory">Low Inventory</SelectItem>
                    <SelectItem value="scheduled-surgery">Scheduled Surgery</SelectItem>
                    <SelectItem value="cancer-treatment">Cancer Treatment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    type="text"
                    placeholder="Enter contact person name"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactPerson: e.target.value }))}
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone *</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                    required
                  />
                </div>
              </div>

              {/* Preferred Time */}
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Donation Time</Label>
                <Input
                  id="preferredTime"
                  type="datetime-local"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, preferredTime: e.target.value }))}
                  className="backdrop-blur-sm bg-white/50 border-white/30"
                />
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Any additional information for donors..."
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                  className="backdrop-blur-sm bg-white/50 border-white/30"
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => router.push("/hospital/dashboard")}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
                  {isLoading ? "Raising Alert..." : "Raise Alert"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
