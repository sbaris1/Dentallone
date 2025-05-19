"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, Filter, Plus, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false)

  // Sample data for appointments
  const appointments = [
    {
      id: 1,
      patientName: "Emma Johnson",
      patientId: "P10045",
      time: "09:00 AM",
      duration: "30 min",
      doctor: "Dr. Michael Chen",
      treatment: "Dental Cleaning",
      status: "Confirmed",
    },
    {
      id: 2,
      patientName: "James Wilson",
      patientId: "P10046",
      time: "10:30 AM",
      duration: "60 min",
      doctor: "Dr. Sarah Kim",
      treatment: "Root Canal",
      status: "In Progress",
    },
    {
      id: 3,
      patientName: "Olivia Martinez",
      patientId: "P10047",
      time: "11:45 AM",
      duration: "30 min",
      doctor: "Dr. Michael Chen",
      treatment: "Consultation",
      status: "Waiting",
    },
    {
      id: 4,
      patientName: "Noah Thompson",
      patientId: "P10048",
      time: "01:15 PM",
      duration: "45 min",
      doctor: "Dr. Sarah Kim",
      treatment: "Filling",
      status: "Confirmed",
    },
    {
      id: 5,
      patientName: "Sophia Davis",
      patientId: "P10049",
      time: "02:30 PM",
      duration: "60 min",
      doctor: "Dr. Michael Chen",
      treatment: "Whitening",
      status: "Confirmed",
    },
    {
      id: 6,
      patientName: "Liam Garcia",
      patientId: "P10050",
      time: "03:45 PM",
      duration: "30 min",
      doctor: "Dr. Sarah Kim",
      treatment: "Check-up",
      status: "Confirmed",
    },
    {
      id: 7,
      patientName: "Ava Rodriguez",
      patientId: "P10051",
      time: "04:30 PM",
      duration: "45 min",
      doctor: "Dr. Michael Chen",
      treatment: "X-Ray",
      status: "Confirmed",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
          <p className="text-muted-foreground">Manage and schedule patient appointments.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left sm:w-auto">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Dialog open={isAddAppointmentOpen} onOpenChange={setIsAddAppointmentOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Appointment</DialogTitle>
                <DialogDescription>Schedule a new appointment for a patient.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="patient" className="text-right">
                    Patient
                  </Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emma">Emma Johnson</SelectItem>
                        <SelectItem value="james">James Wilson</SelectItem>
                        <SelectItem value="olivia">Olivia Martinez</SelectItem>
                        <SelectItem value="noah">Noah Thompson</SelectItem>
                        <SelectItem value="sophia">Sophia Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="doctor" className="text-right">
                    Doctor
                  </Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="michael">Dr. Michael Chen</SelectItem>
                        <SelectItem value="sarah">Dr. Sarah Kim</SelectItem>
                        <SelectItem value="david">Dr. David Johnson</SelectItem>
                        <SelectItem value="lisa">Dr. Lisa Wong</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00">09:00 AM</SelectItem>
                        <SelectItem value="9:30">09:30 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="10:30">10:30 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="11:30">11:30 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="12:30">12:30 PM</SelectItem>
                        <SelectItem value="1:00">01:00 PM</SelectItem>
                        <SelectItem value="1:30">01:30 PM</SelectItem>
                        <SelectItem value="2:00">02:00 PM</SelectItem>
                        <SelectItem value="2:30">02:30 PM</SelectItem>
                        <SelectItem value="3:00">03:00 PM</SelectItem>
                        <SelectItem value="3:30">03:30 PM</SelectItem>
                        <SelectItem value="4:00">04:00 PM</SelectItem>
                        <SelectItem value="4:30">04:30 PM</SelectItem>
                        <SelectItem value="5:00">05:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <div className="col-span-3">
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="treatment" className="text-right">
                    Treatment
                  </Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select treatment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cleaning">Dental Cleaning</SelectItem>
                        <SelectItem value="filling">Filling</SelectItem>
                        <SelectItem value="rootcanal">Root Canal</SelectItem>
                        <SelectItem value="extraction">Extraction</SelectItem>
                        <SelectItem value="whitening">Whitening</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="checkup">Check-up</SelectItem>
                        <SelectItem value="xray">X-Ray</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="notes" placeholder="Add any additional notes here" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notify" className="text-right">
                    Notify Patient
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <input type="checkbox" id="notify" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                    <Label htmlFor="notify">Send SMS reminder</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddAppointmentOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={() => {
                    // Handle appointment creation logic here
                    setIsAddAppointmentOpen(false)
                  }}
                >
                  Schedule Appointment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search appointments..." className="pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="list" className="space-y-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {appointment.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{appointment.patientName}</h3>
                          <p className="text-sm text-muted-foreground">ID: {appointment.patientId}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                        <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                          <Clock className="h-3 w-3" />
                          <span>{appointment.time}</span>
                          <span className="text-muted-foreground">({appointment.duration})</span>
                        </div>
                        <div className="rounded-md bg-muted px-2 py-1 text-sm">{appointment.doctor}</div>
                        <div className="rounded-md bg-muted px-2 py-1 text-sm">{appointment.treatment}</div>
                        <Badge
                          variant={
                            appointment.status === "Confirmed"
                              ? "outline"
                              : appointment.status === "In Progress"
                                ? "default"
                                : "secondary"
                          }
                          className={
                            appointment.status === "Confirmed"
                              ? "border-green-500 text-green-500"
                              : appointment.status === "In Progress"
                                ? "bg-blue-500"
                                : ""
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                  <CardDescription>View appointments in a calendar format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground">
                    <p>Calendar view is under development.</p>
                    <p>Please use the list view for now.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Card className="hidden md:block md:w-80">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>{date ? format(date, "MMMM d, yyyy") : "Select a date"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-full flex-col items-center">
                    <div className="text-sm font-medium">{appointment.time}</div>
                    <div className="mt-1 h-full w-0.5 rounded-full bg-muted"></div>
                  </div>
                  <div className="w-full rounded-md border p-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{appointment.patientName}</div>
                      <Badge
                        variant={
                          appointment.status === "Confirmed"
                            ? "outline"
                            : appointment.status === "In Progress"
                              ? "default"
                              : "secondary"
                        }
                        className={
                          appointment.status === "Confirmed"
                            ? "border-green-500 text-green-500"
                            : appointment.status === "In Progress"
                              ? "bg-blue-500"
                              : ""
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{appointment.treatment}</div>
                    <div className="text-xs text-muted-foreground">{appointment.doctor}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Full Schedule
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
