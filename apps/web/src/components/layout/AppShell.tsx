import React from 'react';
import { useAgUiStore } from '../../agents/AgUiCore';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User } from 'lucide-react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { status, message } = useAgUiStore();
    const { user, logout } = useAuth();

    return (
        <div className="flex h-screen bg-stone-950 text-stone-100 font-sans">
            {/* SIDEBAR */}
            <aside className="w-64 border-r border-stone-800 p-4 flex flex-col">
                <h1 className="text-xl font-bold tracking-widest mb-8 text-white">VIBE<span className="text-stone-500">ERP</span></h1>

                <nav className="space-y-2 flex-1">
                    <NavItem label="1. Strategy" active />
                    <NavItem label="2. Trend AI" />
                    <NavItem label="3. Collection" />
                    <NavItem label="4. Theme" />
                    <div className="h-px bg-stone-800 my-4" />
                    <NavItem label="5. Design Core" highlight />
                    <div className="h-px bg-stone-800 my-4" />
                    <NavItem label="11. Admin" />
                </nav>

                <div className="mb-6 p-4 border-t border-stone-800">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400">
                            <User size={16} />
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-sm font-medium text-white truncate">{user?.name}</div>
                            <div className="text-xs text-stone-500 truncate">{user?.email}</div>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-xs text-stone-500 hover:text-red-400 transition-colors w-full"
                    >
                        <LogOut size={14} />
                        Sign Out
                    </button>
                </div>

                {/* AG-UI STATUS WIDGET */}
                <div className={`mt-auto p-4 rounded border ${status === 'BLOCKED' ? 'border-red-500 bg-red-900/20' :
                    status === 'THINKING' ? 'border-blue-500 bg-blue-900/20' :
                        'border-stone-800'
                    }`}>
                    <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${status === 'IDLE' ? 'bg-green-500' :
                            status === 'BLOCKED' ? 'bg-red-500 animate-pulse' : 'bg-blue-400 animate-bounce'
                            }`} />
                        <span className="text-xs font-mono uppercase text-stone-400">AG-UI GUARDIAN</span>
                    </div>
                    {message && <p className="text-xs text-white leading-tight">{message}</p>}
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-auto bg-stone-900 p-8">
                {children}
            </main>
        </div>
    );
};

const NavItem = ({ label, active = false, highlight = false }: any) => (
    <button className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${active ? 'bg-white text-black font-medium' :
        highlight ? 'text-white hover:bg-stone-800' : 'text-stone-400 hover:text-stone-200'
        }`}>
        {label}
    </button>
);
