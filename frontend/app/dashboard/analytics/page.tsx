"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, Printer } from "lucide-react"
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

export default function AnalyticsPage() {
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

  // Patient demographics data
  const demographicsData = {
    labels: ["0-18", "19-30", "31-45", "46-60", "61+"],
    datasets: [
      {
        label: "Male",
        data: [120, 180, 210, 160, 90],
        backgroundColor: "rgb(14, 165, 233)",
        borderRadius: 4,
      },
      {
        label: "Female",
        data: [140, 190, 230, 170, 110],
        backgroundColor: "rgb(236, 72, 153)",
        borderRadius: 4,
      },
    ],
  }

  // Treatment popularity data
  const treatmentData = {
    labels: ["Cleaning", "Filling", "Root Canal", "Extraction", "Whitening", "Check-up", "Crown", "Implant"],
    datasets: [
      {
        label: "Treatments",
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

  // Doctor performance data
  const doctorPerformanceData = {
    labels: ["Dr. Michael Chen", "Dr. Sarah Kim", "Dr. David Johnson", "Dr. Lisa Wong", "Dr. Robert Martinez"],
    datasets: [
      {
        label: "Patients",
        data: [215, 180, 165, 140, 120],
        backgroundColor: "rgb(20, 184, 166)",
        borderRadius: 4,
      },
      {
        label: "Revenue ($k)",
        data: [42.8, 38.6, 32.4, 28.5, 24.2],
        backgroundColor: "rgb(14, 165, 233)",
        borderRadius: 4,
      },
    ],
  }

  // Appointment status data
  const appointmentStatusData = {
    labels: ["Completed", "Cancelled", "No-show", "Rescheduled"],
    datasets: [
      {
        data: [82, 8, 5, 5],
        backgroundColor: ["rgb(34, 197, 94)", "rgb(239, 68, 68)", "rgb(234, 179, 8)", "rgb(79, 70, 229)"],
        borderWidth: 1,
      },
    ],
  }

  // Patient satisfaction data
  const satisfactionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Satisfaction Score",
        data: [4.5, 4.6, 4.7, 4.6, 4.8, 4.7, 4.9, 4.8, 4.7, 4.8, 4.9, 4.8],
        borderColor: "rgb(20, 184, 166)",
        backgroundColor: "rgba(20, 184, 166, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Detailed insights and performance metrics for your dental clinic.</p>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Total Patients</span>
              <span className="text-2xl font-bold">1,248</span>
              <span className="text-xs text-muted-foreground">+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
              <span className="text-2xl font-bold">$123,000</span>
              <span className="text-xs text-muted-foreground">+15.2% from last month</span>
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
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Patient Satisfaction</span>
              <span className="text-2xl font-bold">4.8/5</span>
              <span className="text-xs text-muted-foreground">+0.2 from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="treatments">Treatments</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <Card>
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

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Branch</CardTitle>
                <CardDescription>Monthly revenue distribution across branches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Bar
                    data={{
                      labels: ["Main Branch", "North Branch", "East Branch", "West Branch"],
                      datasets: [
                        {
                          label: "Revenue",
                          data: [42800, 28600, 19200, 32400],
                          backgroundColor: "rgb(20, 184, 166)",
                          borderRadius: 4,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
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
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Treatment</CardTitle>
                <CardDescription>Revenue distribution by treatment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Bar
                    data={{
                      labels: ["Cleaning", "Filling", "Root Canal", "Crown", "Implant", "Other"],
                      datasets: [
                        {
                          label: "Revenue",
                          data: [38400, 50400, 78000, 72250, 72000, 35950],
                          backgroundColor: [
                            "rgb(20, 184, 166)",
                            "rgb(14, 165, 233)",
                            "rgb(168, 85, 247)",
                            "rgb(249, 115, 22)",
                            "rgb(236, 72, 153)",
                            "rgb(148, 163, 184)",
                          ],
                          borderRadius: 4,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
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
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Demographics</CardTitle>
              <CardDescription>Age and gender distribution of patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <Bar
                  data={demographicsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Age Groups",
                        },
                      },
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Number of Patients",
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>New vs. Returning Patients</CardTitle>
                <CardDescription>Monthly breakdown of patient types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Line
                    data={{
                      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                      datasets: [
                        {
                          label: "New Patients",
                          data: [45, 52, 48, 58, 63, 60, 68, 65, 72, 75, 70, 78],
                          borderColor: "rgb(20, 184, 166)",
                          backgroundColor: "rgba(20, 184, 166, 0.1)",
                          fill: true,
                        },
                        {
                          label: "Returning Patients",
                          data: [120, 135, 125, 142, 150, 145, 155, 152, 160, 165, 158, 170],
                          borderColor: "rgb(14, 165, 233)",
                          backgroundColor: "rgba(14, 165, 233, 0.1)",
                          fill: true,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Satisfaction</CardTitle>
                <CardDescription>Average monthly satisfaction ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Line
                    data={satisfactionData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          min: 3.5,
                          max: 5,
                          title: {
                            display: true,
                            text: "Rating (out of 5)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="treatments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Distribution</CardTitle>
                <CardDescription>Popularity of different treatments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[350px] items-center justify-center">
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
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Status</CardTitle>
                <CardDescription>Distribution of appointment outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[350px] items-center justify-center">
                  <div className="h-[300px] w-[300px]">
                    <Doughnut
                      data={appointmentStatusData}
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
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Treatment Trends</CardTitle>
              <CardDescription>Monthly trends</CardDescription>
\
