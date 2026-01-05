"use client";

import React, { useEffect, useState } from 'react';
import { AppNavbar } from '@/components/AppNavbar';
import { WebAppInstructions } from '@/components/instructions-content';
import { useLanguageStore } from '@/lib/store';
import { dashboardGuideTranslations } from '@/components/translations';

function getCookie(name: string) {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
}

export default function InstructionsPage() {
    const [userName, setUserName] = useState('Guest');
    const { language } = useLanguageStore();
    // @ts-ignore
    const t = dashboardGuideTranslations[language] || dashboardGuideTranslations["en-US"];

    useEffect(() => {
        const user = getCookie('session_user_name');
        if (user) {
            setUserName(decodeURIComponent(user));
        }
    }, []);

    return (
        <div className="min-h-screen bg-cyan-50 font-body">
            <AppNavbar userName={userName} />

            <main className="container mx-auto px-4 py-8 max-w-4xl space-y-12">

                <div className="flex flex-col gap-2 md:items-center md:text-center pb-8 border-b">
                    <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t.desc}
                    </p>
                </div>

                {/* Only Web App Instructions for Dashboard Users */}
                <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-100">
                    <WebAppInstructions />
                </div>

            </main>
        </div>
    );
}
