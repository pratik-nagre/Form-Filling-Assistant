
import { FormAssistant } from '@/components/form-assistant';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/app/actions/auth';
import { User } from 'lucide-react';

export default async function Dashboard() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('session_user_id');
    const userName = cookieStore.get('session_user_name')?.value || 'User';

    if (!userId) {
        redirect('/login');
    }

    return (
        <div>
            <header className="bg-card border-b">
                <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-bold text-primary">
                            AI Form Assistant
                        </h1>
                        <p className="text-muted-foreground mt-2 text-sm sm:text-base hidden sm:block">
                            {/* Automatically populate forms by extracting data from your documents using AI. */}
                            Welcome back, {userName}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar>
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} alt={userName} />
                                        <AvatarFallback><User /></AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{userName}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            User Account
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <form action={logoutAction} className="w-full">
                                        <button type="submit" className="w-full text-left">
                                            Log out
                                        </button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
            <main className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
                <FormAssistant />
            </main>
        </div>
    );
}
