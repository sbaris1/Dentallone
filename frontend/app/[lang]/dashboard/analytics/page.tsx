"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, DollarSign, Users, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

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

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d")

  // Revenue chart data
  const revenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue",
        data: [4200, 3800, 5100, 4800, 6200, 5600, 6800],
        borderColor: "rgb(20, 184, 166)",
        backgroundColor: "rgba(20, 184, 166, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Appointments chart data
  const appointmentsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Appointments",
        data: [18, 22, 19, 24, 16, 12, 20],
        backgroundColor: "rgb(20, 184, 166)",
        borderRadius: 4,
      },
    ],
  }

  // Treatment types chart data
  const treatmentData = {
    labels: ["Cleaning", "Filling", "Root Canal", "Extraction", "Whitening", "Check-up"],
    datasets: [
      {
        data: [30, 22, 18, 15, 10, 25],
        backgroundColor: [
          "rgb(20, 184, 166)",
          "rgb(14, 165, 233)",
          "rgb(168, 85, 247)",
          "rgb(249, 115, 22)",
          "rgb(236, 72, 153)",
          "rgb(234, 179, 8)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Admin! Here's an overview of your clinic.</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="7d" className="w-[250px]" value={timeRange} onValueChange={setTimeRange}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="7d">Week</TabsTrigger>
              <TabsTrigger value="30d">Month</TabsTrigger>
              <TabsTrigger value="90d">Quarter</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Total Patients</span>
                <span className="text-2xl font-bold">1,248</span>
              </div>
              <div className="rounded-full bg-teal-100 p-2 text-teal-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">+8.2%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Today's Appointments</span>
                <span className="text-2xl font-bold">24</span>
              </div>
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">+12.5%</span>
              <span className="ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Monthly Revenue</span>
                <span className="text-2xl font-bold">$42,580</span>
              </div>
              <div className="rounded-full bg-green-100 p-2 text-green-600">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">+18.3%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Average Wait Time</span>
                <span className="text-2xl font-bold">14 min</span>
              </div>
              <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              <span className="font-medium text-red-500">+3.1%</span>
              <span className="ml-1">from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Daily revenue for the past week</CardDescription>
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
                      callback: (value) => `$${value}`,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>Daily appointments for the past week</CardDescription>
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
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Treatment Types</CardTitle>
            <CardDescription>Distribution of treatments this month</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-[240px]">
              <Doughnut
                data={treatmentData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                  cutout: "65%",
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>You have 24 appointments today</CardDescription>
            </div>
            <Button variant="outline">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Emma Johnson",
                  time: "09:00 AM",
                  doctor: "Dr. Michael Chen",
                  treatment: "Dental Cleaning",
                  status: "Confirmed",
                },
                {
                  name: "James Wilson",
                  time: "10:30 AM",
                  doctor: "Dr. Sarah Kim",
                  treatment: "Root Canal",
                  status: "In Progress",
                },
                {
                  name: "Olivia Martinez",
                  time: "11:45 AM",
                  doctor: "Dr. Michael Chen",
                  treatment: "Consultation",
                  status: "Waiting",
                },
                {
                  name: "Noah Thompson",
                  time: "01:15 PM",
                  doctor: "Dr. Sarah Kim",
                  treatment: "Filling",
                  status: "Confirmed",
                },
                {
                  name: "Sophia Davis",
                  time: "02:30 PM",
                  doctor: "Dr. Michael Chen",
                  treatment: "Whitening",
                  status: "Confirmed",
                },
              ].map((appointment, index) => (
                <div key={index} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {appointment.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{appointment.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {appointment.time} • {appointment.treatment}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
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
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Branch Performance</CardTitle>
          <CardDescription>Monthly overview of all branches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { name: "Main Branch", patients: 520, revenue: 24800, target: 85 },
              { name: "North Branch", patients: 380, revenue: 18600, target: 72 },
              { name: "East Branch", patients: 290, revenue: 14200, target: 65 },
              { name: "West Branch", patients: 410, revenue: 19800, target: 78 },
            ].map((branch, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{branch.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {branch.patients} patients • ${branch.revenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{branch.target}%</span>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Progress value={branch.target} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}