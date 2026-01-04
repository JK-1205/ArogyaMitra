"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            <Badge className="bg-emerald-900/30 border-emerald-700/30 text-emerald-400 transition-all duration-300 hover:bg-emerald-800/40 hover:scale-105 hover:shadow-md">
              Healthcare made simple
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Connect with doctors <br />
              <span className="gradient-title transition-all duration-500 hover:tracking-wide">
                anytime, anywhere
              </span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-md transition-colors duration-300 hover:text-foreground">
              Book appointments, consult via video, and manage your healthcare
              journey in one secure platform.
            </p>

            <div className="flex gap-4">
              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 hover:scale-105 group"
              >
                <Link href="/onboarding">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="transition-all duration-300 hover:scale-105 hover:border-emerald-500 hover:text-emerald-400"
              >
                <Link href="/doctors">Find Doctors</Link>
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE – SIMPLE & STATIC */}
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/banner2.png"
              alt="Doctor consultation"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
