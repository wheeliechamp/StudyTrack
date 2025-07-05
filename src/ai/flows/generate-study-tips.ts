'use server';

/**
 * @fileOverview AI-powered study tip generator based on user learning history.
 *
 * - generateStudyTips - A function to generate personalized study tips.
 * - StudyTipsInput - The input type for the generateStudyTips function.
 * - StudyTipsOutput - The return type for the generateStudyTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudyTipsInputSchema = z.object({
  learningHistory: z
    .string()
    .describe(
      'A summary of the user learning history including subjects, time spent, and performance.'
    ),
});
export type StudyTipsInput = z.infer<typeof StudyTipsInputSchema>;

const StudyTipsOutputSchema = z.object({
  studyTips: z.array(z.string()).length(3).describe('A list of exactly three personalized study tips.'),
});
export type StudyTipsOutput = z.infer<typeof StudyTipsOutputSchema>;

export async function generateStudyTips(input: StudyTipsInput): Promise<StudyTipsOutput> {
  return generateStudyTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studyTipsPrompt',
  input: {schema: StudyTipsInputSchema},
  output: {schema: StudyTipsOutputSchema},
  prompt: `You are an AI study assistant. You will generate three personalized study tips based on the user's learning history. The tips should be actionable and help optimize the user's study schedule and improve their learning outcomes.

Learning History: {{{learningHistory}}}

Here are three personalized study tips:`,
});

const generateStudyTipsFlow = ai.defineFlow(
  {
    name: 'generateStudyTipsFlow',
    inputSchema: StudyTipsInputSchema,
    outputSchema: StudyTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
