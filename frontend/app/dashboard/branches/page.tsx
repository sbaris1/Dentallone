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
import { Building2, MapPin, Phone, Mail, Users, Calendar, DollarSign, MoreHorizontal, Plus } from "lucide-react"

export default function BranchesPage() {
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false)

  const branches = [
    {
      id: 1,
      name: "Main Branch",
      address: "123 Dental Street, Istanbul",
      phone: "+90 212 555 1234",
      email: "main@dentallone.com",
      doctors: 8,
      patients: 520,
      monthlyAppointments: 412,
      monthlyRevenue: 24800,
      status: "active",
    },
    {
      id: 2,
      name: "North Branch",
      address: "456 Smile Avenue, Istanbul",
      phone: "+90 212 555 5678",
      email: "north@dentallone.com",
      doctors: 6,
      patients: 380,
      monthlyAppointments: 310,
      monthlyRevenue: 18600,
      status: "active",
    },
    {
      id: 3,
      name: "East Branch",
      address: "789 Tooth Road, Istanbul",
      phone: "+90 216 555 9012",
      email: "east@dentallone.com",
      doctors: 4,
      patients: 290,
      monthlyAppointments: 245,
      monthlyRevenue: 14200,
      status: "active",
    },
    {
      id: 4,
      name: "West Branch",
      address: "321 Gum Boulevard, Istanbul",
      phone: "+90 212 555 3456",
      email: "west@dentallone.com",
      doctors: 7,
      patients: 410,
      monthlyAppointments: 350,
      monthlyRevenue: 19800,
      status: "active",
    },
    {
      id: 5,
      name: "South Branch",
      address: "654 Floss Street, Istanbul",
      phone: "+90 216 555 7890",
      email: "south@dentallone.com",
      doctors: 0,
      patients: 0,
      monthlyAppointments: 0,
      monthlyRevenue: 0,
      status: "pending",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Branch Management</h2>
          <p className="text-muted-foreground">Manage all your dental clinic branches from one place.</p>
        </div>
        <Dialog open={isAddBranchOpen} onOpenChange={setIsAddBranchOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              Add New Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Branch</DialogTitle>
              <DialogDescription>Fill in the details to create a new branch location.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="branch-name" className="text-right">
                  Branch Name
                </Label>
                <Input id="branch-name" placeholder="e.g. Downtown Branch" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input id="address" placeholder="Full address" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" placeholder="+90 212 555 1234" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" placeholder="branch@dentallone.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="manager" className="text-right">
                  Branch Manager
                </Label>
                <Input id="manager" placeholder="Manager name" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddBranchOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => {
                  // Handle branch creation logic here
                  setIsAddBranchOpen(false)
                }}
              >
                Create Branch
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  <TableHead>Branch Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Doctors</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Monthly Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {branches.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell className="font-medium">{branch.name}</TableCell>
                    <TableCell>{branch.address}</TableCell>
                    <TableCell>
                      {branch.phone}
                      <br />
                      <span className="text-muted-foreground">{branch.email}</span>
                    </TableCell>
                    <TableCell>{branch.doctors}</TableCell>
                    <TableCell>{branch.patients}</TableCell>
                    <TableCell>${branch.monthlyRevenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={branch.status === "active" ? "default" : "secondary"}
                        className={branch.status === "active" ? "bg-green-500" : ""}
                      >
                        {branch.status === "active" ? "Active" : "Pending"}
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
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit branch</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Manage staff</DropdownMenuItem>
                          <DropdownMenuItem>View reports</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Deactivate branch</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="grid">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <Card key={branch.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle>{branch.name}</CardTitle>
                    <Badge
                      variant={branch.status === "active" ? "default" : "secondary"}
                      className={branch.status === "active" ? "bg-green-500" : ""}
                    >
                      {branch.status === "active" ? "Active" : "Pending"}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {branch.address}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      {branch.phone}
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      {branch.email}
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="flex flex-col items-center justify-center rounded-lg border p-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="mt-1 text-xl font-bold">{branch.doctors}</span>
                        <span className="text-xs text-muted-foreground">Doctors</span>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-lg border p-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="mt-1 text-xl font-bold">{branch.monthlyAppointments}</span>
                        <span className="text-xs text-muted-foreground">Appts/mo</span>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-lg border p-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="mt-1 text-xl font-bold">${(branch.monthlyRevenue / 1000).toFixed(1)}k</span>
                        <span className="text-xs text-muted-foreground">Revenue</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit branch</DropdownMenuItem>
                      <DropdownMenuItem>Manage staff</DropdownMenuItem>
                      <DropdownMenuItem>View reports</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Deactivate branch</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
            <Card className="flex h-full flex-col items-center justify-center p-6">
              <Building2 className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-medium">Add New Branch</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Expand your dental clinic network by adding a new branch location.
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setIsAddBranchOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Branch
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
