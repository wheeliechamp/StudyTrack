'use client';

import { useTranslations } from 'next-intl';
import { TrendingUp } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

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

const chartConfig = {
  totalHours: {
    label: "Hours",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;


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
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <RechartsBarChart data={dailyData} accessibilityLayer>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}h`} />
                  <ChartTooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="totalHours" fill="var(--color-totalHours)" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="weekly">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <RechartsLineChart data={weeklyData} accessibilityLayer>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="week" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}h`} />
                    <ChartTooltip
                        cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '3 3' }}
                        content={<ChartTooltipContent indicator="dot" hideLabel />}
                    />
                    <Line type="monotone" dataKey="totalHours" stroke="var(--color-totalHours)" strokeWidth={2} dot={{ r: 6 }} activeDot={{ r: 8 }}/>
                </RechartsLineChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="monthly">
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <RechartsBarChart data={monthlyData} accessibilityLayer>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}h`} />
                  <ChartTooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="totalHours" fill="var(--color-totalHours)" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
