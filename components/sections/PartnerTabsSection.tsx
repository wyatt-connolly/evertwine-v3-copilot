"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, CheckCircle, Building2, Users, Gift, TrendingUp } from "lucide-react"
import { sendEmail } from "@/app/actions/send-email"

interface PartnerTabsSectionProps {
  isVisible: boolean
}

export default function PartnerTabsSection({ isVisible }: PartnerTabsSectionProps) {
  const [activeTab, setActiveTab] = useState<"business" | "affiliate">("business")

  // Business form state
  const [businessFormSubmitted, setBusinessFormSubmitted] = useState(false)
  const [businessIsSubmitting, setBusinessIsSubmitting] = useState(false)
  const [businessError, setBusinessError] = useState<string | null>(null)
  const [businessFormData, setBusinessFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    location: "",
    message: "",
  })

  // Affiliate form state
  const [affiliateFormSubmitted, setAffiliateFormSubmitted] = useState(false)
  const [affiliateIsSubmitting, setAffiliateIsSubmitting] = useState(false)
  const [affiliateError, setAffiliateError] = useState<string | null>(null)
  const [affiliateFormData, setAffiliateFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    message: "",
  })

  // Business form handlers
  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBusinessFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusinessIsSubmitting(true)
    setBusinessError(null)

    try {
      const result = await sendEmail("business", businessFormData)

      if (result.success) {
        setBusinessFormSubmitted(true)
        setBusinessFormData({
          businessName: "",
          contactName: "",
          email: "",
          phone: "",
          businessType: "",
          location: "",
          message: "",
        })
      } else {
        setBusinessError(result.error || "Failed to submit form. Please try again.")
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      setBusinessError("An unexpected error occurred. Please try again later.")
    } finally {
      setBusinessIsSubmitting(false)
    }

    if (!businessError) {
      setTimeout(() => {
        setBusinessFormSubmitted(false)
      }, 5000)
    }
  }

  // Affiliate form handlers
  const handleAffiliateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setAffiliateFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAffiliateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAffiliateIsSubmitting(true)
    setAffiliateError(null)

    try {
      const result = await sendEmail("affiliate", affiliateFormData)

      if (result.success) {
        setAffiliateFormSubmitted(true)
        setAffiliateFormData({
          name: "",
          email: "",
          phone: "",
          experience: "",
          message: "",
        })
      } else {
        setAffiliateError(result.error || "Failed to submit form. Please try again.")
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      setAffiliateError("An unexpected error occurred. Please try again later.")
    } finally {
      setAffiliateIsSubmitting(false)
    }

    if (!affiliateError) {
      setTimeout(() => {
        setAffiliateFormSubmitted(false)
      }, 5000)
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-blue-900 py-20">
      <div className="container mx-auto px-6 md:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-sora">
            Partner With <span className="text-blue-400">Evertwine</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-dm-sans">
            Join our network as a business or affiliate partner and be part of our growing community.
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex justify-center mb-10 transition-all duration-700 delay-100 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-1 flex">
            <button
              onClick={() => setActiveTab("business")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "business" ? "bg-blue-500 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Business Partner
            </button>
            <button
              onClick={() => setActiveTab("affiliate")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "affiliate" ? "bg-blue-500 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Affiliate Partner
            </button>
          </div>
        </div>

        {/* Business Partner Tab Content */}
        <div
          className={`transition-all duration-500 ${
            activeTab === "business"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 absolute -z-10 pointer-events-none"
          }`}
        >
          <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
            {/* Left side - Form */}
            <div
              className={`w-full lg:w-1/2 transition-all duration-700 delay-300 transform ${
                isVisible && activeTab === "business" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-sora">Contact Us</h3>

                {businessFormSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="h-8 w-8 text-blue-400" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2 font-sora">Partnership Request Received!</h4>
                    <p className="text-white/70 max-w-md font-dm-sans">
                      Thank you for your interest in partnering with Evertwine. Our business development team will
                      review your information and reach out within 2 business days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBusinessSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="businessName" className="block text-white font-medium font-dm-sans">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={businessFormData.businessName}
                        onChange={handleBusinessChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans"
                        placeholder="Your business name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="contactName" className="block text-white font-medium font-dm-sans">
                          Contact Person
                        </label>
                        <input
                          type="text"
                          id="contactName"
                          name="contactName"
                          value={businessFormData.contactName}
                          onChange={handleBusinessChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-white font-medium font-dm-sans">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={businessFormData.email}
                          onChange={handleBusinessChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-white font-medium font-dm-sans">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={businessFormData.phone}
                          onChange={handleBusinessChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="businessType" className="block text-white font-medium font-dm-sans">
                          Business Type
                        </label>
                        <select
                          id="businessType"
                          name="businessType"
                          value={businessFormData.businessType}
                          onChange={handleBusinessChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans appearance-none"
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24' stroke='white'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 1rem center",
                            backgroundSize: "1.5em 1.5em",
                          }}
                        >
                          <option value="" disabled className="bg-gray-900">
                            Select business type
                          </option>
                          <option value="restaurant" className="bg-gray-900">
                            Restaurant/Café
                          </option>
                          <option value="retail" className="bg-gray-900">
                            Retail Store
                          </option>
                          <option value="fitness" className="bg-gray-900">
                            Fitness/Wellness
                          </option>
                          <option value="entertainment" className="bg-gray-900">
                            Entertainment Venue
                          </option>
                          <option value="professional" className="bg-gray-900">
                            Professional Services
                          </option>
                          <option value="other" className="bg-gray-900">
                            Other
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="location" className="block text-white font-medium font-dm-sans">
                        Business Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={businessFormData.location}
                        onChange={handleBusinessChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans"
                        placeholder="City, State"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-white font-medium font-dm-sans">
                        How would you like to partner with Evertwine?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={businessFormData.message}
                        onChange={handleBusinessChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans resize-none"
                        placeholder="Tell us about your business and partnership ideas..."
                      ></textarea>
                    </div>

                    {businessError && (
                      <div className="bg-red-500/10 border border-red-500/30 text-red-200 p-3 rounded-lg">
                        {businessError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={businessIsSubmitting}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 font-dm-sans"
                    >
                      {businessIsSubmitting ? (
                        <>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Partnership Request</span>
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right side - Benefits */}
            <div
              className={`w-full lg:w-1/2 transition-all duration-700 delay-200 transform ${
                isVisible && activeTab === "business" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-sora">Partnership Benefits</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      icon: <Users className="h-8 w-8 text-blue-400" />,
                      title: "Access Our Community",
                      description:
                        "Connect with our growing user base of local, verified individuals looking for authentic experiences.",
                    },
                    {
                      icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
                      title: "Increase Foot Traffic",
                      description: "Drive real-world visits to your location through our meetup and event features.",
                    },
                    {
                      icon: <Building2 className="h-8 w-8 text-blue-400" />,
                      title: "Enhanced Visibility",
                      description: "Get featured in our app with premium placement and promotional opportunities.",
                    },
                    {
                      icon: <Gift className="h-8 w-8 text-blue-400" />,
                      title: "Exclusive Promotions",
                      description: "Offer special deals to Evertwine users and track engagement with our analytics.",
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                        {benefit.icon}
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2 font-sora">{benefit.title}</h4>
                      <p className="text-white/70 font-dm-sans">{benefit.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <h4 className="text-xl font-semibold text-white mb-2 font-sora">Our Partnership Approach</h4>
                  <p className="text-white/70 font-dm-sans">
                    We create customized partnership plans based on your business goals. Whether you're looking to
                    increase brand awareness, drive foot traffic, or create special offers for our users, we'll work
                    with you to design a partnership that delivers results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate Partner Tab Content */}
        <div
          className={`transition-all duration-500 ${
            activeTab === "affiliate"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 absolute -z-10 pointer-events-none"
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left side - Benefits */}
            <div
              className={`w-full lg:w-1/2 transition-all duration-700 delay-200 transform ${
                isVisible && activeTab === "affiliate" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-sora">Why Become an Affiliate?</h3>

                <ul className="space-y-6">
                  {[
                    {
                      title: "Lucrative Commissions",
                      description: "Earn up to 15% commission on every business partnership you help establish.",
                    },
                    {
                      title: "Flexible Schedule",
                      description: "Work on your own time and from anywhere—perfect for networkers and connectors.",
                    },
                    {
                      title: "Exclusive Resources",
                      description: "Get access to marketing materials, training, and dedicated support.",
                    },
                    {
                      title: "Community Impact",
                      description: "Help local businesses thrive while creating value for Evertwine users.",
                    },
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                      <div className="ml-4">
                        <h4 className="text-xl font-semibold text-white mb-1 font-sora">{benefit.title}</h4>
                        <p className="text-white/70 font-dm-sans">{benefit.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side - Form */}
            <div
              className={`w-full lg:w-1/2 transition-all duration-700 delay-300 transform ${
                isVisible && activeTab === "affiliate" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 font-sora">Apply Now</h3>

                {affiliateFormSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="h-8 w-8 text-blue-400" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2 font-sora">Application Received!</h4>
                    <p className="text-white/70 max-w-md font-dm-sans">
                      Thank you for your interest in becoming an Evertwine affiliate partner. Our team will review your
                      application and contact you within 2-3 business days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleAffiliateSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-white font-medium font-dm-sans">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={affiliateFormData.name}
                          onChange={handleAffiliateChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-white font-medium font-dm-sans">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={affiliateFormData.email}
                          onChange={handleAffiliateChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-white font-medium font-dm-sans">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={affiliateFormData.phone}
                        onChange={handleAffiliateChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans"
                        placeholder="(123) 456-7890"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="experience" className="block text-white font-medium font-dm-sans">
                        Business Development Experience
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={affiliateFormData.experience}
                        onChange={handleAffiliateChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans appearance-none"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24' stroke='white'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "1.5em 1.5em",
                        }}
                      >
                        <option value="" disabled className="bg-gray-900">
                          Select your experience level
                        </option>
                        <option value="none" className="bg-gray-900">
                          No prior experience
                        </option>
                        <option value="some" className="bg-gray-900">
                          Some experience (1-2 years)
                        </option>
                        <option value="experienced" className="bg-gray-900">
                          Experienced (3-5 years)
                        </option>
                        <option value="expert" className="bg-gray-900">
                          Expert (5+ years)
                        </option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-white font-medium font-dm-sans">
                        Why do you want to be an Evertwine affiliate?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={affiliateFormData.message}
                        onChange={handleAffiliateChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-dm-sans resize-none"
                        placeholder="Tell us about your network and why you'd be a great affiliate partner..."
                      ></textarea>
                    </div>

                    {affiliateError && (
                      <div className="bg-red-500/10 border border-red-500/30 text-red-200 p-3 rounded-lg">
                        {affiliateError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={affiliateIsSubmitting}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 font-dm-sans"
                    >
                      {affiliateIsSubmitting ? (
                        <>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
