'use client';

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
import { Textarea } from '@/components/ui/textarea';
import type { Project } from '@/lib/types';
import { addProject } from '@/app/actions';

type ProjectManagerProps = {
  initialProjects: Project[];
};

export function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [open, setOpen] = useState(false);
  const t = useTranslations('ProjectManager');

  const handleAddProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await addProject(formData);

    if (result.success) {
      setOpen(false);
    } else {
      console.error('Failed to add project:', result.error);
      // Optionally, show an error message to the user
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
              <PlusCircle className="mr-2 h-4 w-4" /> {t('addProject')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('dialogTitle')}</DialogTitle>
              <DialogDescription>{t('dialogDescription')}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddProject} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('projectNameLabel')}</Label>
                <Input id="name" name="name" placeholder={t('projectNamePlaceholder')} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">{t('descriptionLabel')}</Label>
                <Textarea id="description" name="description" placeholder={t('descriptionPlaceholder')} />
              </div>
              <DialogFooter>
                <Button type="submit">{t('addProject')}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {initialProjects.map((proj) => (
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
                <p className="text-sm text-muted-foreground p-2">{proj.description || 'No description provided.'}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
