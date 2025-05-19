"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Filter, MoreHorizontal, Phone, Plus, Search, User } from "lucide-react"

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for patients
  const patients = [
    {
      id: "P10045",
      name: "Emma Johnson",
      age: 32,
      phone: "+90 555 123 4567",
      email: "emma.johnson@example.com",
      lastVisit: "May 10, 2025",
      nextAppointment: "May 24, 2025",
      status: "Active",
      treatments: ["Cleaning", "Filling"],
      doctor: "Dr. Michael Chen",
    },
    {
      id: "P10046",
      name: "James Wilson",
      age: 45,
      phone: "+90 555 234 5678",
      email: "james.wilson@example.com",
      lastVisit: "April 28, 2025",
      nextAppointment: "May 15, 2025",
      status: "Active",
      treatments: ["Root Canal", "Crown"],
      doctor: "Dr. Sarah Kim",
    },
    {
      id: "P10047",
      name: "Olivia Martinez",
      age: 28,
      phone: "+90 555 345 6789",
      email: "olivia.martinez@example.com",
      lastVisit: "May 5, 2025",
      nextAppointment: "May 19, 2025",
      status: "Active",
      treatments: ["Consultation", "X-Ray"],
      doctor: "Dr. Michael Chen",
    },
    {
      id: "P10048",
      name: "Noah Thompson",
      age: 52,
      phone: "+90 555 456 7890",
      email: "noah.thompson@example.com",
      lastVisit: "May 8, 2025",
      nextAppointment: "May 22, 2025",
      status: "Active",
      treatments: ["Filling", "Check-up"],
      doctor: "Dr. Sarah Kim",
    },
    {
      id: "P10049",
      name: "Sophia Davis",
      age: 36,
      phone: "+90 555 567 8901",
      email: "sophia.davis@example.com",
      lastVisit: "April 30, 2025",
      nextAppointment: "May 30, 2025",
      status: "Active",
      treatments: ["Whitening", "Cleaning"],
      doctor: "Dr. Michael Chen",
    },
    {
      id: "P10050",
      name: "Liam Garcia",
      age: 41,
      phone: "+90 555 678 9012",
      email: "liam.garcia@example.com",
      lastVisit: "May 2, 2025",
      nextAppointment: "May 16, 2025",
      status: "Inactive",
      treatments: ["Check-up"],
      doctor: "Dr. Sarah Kim",
    },
    {
      id: "P10051",
      name: "Ava Rodriguez",
      age: 29,
      phone: "+90 555 789 0123",
      email: "ava.rodriguez@example.com",
      lastVisit: "May 7, 2025",
      nextAppointment: "May 21, 2025",
      status: "Active",
      treatments: ["X-Ray", "Consultation"],
      doctor: "Dr. Michael Chen",
    },
  ]

  // Filter patients based on search query
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Patients</h2>
          <p className="text-muted-foreground">Manage your patient records and information.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Patient
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients by name, ID, email, or phone..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Next Appointment</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          {patient.name}
                          <div className="text-sm text-muted-foreground">{patient.age} years</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{patient.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>{patient.nextAppointment}</TableCell>
                    <TableCell>{patient.doctor}</TableCell>
                    <TableCell>
                      <Badge
                        variant={patient.status === "Active" ? "default" : "secondary"}
                        className={patient.status === "Active" ? "bg-green-500" : ""}
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit patient</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Schedule appointment</DropdownMenuItem>
                          <DropdownMenuItem>View treatment history</DropdownMenuItem>
                          <DropdownMenuItem>View billing history</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Deactivate patient</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPatients.map((patient) => (
              <Card key={patient.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{patient.name}</CardTitle>
                        <CardDescription>{patient.id}</CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={patient.status === "Active" ? "default" : "secondary"}
                      className={patient.status === "Active" ? "bg-green-500" : ""}
                    >
                      {patient.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{patient.age} years old</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>Last visit: {patient.lastVisit}</div>
                        <div>Next appointment: {patient.nextAppointment}</div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 font-medium">Recent Treatments:</div>
                      <div className="flex flex-wrap gap-1">
                        {patient.treatments.map((treatment, index) => (
                          <Badge key={index} variant="outline">
                            {treatment}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
