import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface DrawCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    color: string;
    draw_schedule?: {
        days?: string[];
        time?: string;
        timezone?: string;
    } | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Draw {
    id: number;
    draw_category_id: number;
    draw_number: string;
    draw_type: string;
    winning_numbers: number[];
    special_numbers?: number[] | null;
    draw_date: string;
    status: 'pending' | 'live' | 'completed' | 'cancelled';
    prize_pool?: string | null;
    total_winners: number;
    prize_breakdown?: {
        [key: string]: {
            winners: number;
            amount: number;
        };
    } | null;
    notes?: string | null;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    category: DrawCategory;
}

export interface PaginatedDraws {
    data: Draw[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url?: string | null;
        label: string;
        active: boolean;
    }>;
}

export interface DrawFilters {
    category?: string;
    status?: string;
    draw_number?: string;
    date_from?: string;
    date_to?: string;
}
