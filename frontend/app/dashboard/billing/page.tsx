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
import {
  ArrowDownToLine,
  Calendar,
  CreditCard,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Printer,
  Receipt,
  Search,
  Send,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function BillingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for invoices
  const invoices = [
    {
      id: "INV-2025-001",
      patient: {
        name: "Emma Johnson",
        id: "P10045",
      },
      date: "May 10, 2025",
      dueDate: "May 25, 2025",
      amount: 320,
      status: "Paid",
      paymentMethod: "Credit Card",
      treatments: ["Dental Cleaning", "X-Ray"],
    },
    {
      id: "INV-2025-002",
      patient: {
        name: "James Wilson",
        id: "P10046",
      },
      date: "May 8, 2025",
      dueDate: "May 23, 2025",
      amount: 850,
      status: "Paid",
      paymentMethod: "Insurance",
      treatments: ["Root Canal", "Temporary Filling"],
    },
    {
      id: "INV-2025-003",
      patient: {
        name: "Olivia Martinez",
        id: "P10047",
      },
      date: "May 12, 2025",
      dueDate: "May 27, 2025",
      amount: 150,
      status: "Pending",
      paymentMethod: "Pending",
      treatments: ["Consultation", "X-Ray"],
    },
    {
      id: "INV-2025-004",
      patient: {
        name: "Noah Thompson",
        id: "P10048",
      },
      date: "May 9, 2025",
      dueDate: "May 24, 2025",
      amount: 420,
      status: "Paid",
      paymentMethod: "Cash",
      treatments: ["Filling (2 teeth)"],
    },
    {
      id: "INV-2025-005",
      patient: {
        name: "Sophia Davis",
        id: "P10049",
      },
      date: "May 14, 2025",
      dueDate: "May 29, 2025",
      amount: 350,
      status: "Pending",
      paymentMethod: "Pending",
      treatments: ["Teeth Whitening"],
    },
    {
      id: "INV-2025-006",
      patient: {
        name: "Liam Garcia",
        id: "P10050",
      },
      date: "May 7, 2025",
      dueDate: "May 22, 2025",
      amount: 120,
      status: "Overdue",
      paymentMethod: "Pending",
      treatments: ["Check-up"],
    },
    {
      id: "INV-2025-007",
      patient: {
        name: "Ava Rodriguez",
        id: "P10051",
      },
      date: "May 11, 2025",
      dueDate: "May 26, 2025",
      amount: 580,
      status: "Paid",
      paymentMethod: "Bank Transfer",
      treatments: ["Deep Cleaning", "Fluoride Treatment"],
    },
  ]

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.treatments.some((treatment) => treatment.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Sample data for payment methods
  const paymentMethods = [
    { id: 1, name: "Cash", icon: "💵" },
    { id: 2, name: "Credit Card", icon: "💳" },
    { id: 3, name: "Debit Card", icon: "💳" },
    { id: 4, name: "Bank Transfer", icon: "🏦" },
    { id: 5, name: "Insurance", icon: "🏥" },
    { id: 6, name: "Mobile Payment", icon: "📱" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Billing & Invoices</h2>
          <p className="text-muted-foreground">Manage patient invoices, payments, and financial records.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left sm:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "MMMM yyyy") : <span>Pick a month</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date > new Date() || date < new Date("2020-01-01")}
              />
            </PopoverContent>
          </Popover>
          <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>Generate a new invoice for a patient.</DialogDescription>
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
                        <SelectItem value="emma">Emma Johnson (P10045)</SelectItem>
                        <SelectItem value="james">James Wilson (P10046)</SelectItem>
                        <SelectItem value="olivia">Olivia Martinez (P10047)</SelectItem>
                        <SelectItem value="noah">Noah Thompson (P10048)</SelectItem>
                        <SelectItem value="sophia">Sophia Davis (P10049)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Invoice Date
                  </Label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
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
                  <Label htmlFor="dueDate" className="text-right">
                    Due Date
                  </Label>
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {date ? (
                            format(new Date(date.getTime() + 15 * 24 * 60 * 60 * 1000), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Treatments</Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select treatment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cleaning">Dental Cleaning ($120)</SelectItem>
                          <SelectItem value="filling">Dental Filling ($180)</SelectItem>
                          <SelectItem value="rootcanal">Root Canal ($650)</SelectItem>
                          <SelectItem value="extraction">Tooth Extraction ($200)</SelectItem>
                          <SelectItem value="crown">Dental Crown ($850)</SelectItem>
                          <SelectItem value="whitening">Teeth Whitening ($350)</SelectItem>
                          <SelectItem value="xray">Dental X-Ray ($80)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="rounded-md border p-2">
                      <p className="text-sm text-muted-foreground">No treatments added yet.</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="discount" className="text-right">
                    Discount (%)
                  </Label>
                  <Input id="discount" type="number" placeholder="0" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tax" className="text-right">
                    Tax (%)
                  </Label>
                  <Input id="tax" type="number" placeholder="8" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input id="notes" placeholder="Additional notes" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateInvoiceOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={() => {
                    // Handle invoice creation logic here
                    setIsCreateInvoiceOpen(false)
                  }}
                >
                  Create Invoice
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Total Revenue (May)</span>
                <span className="text-2xl font-bold">$12,580</span>
              </div>
              <div className="rounded-full bg-teal-100 p-2 text-teal-600">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <span className="font-medium text-green-500">+12.5%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Pending Payments</span>
                <span className="text-2xl font-bold">$2,450</span>
              </div>
              <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                <Receipt className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <span className="font-medium text-red-500">+8.2%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Invoices (May)</span>
                <span className="text-2xl font-bold">42</span>
              </div>
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <Receipt className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <span className="font-medium text-green-500">+5.3%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Overdue Invoices</span>
                <span className="text-2xl font-bold">3</span>
              </div>
              <div className="rounded-full bg-red-100 p-2 text-red-600">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <span className="font-medium text-green-500">-2.1%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search invoices by ID, patient name, or treatment..."
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
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {invoice.patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          {invoice.patient.name}
                          <div className="text-xs text-muted-foreground">{invoice.patient.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell className="font-medium">${invoice.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          invoice.status === "Paid" ? "default" : invoice.status === "Pending" ? "outline" : "secondary"
                        }
                        className={
                          invoice.status === "Paid" ? "bg-green-500" : invoice.status === "Overdue" ? "bg-red-500" : ""
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
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
                          <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" />
                            Print invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            Email to patient
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <ArrowDownToLine className="mr-2 h-4 w-4" />
                            Record payment
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit invoice</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Void invoice</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>View and manage recent payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices
                  .filter((invoice) => invoice.status === "Paid")
                  .map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {payment.patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{payment.patient.name}</p>
                          <p className="text-sm text-muted-foreground">{payment.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">${payment.amount}</p>
                          <p className="text-sm text-muted-foreground">{payment.date}</p>
                        </div>
                        <Badge className="bg-green-500">{payment.paymentMethod}</Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Payments
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="methods" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paymentMethods.map((method) => (
              <Card key={method.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-2xl">
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{method.name}</h3>
                        <p className="text-sm text-muted-foreground">Payment Method</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="flex h-full flex-col items-center justify-center p-6">
              <div className="mb-4 rounded-full bg-muted p-3">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-1 text-lg font-medium">Add Payment Method</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Configure a new payment method for your clinic
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700">Add Method</Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
