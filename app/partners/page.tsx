"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import Navbar from "@/components/layout/Navbar"
import MobileMenu from "@/components/layout/MobileMenu"
import PartnerTabsSection from "@/components/sections/PartnerTabsSection"
import Footer from "@/components/layout/Footer"

export default function PartnersPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuAnimation, setMenuAnimation] = useState<string | null>(null)

  const [partnerSectionRef, isPartnerSectionVisible] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const handleCloseMenu = () => {
    setMenuAnimation("slideOut")
    setTimeout(() => {
      setMobileMenuOpen(false)
      setMenuAnimation(null)
    }, 300)
  }

  useEffect(() => {
    if (mobileMenuOpen) {
      setMenuAnimation("slideIn")
    }
  }, [mobileMenuOpen])

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

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar scrolled={scrolled} setMobileMenuOpen={setMobileMenuOpen} />
      <MobileMenu mobileMenuOpen={mobileMenuOpen} menuAnimation={menuAnimation} handleCloseMenu={handleCloseMenu} />

      {/* Partner Tabs Section */}
      <div id="partners" ref={partnerSectionRef} className="pt-32">
        <PartnerTabsSection isVisible={isPartnerSectionVisible} />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
