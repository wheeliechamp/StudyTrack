'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Timer, Play, Pause, Square } from 'lucide-react';
import type { Qualification, Subject } from '@/lib/types';

type StudyTimerProps = {
  qualifications: Qualification[];
};

export function StudyTimer({ qualifications }: StudyTimerProps) {
  const [selectedQualification, setSelectedQualification] = useState<Qualification | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
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

  const handleQualificationChange = (qualId: string) => {
    const qual = qualifications.find(q => q.id === qualId) || null;
    setSelectedQualification(qual);
    setSubjects(qual ? qual.subjects : []);
    setSelectedSubject(null);
  };
  
  const handleSubjectChange = (subjId: string) => {
    const subj = subjects.find(s => s.id === subjId) || null;
    setSelectedSubject(subj);
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
    console.log(`Session ended. Duration: ${time} seconds for ${selectedSubject?.name}`);
    setTime(0);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const canStart = selectedQualification && selectedSubject;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Timer className="text-primary"/> {t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Select onValueChange={handleQualificationChange}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectQualification')} />
              </SelectTrigger>
              <SelectContent>
                {qualifications.map((qual) => (
                  <SelectItem key={qual.id} value={qual.id}>{qual.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Select onValueChange={handleSubjectChange} disabled={!selectedQualification}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectSubject')} />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subj) => (
                  <SelectItem key={subj.id} value={subj.id}>{subj.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
        <div className="text-center bg-muted rounded-lg p-4">
            <p className="text-5xl font-mono font-bold tracking-widest text-primary">
                {formatTime(time)}
            </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        {time > 0 && (
          <Button variant="destructive" onClick={handleStop} className="w-full">
            <Square className="mr-2 h-4 w-4" /> {t('stopAndSave')}
          </Button>
        )}
        <Button onClick={isActive ? handlePause : handleStart} disabled={!canStart} className="w-full">
          {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isActive ? t('pause') : (time > 0 ? t('resume') : t('start'))}
        </Button>
      </CardFooter>
    </Card>
  );
}
