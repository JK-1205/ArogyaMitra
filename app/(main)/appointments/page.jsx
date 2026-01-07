import { getPatientAppointments } from "@/actions/patient";
import { AppointmentCard } from "@/components/appointment-card";
import { PageHeader } from "@/components/page-header";
import { Calendar, Phone, Stethoscope, Clock, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/onboarding";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function PatientAppointmentsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "PATIENT") {
    redirect("/onboarding");
  }

  const { appointments, error } = await getPatientAppointments();

  // Separate appointments by status
  const scheduledAppointments =
    appointments?.filter((apt) => apt.status === "SCHEDULED") || [];
  const completedAppointments =
    appointments?.filter((apt) => apt.status === "COMPLETED") || [];
  const cancelledAppointments =
    appointments?.filter((apt) => apt.status === "CANCELLED") || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        icon={<Calendar />}
        title="My Health Dashboard"
        backLink="/doctors"
        backLabel="Find Doctors"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Credits Card */}
        <Card className="border-emerald-900/20 bg-gradient-to-br from-emerald-900/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Available Credits
                </p>
                <p className="text-3xl font-bold text-white">{user.credits}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.floor(user.credits / 2)} consultations available
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
                Get More Credits
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Scheduled Appointments */}
        <Card className="border-emerald-900/20 bg-gradient-to-br from-blue-900/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Upcoming Appointments
                </p>
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

        {/* Total Appointments */}
        <Card className="border-emerald-900/20 bg-gradient-to-br from-purple-900/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Consultations
                </p>
                <p className="text-3xl font-bold text-white">
                  {appointments?.length || 0}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {completedAppointments.length} completed
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
          <Card className="border-emerald-900/20 hover:border-emerald-700/40 transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-900/20 p-3 rounded-full group-hover:bg-emerald-900/30 transition-colors">
                  <Stethoscope className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Book New Appointment
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Find and consult with verified doctors
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/voice-assistant">
          <Card className="border-emerald-900/20 hover:border-emerald-700/40 transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-900/20 p-3 rounded-full group-hover:bg-blue-900/30 transition-colors">
                  <Phone className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    AI Voice Assistant
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get instant health guidance via voice
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Appointments Section */}
      {error ? (
        <Card className="border-red-900/20">
          <CardContent className="p-8 text-center">
            <p className="text-red-400">Error: {error}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Upcoming Appointments */}
          {scheduledAppointments.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">
                  Upcoming Appointments
                </h2>
                <Badge className="bg-amber-900/30 text-amber-400 border-amber-900/40">
                  {scheduledAppointments.length}
                </Badge>
              </div>
              <div className="space-y-4">
                {scheduledAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    userRole="PATIENT"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed Appointments */}
          {completedAppointments.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">
                  Past Consultations
                </h2>
                <Badge className="bg-emerald-900/30 text-emerald-400 border-emerald-900/40">
                  {completedAppointments.length}
                </Badge>
              </div>
              <div className="space-y-4">
                {completedAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    userRole="PATIENT"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Cancelled Appointments */}
          {cancelledAppointments.length > 0 && (
            <details className="group">
              <summary className="cursor-pointer list-none">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-bold text-white">
                    Cancelled Appointments
                  </h2>
                  <Badge className="bg-red-900/30 text-red-400 border-red-900/40">
                    {cancelledAppointments.length}
                  </Badge>
                  <span className="ml-auto text-sm text-muted-foreground group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </div>
              </summary>
              <div className="space-y-4 mt-4">
                {cancelledAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    userRole="PATIENT"
                  />
                ))}
              </div>
            </details>
          )}

          {/* Empty State */}
          {appointments?.length === 0 && (
            <Card className="border-emerald-900/20">
              <CardContent className="py-16">
                <div className="text-center max-w-md mx-auto">
                  <div className="bg-emerald-900/20 p-4 rounded-full w-fit mx-auto mb-4">
                    <Calendar className="h-12 w-12 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    No Appointments Yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start your healthcare journey by booking your first
                    consultation with our verified doctors.
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
      )}
    </div>
  );
}
