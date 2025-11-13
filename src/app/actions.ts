'use server';

import { extractDataFromDocument } from '@/ai/flows/extract-data-from-document';
import type { ExtractDataFromDocumentOutput } from '@/ai/flows/extract-data-from-document';

export async function extractDataAction(
  documentDataUri: string
): Promise<ExtractDataFromDocumentOutput | { error: string }> {
  try {
    if (!documentDataUri) {
      return { error: 'Document data is missing.' };
    }
    const extractedData = await extractDataFromDocument({ documentDataUri });
    return extractedData;
  } catch (error) {
    console.error('Error extracting data from document:', error);
    return { error: 'Failed to extract data from the document. Please try again.' };
  }
}
