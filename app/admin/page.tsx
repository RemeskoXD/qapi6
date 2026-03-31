'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Calendar, Users, Settings, LogOut, Search, Plus, BarChart, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Lead {
  id: number;
  service: string;
  type: string;
  color: string | null;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  useEffect(() => {
    if (activeTab === 'calendar') {
      fetch('/api/admin/leads', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setLeads(data.leads);
          }
        })
        .catch(err => console.error('Failed to fetch leads:', err))
        .finally(() => setIsLoading(false));
    } else if (activeTab === 'settings') {
      fetch('/api/admin/settings', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setSettings(data.settings);
          }
        })
        .catch(err => console.error('Failed to fetch settings:', err));
    }
  }, [activeTab]);

  const handleSettingChange = async (key: string, value: string) => {
    setIsSavingSettings(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setSettings(prev => ({ ...prev, [key]: value }));
      }
    } catch (err) {
      console.error('Failed to save setting:', err);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery) ||
    lead.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-white font-medium text-lg">Administrátor</h1>
            <p className="text-white/40 text-sm">admin@qapi.cz</p>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'calendar', label: 'Poptávky', icon: Calendar },
              { id: 'team', label: 'Tým a přístupy', icon: Users },
              { id: 'settings', label: 'Nastavení', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.id === 'calendar') setIsLoading(true);
                  }}
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
            
            <Link
              href="/admin/stats"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left text-white/60 hover:bg-white/5 hover:text-white"
            >
              <BarChart className="w-5 h-5" />
              Statistiky
            </Link>
          </nav>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors mt-auto text-left">
            <LogOut className="w-5 h-5" />
            Odhlásit se
          </button>
        </aside>

        {/* Main Content */}
        <div className="flex-1 bg-muted rounded-2xl border border-white/5 p-8 overflow-hidden flex flex-col">
          {activeTab === 'calendar' && (
            <div className="space-y-8 flex-1 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-display font-bold text-white">Přehled poptávek</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input 
                      type="text" 
                      placeholder="Hledat klienta..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-background border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-xl border border-white/5 overflow-x-auto flex-1">
                {isLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                ) : filteredLeads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center p-8">
                    <Calendar className="w-12 h-12 text-white/20 mb-4" />
                    <h3 className="text-white font-medium mb-2">Zatím žádné poptávky</h3>
                    <p className="text-white/40 text-sm max-w-md">
                      Zde se budou zobrazovat všechny odeslané formuláře a rezervace.
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-left min-w-[1000px]">
                    <thead className="bg-white/5 border-b border-white/5">
                      <tr>
                        <th className="px-6 py-4 text-sm font-medium text-white/60">Datum přijetí</th>
                        <th className="px-6 py-4 text-sm font-medium text-white/60">Klient</th>
                        <th className="px-6 py-4 text-sm font-medium text-white/60">Kontakt</th>
                        <th className="px-6 py-4 text-sm font-medium text-white/60">Služba</th>
                        <th className="px-6 py-4 text-sm font-medium text-white/60">Termín</th>
                        <th className="px-6 py-4 text-sm font-medium text-white/60">Poznámka</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-sm text-white/80 whitespace-nowrap">
                            {new Date(lead.created_at).toLocaleString('cs-CZ')}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-white font-medium">{lead.name}</div>
                            <div className="text-white/60 text-xs truncate max-w-[200px]">{lead.address}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-white/80 text-sm">{lead.phone}</div>
                            <div className="text-white/60 text-xs">{lead.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col items-start gap-2">
                              <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium whitespace-nowrap">
                                {lead.service}
                              </span>
                              {lead.notes?.includes('[Z Pop-up okna]') && (
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium whitespace-nowrap border border-green-500/30">
                                  Z Pop-up okna
                                </span>
                              )}
                            </div>
                            <div className="text-white/60 text-xs mt-2">{lead.type} {lead.color ? `(${lead.color})` : ''}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-white/80 whitespace-nowrap">
                            {lead.date !== 'Nezadáno' ? `${lead.date} ${lead.time}` : 'Nezadáno'}
                          </td>
                          <td className="px-6 py-4 text-sm text-white/60 max-w-[200px] truncate" title={lead.notes || ''}>
                            {lead.notes?.replace('[Z Pop-up okna]', '').trim() || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
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

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-display font-bold text-white">Nastavení systému</h2>
              </div>

              <div className="bg-background rounded-xl border border-white/5 p-8">
                <h3 className="text-lg font-medium text-white mb-4">Formulář poptávky</h3>
                <div className="flex items-center justify-between py-4 border-b border-white/5">
                  <div>
                    <h4 className="text-white font-medium">Preferovaný termín</h4>
                    <p className="text-white/60 text-sm">Zobrazit ve formuláři možnost výběru preferovaného data a času.</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('show_preferred_time', settings.show_preferred_time === 'true' ? 'false' : 'true')}
                    disabled={isSavingSettings}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      settings.show_preferred_time === 'true' ? 'bg-primary' : 'bg-white/20'
                    } ${isSavingSettings ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.show_preferred_time === 'true' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-white/5">
                  <div>
                    <h4 className="text-white font-medium">Servis oken</h4>
                    <p className="text-white/60 text-sm">Zobrazit ve formuláři možnost výběru služby Servis oken.</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('show_window_service', settings.show_window_service === 'true' ? 'false' : 'true')}
                    disabled={isSavingSettings}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      settings.show_window_service === 'true' ? 'bg-primary' : 'bg-white/20'
                    } ${isSavingSettings ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.show_window_service === 'true' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="bg-background rounded-xl border border-white/5 p-8">
                <h3 className="text-lg font-medium text-white mb-4">SEO a Indexování</h3>
                <p className="text-white/60 text-sm mb-6">
                  IndexNow umožňuje okamžitě upozornit vyhledávače (Seznam, Bing, Yandex) na změny obsahu vašeho webu.
                </p>
                
                <div className="flex flex-col items-start gap-4">
                  <button 
                    onClick={async (e) => {
                      const btn = e.currentTarget;
                      const originalText = btn.innerText;
                      btn.innerText = 'Odesílám...';
                      btn.disabled = true;
                      try {
                        const res = await fetch('/api/indexnow');
                        const data = await res.json();
                        if (data.success) {
                          btn.innerText = 'Úspěšně odesláno!';
                          btn.classList.add('bg-green-500', 'text-white');
                          btn.classList.remove('bg-primary', 'text-background');
                        } else {
                          btn.innerText = 'Chyba: ' + data.message;
                          btn.classList.add('bg-red-500', 'text-white');
                          btn.classList.remove('bg-primary', 'text-background');
                        }
                      } catch (err) {
                        btn.innerText = 'Došlo k chybě';
                        btn.classList.add('bg-red-500', 'text-white');
                        btn.classList.remove('bg-primary', 'text-background');
                      }
                      setTimeout(() => {
                        btn.innerText = originalText;
                        btn.disabled = false;
                        btn.classList.remove('bg-green-500', 'bg-red-500', 'text-white');
                        btn.classList.add('bg-primary', 'text-background');
                      }, 3000);
                    }}
                    className="flex items-center justify-center gap-2 bg-primary text-background px-6 py-3 rounded-lg font-medium hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Odeslat stránky do IndexNow
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
