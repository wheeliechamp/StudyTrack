'use client';

import { useTranslations } from 'next-intl';
import { BarChart, LineChart, TrendingUp } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartTooltipContent } from '@/components/ui/chart';

const dailyData = [
  { date: 'Mon', totalHours: 2.5 },
  { date: 'Tue', totalHours: 3 },
  { date: 'Wed', totalHours: 1.5 },
  { date: 'Thu', totalHours: 4 },
  { date: 'Fri', totalHours: 2 },
  { date: 'Sat', totalHours: 5 },
  { date: 'Sun', totalHours: 1 },
];

const weeklyData = [
  { week: 'Week 1', totalHours: 15 },
  { week: 'Week 2', totalHours: 19 },
  { week: 'Week 3', totalHours: 17 },
  { week: 'Week 4', totalHours: 22 },
];

const monthlyData = [
    { month: 'Jan', totalHours: 60 },
    { month: 'Feb', totalHours: 75 },
    { month: 'Mar', totalHours: 80 },
    { month: 'Apr', totalHours: 70 },
    { month: 'May', totalHours: 90 },
    { month: 'Jun', totalHours: 85 },
];


export function StudyCharts() {
  const t = useTranslations('StudyCharts');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><TrendingUp className="text-primary"/> {t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">{t('daily')}</TabsTrigger>
            <TabsTrigger value="weekly">{t('weekly')}</TabsTrigger>
            <TabsTrigger value="monthly">{t('monthly')}</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}h`} />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent unit="h" />}
                  />
                  <Bar dataKey="totalHours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="weekly">
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="week" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}h`} />
                        <Tooltip
                            cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '3 3' }}
                            content={<ChartTooltipContent indicator="dot" unit="h" />}
                        />
                        <Line type="monotone" dataKey="totalHours" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 6, fill: 'hsl(var(--primary))' }} activeDot={{ r: 8, fill: 'hsl(var(--primary))' }}/>
                    </RechartsLineChart>
                </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="monthly">
          <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}h`} />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent unit="h" />}
                  />
                  <Bar dataKey="totalHours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
