import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { type Draw } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Trophy, Users, DollarSign, ArrowLeft, TrendingUp } from 'lucide-react';

interface Props {
    draw: Draw;
    relatedDraws: Draw[];
    [key: string]: unknown;
}

export default function DrawShow({ draw, relatedDraws }: Props) {
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

    const formatCurrency = (amount: string | number) => {
        const num = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-HK', {
            style: 'currency',
            currency: 'HKD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num);
    };

    return (
        <>
            <Head title={`Draw #${draw.draw_number} - ${draw.category.name}`} />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
                {/* Header */}
                <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Link href={route('home')}>
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg">
                                        🐉
                                    </div>
                                </Link>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Dragon Hong Kong Live
                                    </h1>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Draw Details
                                    </p>
                                </div>
                            </div>
                            <Link href={route('home')}>
                                <Button variant="outline">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Results
                                </Button>
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-8">
                    {/* Draw Header */}
                    <div className="mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                    <span style={{ color: draw.category.color }}>
                                        {draw.category.name}
                                    </span>
                                </h2>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-xl text-slate-600 dark:text-slate-400">
                                        Draw #{draw.draw_number}
                                    </span>
                                    {getStatusBadge(draw.status)}
                                    {draw.is_featured && (
                                        <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                                            ⭐ FEATURED
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>{new Date(draw.draw_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <span>{new Date(draw.draw_date).toLocaleTimeString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Draw Results */}
                        <div className="lg:col-span-2">
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Trophy className="w-6 h-6 text-yellow-500" />
                                        Winning Numbers
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {draw.status === 'completed' ? (
                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                                    Main Numbers
                                                </h4>
                                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                                    {formatNumbers(draw.winning_numbers).map((number, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xl font-bold shadow-lg"
                                                        >
                                                            {number}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            {draw.special_numbers && draw.special_numbers.length > 0 && (
                                                <div>
                                                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                                        Special Numbers
                                                    </h4>
                                                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                                        {draw.special_numbers.map((number, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white text-xl font-bold shadow-lg"
                                                            >
                                                                {number}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : draw.status === 'live' ? (
                                        <div className="text-center py-12">
                                            <div className="animate-pulse text-6xl mb-4">🎯</div>
                                            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                                                Draw in Progress
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400">
                                                Results will be displayed when the draw is complete
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="text-6xl mb-4">⏳</div>
                                            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                                                Draw Pending
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400">
                                                This draw has not been conducted yet
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Prize Breakdown */}
                            {draw.status === 'completed' && draw.prize_breakdown && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <DollarSign className="w-6 h-6 text-green-500" />
                                            Prize Breakdown
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {Object.entries(draw.prize_breakdown).map(([prize, data]: [string, { winners: number; amount: number }]) => (
                                                <div
                                                    key={prize}
                                                    className="flex justify-between items-center p-4 bg-slate-50 rounded-lg dark:bg-slate-800"
                                                >
                                                    <div>
                                                        <h4 className="font-semibold text-slate-900 dark:text-white capitalize">
                                                            {prize.replace('_', ' ')}
                                                        </h4>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                                            {data.winners} winner{data.winners !== 1 ? 's' : ''}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                                            {formatCurrency(data.amount)}
                                                        </p>
                                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                                            {data.winners > 0 ? 'per winner' : 'no winners'}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Draw Statistics */}
                            {draw.status === 'completed' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">📊 Statistics</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-600 dark:text-slate-400">
                                                    <Users className="w-4 h-4 inline mr-1" />
                                                    Total Winners
                                                </span>
                                                <span className="font-semibold">
                                                    {draw.total_winners.toLocaleString()}
                                                </span>
                                            </div>
                                            {draw.prize_pool && (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-slate-600 dark:text-slate-400">
                                                        <DollarSign className="w-4 h-4 inline mr-1" />
                                                        Prize Pool
                                                    </span>
                                                    <span className="font-semibold text-green-600 dark:text-green-400">
                                                        {formatCurrency(draw.prize_pool)}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-600 dark:text-slate-400">
                                                    Draw Type
                                                </span>
                                                <span className="font-semibold capitalize">
                                                    {draw.draw_type}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Category Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">ℹ️ Category Info</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-semibold" style={{ color: draw.category.color }}>
                                                {draw.category.name}
                                            </h4>
                                            {draw.category.description && (
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                    {draw.category.description}
                                                </p>
                                            )}
                                        </div>
                                        {draw.category.draw_schedule && (
                                            <div>
                                                <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                                    Schedule:
                                                </h5>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {draw.category.draw_schedule.days?.join(', ')} at {draw.category.draw_schedule.time}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Notes */}
                            {draw.notes && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">📝 Notes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {draw.notes}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>

                    {/* Related Draws */}
                    {relatedDraws.length > 0 && (
                        <div className="mt-12">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6" />
                                Recent {draw.category.name} Draws
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                {relatedDraws.map((relatedDraw) => (
                                    <Card key={relatedDraw.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="text-center">
                                                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                                                    #{relatedDraw.draw_number}
                                                </h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                                    {new Date(relatedDraw.draw_date).toLocaleDateString()}
                                                </p>
                                                {relatedDraw.status === 'completed' && (
                                                    <div className="flex flex-wrap justify-center gap-1 mb-3">
                                                        {formatNumbers(relatedDraw.winning_numbers).slice(0, 3).map((number, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold dark:bg-blue-900 dark:text-blue-200"
                                                            >
                                                                {number}
                                                            </span>
                                                        ))}
                                                        {relatedDraw.winning_numbers.length > 3 && (
                                                            <span className="text-xs text-slate-500">+{relatedDraw.winning_numbers.length - 3}</span>
                                                        )}
                                                    </div>
                                                )}
                                                <Link
                                                    href={route('draws.show', relatedDraw.id)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium dark:text-blue-400"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}