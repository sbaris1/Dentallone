import type React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { MainSidebar } from "@/components/main-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <MainSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex items-center p-4 border-b bg-white">
            <SidebarTrigger className="mr-2" />
            <h1 className="text-xl font-semibold">DentAllOne Dental Clinic</h1>
          </div>
          <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
