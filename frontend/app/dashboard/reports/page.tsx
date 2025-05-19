"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, FileText, Filter, Printer } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
import { Line, Bar, Doughnut } from "react-chartjs-2"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)

export default function ReportsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeRange, setTimeRange] = useState("month")
  const [branch, setBranch] = useState("all")

  // Revenue data
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "2025",
        data: [18500, 22000, 19800, 24500, 26800, 25000, 28000, 27500, 29800, 32000, 30500, 34000],
        borderColor: "rgb(20, 184, 166)",
        backgroundColor: "rgba(20, 184, 166, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "2024",
        data: [15800, 18500, 16200, 20500, 22000, 21500, 24000, 23500, 25800, 27000, 26500, 29000],
        borderColor: "rgb(148, 163, 184)",
        backgroundColor: "rgba(148, 163, 184, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Patients by treatment type
  const treatmentData = {
    labels: ["Cleaning", "Filling", "Root Canal", "Extraction", "Whitening", "Check-up", "Crown", "Implant"],
    datasets: [
      {
        label: "Patients",
        data: [320, 280, 120, 95, 85, 450, 75, 40],
        backgroundColor: [
          "rgb(20, 184, 166)",
          "rgb(14, 165, 233)",
          "rgb(168, 85, 247)",
          "rgb(249, 115, 22)",
          "rgb(236, 72, 153)",
          "rgb(234, 179, 8)",
          "rgb(79, 70, 229)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 1,
      },
    ],
  }

  // Appointments by day of week
  const appointmentsData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Appointments",
        data: [42, 38, 45, 40, 35, 28, 0],
        backgroundColor: "rgb(20, 184, 166)",
        borderRadius: 4,
      },
    ],
  }

  // Revenue by branch
  const branchRevenueData = {
    labels: ["Main Branch", "North Branch", "East Branch", "West Branch"],
    datasets: [
      {
        label: "Revenue",
        data: [42800, 28600, 19200, 32400],
        backgroundColor: ["rgb(20, 184, 166)", "rgb(14, 165, 233)", "rgb(168, 85, 247)", "rgb(249, 115, 22)"],
        borderWidth: 1,
      },
    ],
  }

  // Sample reports list
  const reports = [
    {
      id: 1,
      name: "Monthly Financial Summary",
      description: "Overview of revenue, expenses, and profit for the month",
      category: "Financial",
      lastGenerated: "May 10, 2025",
    },
    {
      id: 2,
      name: "Patient Demographics Report",
      description: "Analysis of patient age groups, gender, and location",
      category: "Patients",
      lastGenerated: "May 8, 2025",
    },
    {
      id: 3,
      name: "Treatment Popularity Analysis",
      description: "Most common treatments and procedures performed",
      category: "Treatments",
      lastGenerated: "May 5, 2025",
    },
    {
      id: 4,
      name: "Doctor Performance Report",
      description: "Appointments, treatments, and revenue by doctor",
      category: "Staff",
      lastGenerated: "May 1, 2025",
    },
    {
      id: 5,
      name: "Branch Comparison Report",
      description: "Performance metrics across all branches",
      category: "Branches",
      lastGenerated: "Apr 30, 2025",
    },
    {
      id: 6,
      name: "Inventory Usage Report",
      description: "Consumption of supplies and materials",
      category: "Inventory",
      lastGenerated: "Apr 28, 2025",
    },
    {
      id: 7,
      name: "Appointment Analytics",
      description: "Patterns, cancellations, and no-shows",
      category: "Appointments",
      lastGenerated: "Apr 25, 2025",
    },
    {
      id: 8,
      name: "Insurance Claims Report",
      description: "Status of submitted insurance claims",
      category: "Financial",
      lastGenerated: "Apr 20, 2025",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports & Analytics</h2>
          <p className="text-muted-foreground">Generate insights and analyze clinic performance.</p>
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
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="main">Main Branch</SelectItem>
              <SelectItem value="north">North Branch</SelectItem>
              <SelectItem value="east">East Branch</SelectItem>
              <SelectItem value="west">West Branch</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="quarter">Quarterly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Total Revenue (May)</span>
                  <span className="text-2xl font-bold">$123,000</span>
                  <span className="text-xs text-muted-foreground">+15.2% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">New Patients (May)</span>
                  <span className="text-2xl font-bold">85</span>
                  <span className="text-xs text-muted-foreground">+8.7% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Appointments (May)</span>
                  <span className="text-2xl font-bold">642</span>
                  <span className="text-xs text-muted-foreground">+12.3% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Avg. Treatment Value</span>
                  <span className="text-2xl font-bold">$192</span>
                  <span className="text-xs text-muted-foreground">+5.8% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue comparison (2024 vs 2025)</CardDescription>
              </CardHeader>
              <CardContent>
                <Line
                  data={revenueData}
                  options={{
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => `$${value / 1000}k`,
                        },
                      },
                    },
                  }}
                />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Treatment Distribution</CardTitle>
                <CardDescription>Patients by treatment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <div className="h-[300px] w-[300px]">
                    <Doughnut
                      data={treatmentData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "right",
                          },
                        },
                        cutout: "60%",
                      }}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Appointments by Day</CardTitle>
                <CardDescription>Distribution across weekdays</CardDescription>
              </CardHeader>
              <CardContent>
                <Bar
                  data={appointmentsData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue by Branch</CardTitle>
                <CardDescription>Monthly revenue distribution across branches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <div className="h-[300px] w-[400px]">
                    <Doughnut
                      data={branchRevenueData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "right",
                          },
                        },
                        cutout: "50%",
                      }}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Revenue, expenses, and profit analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Monthly Financial Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive overview of revenue, expenses, and profit for the selected month
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Revenue by Service Category</h3>
                  <p className="text-sm text-muted-foreground">
                    Breakdown of revenue by different treatment categories
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Expense Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed breakdown of operational expenses and overhead costs
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Insurance Claims Report</h3>
                  <p className="text-sm text-muted-foreground">Status and analysis of submitted insurance claims</p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Tax Summary Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Summary of taxable income and deductible expenses for accounting purposes
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Reports</CardTitle>
              <CardDescription>Patient demographics and treatment analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Patient Demographics</h3>
                  <p className="text-sm text-muted-foreground">
                    Analysis of patient age groups, gender distribution, and locations
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">New vs. Returning Patients</h3>
                  <p className="text-sm text-muted-foreground">
                    Comparison of new patient acquisition vs. returning patient retention
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Treatment History Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Patterns and trends in patient treatment histories and preferences
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Patient Satisfaction</h3>
                  <p className="text-sm text-muted-foreground">
                    Analysis of patient feedback, ratings, and satisfaction metrics
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Referral Source Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Breakdown of how patients are finding and being referred to your clinic
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Reports</CardTitle>
              <CardDescription>Appointment analytics and scheduling insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Appointment Volume Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Trends in appointment bookings across different time periods
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Cancellation & No-Show Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Analysis of appointment cancellations and no-shows with potential revenue impact
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Doctor Schedule Utilization</h3>
                  <p className="text-sm text-muted-foreground">
                    Analysis of doctor schedule efficiency and utilization rates
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Wait Time Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Metrics on patient wait times and appointment punctuality
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Peak Hours Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Identification of peak appointment hours and days for better resource allocation
                  </p>
                </div>
                <Button variant="outline">Generate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Recently Generated Reports</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Report category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="patients">Patients</SelectItem>
                  <SelectItem value="treatments">Treatments</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="branches">Branches</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="appointments">Appointments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{report.name}</CardTitle>
                      <CardDescription>{report.category}</CardDescription>
                    </div>
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Last generated: {report.lastGenerated}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
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
