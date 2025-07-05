'use client';

import { useTranslations } from 'next-intl';
import { usePathname, Link, useRouter } from '@/navigation';
import { Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { LanguageSwitcher } from '../language-switcher';

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const title = pathname.split('/').pop()?.replace(/-/g, ' ') ?? 'Dashboard';
    const t = useTranslations('Header');

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const query = formData.get('query') as string;
        if (query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
            <div className="flex items-center gap-2 md:hidden">
              <SidebarTrigger />
            </div>
            <div className="w-full flex-1">
                <h1 className="text-lg font-semibold capitalize hidden md:block">{title}</h1>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    name="query"
                    placeholder={t('searchPlaceholder')}
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-auto"
                  />
                </div>
              </form>
              <LanguageSwitcher />
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar>
                      <AvatarImage src="https://placehold.co/40x40.png" alt="@user" />
                      <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">{t('toggleUserMenu')}</span>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>{t('profile')}</DropdownMenuItem>
                  <DropdownMenuItem disabled>{t('settings')}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/">{t('logout')}</Link></DropdownMenuItem>
              </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </header>
    )
}
