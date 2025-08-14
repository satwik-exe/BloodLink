"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function EligibilityPage() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    bloodType: "",
    lastDonation: "",
    healthConditions: [] as string[],
    medications: "",
    recentTravel: "",
    recentTattoo: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const healthConditionOptions = [
    "Heart disease",
    "High blood pressure",
    "Diabetes",
    "Cancer",
    "HIV/AIDS",
    "Hepatitis",
    "Anemia",
    "Blood clotting disorders",
  ]

  const handleHealthConditionChange = (condition: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      healthConditions: checked
        ? [...prev.healthConditions, condition]
        : prev.healthConditions.filter((c) => c !== condition),
    }))
  }

  const checkEligibility = () => {
    const age = Number.parseInt(formData.age)
    const weight = Number.parseInt(formData.weight)
    const lastDonationDate = formData.lastDonation ? new Date(formData.lastDonation) : null
    const now = new Date()
    const daysSinceLastDonation = lastDonationDate
      ? Math.floor((now.getTime() - lastDonationDate.getTime()) / (1000 * 60 * 60 * 24))
      : 365

    // Basic eligibility criteria
    const isAgeEligible = age >= 18 && age <= 65
    const isWeightEligible = weight >= 50
    const isDonationIntervalOk = daysSinceLastDonation >= 56 // 8 weeks
    const hasNoRestrictiveConditions = formData.healthConditions.length === 0
    const noRecentTattoo = formData.recentTattoo === "no"
    const noRecentTravel = formData.recentTravel === "no"

    return (
      isAgeEligible &&
      isWeightEligible &&
      isDonationIntervalOk &&
      hasNoRestrictiveConditions &&
      noRecentTattoo &&
      noRecentTravel
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      const isEligible = checkEligibility()

      if (isEligible) {
        toast({
          title: "Eligibility confirmed",
          description: "You're eligible to donate blood! Welcome to BloodLink.",
        })
        router.push("/donor/dashboard")
      } else {
        router.push("/donor/not-eligible")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-900">BloodLink</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Donor Eligibility Check</h1>
          <p className="text-gray-600">Help us determine if you're eligible to donate blood safely</p>
        </div>

        {/* Eligibility Form */}
        <Card className="backdrop-blur-md bg-white/70 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span>Health & Eligibility Information</span>
            </CardTitle>
            <CardDescription>Please provide accurate information for your safety and others</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Enter your weight"
                    value={formData.weight}
                    onChange={(e) => setFormData((prev) => ({ ...prev, weight: e.target.value }))}
                    className="backdrop-blur-sm bg-white/50 border-white/30"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select
                  value={formData.bloodType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, bloodType: value }))}
                >
                  <SelectTrigger className="backdrop-blur-sm bg-white/50 border-white/30">
                    <SelectValue placeholder="Select your blood type" />
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
                <Label htmlFor="lastDonation">Last Blood Donation Date (if any)</Label>
                <Input
                  id="lastDonation"
                  type="date"
                  value={formData.lastDonation}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastDonation: e.target.value }))}
                  className="backdrop-blur-sm bg-white/50 border-white/30"
                />
              </div>

              {/* Health Conditions */}
              <div className="space-y-3">
                <Label>Do you have any of the following health conditions?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {healthConditionOptions.map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={formData.healthConditions.includes(condition)}
                        onCheckedChange={(checked) => handleHealthConditionChange(condition, checked as boolean)}
                      />
                      <Label htmlFor={condition} className="text-sm">
                        {condition}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Travel */}
              <div className="space-y-3">
                <Label>Have you traveled to malaria-endemic areas in the past 3 months?</Label>
                <RadioGroup
                  value={formData.recentTravel}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, recentTravel: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="travel-yes" />
                    <Label htmlFor="travel-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="travel-no" />
                    <Label htmlFor="travel-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Recent Tattoo */}
              <div className="space-y-3">
                <Label>Have you gotten a tattoo or piercing in the past 6 months?</Label>
                <RadioGroup
                  value={formData.recentTattoo}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, recentTattoo: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="tattoo-yes" />
                    <Label htmlFor="tattoo-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="tattoo-no" />
                    <Label htmlFor="tattoo-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
                {isLoading ? "Checking Eligibility..." : "Check My Eligibility"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
