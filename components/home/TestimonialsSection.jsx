"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-emerald-900/30 border-emerald-700/30 text-emerald-400">
            Success Stories
          </Badge>

          <h2 className="text-4xl font-bold text-white mt-4">
            What Our Users Say
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
                delay: index * 0.12,
              }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              {/* top glow line */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 hover:opacity-100 transition-opacity" />

              <Card className="h-full transition-colors duration-300 hover:border-emerald-500/30">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-white">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>

                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    &quot;{t.quote}&quot;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
