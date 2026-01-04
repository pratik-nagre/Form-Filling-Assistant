// "use client"; 

import { BookOpen, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickTips() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Helpful Tips
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4 bg-muted/30">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" /> Browser Extension
                        </span>
                        <span className="text-sm text-muted-foreground">
                            Use our Chrome extension to verify extracted data on the fly and autofill forms on external websites.
                        </span>
                    </div>
                </div>
                <div className="rounded-lg border p-4 bg-muted/30">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" /> Best Results
                        </span>
                        <span className="text-sm text-muted-foreground">
                            For best OCR accuracy, ensure your document images are clear, well-lit, and directly facing the camera.
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
