'use client';

import { useActionState } from 'react';
import { registerAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const initialState = {
    message: '',
    error: {},
};

export default function RegisterPage() {
    const [state, action] = useActionState(registerAction, initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [pending, setPending] = useState(false);

    // Small wrapper to handle pending state manually if needed or just rely on useFormStatus in a sub-component.
    // Since I am in the same component, I can't use useFormStatus for the button easily without extracting it.
    // I'll extract a SubmitButton or just use standard form action.

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your details to create a new account
                    </CardDescription>
                </CardHeader>
                <form action={action}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="John Doe" required />
                            {state?.error?.name && <p className="text-sm text-red-500">{state.error.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                            {state?.error?.email && <p className="text-sm text-red-500">{state.error.email}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="******"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {state?.error?.password && <p className="text-sm text-red-500">{state.error.password}</p>}
                        </div>
                        {state?.message && (
                            <p className={`text-sm ${state.message === 'User already exists' ? 'text-red-500' : 'text-green-500'}`}>
                                {state.message}
                            </p>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <SubmitButton />
                        <div className="text-center text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-600 hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...</> : 'Create Account'}
        </Button>
    );
}
