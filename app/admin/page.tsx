"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { products as initialProducts, categories, type Product } from "@/lib/data"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Search,
  DollarSign,
  TrendingUp,
  Eye,
  LogOut,
  Home,
} from "lucide-react"

type Tab = "dashboard" | "products" | "orders" | "customers" | "settings"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard")
  const [productsList, setProductsList] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "",
    categorySlug: "",
    image: "",
    description: "",
    isNew: false,
  })

  const filteredProducts = productsList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    totalProducts: productsList.length,
    totalRevenue: productsList.reduce((acc, p) => acc + p.price, 0),
    totalOrders: 156,
    totalCustomers: 89,
  }

  // Chart data
  const revenueData = [
    { month: "Jan", revenue: 12500 },
    { month: "Feb", revenue: 18200 },
    { month: "Mar", revenue: 15800 },
    { month: "Apr", revenue: 22400 },
    { month: "May", revenue: 19600 },
    { month: "Jun", revenue: 28900 },
    { month: "Jul", revenue: 32100 },
  ]

  const ordersData = [
    { month: "Jan", orders: 45 },
    { month: "Feb", orders: 62 },
    { month: "Mar", orders: 58 },
    { month: "Apr", orders: 78 },
    { month: "May", orders: 71 },
    { month: "Jun", orders: 89 },
    { month: "Jul", orders: 102 },
  ]

  const categoryData = [
    { name: "Chandeliers", value: 35, color: "#8b5cf6" },
    { name: "Floor Lamps", value: 25, color: "#3b82f6" },
    { name: "Table Lamps", value: 25, color: "#10b981" },
    { name: "Pendant", value: 15, color: "#f59e0b" },
  ]

  const chartConfig = {
    revenue: { label: "Revenue", color: "#8b5cf6" },
    orders: { label: "Orders", color: "#3b82f6" },
  }

  const handleAddProduct = () => {
    const product: Product = {
      id: Math.max(...productsList.map((p) => p.id)) + 1,
      name: newProduct.name || "",
      price: newProduct.price || 0,
      category: newProduct.category || "",
      categorySlug: newProduct.categorySlug || "",
      image: newProduct.image || "/placeholder.svg",
      description: newProduct.description || "",
      isNew: newProduct.isNew,
    }
    setProductsList([...productsList, product])
    setNewProduct({
      name: "",
      price: 0,
      category: "",
      categorySlug: "",
      image: "",
      description: "",
      isNew: false,
    })
    setIsAddDialogOpen(false)
  }

  const handleEditProduct = () => {
    if (!editingProduct) return
    setProductsList(
      productsList.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    )
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id: number) => {
    setProductsList(productsList.filter((p) => p.id !== id))
  }

  const handleCategoryChange = (value: string, isEdit: boolean) => {
    const cat = categories.find((c) => c.slug === value)
    if (isEdit && editingProduct) {
      setEditingProduct({
        ...editingProduct,
        category: cat?.name || "",
        categorySlug: value,
      })
    } else {
      setNewProduct({
        ...newProduct,
        category: cat?.name || "",
        categorySlug: value,
      })
    }
  }

  const sidebarItems = [
    { id: "dashboard" as Tab, label: "Dashboard", icon: LayoutDashboard },
    { id: "products" as Tab, label: "Products", icon: Package },
    { id: "orders" as Tab, label: "Orders", icon: ShoppingCart },
    { id: "customers" as Tab, label: "Customers", icon: Users },
    { id: "settings" as Tab, label: "Settings", icon: Settings },
  ]


  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="font-serif text-2xl font-bold">Lumière</h1>
          <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
        </div>
        <Separator />
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <Separator />
        <div className="p-4 space-y-2">
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Store
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card rounded-xl p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Products</p>
                      <p className="text-3xl font-bold mt-1">{stats.totalProducts}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +12% from last month
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-3xl font-bold mt-1">${stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +8% from last month
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-3xl font-bold mt-1">{stats.totalOrders}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +23% from last month
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Customers</p>
                      <p className="text-3xl font-bold mt-1">{stats.totalCustomers}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +15% from last month
                  </p>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="font-bold text-lg mb-4">Revenue Overview</h3>
                  <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <BarChart data={revenueData}>
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>

                {/* Orders Chart */}
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="font-bold text-lg mb-4">Orders Trend</h3>
                  <ChartContainer config={chartConfig} className="h-[250px] w-full">
                    <LineChart data={ordersData}>
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>

              {/* Category Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="font-bold text-lg mb-4">Sales by Category</h3>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {categoryData.map((cat) => (
                      <div key={cat.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="text-muted-foreground">{cat.name}</span>
                        <span className="font-medium ml-auto">{cat.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Orders - Compact */}
                <div className="lg:col-span-2 bg-card rounded-xl border">
                  <div className="p-6 border-b">
                    <h3 className="font-bold text-lg">Recent Orders</h3>
                  </div>
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: "LUM-001", customer: "John Doe", product: "Aurora Gold Chandelier", amount: 2450, status: "Delivered" },
                      { id: "LUM-002", customer: "Jane Smith", product: "Luna Table Lamp", amount: 450, status: "Processing" },
                      { id: "LUM-003", customer: "Mike Johnson", product: "Arc Floor Lamp", amount: 1200, status: "Shipped" },
                      { id: "LUM-004", customer: "Sarah Wilson", product: "Crystal Chandelier", amount: 3800, status: "Pending" },
                    ].map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>${order.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" :
                            order.status === "Shipped" ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400" :
                            order.status === "Processing" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" :
                            "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                          }`}>
                            {order.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">
                  {filteredProducts.length} products found
                </p>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" /> Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label>Product Name</Label>
                        <Input
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          placeholder="Enter product name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Price ($)</Label>
                          <Input
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select onValueChange={(v) => handleCategoryChange(v, false)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.slug} value={cat.slug}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Image URL</Label>
                        <Input
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                          placeholder="/image.jpg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          placeholder="Enter product description"
                          rows={3}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={newProduct.isNew}
                          onCheckedChange={(checked) => setNewProduct({ ...newProduct, isNew: checked })}
                        />
                        <Label>Mark as New</Label>
                      </div>
                      <Button onClick={handleAddProduct} className="w-full">
                        Add Product
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Products Table */}
              <div className="bg-card rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-secondary">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toLocaleString()}</TableCell>
                        <TableCell>
                          {product.isNew && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 rounded-full text-xs font-medium">
                              New
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => setEditingProduct(product)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>Edit Product</DialogTitle>
                                </DialogHeader>
                                {editingProduct && (
                                  <div className="space-y-4 mt-4">
                                    <div className="space-y-2">
                                      <Label>Product Name</Label>
                                      <Input
                                        value={editingProduct.name}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label>Price ($)</Label>
                                        <Input
                                          type="number"
                                          value={editingProduct.price}
                                          onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Category</Label>
                                        <Select
                                          value={editingProduct.categorySlug}
                                          onValueChange={(v) => handleCategoryChange(v, true)}
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {categories.map((cat) => (
                                              <SelectItem key={cat.slug} value={cat.slug}>
                                                {cat.name}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Image URL</Label>
                                      <Input
                                        value={editingProduct.image}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Description</Label>
                                      <Textarea
                                        value={editingProduct.description}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                        rows={3}
                                      />
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Switch
                                        checked={editingProduct.isNew}
                                        onCheckedChange={(checked) => setEditingProduct({ ...editingProduct, isNew: checked })}
                                      />
                                      <Label>Mark as New</Label>
                                    </div>
                                    <Button onClick={handleEditProduct} className="w-full">
                                      Save Changes
                                    </Button>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}


          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="bg-card rounded-xl border">
              <div className="p-6 border-b">
                <h3 className="font-bold text-lg">All Orders</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "LUM-001", date: "Dec 9, 2025", customer: "John Doe", products: 2, amount: 2900, status: "Delivered" },
                    { id: "LUM-002", date: "Dec 8, 2025", customer: "Jane Smith", products: 1, amount: 450, status: "Processing" },
                    { id: "LUM-003", date: "Dec 8, 2025", customer: "Mike Johnson", products: 3, amount: 3650, status: "Shipped" },
                    { id: "LUM-004", date: "Dec 7, 2025", customer: "Sarah Wilson", products: 1, amount: 3800, status: "Pending" },
                    { id: "LUM-005", date: "Dec 7, 2025", customer: "Tom Brown", products: 2, amount: 1740, status: "Delivered" },
                    { id: "LUM-006", date: "Dec 6, 2025", customer: "Emily Davis", products: 1, amount: 2450, status: "Delivered" },
                  ].map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell className="text-muted-foreground">{order.date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.products} items</TableCell>
                      <TableCell>${order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Delivered" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" :
                          order.status === "Shipped" ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400" :
                          order.status === "Processing" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" :
                          "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === "customers" && (
            <div className="bg-card rounded-xl border">
              <div className="p-6 border-b">
                <h3 className="font-bold text-lg">All Customers</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "John Doe", email: "john@example.com", orders: 5, spent: 8450, joined: "Nov 15, 2025" },
                    { name: "Jane Smith", email: "jane@example.com", orders: 3, spent: 2340, joined: "Nov 20, 2025" },
                    { name: "Mike Johnson", email: "mike@example.com", orders: 8, spent: 12500, joined: "Oct 5, 2025" },
                    { name: "Sarah Wilson", email: "sarah@example.com", orders: 2, spent: 4250, joined: "Dec 1, 2025" },
                    { name: "Tom Brown", email: "tom@example.com", orders: 4, spent: 5680, joined: "Nov 8, 2025" },
                  ].map((customer) => (
                    <TableRow key={customer.email}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>${customer.spent.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">{customer.joined}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-card rounded-xl border p-6">
                <h3 className="font-bold text-lg mb-4">Store Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Store Name</Label>
                    <Input defaultValue="Lumière" />
                  </div>
                  <div className="space-y-2">
                    <Label>Store Email</Label>
                    <Input defaultValue="contact@lumiere.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save Changes</Button>
                </div>
              </div>

              <div className="bg-card rounded-xl border p-6">
                <h3 className="font-bold text-lg mb-4">Shipping Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Free Shipping Threshold ($)</Label>
                    <Input type="number" defaultValue="500" />
                  </div>
                  <div className="space-y-2">
                    <Label>Standard Shipping Rate ($)</Label>
                    <Input type="number" defaultValue="25" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tax Rate (%)</Label>
                    <Input type="number" defaultValue="10" />
                  </div>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
