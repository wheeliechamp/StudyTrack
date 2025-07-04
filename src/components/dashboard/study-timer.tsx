'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Timer, Play, Pause, Square } from 'lucide-react';
import type { Project } from '@/lib/types';

type StudyTimerProps = {
  projects: Project[];
};

export function StudyTimer({ projects }: StudyTimerProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const t = useTranslations('StudyTimer');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      if(interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const handleProjectChange = (projId: string) => {
    const proj = projects.find(p => p.id === projId) || null;
    setSelectedProject(proj);
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleStop = () => {
    setIsActive(false);
    // Here you would typically save the session
    console.log(`Session ended. Duration: ${time} seconds for project ${selectedProject?.name}`);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const canStart = !!selectedProject;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Timer className="text-primary"/> {t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="project-select">{t('selectProject')}</Label>
            <Select onValueChange={handleProjectChange}>
              <SelectTrigger id="project-select">
                <SelectValue placeholder={t('selectProject')} />
              </SelectTrigger>
              <SelectContent>
                {projects.map((proj) => (
                  <SelectItem key={proj.id} value={proj.id}>{proj.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
        <div className="text-center bg-muted rounded-lg p-4">
            <p className="text-4xl font-mono font-bold text-primary">
                {formatTime(time)}
            </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {time > 0 && (
          <Button variant="destructive" onClick={handleStop} className="flex-1 min-w-[120px]">
            <Square className="mr-2 h-4 w-4" /> {t('stopAndSave')}
          </Button>
        )}
        <Button onClick={isActive ? handlePause : handleStart} disabled={!canStart} className="flex-1 min-w-[120px]">
          {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isActive ? t('pause') : (time > 0 ? t('resume') : t('start'))}
        </Button>
      </CardFooter>
    </Card>
  );
}