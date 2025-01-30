"use client"

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export function UserMenu() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative z-50 h-full flex items-center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <User className="h-6 w-6 text-white" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content 
            className="fixed min-w-[200px] bg-black rounded-lg border border-white/10 shadow-xl z-50 right-4 top-16 md:absolute md:right-0 md:top-full md:mt-1"
            side="bottom"
          >
            <div className="p-2 flex flex-col gap-1">
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/useDashboard" 
                    className="px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors w-full"
                  >
                    Perfil
                  </Link>

                  <Link 
                    href="/api/auth/logout" 
                    className="px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors w-full"
                  >
                    Cerrar sesion
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href="/api/auth/login" 
                    className="px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors w-full"
                  >
                    Iniciar sesión
                  </Link>
                  <Link 
                    href="/Registro" 
                    className="px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors w-full"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}