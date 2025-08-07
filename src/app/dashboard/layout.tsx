import { redirect } from 'next/navigation'
import { createClient } from '@/lib/server'
import { getUserProfile } from '@/lib/auth-server'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  ClipboardList,
  Users,
  Calendar,
  User,
  School,
  LogOut,
} from 'lucide-react'
import { LogoutButton } from '@/components/logout-button'
import Link from 'next/link'

const navigationItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Lesson Plan',
    icon: BookOpen,
    href: '/dashboard/lesson-plan',
  },
  {
    title: 'Materials & Resources',
    icon: FolderOpen,
    href: '/dashboard/materials',
  },
  {
    title: 'Assessment',
    icon: ClipboardList,
    href: '/dashboard/assessment',
  },
  {
    title: 'Classes',
    icon: Users,
    href: '/dashboard/classes',
  },
  {
    title: 'Calendar',
    icon: Calendar,
    href: '/dashboard/calendar',
  },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  const profile = await getUserProfile(data.user.id)
  if (!profile) {
    redirect('/auth/setup-profile')
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-1 py-2">
              <School className="h-6 w-6 text-primary group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 transition-all" />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">
                  {profile.school_name || 'My School'}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Education Platform
                </span>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex flex-col gap-2 p-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 transition-all">
                      <User className="h-4 w-4 text-primary group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                      <span className="truncate font-medium">
                        {profile.full_name || profile.email}
                      </span>
                      <span className="truncate text-xs text-muted-foreground capitalize">
                        {profile.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
                    {profile.grade_level && (
                      <span>Grade: {profile.grade_level}</span>
                    )}
                    {profile.subject_specialization && (
                      <span>Subject: {profile.subject_specialization}</span>
                    )}
                  </div>
                  <div className="group-data-[collapsible=icon]:hidden">
                    <LogoutButton variant="ghost" size="sm" />
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="ml-auto flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome back, {profile.full_name || profile.email}
              </span>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
