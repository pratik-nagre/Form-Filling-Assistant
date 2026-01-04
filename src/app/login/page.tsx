'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';

const initialState = {
    message: '',
    error: {},
};

export default function LoginPage() {
    const [state, action] = useActionState(loginAction, initialState);

    return (
        <div className="flex items-center justify-center min-h-screen bg-cyan-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 border-white/50 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>
                <form action={action}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-white/50" />
                            {state?.error?.email && <p className="text-sm text-red-500">{state.error.email}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required className="bg-white/50" />
                            {state?.error?.password && <p className="text-sm text-red-500">{state.error.password}</p>}
                        </div>
                        {state?.message && (
                            <p className="text-sm text-red-500 text-center">
                                {state.message}
                            </p>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <SubmitButton />
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="text-purple-600 hover:underline font-medium">
                                Register here
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={pending}>
            {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : 'Sign In'}
        </Button>
    );
}
