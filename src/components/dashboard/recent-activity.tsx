'use client';

import { History } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { StudySession } from '@/lib/types';

export function RecentActivity({ initialSessions }: { initialSessions: StudySession[] }) {
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
            {initialSessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  <div className="font-medium">{session.project}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{session.date}</TableCell>
                <TableCell className="text-right">{t('durationValue', { minutes: session.durationMinutes })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
