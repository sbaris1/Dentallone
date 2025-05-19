"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Filter, Mail, MoreHorizontal, Phone, Plus, Search, Star } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function DoctorsPage() {
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for doctors
  const doctors = [
    {
      id: "D1001",
      name: "Dr. Michael Chen",
      specialty: "General Dentistry",
      phone: "+90 555 123 4567",
      email: "michael.chen@dentallone.com",
      branch: "Main Branch",
      patients: 215,
      appointments: {
        today: 8,
        thisWeek: 42,
      },
      rating: 4.8,
      status: "Active",
      availability: "Full-time",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "D1002",
      name: "Dr. Sarah Kim",
      specialty: "Orthodontics",
      phone: "+90 555 234 5678",
      email: "sarah.kim@dentallone.com",
      branch: "Main Branch",
      patients: 180,
      appointments: {
        today: 6,
        thisWeek: 35,
      },
      rating: 4.9,
      status: "Active",
      availability: "Full-time",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "D1003",
      name: "Dr. David Johnson",
      specialty: "Endodontics",
      phone: "+90 555 345 6789",
      email: "david.johnson@dentallone.com",
      branch: "North Branch",
      patients: 165,
      appointments: {
        today: 5,
        thisWeek: 28,
      },
      rating: 4.7,
      status: "Active",
      availability: "Part-time",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "D1004",
      name: "Dr. Lisa Wong",
      specialty: "Periodontics",
      phone: "+90 555 456 7890",
      email: "lisa.wong@dentallone.com",
      branch: "East Branch",
      patients: 140,
      appointments: {
        today: 4,
        thisWeek: 25,
      },
      rating: 4.6,
      status: "Active",
      availability: "Full-time",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "D1005",
      name: "Dr. Robert Martinez",
      specialty: "Oral Surgery",
      phone: "+90 555 567 8901",
      email: "robert.martinez@dentallone.com",
      branch: "West Branch",
      patients: 120,
      appointments: {
        today: 3,
        thisWeek: 20,
      },
      rating: 4.5,
      status: "Active",
      availability: "Full-time",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "D1006",
      name: "Dr. Emily Taylor",
      specialty: "Pediatric Dentistry",
      phone: "+90 555 678 9012",
      email: "emily.taylor@dentallone.com",
      branch: "Main Branch",
      patients: 190,
      appointments: {
        today: 7,
        thisWeek: 38,
      },
      rating: 4.9,
      status: "Active",
      availability: "Full-time",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "D1007",
      name: "Dr. James Wilson",
      specialty: "Prosthodontics",
      phone: "+90 555 789 0123",
      email: "james.wilson@dentallone.com",
      branch: "North Branch",
      patients: 150,
      appointments: {
        today: 5,
        thisWeek: 30,
      },
      rating: 4.7,
      status: "On Leave",
      availability: "Full-time",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.branch.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Doctors</h2>
          <p className="text-muted-foreground">Manage your dental professionals and specialists.</p>
        </div>
        <Dialog open={isAddDoctorOpen} onOpenChange={setIsAddDoctorOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              Add New Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
              <DialogDescription>Fill in the details to add a new dental professional.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="doctor-name" className="text-right">
                  Full Name
                </Label>
                <Input id="doctor-name" placeholder="Dr. Full Name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialty" className="text-right">
                  Specialty
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Dentistry</SelectItem>
                    <SelectItem value="orthodontics">Orthodontics</SelectItem>
                    <SelectItem value="endodontics">Endodontics</SelectItem>
                    <SelectItem value="periodontics">Periodontics</SelectItem>
                    <SelectItem value="oral-surgery">Oral Surgery</SelectItem>
                    <SelectItem value="pediatric">Pediatric Dentistry</SelectItem>
                    <SelectItem value="prosthodontics">Prosthodontics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="branch" className="text-right">
                  Branch
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Branch</SelectItem>
                    <SelectItem value="north">North Branch</SelectItem>
                    <SelectItem value="east">East Branch</SelectItem>
                    <SelectItem value="west">West Branch</SelectItem>
                    <SelectItem value="south">South Branch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" placeholder="+90 555 123 4567" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" placeholder="doctor@dentallone.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="availability" className="text-right">
                  Availability
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="weekends">Weekends Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDoctorOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => {
                  // Handle doctor creation logic here
                  setIsAddDoctorOpen(false)
                }}
              >
                Add Doctor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search doctors by name, ID, specialty, or branch..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            <SelectItem value="general">General Dentistry</SelectItem>
            <SelectItem value="orthodontics">Orthodontics</SelectItem>
            <SelectItem value="endodontics">Endodontics</SelectItem>
            <SelectItem value="periodontics">Periodontics</SelectItem>
            <SelectItem value="oral-surgery">Oral Surgery</SelectItem>
            <SelectItem value="pediatric">Pediatric Dentistry</SelectItem>
            <SelectItem value="prosthodontics">Prosthodontics</SelectItem>
          </SelectContent>
        </Select>
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
                  <TableHead>Doctor ID</TableHead>
                  <TableHead>Name & Specialty</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Today's Appointments</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                          <AvatarFallback>
                            {doctor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          {doctor.name}
                          <div className="text-sm text-muted-foreground">{doctor.specialty}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{doctor.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{doctor.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{doctor.branch}</TableCell>
                    <TableCell>{doctor.patients}</TableCell>
                    <TableCell>
                      {doctor.appointments.today} / {doctor.appointments.thisWeek} this week
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{doctor.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={doctor.status === "Active" ? "default" : "secondary"}
                        className={doctor.status === "Active" ? "bg-green-500" : ""}
                      >
                        {doctor.status}
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
                          <DropdownMenuItem>Edit details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View schedule</DropdownMenuItem>
                          <DropdownMenuItem>View patients</DropdownMenuItem>
                          <DropdownMenuItem>Performance metrics</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
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
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden">
                <div className="aspect-video w-full bg-muted">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="h-full w-full object-cover"
                    width={400}
                    height={225}
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <CardDescription>{doctor.specialty}</CardDescription>
                    </div>
                    <Badge
                      variant={doctor.status === "Active" ? "default" : "secondary"}
                      className={doctor.status === "Active" ? "bg-green-500" : ""}
                    >
                      {doctor.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Branch:</span>
                      <span>{doctor.branch}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Patients:</span>
                      <span>{doctor.patients}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Today's Appointments:</span>
                      <span>{doctor.appointments.today}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Rating:</span>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{doctor.rating}</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span>Weekly Schedule Completion</span>
                        <span>{Math.round((doctor.appointments.today / 8) * 100)}%</span>
                      </div>
                      <Progress value={(doctor.appointments.today / 8) * 100} className="h-1" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-4 pt-0">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    Schedule
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
