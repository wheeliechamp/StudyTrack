import { History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { StudySession } from '@/lib/types';

const recentSessions: StudySession[] = [
  { id: '1', subject: 'Cloud Concepts', qualification: 'Certified Cloud Practitioner', date: '2024-05-20', durationMinutes: 60 },
  { id: '2', subject: 'Planning', qualification: 'Project Management Professional', date: '2024-05-20', durationMinutes: 90 },
  { id: '3', subject: 'Security and Compliance', qualification: 'Certified Cloud Practitioner', date: '2024-05-19', durationMinutes: 45 },
  { id: '4', subject: 'Executing', qualification: 'Project Management Professional', date: '2024-05-19', durationMinutes: 120 },
  { id: '5', subject: 'Technology', qualification: 'Certified Cloud Practitioner', date: '2024-05-18', durationMinutes: 75 },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><History className="text-primary"/> Recent Activity</CardTitle>
        <CardDescription>A log of your most recent study sessions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead className="hidden sm:table-cell">Qualification</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  <div className="font-medium">{session.subject}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{session.qualification}</TableCell>
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
