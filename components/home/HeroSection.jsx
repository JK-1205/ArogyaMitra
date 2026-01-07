"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-24 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl"
        />

        {/* Secondary glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl"
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="bg-emerald-900/30 border-emerald-700/30 text-emerald-400 px-4 py-2 text-sm font-medium hover:bg-emerald-800/40 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Trusted by 10,000+ patients
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Your health, <br />
                <span className="gradient-title relative inline-block">
                  simplified
                  {/* Underline decoration */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 origin-left"
                  />
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Book appointments, consult via video, and manage your healthcare
              journey in one secure platform. Access quality care anytime,
              anywhere.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: Shield, text: "100% Secure" },
                { icon: Zap, text: "Instant Booking" },
                { icon: Users, text: "500+ Doctors" },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
                >
                  <item.icon className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm text-white font-medium">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 group relative overflow-hidden"
              >
                <Link href="/onboarding" className="relative z-10">
                  <span className="relative z-10">Get Started Free</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all duration-300 group"
              >
                <Link href="/doctors">
                  Browse Doctors
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center gap-8 pt-4 border-t border-white/10"
            >
              <div>
                <p className="text-2xl font-bold text-white">10k+</p>
                <p className="text-sm text-muted-foreground">Happy Patients</p>
              </div>
              <div className="h-12 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-sm text-muted-foreground">
                  Verified Doctors
                </p>
              </div>
              <div className="h-12 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">50k+</p>
                <p className="text-sm text-muted-foreground">Consultations</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10">
              {/* Floating border effect */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(16, 185, 129, 0.4)",
                    "0 0 0 20px rgba(16, 185, 129, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl"
              />

              <Image
                src="/banner2.png"
                alt="Doctor consultation"
                fill
                priority
                className="object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-background/80 backdrop-blur-xl border border-emerald-900/30 rounded-2xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500 rounded-full p-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    100% Secure
                  </p>
                  <p className="text-xs text-muted-foreground">
                    End-to-end encryption
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -top-6 -right-6 bg-background/80 backdrop-blur-xl border border-emerald-900/30 rounded-2xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="bg-teal-500 rounded-full p-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    24/7 Available
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Instant consultations
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
