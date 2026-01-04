"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/data";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* HEADER – KEEP AS IS */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-muted-foreground">
            Our platform makes healthcare accessible with just a few clicks
          </p>
        </motion.div>

        {/* GRID – KEEP SCROLL EFFECT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.18 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* BALANCED CARD */}
              <Card className="group relative h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* subtle gradient edge */}
                <div className="pointer-events-none absolute inset-0 rounded-xl border border-transparent group-hover:border-emerald-500/30 transition-colors duration-300" />

                <CardHeader>
                  <div className="mb-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>

                  <CardTitle className="transition-colors duration-300 group-hover:text-emerald-400">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
