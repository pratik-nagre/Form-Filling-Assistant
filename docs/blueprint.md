# **App Name**: Form Filling Assistant

## Core Features:

- Document Upload and Preview: Allows users to upload documents, with a real-time preview.
- AI-Powered Data Extraction: Uses the Gemini API as a tool to extract key information (name, date of birth, gender, address, Aadhaar number, PAN number) from uploaded documents and formats the response as JSON.
- Data Pre-filling: Automatically fills form fields based on the extracted data, if any is found. The keys must be: `name`, `dob` (in YYYY-MM-DD format), `gender`, `address` (as a single string), `aadhaar`, `pan`.
- Voice-to-Text Input: Enables voice input for each field using the Web Speech API, activated by clicking the microphone icon.
- Dynamic Form Display: Displays relevant form fields based on the selected form type (Sample Form A or Sample Form B).
- Manual Data Editing: Allows users to manually edit pre-filled data to correct or add missing information.
- PDF Download: Generates a PDF document containing the filled form data using jsPDF.

## Style Guidelines:

- Primary color: Deep sky blue (#00BFFF) to evoke trust and reliability.
- Background color: Light cyan (#E0FFFF), providing a clean and calming backdrop.
- Accent color: Sky blue (#87CEEB) for interactive elements and highlights.
- Body and headline font: 'Inter', a grotesque-style sans-serif suitable for both headlines and body text.
- Use simple, clear icons from a library like Font Awesome for form elements and actions.
- Responsive design with a clean, grid-based layout optimized for both desktop and mobile views.
- Subtle animations for loading states and transitions to enhance user experience.