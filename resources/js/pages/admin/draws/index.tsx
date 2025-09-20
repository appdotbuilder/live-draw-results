import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { type PaginatedDraws } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Eye, Trash2, Calendar } from 'lucide-react';

interface Props {
    draws: PaginatedDraws;
    [key: string]: unknown;
}

export default function AdminDrawsIndex({ draws }: Props) {
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

    const handleDelete = (drawId: number, drawNumber: string) => {
        if (confirm(`Are you sure you want to delete draw #${drawNumber}? This action cannot be undone.`)) {
            router.delete(route('admin.draws.destroy', drawId));
        }
    };

    return (
        <>
            <Head title="Manage Draws - Admin" />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                <header className="border-b bg-white dark:bg-slate-800">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    🎯 Manage Draws
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Create and manage lottery draw results
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href={route('home')}>
                                    <Button variant="outline">
                                        <Eye className="w-4 h-4 mr-2" />
                                        View Public Site
                                    </Button>
                                </Link>
                                <Link href={route('admin.draws.create')}>
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        New Draw
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                All Draws ({draws.total})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {draws.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📊</div>
                                    <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        No draws found
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                                        Create your first draw to get started
                                    </p>
                                    <Link href={route('admin.draws.create')}>
                                        <Button>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create First Draw
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                                                    Draw Number
                                                </th>
                                                <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                                                    Category
                                                </th>
                                                <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                                                    Date
                                                </th>
                                                <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                                                    Status
                                                </th>
                                                <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                                                    Winners
                                                </th>
                                                <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {draws.data.map((draw) => (
                                                <tr key={draw.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-slate-900 dark:text-white">
                                                                #{draw.draw_number}
                                                            </span>
                                                            {draw.is_featured && (
                                                                <Badge variant="outline" className="text-yellow-600 border-yellow-300 text-xs">
                                                                    ⭐
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-slate-500 dark:text-slate-400 capitalize">
                                                            {draw.draw_type}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span 
                                                            className="font-medium"
                                                            style={{ color: draw.category.color }}
                                                        >
                                                            {draw.category.name}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="text-sm text-slate-900 dark:text-white">
                                                            {new Date(draw.draw_date).toLocaleDateString()}
                                                        </div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400">
                                                            {new Date(draw.draw_date).toLocaleTimeString()}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {getStatusBadge(draw.status)}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className="font-medium text-slate-900 dark:text-white">
                                                            {draw.total_winners.toLocaleString()}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center gap-2">
                                                            <Link href={route('admin.draws.show', draw.id)}>
                                                                <Button size="sm" variant="outline">
                                                                    <Eye className="w-4 h-4" />
                                                                </Button>
                                                            </Link>
                                                            <Link href={route('admin.draws.edit', draw.id)}>
                                                                <Button size="sm" variant="outline">
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleDelete(draw.id, draw.draw_number)}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Pagination */}
                            {draws.last_page > 1 && (
                                <div className="mt-6 flex justify-center">
                                    <div className="flex gap-2">
                                        {draws.current_page > 1 && (
                                            <Button
                                                variant="outline"
                                                onClick={() => router.get(route('admin.draws.index'), { page: draws.current_page - 1 })}
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
                                                onClick={() => router.get(route('admin.draws.index'), { page: draws.current_page + 1 })}
                                            >
                                                Next
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </>
    );
}