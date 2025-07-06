'use client';

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, AccordionHeader } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Project } from '@/lib/types';
import { addProject, deleteProject, updateProject } from '@/app/actions';

type ProjectManagerProps = {
  initialProjects: Project[];
};

export function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [addError, setAddError] = useState<string | null>(null); // 追加
  const [editError, setEditError] = useState<string | null>(null); // 追加
  const t = useTranslations('ProjectManager');

  const handleAddProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAddError(null); // エラーをリセット
    const formData = new FormData(event.currentTarget);

    const result = await addProject(formData);

    if (result.success) {
      setOpen(false);
      window.location.reload();
    } else {
      console.error('Failed to add project:', result.error);
      setAddError(t(`errors.${result.error}`)); // 翻訳キーを使用してエラーメッセージを設定
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    const result = await deleteProject(projectId);

    if (result.success) {
      window.location.reload(); // ページをリロードして最新のプロジェクトリストを取得
    } else {
      console.error('Failed to delete project:', result.error);
      // Optionally, show an error message to the user
    }
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setEditOpen(true);
  };

  const handleUpdateProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEditError(null); // エラーをリセット
    if (!currentProject) return;

    const formData = new FormData(event.currentTarget);
    const result = await updateProject(currentProject.id, formData);

    if (result.success) {
      setEditOpen(false);
      window.location.reload();
    } else {
      console.error('Failed to update project:', result.error);
      setEditError(t(`errors.${result.error}`)); // 翻訳キーを使用してエラーメッセージを設定
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
              {addError && <p className="text-red-500 text-sm">{addError}</p>} {/* エラーメッセージ表示 */}
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
              <AccordionHeader className="flex">
                <AccordionTrigger className="flex-1">
                  <span className="font-medium text-left">{proj.name}</span>
                </AccordionTrigger>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleEditProject(proj)} // onClick ハンドラを追加
                    >
                      <Edit className="h-4 w-4"/>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteProject(proj.id)} // onClick ハンドラを追加
                    >
                      <Trash2 className="h-4 w-4"/>
                    </Button>
                </div>
              </AccordionHeader>
              <AccordionContent>
                <p className="text-sm text-muted-foreground p-2">{proj.description || 'No description provided.'}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>

      {/* Edit Project Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('editDialogTitle')}</DialogTitle>
            <DialogDescription>{t('editDialogDescription')}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateProject} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">{t('projectNameLabel')}</Label>
              <Input
                id="edit-name"
                name="name"
                placeholder={t('projectNamePlaceholder')}
                defaultValue={currentProject?.name || ''}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">{t('descriptionLabel')}</Label>
              <Textarea
                id="edit-description"
                name="description"
                placeholder={t('descriptionPlaceholder')}
                defaultValue={currentProject?.description || ''}
              />
            </div>
            {editError && <p className="text-red-500 text-sm">{editError}</p>} {/* エラーメッセージ表示 */}
            <DialogFooter>
              <Button type="submit">{t('updateProject')}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
