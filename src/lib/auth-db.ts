
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'users.json');

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

async function ensureDb() {
    try {
        await fs.access(DB_PATH);
    } catch {
        await fs.writeFile(DB_PATH, JSON.stringify([]), 'utf-8');
    }
}

export async function getUsers(): Promise<User[]> {
    await ensureDb();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function addUser(user: User) {
    const users = await getUsers();
    users.push(user);
    await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
    const users = await getUsers();
    return users.find((u) => u.email === email);
}
