'use server';

/**
 * @fileOverview This file defines a Genkit flow for pre-filling form fields with data extracted from documents using the Gemini API.
 *
 * It exports:
 * - `prefillFormFields`: An async function that takes document data and returns a JSON object suitable for pre-filling form fields.
 * - `PrefillFormFieldsInput`: The TypeScript type for the input to `prefillFormFields`.
 * - `PrefillFormFieldsOutput`: The TypeScript type for the output of `prefillFormFields`.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrefillFormFieldsInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text extracted from the uploaded document.'),
});

export type PrefillFormFieldsInput = z.infer<typeof PrefillFormFieldsInputSchema>;

const PrefillFormFieldsOutputSchema = z.object({
  name: z.string().optional().describe('The name extracted from the document.'),
  dob: z
    .string()
    .optional()
    .describe('The date of birth extracted from the document in YYYY-MM-DD format.'),
  gender: z.string().optional().describe('The gender extracted from the document.'),
  address: z.string().optional().describe('The address extracted from the document.'),
  aadhaar: z.string().optional().describe('The Aadhaar number extracted from the document.'),
  pan: z.string().optional().describe('The PAN number extracted from the document.'),
});

export type PrefillFormFieldsOutput = z.infer<typeof PrefillFormFieldsOutputSchema>;

export async function prefillFormFields(input: PrefillFormFieldsInput): Promise<PrefillFormFieldsOutput> {
  return prefillFormFieldsFlow(input);
}

const prefillFormFieldsPrompt = ai.definePrompt({
  name: 'prefillFormFieldsPrompt',
  input: {schema: PrefillFormFieldsInputSchema},
  output: {schema: PrefillFormFieldsOutputSchema},
  prompt: `You are an AI assistant specialized in extracting information from documents to pre-fill form fields.

  Given the following document text, extract the following information:
  - Name
  - Date of Birth (in YYYY-MM-DD format)
  - Gender
  - Address (as a single string)
  - Aadhaar Number
  - PAN Number

  Return the extracted information as a JSON object with the following keys: name, dob, gender, address, aadhaar, pan. If a field cannot be extracted, leave it blank. Only return a valid JSON response.

  Document Text: {{{documentText}}}
  `,
});

const prefillFormFieldsFlow = ai.defineFlow(
  {
    name: 'prefillFormFieldsFlow',
    inputSchema: PrefillFormFieldsInputSchema,
    outputSchema: PrefillFormFieldsOutputSchema,
  },
  async input => {
    const {output} = await prefillFormFieldsPrompt(input);
    return output!;
  }
);
