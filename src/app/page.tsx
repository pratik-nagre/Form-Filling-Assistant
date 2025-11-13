import { FormAssistant } from '@/components/form-assistant';

export default function Home() {
  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-headline font-bold text-center mb-2 text-primary">
        Form Filling Assistant
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Upload a document to automatically fill the form using AI.
      </p>
      <FormAssistant />
    </main>
  );
}
