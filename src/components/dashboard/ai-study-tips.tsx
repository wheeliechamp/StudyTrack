'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Lightbulb } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { getAiStudyTips } from '@/app/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Generating...' : 'Generate Tips'}
    </Button>
  );
}

export function AiStudyTips() {
  const initialState = { message: 'idle' as const, studyTips: [] };
  const [state, formAction] = useFormState(getAiStudyTips, initialState);

  // A mock summary of learning history. In a real app, this would be dynamically generated.
  const mockLearningHistory = "User has studied 'Cloud Concepts' for 120 minutes, 'Security and Compliance' for 90 minutes, and 'Project Management' for 200 minutes over the last week. Performance on Cloud Concepts is strong, but time spent on Project Management yields lower scores on practice tests.";

  return (
    <Card>
      <form action={formAction}>
        <input type="hidden" name="history" value={mockLearningHistory} />
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lightbulb className="text-primary"/> AI Study Tips</CardTitle>
          <CardDescription>Get personalized tips to optimize your study schedule based on your recent activity.</CardDescription>
        </CardHeader>
        <CardContent>
          {state.message === 'success' && state.studyTips && (
            <Accordion type="single" collapsible className="w-full">
              {state.studyTips.map((tip, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>Tip #{index + 1}</AccordionTrigger>
                  <AccordionContent>{tip}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
          {useFormStatus().pending && (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          )}
          {state.message === 'error' && (
             <p className="text-sm text-destructive">{state.errors?.history || 'An unknown error occurred.'}</p>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
