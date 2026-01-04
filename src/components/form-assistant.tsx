
// "use client"; // Not strictly needed here if parent is client, but good for safety if used standalone

import Link from "next/link";
import { Newspaper, FileCode, ArrowRight, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function FormAssistant() {
    return (
        <Card className="border-none shadow-xl bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-slate-950 dark:to-slate-900">
            <CardHeader>
                <CardTitle className="text-2xl">Start a New Task</CardTitle>
                <CardDescription>Select a workflow to begin automation.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
                {/* Default Form - Blue Style */}
                <Link href="/dashboard/default-form" className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-75 transition duration-500"></div>
                    <div className="relative h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 transition-all duration-300 hover:scale-[1.02] flex flex-col items-center text-center">
                        <div className="h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
                            <Newspaper className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Default Form</h3>
                        <p className="text-muted-foreground mb-6 text-sm">
                            Auto-fill standard ID card details like Aadhaar & PAN.
                        </p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-auto shadow-md">
                            Start Default Form <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </Link>

                {/* Custom Form - Purple Style */}
                <Link href="/dashboard/custom-form" className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-75 transition duration-500"></div>
                    <div className="relative h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 transition-all duration-300 hover:scale-[1.02] flex flex-col items-center text-center">
                        <div className="h-14 w-14 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors">
                            <FileCode className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Custom Form</h3>
                        <p className="text-muted-foreground mb-6 text-sm">
                            Upload a blank form and map your document data to it.
                        </p>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-auto shadow-md">
                            Start Custom Form <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </Link>
            </CardContent>
        </Card>
    );
}
