"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Building2, Check, CreditCard, Lock, Mail, Save, User, Users } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="clinic">Clinic</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" defaultValue="Admin" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" defaultValue="User" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@dentallone.com" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Lock className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your application experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Language</Label>
                  <p className="text-sm text-muted-foreground">Select your preferred language</p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="tr">Turkish</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Time Zone</Label>
                  <p className="text-sm text-muted-foreground">Set your local time zone</p>
                </div>
                <Select defaultValue="europe-istanbul">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-istanbul">Europe/Istanbul (GMT+3)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                    <SelectItem value="america-new_york">America/New York (GMT-5)</SelectItem>
                    <SelectItem value="america-los_angeles">America/Los Angeles (GMT-8)</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="theme">Theme</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                </div>
                <Select defaultValue="light">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="clinic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clinic Information</CardTitle>
              <CardDescription>Manage your clinic details and branding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-24 w-24 items-center justify-center rounded-md border border-dashed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-teal-600"
                    >
                      <path d="M19 10v2a8 8 0 0 1-16 0v-2a8 8 0 0 1 16 0Z" />
                      <path d="M19 8a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1" />
                      <path d="M12 19v3" />
                      <path d="M8 22h8" />
                    </svg>
                  </div>
                  <Button variant="outline" size="sm">
                    Upload Logo
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clinic-name">Clinic Name</Label>
                    <Input id="clinic-name" defaultValue="DentAllOne Dental Clinic" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+90 212 555 1234" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="info@dentallone.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://www.dentallone.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue="123 Dental Street, Istanbul, Turkey" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Building2 className="mr-2 h-4 w-4" />
                Update Clinic Info
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your clinic's operating hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex w-28 items-center">
                      <Switch id={`day-${index}`} defaultChecked={index < 6} />
                      <Label htmlFor={`day-${index}`} className="ml-2">
                        {day}
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue={index < 6 ? "09:00" : "closed"}>
                        <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Opening" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="closed">Closed</SelectItem>
                          <SelectItem value="08:00">08:00 AM</SelectItem>
                          <SelectItem value="08:30">08:30 AM</SelectItem>
                          <SelectItem value="09:00">09:00 AM</SelectItem>
                          <SelectItem value="09:30">09:30 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                      <span>to</span>
                      <Select defaultValue={index < 6 ? "18:00" : "closed"}>
                        <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Closing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="closed">Closed</SelectItem>
                          <SelectItem value="17:00">05:00 PM</SelectItem>
                          <SelectItem value="17:30">05:30 PM</SelectItem>
                          <SelectItem value="18:00">06:00 PM</SelectItem>
                          <SelectItem value="18:30">06:30 PM</SelectItem>
                          <SelectItem value="19:00">07:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Save className="mr-2 h-4 w-4" />
                Save Hours
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Configure system-wide settings for your clinic.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Currency</Label>
                  <p className="text-sm text-muted-foreground">Set your clinic's primary currency</p>
                </div>
                <Select defaultValue="try">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="try">Turkish Lira (₺)</SelectItem>
                    <SelectItem value="usd">US Dollar ($)</SelectItem>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="gbp">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Date Format</Label>
                  <p className="text-sm text-muted-foreground">Choose how dates are displayed</p>
                </div>
                <Select defaultValue="dd-mm-yyyy">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Appointment Duration</Label>
                  <p className="text-sm text-muted-foreground">Default appointment slot duration</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Save className="mr-2 h-4 w-4" />
                Save Configuration
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage staff accounts and permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Staff Accounts</h3>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <User className="mr-2 h-4 w-4" />
                    Add New User
                  </Button>
                </div>
                <div className="rounded-md border">
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Dr. Michael Chen</p>
                        <p className="text-sm text-muted-foreground">michael.chen@dentallone.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Doctor</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>SK</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Dr. Sarah Kim</p>
                        <p className="text-sm text-muted-foreground">sarah.kim@dentallone.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Doctor</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-sm text-muted-foreground">jane.doe@dentallone.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Secretary</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Smith</p>
                        <p className="text-sm text-muted-foreground">john.smith@dentallone.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Admin</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>EM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Emily Martinez</p>
                        <p className="text-sm text-muted-foreground">emily.martinez@dentallone.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Secretary</Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Users</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>Configure user roles and permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="flex items-center justify-between border-b p-4">
                    <div>
                      <p className="font-medium">Admin</p>
                      <p className="text-sm text-muted-foreground">Full system access and control</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit Permissions
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border-b p-4">
                    <div>
                      <p className="font-medium">Doctor</p>
                      <p className="text-sm text-muted-foreground">
                        Access to patient records, appointments, and treatments
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit Permissions
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border-b p-4">
                    <div>
                      <p className="font-medium">Secretary</p>
                      <p className="text-sm text-muted-foreground">
                        Manage appointments, patient registration, and billing
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit Permissions
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">Patient</p>
                      <p className="text-sm text-muted-foreground">View own records, appointments, and make payments</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit Permissions
                    </Button>
                  </div>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Users className="mr-2 h-4 w-4" />
                  Create New Role
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security policies for user accounts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Password Policy</Label>
                  <p className="text-sm text-muted-foreground">Require strong passwords</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Lock className="mr-2 h-4 w-4" />
                Update Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Manage your subscription plan and billing details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Professional Plan</h3>
                    <p className="text-sm text-muted-foreground">$99/month, billed monthly</p>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Unlimited patients</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Up to 10 staff accounts</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Advanced reporting</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Multi-branch support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Email & SMS notifications</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline" className="text-red-500 hover:text-red-600">
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods and billing information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-16 items-center justify-center rounded-md bg-muted">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                    Remove
                  </Button>
                </div>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <CreditCard className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past invoices and payment history.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="flex items-center justify-between border-b p-4">
                  <div>
                    <p className="font-medium">Invoice #INV-2025-005</p>
                    <p className="text-sm text-muted-foreground">May 1, 2025</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-500">Paid</Badge>
                    <p className="font-medium">$99.00</p>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b p-4">
                  <div>
                    <p className="font-medium">Invoice #INV-2025-004</p>
                    <p className="text-sm text-muted-foreground">Apr 1, 2025</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-500">Paid</Badge>
                    <p className="font-medium">$99.00</p>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b p-4">
                  <div>
                    <p className="font-medium">Invoice #INV-2025-003</p>
                    <p className="text-sm text-muted-foreground">Mar 1, 2025</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-500">Paid</Badge>
                    <p className="font-medium">$99.00</p>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">Invoice #INV-2025-002</p>
                    <p className="text-sm text-muted-foreground">Feb 1, 2025</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-500">Paid</Badge>
                    <p className="font-medium">$99.00</p>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Invoices</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-appointments">Appointment Reminders</Label>
                    <Switch id="email-appointments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-patients">New Patient Registrations</Label>
                    <Switch id="email-patients" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-billing">Billing Updates</Label>
                    <Switch id="email-billing" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-system">System Updates</Label>
                    <Switch id="email-system" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-marketing">Marketing & Promotions</Label>
                    <Switch id="email-marketing" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium">SMS Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-appointments">Appointment Reminders</Label>
                    <Switch id="sms-appointments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-patients">New Patient Registrations</Label>
                    <Switch id="sms-patients" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-billing">Billing Updates</Label>
                    <Switch id="sms-billing" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-system">System Updates</Label>
                    <Switch id="sms-system" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium">In-App Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-appointments">Appointment Updates</Label>
                    <Switch id="app-appointments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-patients">Patient Activity</Label>
                    <Switch id="app-patients" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-billing">Billing Alerts</Label>
                    <Switch id="app-billing" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-system">System Notifications</Label>
                    <Switch id="app-system" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-inventory">Inventory Alerts</Label>
                    <Switch id="app-inventory" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Bell className="mr-2 h-4 w-4" />
                Save Notification Preferences
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Patient Notification Templates</CardTitle>
              <CardDescription>Customize messages sent to patients.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-reminder">Appointment Reminder</Label>
                <Textarea
                  id="appointment-reminder"
                  defaultValue="Hello [Patient Name], this is a reminder about your appointment at DentAllOne Dental Clinic on [Date] at [Time]. Please reply YES to confirm or call us at +90 212 555 1234 to reschedule."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-confirmation">Appointment Confirmation</Label>
                <Textarea
                  id="appointment-confirmation"
                  defaultValue="Thank you [Patient Name], your appointment has been confirmed for [Date] at [Time] with [Doctor Name]. We look forward to seeing you!"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-cancellation">Appointment Cancellation</Label>
                <Textarea
                  id="appointment-cancellation"
                  defaultValue="Hello [Patient Name], your appointment on [Date] at [Time] has been cancelled. Please call us at +90 212 555 1234 to reschedule."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="treatment-followup">Treatment Follow-up</Label>
                <Textarea
                  id="treatment-followup"
                  defaultValue="Hello [Patient Name], we hope you're feeling well after your recent [Treatment] at DentAllOne. If you have any questions or concerns, please don't hesitate to contact us at +90 212 555 1234."
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Mail className="mr-2 h-4 w-4" />
                Save Templates
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Delivery Settings</CardTitle>
              <CardDescription>Configure when and how notifications are sent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Appointment Reminder Timing</Label>
                  <p className="text-sm text-muted-foreground">When to send appointment reminders</p>
                </div>
                <Select defaultValue="24">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 hours before</SelectItem>
                    <SelectItem value="24">24 hours before</SelectItem>
                    <SelectItem value="48">48 hours before</SelectItem>
                    <SelectItem value="72">72 hours before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Provider</Label>
                  <p className="text-sm text-muted-foreground">Service used for sending SMS</p>
                </div>
                <Select defaultValue="twilio">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twilio">Twilio</SelectItem>
                    <SelectItem value="nexmo">Nexmo</SelectItem>
                    <SelectItem value="messagebird">MessageBird</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Delivery Schedule</Label>
                  <p className="text-sm text-muted-foreground">When to send batch emails</p>
                </div>
                <Select defaultValue="morning">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8 AM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (2 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6 PM)</SelectItem>
                    <SelectItem value="immediate">Send Immediately</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Save className="mr-2 h-4 w-4" />
                Save Delivery Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
