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
import { Filter, MoreHorizontal, Pencil, Plus, Search, Timer } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function TreatmentsPage() {
  const [isAddTreatmentOpen, setIsAddTreatmentOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for treatments
  const treatments = [
    {
      id: "T1001",
      name: "Dental Cleaning",
      category: "Preventive",
      duration: 30,
      price: 120,
      description: "Professional cleaning to remove plaque and tartar buildup.",
      requiredEquipment: ["Ultrasonic scaler", "Polisher", "Suction"],
      insuranceCovered: true,
      status: "Active",
    },
    {
      id: "T1002",
      name: "Dental Filling",
      category: "Restorative",
      duration: 45,
      price: 180,
      description: "Filling cavities with composite resin or amalgam material.",
      requiredEquipment: ["Dental drill", "Curing light", "Filling material"],
      insuranceCovered: true,
      status: "Active",
    },
    {
      id: "T1003",
      name: "Root Canal",
      category: "Endodontic",
      duration: 90,
      price: 650,
      description: "Removal of infected pulp and sealing of the root canal.",
      requiredEquipment: ["Endodontic files", "Apex locator", "Gutta-percha"],
      insuranceCovered: true,
      status: "Active",
    },
    {
      id: "T1004",
      name: "Tooth Extraction",
      category: "Oral Surgery",
      duration: 45,
      price: 200,
      description: "Removal of a tooth that cannot be saved or is causing problems.",
      requiredEquipment: ["Extraction forceps", "Elevators", "Surgical suction"],
      insuranceCovered: true,
      status: "Active",
    },
    {
      id: "T1005",
      name: "Dental Crown",
      category: "Restorative",
      duration: 60,
      price: 850,
      description: "Custom-made cap that covers a damaged or weak tooth.",
      requiredEquipment: ["Impression material", "Temporary crown material", "Crown cement"],
      insuranceCovered: true,
      status: "Active",
    },
    {
      id: "T1006",
      name: "Teeth Whitening",
      category: "Cosmetic",
      duration: 60,
      price: 350,
      description: "Professional bleaching to remove stains and discoloration.",
      requiredEquipment: ["Whitening gel", "UV light", "Cheek retractors"],
      insuranceCovered: false,
      status: "Active",
    },
    {
      id: "T1007",
      name: "Dental Implant",
      category: "Prosthodontic",
      duration: 120,
      price: 1800,
      description: "Surgical placement of a titanium post to replace a missing tooth root.",
      requiredEquipment: ["Implant kit", "Surgical drill", "Healing abutment"],
      insuranceCovered: false,
      status: "Active",
    },
    {
      id: "T1008",
      name: "Orthodontic Consultation",
      category: "Orthodontic",
      duration: 45,
      price: 150,
      description: "Initial assessment for braces or aligners.",
      requiredEquipment: ["X-ray viewer", "Dental models", "Measuring tools"],
      insuranceCovered: true,
      status: "Active",
    },
    {
      id: "T1009",
      name: "Dental X-Ray",
      category: "Diagnostic",
      duration: 15,
      price: 80,
      description: "Radiographic imaging to detect hidden dental issues.",
      requiredEquipment: ["X-ray machine", "X-ray sensors", "Lead apron"],
      insuranceCovered: true,
      status: "Active",
    },
    {
      id: "T1010",
      name: "Periodontal Therapy",
      category: "Periodontic",
      duration: 60,
      price: 280,
      description: "Deep cleaning below the gumline to treat gum disease.",
      requiredEquipment: ["Ultrasonic scaler", "Curettes", "Local anesthetic"],
      insuranceCovered: true,
      status: "Active",
    },
  ]

  // Filter treatments based on search query
  const filteredTreatments = treatments.filter(
    (treatment) =>
      treatment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      treatment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      treatment.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      treatment.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Treatments</h2>
          <p className="text-muted-foreground">Manage dental procedures, services, and pricing.</p>
        </div>
        <Dialog open={isAddTreatmentOpen} onOpenChange={setIsAddTreatmentOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              Add New Treatment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Treatment</DialogTitle>
              <DialogDescription>Fill in the details to add a new dental treatment or procedure.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="treatment-name" className="text-right">
                  Treatment Name
                </Label>
                <Input id="treatment-name" placeholder="e.g. Dental Cleaning" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preventive">Preventive</SelectItem>
                    <SelectItem value="restorative">Restorative</SelectItem>
                    <SelectItem value="endodontic">Endodontic</SelectItem>
                    <SelectItem value="periodontic">Periodontic</SelectItem>
                    <SelectItem value="prosthodontic">Prosthodontic</SelectItem>
                    <SelectItem value="oral-surgery">Oral Surgery</SelectItem>
                    <SelectItem value="orthodontic">Orthodontic</SelectItem>
                    <SelectItem value="cosmetic">Cosmetic</SelectItem>
                    <SelectItem value="diagnostic">Diagnostic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration (min)
                </Label>
                <Input id="duration" type="number" placeholder="30" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price ($)
                </Label>
                <Input id="price" type="number" placeholder="120" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the treatment"
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="equipment" className="text-right">
                  Required Equipment
                </Label>
                <Input id="equipment" placeholder="Comma-separated list of equipment" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="insurance" className="text-right">
                  Insurance Covered
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch id="insurance" />
                  <Label htmlFor="insurance">Covered by standard insurance</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddTreatmentOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => {
                  // Handle treatment creation logic here
                  setIsAddTreatmentOpen(false)
                }}
              >
                Add Treatment
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
            placeholder="Search treatments by name, ID, category, or description..."
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
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="preventive">Preventive</SelectItem>
            <SelectItem value="restorative">Restorative</SelectItem>
            <SelectItem value="endodontic">Endodontic</SelectItem>
            <SelectItem value="periodontic">Periodontic</SelectItem>
            <SelectItem value="prosthodontic">Prosthodontic</SelectItem>
            <SelectItem value="oral-surgery">Oral Surgery</SelectItem>
            <SelectItem value="orthodontic">Orthodontic</SelectItem>
            <SelectItem value="cosmetic">Cosmetic</SelectItem>
            <SelectItem value="diagnostic">Diagnostic</SelectItem>
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
                  <TableHead>ID</TableHead>
                  <TableHead>Treatment Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Insurance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTreatments.map((treatment) => (
                  <TableRow key={treatment.id}>
                    <TableCell className="font-medium">{treatment.id}</TableCell>
                    <TableCell>
                      <div>
                        {treatment.name}
                        <div className="text-xs text-muted-foreground line-clamp-1">{treatment.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{treatment.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Timer className="mr-1 h-4 w-4 text-muted-foreground" />
                        {treatment.duration} min
                      </div>
                    </TableCell>
                    <TableCell>${treatment.price}</TableCell>
                    <TableCell>
                      <Badge variant={treatment.insuranceCovered ? "default" : "outline"}>
                        {treatment.insuranceCovered ? "Covered" : "Not Covered"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={treatment.status === "Active" ? "default" : "secondary"}
                        className={treatment.status === "Active" ? "bg-green-500" : ""}
                      >
                        {treatment.status}
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
                          <DropdownMenuItem>Edit treatment</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Pricing history</DropdownMenuItem>
                          <DropdownMenuItem>Usage statistics</DropdownMenuItem>
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
            {filteredTreatments.map((treatment) => (
              <Card key={treatment.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{treatment.name}</CardTitle>
                      <CardDescription>{treatment.id}</CardDescription>
                    </div>
                    <Badge
                      variant={treatment.status === "Active" ? "default" : "secondary"}
                      className={treatment.status === "Active" ? "bg-green-500" : ""}
                    >
                      {treatment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{treatment.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{treatment.duration} min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">${treatment.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Insurance:</span>
                      <Badge variant={treatment.insuranceCovered ? "default" : "outline"}>
                        {treatment.insuranceCovered ? "Covered" : "Not Covered"}
                      </Badge>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">{treatment.description}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-4 pt-0">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Pencil className="mr-1 h-3 w-3" />
                    Edit
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
