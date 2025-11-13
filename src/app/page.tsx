import { FormAssistant } from '@/components/form-assistant';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <main className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Form Filling Assistant
        </h1>
        <p className="text-muted-foreground">
          Automatically populate forms by extracting data from your documents using AI.
        </p>
      </div>
      <FormAssistant />
    </main>
  );
}

    