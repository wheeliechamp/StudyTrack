'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import type { Qualification } from '@/lib/types';

type QualificationManagerProps = {
  initialQualifications: Qualification[];
};

export function QualificationManager({ initialQualifications }: QualificationManagerProps) {
  const [qualifications, setQualifications] = useState(initialQualifications);
  const [open, setOpen] = useState(false);
  const t = useTranslations('QualificationManager');

  const handleAddQualification = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const subjects = (formData.get('subjects') as string).split(',').map(s => s.trim()).filter(Boolean);

    if (name && subjects.length > 0) {
      const newQualification: Qualification = {
        id: `q${qualifications.length + 1}`,
        name,
        subjects: subjects.map((sub, i) => ({ id: `s${Date.now()}${i}`, name: sub })),
      };
      setQualifications([...qualifications, newQualification]);
      setOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> {t('addQualification')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('dialogTitle')}</DialogTitle>
              <DialogDescription>{t('dialogDescription')}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddQualification} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('qualificationNameLabel')}</Label>
                <Input id="name" name="name" placeholder={t('qualificationNamePlaceholder')} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subjects">{t('subjectsLabel')}</Label>
                <Input id="subjects" name="subjects" placeholder={t('subjectsPlaceholder')} required/>
              </div>
              <DialogFooter>
                <Button type="submit">{t('addQualification')}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {qualifications.map((qual) => (
            <AccordionItem value={qual.id} key={qual.id}>
              <AccordionTrigger>
                <div className="flex justify-between w-full pr-4 items-center">
                    <span className="font-medium text-left">{qual.name}</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4"/></Button>
                    </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2 p-2">
                  {qual.subjects.map((sub) => (
                    <Badge variant="secondary" key={sub.id}>{sub.name}</Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
