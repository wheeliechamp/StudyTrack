'use server';

import { generateStudyTips } from '@/ai/flows/generate-study-tips';
import { z } from 'zod';

const learningHistorySchema = z.object({
  history: z.string().min(1, { message: 'Learning history cannot be empty.' }),
});

type State = {
  studyTips?: string[];
  message: 'success' | 'error' | 'idle';
  errors?: {
    history?: string[];
  } | null;
};

export async function getAiStudyTips(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = learningHistorySchema.safeParse({
    history: formData.get('history'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'error',
    };
  }

  try {
    const result = await generateStudyTips({ learningHistory: validatedFields.data.history });
    return { studyTips: result.studyTips, message: 'success' };
  } catch (error) {
    return {
      message: 'error',
      errors: { history: ['Failed to generate tips. Please try again later.'] },
    };
  }
}
