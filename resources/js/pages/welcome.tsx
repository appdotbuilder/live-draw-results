import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { type SharedData, type Draw, type DrawCategory, type PaginatedDraws, type DrawFilters } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Trophy, TrendingUp, Search, Filter } from 'lucide-react';

interface Props {
    draws: PaginatedDraws;
    categories: DrawCategory[];
    liveDraws: Draw[];
    featuredDraws: Draw[];
    filters: DrawFilters;
    [key: string]: unknown;
}

export default function Welcome({ draws, categories, liveDraws, featuredDraws, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [searchTerm, setSearchTerm] = useState(filters.draw_number || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = () => {
        router.get('/', {
            ...filters,
            draw_number: searchTerm,
            category: selectedCategory,
            status: selectedStatus,
        }, { preserveState: true });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedStatus('');
        router.get('/', {}, { preserveState: true });
    };

    const formatNumbers = (numbers: number[]) => {
        return numbers.sort((a, b) => a - b);
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            'live': 'destructive',
            'completed': 'default',
            'pending': 'secondary',
            'cancelled': 'outline'
        } as const;
        
        return (
            <Badge variant={variants[status as keyof typeof variants] || 'default'}>
                {status === 'live' && '🔴'} {status.toUpperCase()}
            </Badge>
        );
    };

    return (
        <>
            <Head title="🎯 Dragon Hong Kong Live - Live Draw Results">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
                {/* Header */}
                <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg">
                                    🐉
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Dragon Hong Kong Live
                                    </h1>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Live Draw Results & Historical Data
                                    </p>
                                </div>
                            </div>
                            <nav className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-slate-700 hover:text-blue-600 dark:text-slate-300"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    {/* Hero Section */}
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            🎯 Live Draw Results
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Stay updated with the latest Hong Kong lottery draw results. View live draws, 
                            historical data, and track your favorite numbers.
                        </p>
                    </div>

                    {/* Live Draws Section */}
                    {liveDraws.length > 0 && (
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    🔴 Live Now
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {liveDraws.map((draw) => (
                                    <Card key={draw.id} className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-center">
                                                <CardTitle className="text-lg" style={{ color: draw.category.color }}>
                                                    {draw.category.name}
                                                </CardTitle>
                                                {getStatusBadge(draw.status)}
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                Draw #{draw.draw_number}
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                                                <Clock className="w-4 h-4" />
                                                {new Date(draw.draw_date).toLocaleString()}
                                            </div>
                                            <div className="text-center">
                                                <p className="text-lg font-semibold text-red-600 dark:text-red-400 animate-pulse">
                                                    Draw in Progress...
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Featured Draws */}
                    {featuredDraws.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                                Featured Results
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {featuredDraws.map((draw) => (
                                    <Card key={draw.id} className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-center">
                                                <CardTitle className="text-lg" style={{ color: draw.category.color }}>
                                                    {draw.category.name}
                                                </CardTitle>
                                                <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                                                    ⭐ FEATURED
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                Draw #{draw.draw_number}
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(draw.draw_date).toLocaleDateString()}
                                            </div>
                                            <div className="mb-3">
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                    Winning Numbers:
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {formatNumbers(draw.winning_numbers).map((number, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold dark:bg-blue-900 dark:text-blue-200"
                                                        >
                                                            {number}
                                                        </span>
                                                    ))}
                                                    {draw.special_numbers && draw.special_numbers.map((number, index) => (
                                                        <span
                                                            key={`special-${index}`}
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-800 text-sm font-semibold dark:bg-red-900 dark:text-red-200"
                                                        >
                                                            {number}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <Link
                                                href={route('draws.show', draw.id)}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium dark:text-blue-400"
                                            >
                                                View Details →
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Search and Filter Section */}
                    <div className="mb-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <TrendingUp className="w-6 h-6" />
                                All Draw Results
                            </h3>
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden"
                            >
                                <Filter className="w-4 h-4 mr-2" />
                                Filters
                            </Button>
                        </div>
                        
                        <div className={`mt-4 p-4 bg-white rounded-lg shadow-sm dark:bg-slate-800 ${!showFilters ? 'hidden lg:block' : ''}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div>
                                    <Input
                                        placeholder="Search draw number..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Categories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">All Categories</SelectItem>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.slug}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Statuses" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">All Statuses</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="live">Live</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Button onClick={handleSearch} className="w-full">
                                        <Search className="w-4 h-4 mr-2" />
                                        Search
                                    </Button>
                                </div>
                                <div>
                                    <Button variant="outline" onClick={clearFilters} className="w-full">
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Draw Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {draws.data.map((draw) => (
                            <Card key={draw.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg" style={{ color: draw.category.color }}>
                                            {draw.category.name}
                                        </CardTitle>
                                        {getStatusBadge(draw.status)}
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Draw #{draw.draw_number}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(draw.draw_date).toLocaleDateString()}
                                    </div>
                                    
                                    {draw.status === 'completed' && (
                                        <div className="mb-3">
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Winning Numbers:
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {formatNumbers(draw.winning_numbers).map((number, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold dark:bg-blue-900 dark:text-blue-200"
                                                    >
                                                        {number}
                                                    </span>
                                                ))}
                                            </div>
                                            {draw.special_numbers && draw.special_numbers.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">Special:</span>
                                                    {draw.special_numbers.map((number, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-800 text-sm font-semibold dark:bg-red-900 dark:text-red-200"
                                                        >
                                                            {number}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                                                <div className="flex justify-between">
                                                    <span>Winners:</span>
                                                    <span className="font-medium">{draw.total_winners.toLocaleString()}</span>
                                                </div>
                                                {draw.prize_pool && (
                                                    <div className="flex justify-between">
                                                        <span>Prize Pool:</span>
                                                        <span className="font-medium">${parseFloat(draw.prize_pool).toLocaleString()}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    
                                    <Link
                                        href={route('draws.show', draw.id)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium dark:text-blue-400"
                                    >
                                        View Details →
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {draws.last_page > 1 && (
                        <div className="mt-8 flex justify-center">
                            <div className="flex gap-2">
                                {draws.current_page > 1 && (
                                    <Button
                                        variant="outline"
                                        onClick={() => router.get('/', { ...filters, page: draws.current_page - 1 })}
                                    >
                                        Previous
                                    </Button>
                                )}
                                <span className="flex items-center px-4 text-sm text-slate-600 dark:text-slate-400">
                                    Page {draws.current_page} of {draws.last_page}
                                </span>
                                {draws.current_page < draws.last_page && (
                                    <Button
                                        variant="outline"
                                        onClick={() => router.get('/', { ...filters, page: draws.current_page + 1 })}
                                    >
                                        Next
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 mt-16">
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                                    🎯 Key Features
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li>• Real-time live draw results</li>
                                    <li>• Complete historical data</li>
                                    <li>• Advanced search & filtering</li>
                                    <li>• Prize breakdown analysis</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                                    🕒 Draw Schedule
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li>• Mark Six: Tue, Thu, Sat at 9:30 PM</li>
                                    <li>• Lucky Numbers: Daily at 8:00 PM</li>
                                    <li>• Dragon Draw: Sunday at 10:00 PM</li>
                                    <li>• Golden Balls: Wed, Sat at 9:00 PM</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                                    📈 Statistics
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li>• Total draws tracked: {draws.total.toLocaleString()}</li>
                                    <li>• Categories available: {categories.length}</li>
                                    <li>• Live draws today: {liveDraws.length}</li>
                                    <li>• Updated every minute</li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t pt-6 mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                            <p>
                                Built with ❤️ by{' '}
                                <a
                                    href="https://app.build"
                                    target="_blank"
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    app.build
                                </a>
                                {' '}• Dragon Hong Kong Live Draw Results Platform
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}