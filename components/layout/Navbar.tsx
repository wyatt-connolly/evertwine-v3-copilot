"use client"
import { Menu } from "lucide-react"
import type React from "react"
import { smoothScrollTo } from "@/utils/smooth-scroll"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavbarProps {
  scrolled: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Navbar({ scrolled, setMobileMenuOpen }: NavbarProps) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()

    if (!isHomePage) {
      // If not on home page, navigate to home page with hash
      window.location.href = `/#${targetId}`
      return
    }

    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Get the top position of the target element relative to the viewport
      const targetPosition = targetElement.getBoundingClientRect().top

      // Add the current scroll position to get the absolute position
      const offsetPosition = targetPosition + window.scrollY - 110 // Adjust for header height

      // Use our custom smooth scroll function (1 second duration)
      smoothScrollTo(offsetPosition, 1000)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ease-in-out ${
        scrolled || !isHomePage ? "bg-black" : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 py-4 md:px-8 md:py-8 h-[96px] md:h-[110px] flex items-center">
        <div className="flex items-center justify-between w-full lg:justify-center relative">
          <div className="flex items-center lg:absolute lg:left-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/evertwine-logo.png"
                alt="Evertwine logo"
                width={32}
                height={32}
                className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3"
              />
              <span className="text-white text-2xl md:text-3xl font-bold tracking-tight font-sora">Evertwine</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-8 w-8 md:h-10 md:w-10 text-white" />
          </button>

          {/* Desktop Navigation - Now Centered */}
          <div className="hidden lg:block">
            <div
              className={`rounded-full px-8 py-3 transition-colors duration-500 ${
                scrolled || !isHomePage ? "bg-white/5" : "bg-white/10 backdrop-blur-sm"
              }`}
            >
              <ul className="flex space-x-8 font-dm-sans">
                <li>
                  <a
                    href={isHomePage ? "#overview" : "/#overview"}
                    onClick={isHomePage ? (e) => handleNavClick(e, "overview") : undefined}
                    className="text-white/90 hover:text-white font-light text-base"
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    href={isHomePage ? "#features" : "/#features"}
                    onClick={isHomePage ? (e) => handleNavClick(e, "features") : undefined}
                    className="text-white/90 hover:text-white font-light text-base"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href={isHomePage ? "#testimonials" : "/#testimonials"}
                    onClick={isHomePage ? (e) => handleNavClick(e, "testimonials") : undefined}
                    className="text-white/90 hover:text-white font-light text-base"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href={isHomePage ? "#download" : "/#download"}
                    onClick={isHomePage ? (e) => handleNavClick(e, "download") : undefined}
                    className="text-white/90 hover:text-white font-light text-base"
                  >
                    Download
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Link - Right Side */}
          <div className="hidden lg:block lg:absolute lg:right-8">
            <Link
              href="/contact"
              className="text-white hover:text-white/80 font-medium bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
