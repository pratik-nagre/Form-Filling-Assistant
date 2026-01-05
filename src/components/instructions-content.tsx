
"use client";

import React from 'react';
import { Download, Upload, Eye, Chrome, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguageStore } from '@/lib/store';
import { instructionsTranslations } from '@/components/translations';
import { FileText } from 'lucide-react';

export function ExtensionInstructions() {
    const { language } = useLanguageStore();
    const t = instructionsTranslations[language] || instructionsTranslations["en-US"];

    return (
        <section id="extension-setup" className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Chrome className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t.chrome_extension_setup}</h2>
                    <p className="text-muted-foreground">{t.chrome_extension_setup_desc}</p>
                </div>
            </div>

            <Card className="border-blue-200/50 dark:border-blue-900/50 shadow-sm">
                <CardHeader>
                    <CardTitle>{t.download_prepare}</CardTitle>
                    <CardDescription>{t.download_prepare_desc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg bg-secondary/20 flex flex-col sm:flex-row items-center gap-4 justify-between">
                        <div className="space-y-1">
                            <p className="font-medium">{t.download_package}</p>
                            <p className="text-sm text-muted-foreground">{t.latest_version}</p>
                        </div>
                        <a href="/extension.zip" download="form-assistant-extension.zip">
                            <Button className="w-full sm:w-auto gap-2 bg-blue-600 hover:bg-blue-700">
                                <Download className="w-4 h-4" /> {t.download_zip}
                            </Button>
                        </a>
                    </div>
                    <p className="text-sm border-l-2 border-primary pl-4 py-1 text-muted-foreground">
                        <span dangerouslySetInnerHTML={{
                            __html: t.note_unzip.replace(
                                'chrome-extension',
                                '<code>chrome-extension</code>'
                            )
                        }} />
                    </p>
                </CardContent>
            </Card>

            <Card className="border-blue-200/50 dark:border-blue-900/50 shadow-sm">
                <CardHeader>
                    <CardTitle>{t.install_chrome}</CardTitle>
                    <CardDescription>{t.install_chrome_desc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                        <li className="pl-2">
                            <span dangerouslySetInnerHTML={{
                                __html: t.step_open_chrome.replace(
                                    'chrome://extensions',
                                    '<code class="bg-muted px-1.5 py-0.5 rounded text-foreground">chrome://extensions</code>'
                                )
                            }} />
                        </li>
                        <li className="pl-2">
                            {t.step_enable_dev}
                        </li>
                        <li className="pl-2">
                            {t.step_load_unpacked}
                        </li>
                        <li className="pl-2">
                            <span dangerouslySetInnerHTML={{
                                __html: t.step_select_folder.replace(
                                    'manifest.json',
                                    '<code>manifest.json</code>'
                                )
                            }} />
                        </li>
                    </ol>
                    <div className="rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900 p-4 flex gap-3 text-sm text-green-800 dark:text-green-300">
                        <ShieldCheck className="w-5 h-5 shrink-0" />
                        <p>
                            {t.trust_warning}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}

export function WebAppInstructions() {
    const { language } = useLanguageStore();
    const t = instructionsTranslations[language] || instructionsTranslations["en-US"];

    return (
        <section id="webapp-usage" className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{t.web_dashboard_usage}</h2>
                    <p className="text-muted-foreground">{t.web_dashboard_usage_desc}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-md border-t-4 border-t-blue-500 bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-blue-700 dark:text-blue-400">
                            <Upload className="w-6 h-6" /> {t.card_upload}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {t.card_upload_desc}
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-md border-t-4 border-t-purple-500 bg-gradient-to-b from-white to-purple-50 dark:from-slate-900 dark:to-slate-800/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-purple-700 dark:text-purple-400">
                            <Eye className="w-6 h-6" /> {t.card_review}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {t.card_review_desc}
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-md border-t-4 border-t-emerald-500 bg-gradient-to-b from-white to-emerald-50 dark:from-slate-900 dark:to-slate-800/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-emerald-700 dark:text-emerald-400">
                            <Download className="w-6 h-6" /> {t.card_export}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {t.card_export_desc}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
