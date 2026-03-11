'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Calendar, Users, Settings, LogOut, Search, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('calendar');

  return (
    <main className="flex-1 bg-background min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-6 md:px-12 py-32 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <div className="p-4 bg-muted rounded-xl mb-8 border border-white/5">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-primary font-bold text-xl">A</span>
            </div>
            <h3 className="text-white font-medium">Administrátor</h3>
            <p className="text-white/40 text-sm">admin@qapi.cz</p>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'calendar', label: 'Kalendář', icon: Calendar },
              { id: 'team', label: 'Tým a přístupy', icon: Users },
              { id: 'settings', label: 'Nastavení', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeTab === item.id 
                      ? 'bg-primary text-background font-medium' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors mt-auto text-left">
            <LogOut className="w-5 h-5" />
            Odhlásit se
          </button>
        </aside>

        {/* Main Content */}
        <div className="flex-1 bg-muted rounded-2xl border border-white/5 p-8">
          {activeTab === 'calendar' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-display font-bold text-white">Přehled rezervací</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input 
                      type="text" 
                      placeholder="Hledat klienta..." 
                      className="bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-xl border border-white/5 p-8 text-center">
                <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">Zde bude napojený kalendář z databáze</h3>
                <p className="text-white/40 text-sm max-w-md mx-auto">
                  V této sekci uvidíte všechny rezervace od klientů. Data se budou načítat z MySQL databáze pomocí Prisma ORM.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-display font-bold text-white">Správa týmu</h2>
                <button className="flex items-center justify-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors">
                  <Plus className="w-4 h-4" />
                  Přidat člena
                </button>
              </div>

              <div className="bg-background rounded-xl border border-white/5 overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="bg-white/5 border-b border-white/5">
                    <tr>
                      <th className="px-6 py-4 text-sm font-medium text-white/60">Jméno</th>
                      <th className="px-6 py-4 text-sm font-medium text-white/60">Role</th>
                      <th className="px-6 py-4 text-sm font-medium text-white/60">Uživatelské jméno</th>
                      <th className="px-6 py-4 text-sm font-medium text-white/60">Akce</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: 'Jan Novák', role: 'Technik', username: 'jan.novak' },
                      { name: 'Petr Svoboda', role: 'Technik', username: 'petr.svoboda' },
                    ].map((user) => (
                      <tr key={user.username} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-white">{user.name}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/60">{user.username}</td>
                        <td className="px-6 py-4">
                          <button className="text-sm text-primary hover:text-white transition-colors">Upravit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
