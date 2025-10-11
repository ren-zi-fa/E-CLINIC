import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    CalendarClock,
    ClipboardList,
    File,
    Folder,
    LayoutGrid,
    Pill,
    Stethoscope,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';

const navItemsUtama: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Antrian Kunjungan',
        href: '#',
        icon: ClipboardList,
    },
];
const navItemsManajemen: NavItem[] = [
    {
        title: 'Data Pasien',
        href: dashboard(),
        icon: Users,
    },
    {
        title: 'Data Dokter',
        href: '#',
        icon: Stethoscope,
    },
    {
        title: 'Jadwal Dokter',
        href: '#',
        icon: CalendarClock,
    },
    {
        title: 'Data Obat',
        href: '#',
        icon: Pill,
    },
];
const othersItem: NavItem[] = [
    {
        title: 'laporan',
        href: '#',
        icon: File,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain
                    othersItem={othersItem}
                    itemsUtama={navItemsUtama}
                    itemsManajemen={navItemsManajemen}
                />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
