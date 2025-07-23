"use client"

import { useState, useEffect } from "react"
import { sendContactEmail } from "@/app/actions/send-contact-email"
import Footer from "@/components/layout/Footer"
import { ArrowRight, CheckCircle, Loader2, AlertTriangle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [selectedSubject, setSelectedSubject] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const getSubjectInfo = (subject: string) => {
    switch (subject) {
      case "General Inquiry":
        return (
          <ul className="list-disc list-inside space-y-1">
            <li>Your question or topic of interest</li>
            <li>Any relevant background information</li>
          </ul>
        )
      case "Technical Support":
        return (
          <ul className="list-disc list-inside space-y-1">
            <li>Device type and operating system version</li>
            <li>App version (if applicable)</li>
            <li>Detailed description of the issue</li>
            <li>Steps you've already tried to resolve it</li>
          </ul>
        )
      case "Account Issues":
        return (
          <ul className="list-disc list-inside space-y-1">
            <li>Your account email address</li>
            <li>Description of the account problem</li>
            <li>When the issue started</li>
            <li>Any error messages you've received</li>
          </ul>
        )
      case "Delete Account/Data":
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-red-300 mb-1">Account Deletion Request for Evertwine</h5>
                <p className="text-red-200 text-sm">
                  This action will permanently delete your Evertwine account and cannot be undone.
                </p>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-yellow-300 mb-3">Steps to Request Account Deletion:</h5>
              <ol className="list-decimal list-inside space-y-2 text-yellow-100 text-sm">
                <li>Include your registered email address in the message below</li>
                <li>Write "DELETE MY ACCOUNT" in the message to confirm your request</li>
                <li>Provide a reason for deletion (optional but helpful for improving our service)</li>
                <li>Submit this form - our team will process your request within 48 hours</li>
                <li>You will receive a confirmation email once your account is deleted</li>
              </ol>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h5 className="font-semibold text-blue-300 mb-3">Data Deletion & Retention Policy:</h5>

              <div className="space-y-3 text-sm">
                <div>
                  <h6 className="font-medium text-blue-200 mb-1">Data That Will Be Deleted Immediately:</h6>
                  <ul className="list-disc list-inside space-y-1 text-blue-100 ml-2">
                    <li>Profile information (name, bio, photos)</li>
                    <li>Account preferences and settings</li>
                    <li>Meetup history and RSVPs</li>
                    <li>Messages and communications</li>
                    <li>Location data and check-ins</li>
                    <li>Verification photos and documents</li>
                  </ul>
                </div>

                <div>
                  <h6 className="font-medium text-blue-200 mb-1">Data Retained for Legal/Safety Purposes (90 days):</h6>
                  <ul className="list-disc list-inside space-y-1 text-blue-100 ml-2">
                    <li>Safety reports and moderation records</li>
                    <li>Transaction records (if applicable)</li>
                    <li>Backup copies in secure storage</li>
                  </ul>
                  <p className="text-blue-200 text-xs mt-2 italic">
                    This data is kept for safety, legal compliance, and fraud prevention, then permanently deleted after
                    90 days.
                  </p>
                </div>

                <div>
                  <h6 className="font-medium text-blue-200 mb-1">Anonymized Analytics Data:</h6>
                  <p className="text-blue-100 ml-2">
                    Some usage statistics may be retained in anonymized form for product improvement, but cannot be
                    linked back to your identity.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center p-3 bg-gray-500/10 border border-gray-500/30 rounded-lg">
              <p className="text-gray-300 text-sm">
                <strong>Need help instead of deletion?</strong> Consider contacting us about account issues first -
                we're here to help resolve any problems you're experiencing with Evertwine.
              </p>
            </div>
          </div>
        )
      case "Business Partnership":
        return (
          <ul className="list-disc list-inside space-y-1">
            <li>Your business name and type</li>
            <li>Location of your business</li>
            <li>How you'd like to partner with Evertwine</li>
            <li>Your contact information</li>
          </ul>
        )
      case "Safety Concerns":
        return (
          <div>
            <p className="mb-2 font-medium text-red-300">🚨 Safety Report</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Detailed description of the safety concern</li>
              <li>Date and time of incident (if applicable)</li>
              <li>Username or profile information of involved parties</li>
              <li>Any screenshots or evidence (attach separately)</li>
            </ul>
          </div>
        )
      case "Feature Request":
        return (
          <ul className="list-disc list-inside space-y-1">
            <li>Detailed description of the requested feature</li>
            <li>How this feature would benefit users</li>
            <li>Any examples from other apps (if applicable)</li>
          </ul>
        )
      case "Bug Report":
        return (
          <ul className="list-disc list-inside space-y-1">
            <li>Device type and operating system version</li>
            <li>App version</li>
            <li>Steps to reproduce the bug</li>
            <li>Expected vs. actual behavior</li>
            <li>Screenshots or screen recordings (if helpful)</li>
          </ul>
        )
      case "Other":
        return (
          <ul className="list-disc list-inside space-y-1">
            <li>Clear description of your inquiry</li>
            <li>Any relevant details or context</li>
            <li>How we can best assist you</li>
          </ul>
        )
      default:
        return null
    }
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await sendContactEmail({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: selectedSubject,
        message: formData.get("message") as string,
      })

      if (result.success) {
        setIsSuccess(true)
        setSelectedSubject("") // Add this line
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        if (form) form.reset()
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  }

  const formFieldVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    focused: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.3)",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  }

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const successItemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header - using the legal navbar style */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 bg-black"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      >
        <div className="container mx-auto px-6 py-4 md:px-8 md:py-8 h-[96px] md:h-[110px] flex items-center">
          <div className="flex items-center justify-between w-full">
            <motion.div
              className="flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/evertwine-logo.png"
                  alt="Evertwine logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3"
                />
                <span className="text-white text-2xl md:text-3xl font-bold tracking-tight">Evertwine</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
            >
              <Link
                href="/"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium border border-white/20 hover:scale-105 transform transition-transform"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Contact Section */}
      <section className="pt-[110px] md:pt-[130px] pb-20 px-4 md:px-8">
        <motion.div
          className="container mx-auto max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
            >
              Contact Us
            </motion.h1>
            <motion.p
              className="text-white/80 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Have questions or feedback? We'd love to hear from you. Fill out the form below and our team will get back
              to you as soon as possible.
            </motion.p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl"
            variants={itemVariants}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.7 }}
            whileHover={{ boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)" }}
          >
            {isSuccess ? (
              <motion.div
                className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center"
                variants={successVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={successItemVariants}>
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                </motion.div>
                <motion.h3 className="text-xl font-semibold text-white mb-2" variants={successItemVariants}>
                  Message Sent!
                </motion.h3>
                <motion.p className="text-white/80 mb-4" variants={successItemVariants}>
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </motion.p>
                <motion.button
                  onClick={() => setIsSuccess(false)}
                  className="text-white bg-blue-900 hover:bg-blue-800 px-6 py-2 rounded-full transition-colors"
                  variants={successItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send another message
                </motion.button>
              </motion.div>
            ) : (
              <form id="contact-form" action={handleSubmit} className="space-y-6">
                <motion.div variants={formFieldVariants} animate={focusedField === "name" ? "focused" : "visible"}>
                  <label htmlFor="name" className="block text-white/90 mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
                    placeholder="Your name"
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>

                <motion.div variants={formFieldVariants} animate={focusedField === "email" ? "focused" : "visible"}>
                  <label htmlFor="email" className="block text-white/90 mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
                    placeholder="your.email@example.com"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>

                <motion.div variants={formFieldVariants} animate={focusedField === "subject" ? "focused" : "visible"}>
                  <label htmlFor="subject" className="block text-white/90 mb-2 font-medium">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 appearance-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24' stroke='white'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1.5em 1.5em",
                    }}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    value={selectedSubject}
                  >
                    <option value="" disabled className="bg-gray-900">
                      Select a topic
                    </option>
                    <option value="General Inquiry" className="bg-gray-900">
                      General Inquiry
                    </option>
                    <option value="Technical Support" className="bg-gray-900">
                      Technical Support
                    </option>
                    <option value="Account Issues" className="bg-gray-900">
                      Account Issues
                    </option>
                    <option value="Delete Account/Data" className="bg-gray-900">
                      Delete Account/Data
                    </option>
                    <option value="Business Partnership" className="bg-gray-900">
                      Business Partnership
                    </option>
                    <option value="Safety Concerns" className="bg-gray-900">
                      Safety Concerns
                    </option>
                    <option value="Feature Request" className="bg-gray-900">
                      Feature Request
                    </option>
                    <option value="Bug Report" className="bg-gray-900">
                      Bug Report
                    </option>
                    <option value="Other" className="bg-gray-900">
                      Other
                    </option>
                  </select>
                </motion.div>

                {selectedSubject && (
                  <motion.div
                    className={`border rounded-lg p-4 ${
                      selectedSubject === "Delete Account/Data"
                        ? "bg-red-500/5 border-red-500/20"
                        : "bg-blue-500/10 border-blue-500/30"
                    }`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-white font-medium mb-2">
                      {selectedSubject === "Delete Account/Data"
                        ? "Account Deletion Information:"
                        : "What to include in your message:"}
                    </h4>
                    <div className="text-white/80 text-sm">{getSubjectInfo(selectedSubject)}</div>
                  </motion.div>
                )}

                <motion.div variants={formFieldVariants} animate={focusedField === "message" ? "focused" : "visible"}>
                  <label htmlFor="message" className="block text-white/90 mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={selectedSubject === "Delete Account/Data" ? 4 : 5}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
                    placeholder={
                      selectedSubject === "Delete Account/Data"
                        ? "Please include your registered email address and write 'DELETE MY ACCOUNT' to confirm your request..."
                        : "Your message here..."
                    }
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  ></textarea>
                </motion.div>

                {error && (
                  <motion.div
                    className="bg-red-500/10 border border-red-500/30 text-red-200 p-3 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full bg-white text-black hover:bg-white/90 font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 3, duration: 0.8 }}
                      >
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.div>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
