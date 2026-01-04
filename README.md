# Form Filling Assistant

An AI-powered ecosystem that streamlines form filling through a smart web application and a companion Chrome extension. Built with [Next.js](https://nextjs.org/), [Firebase Genkit](https://firebase.google.com/docs/genkit), and [Google Gemini](https://deepmind.google/technologies/gemini/).

## 🚀 Features

### 🌐 Web Application
-   **Smart Dashboard**: A central hub to manage your form-filling tasks.
-   **Default Form Workflow**: Automatically extract details (Name, Address, Aadhaar, PAN, etc.) from uploaded documents like ID cards.
-   **Custom Form Workflow**:
    -   **Schema Extraction**: Upload any blank form (PDF/Image), and the AI identifies fields.
    -   **Intelligent Mapping**: Map data from your personal documents to these custom fields automatically.
-   **User Authentication**: Secure sign-up and login interactions to manage your session.
-   **PDF Generation**: Download professionally filled forms as PDFs.

### 🧩 Chrome Extension
-   **Browser Integration**: Directly extract data from images found on webpages.
-   **Seamless Auto-fill**: Automatically populate web forms with extracted data.
-   **Gemini AI Power**: Uses the same powerful backend to analyze text and images in your browser.

## 🛠️ Tech Stack

-   **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), React
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
-   **AI & Logic**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
-   **Model**: Google Gemini Pro (via `@genkit-ai/google-genai`)
-   **Authentication**: Custom Auth Flow
-   **browser Extension**: Vanilla JS, HTML, CSS (Manifest V3)

## 📂 Project Structure

```bash
src/
├── app/                # Next.js App Router (Pages & API)
│   ├── dashboard/      # User Dashboard & Form Workflows
│   ├── register/       # User Registration
│   ├── instructions/   # Usage Guides
│   └── page.tsx        # Landing Page
├── components/         # Reusable UI Components
├── ai/                 # Genkit AI Flows & Logic
└── public/
    └── chrome-extension/ # Source code for the Chrome Extension
```

## 🏁 Getting Started

### Prerequisites
-   Node.js (v18+)
-   A Google Gemini API Key

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/pratik-nagre/Form-Filling-Assistant.git
    cd Form-Filling-Assistant
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory:
    ```env
    GOOGLE_GENAI_API_KEY=your_api_key_here
    ```

### Running the Application

1.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
    The web app will be available at `http://localhost:9002`.

2.  **Start Genkit (AI flows)**:
    ```bash
    npm run genkit:dev
    ```
    Access the Genkit Developer UI at `http://localhost:4000`.

### Installing the Chrome Extension

1.  Open Chrome and navigate to `chrome://extensions/`.
2.  Enable **Developer mode** (top right).
3.  Click **Load unpacked**.
4.  Select the `public/chrome-extension` folder from this repository.

## 📖 Usage Guide

1.  **Landing Page**: Visit the home page to see an overview and "Meet the Team".
2.  **Get Started**: Sign up or log in to access the Dashboard.
3.  **Dashboard**:
    -   Select **Default Form** for standard ID extraction.
    -   Select **Custom Form** to upload a blank template and map data to it.
4.  **Instructions**: Click "Instructions" in the dashboard header for detailed guides on using the Web App and setting up the Chrome Extension.

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.
