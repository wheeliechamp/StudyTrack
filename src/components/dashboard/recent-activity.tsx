'use client';

import { History } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { StudySession } from '@/lib/types';

const recentSessions: StudySession[] = [
  { id: '1', project: 'AWS Cloud Learning', date: '2024-05-20', durationMinutes: 60 },
  { id: '2', project: 'Project Management Study', date: '2024-05-20', durationMinutes: 90 },
  { id: '3', project: 'CISSP Study', date: '2024-05-19', durationMinutes: 45 },
  { id: '4', project: 'AWS Cloud Learning', date: '2024-05-19', durationMinutes: 120 },
  { id: '5', project: 'Project Management Study', date: '2024-05-18', durationMinutes: 75 },
];

export function RecentActivity() {
  const t = useTranslations('RecentActivity');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><History className="text-primary"/> {t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('project')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('date')}</TableHead>
              <TableHead className="text-right">{t('duration')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  <div className="font-medium">{session.project}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{session.date}</TableCell>
                <TableCell className="text-right">{session.durationMinutes} min</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
