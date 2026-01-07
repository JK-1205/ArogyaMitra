// app/(main)/dashboard/page.jsx - NEW FILE

import { getPatientAppointments } from "@/actions/patient";
import { AppointmentCard } from "@/components/appointment-card";
import {
  Calendar,
  Phone,
  Stethoscope,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/onboarding";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function PatientDashboard() {
  const user = await getCurrentUser();

  if (!user || user.role !== "PATIENT") {
    redirect("/onboarding");
  }

  const { appointments } = await getPatientAppointments();

  const scheduledAppointments =
    appointments?.filter((apt) => apt.status === "SCHEDULED") || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, {user.name?.split(" ")[0] || "Patient"}! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Here's your health dashboard overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-emerald-900/20 bg-gradient-to-br from-emerald-900/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Available Credits
                </p>
                <p className="text-3xl font-bold text-white">{user.credits}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.floor(user.credits / 2)} consultations left
                </p>
              </div>
              <div className="bg-emerald-900/20 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
            <Link href="/pricing">
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 border-emerald-900/30 hover:bg-emerald-900/20"
              >
                Top Up Credits
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-emerald-900/20 bg-gradient-to-br from-blue-900/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Upcoming</p>
                <p className="text-3xl font-bold text-white">
                  {scheduledAppointments.length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Active consultations
                </p>
              </div>
              <div className="bg-blue-900/20 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-900/20 bg-gradient-to-br from-purple-900/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total</p>
                <p className="text-3xl font-bold text-white">
                  {appointments?.length || 0}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Consultations done
                </p>
              </div>
              <div className="bg-purple-900/20 p-3 rounded-full">
                <Stethoscope className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link href="/doctors">
          <Card className="border-emerald-900/20 hover:border-emerald-700/40 transition-all cursor-pointer group h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-900/20 p-3 rounded-full group-hover:bg-emerald-900/30 transition-colors">
                    <Stethoscope className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Book Appointment
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Find verified doctors
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/voice-assistant">
          <Card className="border-emerald-900/20 hover:border-emerald-700/40 transition-all cursor-pointer group h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-900/20 p-3 rounded-full group-hover:bg-blue-900/30 transition-colors">
                    <Phone className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      AI Voice Assistant
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Instant health guidance
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Appointments Section */}
      {scheduledAppointments.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">
              Upcoming Appointments
            </h2>
            <Link href="/appointments">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-900/30"
              >
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {scheduledAppointments.slice(0, 3).map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                userRole="PATIENT"
              />
            ))}
          </div>
        </div>
      ) : (
        <Card className="border-emerald-900/20">
          <CardContent className="py-16">
            <div className="text-center max-w-md mx-auto">
              <div className="bg-emerald-900/20 p-4 rounded-full w-fit mx-auto mb-4">
                <Calendar className="h-12 w-12 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Upcoming Appointments
              </h3>
              <p className="text-muted-foreground mb-6">
                Book your first consultation with our verified doctors
              </p>
              <Link href="/doctors">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Find a Doctor
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
