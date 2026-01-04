"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <Card>
          <CardContent className="p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to take control of your healthcare?
            </h2>

            <p className="text-muted-foreground mb-8">
              Join thousands of users who have simplified their healthcare
              journey.
            </p>

            <div className="flex gap-4">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/sign-up">Sign Up Now</Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
