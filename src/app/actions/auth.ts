'use server';

import { z } from 'zod';
import { addUser, findUserByEmail, User } from '@/lib/auth-db';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

function hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export async function registerAction(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors, message: 'Invalid input' };
    }

    const { name, email, password } = parsed.data;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return { message: 'User already exists' };
    }

    const newUser: User = {
        id: crypto.randomUUID(),
        name,
        email,
        password: hashPassword(password),
    };

    await addUser(newUser);

    // Redirect to sign in page as requested
    redirect('/login');
}

export async function loginAction(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors, message: 'Invalid input' };
    }

    const { email, password } = parsed.data;

    const user = await findUserByEmail(email);
    if (!user || user.password !== hashPassword(password)) {
        return { message: 'Invalid email or password' };
    }

    // Set session cookie
    const cookieStore = await cookies(); // In Next 15 cookies() is async
    cookieStore.set('session_user_id', user.id, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    cookieStore.set('session_user_name', user.name, {
        httpOnly: true, // Only accessible by server
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });

    redirect('/dashboard');
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('session_user_id');
    cookieStore.delete('session_user_name');
    redirect('/login');
}
