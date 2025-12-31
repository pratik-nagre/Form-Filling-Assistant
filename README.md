# Form Filling Assistant

An AI-powered application that streamlines the process of filling out forms by automatically extracting data from your documents. Built with [Next.js](https://nextjs.org/), [Firebase Genkit](https://firebase.google.com/docs/genkit), and [Google Gemini](https://deepmind.google/technologies/gemini/).

## 🚀 Features

- **Document Data Extraction**: Upload documents (like ID cards, passports, or existing forms) to automatically extract key information such as Name, Date of Birth, Gender, Address, Aadhaar, and PAN.
- **Custom Form Support**:
  - **Schema Extraction**: Upload a blank custom form (PDF or Image), and the AI will identify the fields that need to be filled.
  - **Intelligent Mapping**: Upload a source document containing your details, and the AI will intelligently map the data to the custom form fields.
- **Voice Input**: Fill out form fields using voice dictation for a hands-free experience.
- **PDF Generation**: Download the completed form with all filled data and photos as a professionally formatted PDF.
- **Profile Photo Integration**: Easily upload and include profile photos in your generated forms.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **AI & Logic**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **Model**: Google Gemini (via `@genkit-ai/google-genai`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (based on Radix UI)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```bash
src/
├── ai/                 # Genkit AI flows
│   ├── flows/          # Specific AI workflows (extraction, mapping)
│   └── dev.ts          # Genkit development server entry
├── app/                # Next.js App Router
│   ├── actions.ts      # Server actions calling AI flows
│   └── page.tsx        # Main application page
├── components/         # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   └── form-assistant.tsx # Main application logic
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- an API key for Google Gemini (configured via Genkit)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd Form-Filling-Assistant
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file in the root directory and add necessary keys (e.g., `GOOGLE_GENAI_API_KEY`).
    *(Refer to Genkit documentation for specific environment setup if needed)*

### Running the Application

1.  **Start the Next.js development server**:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:9002`.

2.  **Start the Genkit development server** (for AI flows):
    ```bash
    npm run genkit:dev
    ```
    This starts the Genkit developer UI, typically at `http://localhost:4000`, allowing you to test and debug the AI flows specifically.

## 📖 Usage

1.  **Choose a Mode**:
    - **Default Form**: Use the pre-built form structure for common ID details.
    - **Custom Form**: Switch tabs to upload your own form template.
2.  **Upload Documents**:
    - Upload an image or PDF of your source document (ID, previous form, etc.).
    - For Custom Forms, first upload the blank form to extract its schema.
3.  **Review & Edit**:
    - The AI will populate the fields. Review the data and make any necessary corrections manually or using voice input.
4.  **Download**:
    - Once satisfied, click "Download as PDF" to save the filled form.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
