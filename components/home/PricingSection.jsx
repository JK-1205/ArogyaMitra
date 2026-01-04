"use client";

import { Stethoscope } from "lucide-react";
import Pricing from "@/components/pricing";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { creditBenefits } from "@/lib/data";
import { motion } from "framer-motion";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <Badge className="bg-emerald-900/30 border-emerald-700/30 text-emerald-400">
            Affordable Healthcare
          </Badge>

          <h2 className="text-4xl font-bold text-white mt-4">
            Consultation Packages
          </h2>
        </motion.div>

        {/* PRICING TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Pricing />
        </motion.div>

        {/* CREDIT SYSTEM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          <Card className="mt-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-emerald-400" />
                How Our Credit System Works
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3">
                {creditBenefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-foreground"
                    dangerouslySetInnerHTML={{ __html: benefit }}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
