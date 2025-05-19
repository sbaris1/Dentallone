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
import { AlertTriangle, ArrowDown, ArrowUp, Filter, MoreHorizontal, Package, Plus, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function InventoryPage() {
  const [isAddItemOpen, setIsAddItemOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for inventory items
  const inventoryItems = [
    {
      id: "INV001",
      name: "Dental Composite Resin",
      category: "Restorative Materials",
      quantity: 45,
      unit: "Syringe",
      minStock: 20,
      price: 28.5,
      supplier: "Dental Supplies Co.",
      lastRestocked: "May 5, 2025",
      expiryDate: "Dec 15, 2026",
      status: "In Stock",
    },
    {
      id: "INV002",
      name: "Disposable Dental Bibs",
      category: "Disposables",
      quantity: 350,
      unit: "Pack",
      minStock: 100,
      price: 12.75,
      supplier: "MedClean Supplies",
      lastRestocked: "Apr 28, 2025",
      expiryDate: "N/A",
      status: "In Stock",
    },
    {
      id: "INV003",
      name: "Dental Anesthetic (Lidocaine)",
      category: "Medications",
      quantity: 18,
      unit: "Box",
      minStock: 15,
      price: 45.99,
      supplier: "MedPharm Inc.",
      lastRestocked: "May 2, 2025",
      expiryDate: "Aug 10, 2026",
      status: "Low Stock",
    },
    {
      id: "INV004",
      name: "Dental Impression Material",
      category: "Impression Materials",
      quantity: 32,
      unit: "Kit",
      minStock: 10,
      price: 65.25,
      supplier: "Dental Supplies Co.",
      lastRestocked: "Apr 15, 2025",
      expiryDate: "Mar 20, 2026",
      status: "In Stock",
    },
    {
      id: "INV005",
      name: "Dental X-Ray Films",
      category: "Diagnostic",
      quantity: 5,
      unit: "Box",
      minStock: 8,
      price: 89.99,
      supplier: "Imaging Solutions",
      lastRestocked: "Apr 10, 2025",
      expiryDate: "Oct 5, 2026",
      status: "Out of Stock",
    },
    {
      id: "INV006",
      name: "Dental Cement",
      category: "Restorative Materials",
      quantity: 22,
      unit: "Box",
      minStock: 10,
      price: 42.5,
      supplier: "Dental Supplies Co.",
      lastRestocked: "May 8, 2025",
      expiryDate: "Jun 15, 2026",
      status: "In Stock",
    },
    {
      id: "INV007",
      name: "Disposable Gloves (Medium)",
      category: "Disposables",
      quantity: 12,
      unit: "Box",
      minStock: 20,
      price: 18.99,
      supplier: "MedClean Supplies",
      lastRestocked: "Apr 25, 2025",
      expiryDate: "N/A",
      status: "Low Stock",
    },
    {
      id: "INV008",
      name: "Dental Burs Assorted",
      category: "Instruments",
      quantity: 85,
      unit: "Pack",
      minStock: 30,
      price: 35.75,
      supplier: "Dental Instruments Ltd.",
      lastRestocked: "May 1, 2025",
      expiryDate: "N/A",
      status: "In Stock",
    },
    {
      id: "INV009",
      name: "Fluoride Gel",
      category: "Preventive",
      quantity: 28,
      unit: "Bottle",
      minStock: 15,
      price: 22.5,
      supplier: "Dental Supplies Co.",
      lastRestocked: "Apr 20, 2025",
      expiryDate: "Sep 30, 2026",
      status: "In Stock",
    },
    {
      id: "INV010",
      name: "Sterilization Pouches",
      category: "Infection Control",
      quantity: 450,
      unit: "Pack",
      minStock: 200,
      price: 15.25,
      supplier: "MedClean Supplies",
      lastRestocked: "May 7, 2025",
      expiryDate: "N/A",
      status: "In Stock",
    },
  ]

  // Filter inventory items based on search query
  const filteredItems = inventoryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate inventory statistics
  const totalItems = inventoryItems.length
  const lowStockItems = inventoryItems.filter((item) => item.status === "Low Stock").length
  const outOfStockItems = inventoryItems.filter((item) => item.status === "Out of Stock").length
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inventory Management</h2>
          <p className="text-muted-foreground">Track and manage dental supplies, equipment, and materials.</p>
        </div>
        <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Inventory Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>Fill in the details to add a new item to your inventory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item-name" className="text-right">
                  Item Name
                </Label>
                <Input id="item-name" placeholder="e.g. Dental Composite Resin" className="col-span-3" />
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
                    <SelectItem value="restorative">Restorative Materials</SelectItem>
                    <SelectItem value="disposables">Disposables</SelectItem>
                    <SelectItem value="medications">Medications</SelectItem>
                    <SelectItem value="impression">Impression Materials</SelectItem>
                    <SelectItem value="diagnostic">Diagnostic</SelectItem>
                    <SelectItem value="instruments">Instruments</SelectItem>
                    <SelectItem value="preventive">Preventive</SelectItem>
                    <SelectItem value="infection">Infection Control</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input id="quantity" type="number" placeholder="0" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unit" className="text-right">
                  Unit
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="box">Box</SelectItem>
                    <SelectItem value="pack">Pack</SelectItem>
                    <SelectItem value="bottle">Bottle</SelectItem>
                    <SelectItem value="kit">Kit</SelectItem>
                    <SelectItem value="syringe">Syringe</SelectItem>
                    <SelectItem value="piece">Piece</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="min-stock" className="text-right">
                  Min Stock
                </Label>
                <Input id="min-stock" type="number" placeholder="10" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price ($)
                </Label>
                <Input id="price" type="number" step="0.01" placeholder="0.00" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supplier" className="text-right">
                  Supplier
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dental-supplies">Dental Supplies Co.</SelectItem>
                    <SelectItem value="medclean">MedClean Supplies</SelectItem>
                    <SelectItem value="medpharm">MedPharm Inc.</SelectItem>
                    <SelectItem value="imaging">Imaging Solutions</SelectItem>
                    <SelectItem value="instruments">Dental Instruments Ltd.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expiry-date" className="text-right">
                  Expiry Date
                </Label>
                <Input id="expiry-date" type="date" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddItemOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                onClick={() => {
                  // Handle item creation logic here
                  setIsAddItemOpen(false)
                }}
              >
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Total Items</span>
                <span className="text-2xl font-bold">{totalItems}</span>
              </div>
              <div className="rounded-full bg-teal-100 p-2 text-teal-600">
                <Package className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <span>{inventoryItems.filter((item) => item.status === "In Stock").length} items in stock</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Low Stock Items</span>
                <span className="text-2xl font-bold">{lowStockItems}</span>
              </div>
              <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                <ArrowDown className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <span>Items below minimum stock level</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Out of Stock</span>
                <span className="text-2xl font-bold">{outOfStockItems}</span>
              </div>
              <div className="rounded-full bg-red-100 p-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <span>Items that need immediate reordering</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">Total Value</span>
                <span className="text-2xl font-bold">${totalValue.toFixed(2)}</span>
              </div>
              <div className="rounded-full bg-green-100 p-2 text-green-600">
                <ArrowUp className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <span>Current inventory valuation</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search inventory by name, ID, category, or supplier..."
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
            <SelectItem value="restorative">Restorative Materials</SelectItem>
            <SelectItem value="disposables">Disposables</SelectItem>
            <SelectItem value="medications">Medications</SelectItem>
            <SelectItem value="impression">Impression Materials</SelectItem>
            <SelectItem value="diagnostic">Diagnostic</SelectItem>
            <SelectItem value="instruments">Instruments</SelectItem>
            <SelectItem value="preventive">Preventive</SelectItem>
            <SelectItem value="infection">Infection Control</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
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
                  <TableHead>Item ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      {item.quantity} {item.unit}
                      <div className="mt-1 w-24">
                        <Progress
                          value={(item.quantity / (item.minStock * 2)) * 100}
                          className={`h-1 ${
                            item.quantity <= 0
                              ? "bg-red-500"
                              : item.quantity < item.minStock
                                ? "bg-amber-500"
                                : "bg-green-500"
                          }`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.expiryDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "In Stock" ? "default" : item.status === "Low Stock" ? "outline" : "secondary"
                        }
                        className={
                          item.status === "In Stock"
                            ? "bg-green-500"
                            : item.status === "Low Stock"
                              ? "border-amber-500 text-amber-500"
                              : "bg-red-500"
                        }
                      >
                        {item.status}
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
                          <DropdownMenuItem>Edit item</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Add stock</DropdownMenuItem>
                          <DropdownMenuItem>Remove stock</DropdownMenuItem>
                          <DropdownMenuItem>Order more</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete item</DropdownMenuItem>
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
            {filteredItems.map((item) => (
              <Card key={item.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      <CardDescription>{item.id}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        item.status === "In Stock" ? "default" : item.status === "Low Stock" ? "outline" : "secondary"
                      }
                      className={
                        item.status === "In Stock"
                          ? "bg-green-500"
                          : item.status === "Low Stock"
                            ? "border-amber-500 text-amber-500"
                            : "bg-red-500"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{item.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span>
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Min Stock:</span>
                      <span>{item.minStock}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Supplier:</span>
                      <span>{item.supplier}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Expiry:</span>
                      <span>{item.expiryDate}</span>
                    </div>
                    <div className="pt-2">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span>Stock Level</span>
                        <span>
                          {item.quantity}/{item.minStock} min
                        </span>
                      </div>
                      <Progress
                        value={(item.quantity / (item.minStock * 2)) * 100}
                        className={`h-2 ${
                          item.quantity <= 0
                            ? "bg-red-500"
                            : item.quantity < item.minStock
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-4 pt-0">
                  <Button variant="outline" size="sm">
                    Add Stock
                  </Button>
                  <Button variant="outline" size="sm">
                    Order More
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
