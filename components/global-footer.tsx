import Link from "next/link"
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function GlobalFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold">BloodLink</span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting blood donors with hospitals in real-time to save lives in communities worldwide.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/events" className="block text-gray-300 hover:text-white">
                Find Events
              </Link>
              <Link href="/signup?role=donor" className="block text-gray-300 hover:text-white">
                Become a Donor
              </Link>
              <Link href="/signup?role=hospital" className="block text-gray-300 hover:text-white">
                Hospital Registration
              </Link>
              <Link href="/faq" className="block text-gray-300 hover:text-white">
                FAQ
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>(555) 123-HELP</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>help@bloodlink.org</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>24/7 Emergency Line</span>
              </div>
              <p className="text-gray-400 text-xs mt-2">For urgent donation needs: (555) 911-BLOOD</p>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <div className="space-y-2 text-sm">
              <Link href="/privacy" className="block text-gray-300 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-300 hover:text-white">
                Terms of Service
              </Link>
              <Link href="/medical-disclaimer" className="block text-gray-300 hover:text-white">
                Medical Disclaimer
              </Link>
              <Link href="/accessibility" className="block text-gray-300 hover:text-white">
                Accessibility
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 BloodLink. All rights reserved. Saving lives through technology.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-xs">Certified by:</span>
              <div className="flex space-x-2">
                <div className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">FDA</div>
                <div className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">AABB</div>
                <div className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">WHO</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
