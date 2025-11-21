import { FormAssistant } from '@/components/form-assistant';

export default function Home() {
  return (
    <div>
      <header className="bg-card border-b">
        <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
          <h1 className="text-4xl font-bold text-primary">
            Form Filling Assistant
          </h1>
          <p className="text-muted-foreground mt-2">
            Automatically populate forms by extracting data from your documents using AI.
          </p>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <FormAssistant />
      </main>
    </div>
  );
}
