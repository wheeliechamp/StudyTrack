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
import type { Project } from '@/lib/types';

type ProjectManagerProps = {
  initialProjects: Project[];
};

export function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [open, setOpen] = useState(false);
  const t = useTranslations('QualificationManager');

  const handleAddProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const subjects = (formData.get('subjects') as string).split(',').map(s => s.trim()).filter(Boolean);

    if (name && subjects.length > 0) {
      const newProject: Project = {
        id: `p${projects.length + 1}`,
        name,
        subjects: subjects.map((sub, i) => ({ id: `s${Date.now()}${i}`, name: sub })),
      };
      setProjects([...projects, newProject]);
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
            <form onSubmit={handleAddProject} className="space-y-4 py-4">
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
          {projects.map((proj) => (
            <AccordionItem value={proj.id} key={proj.id}>
              <AccordionTrigger>
                <div className="flex justify-between w-full pr-4 items-center">
                    <span className="font-medium text-left">{proj.name}</span>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4"/></Button>
                    </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2 p-2">
                  {proj.subjects.map((sub) => (
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
