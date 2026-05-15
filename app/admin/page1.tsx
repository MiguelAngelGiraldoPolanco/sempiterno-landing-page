// app/admin/page.tsx
"use client"

import { useState } from 'react'
import { LeadsSection } from './components/lead-section'
import { Lock, Mail } from 'lucide-react'
// Importas los demás cuando los crees:
// import { TicketsSection } from './_components/TicketsSection'

export default function AdminDashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(true) // Simulado
    const [activeTab, setActiveTab] = useState('leads')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function Page() {
        const data = await fetch('https://http://localhost:8000/api/v1/users/login')
        const posts = await data.json()
    }


    if (!isLoggedIn) {
        return (<h1>holamundo</h1>
            // <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            //     <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 max-w-md w-full">
            //         <div className="text-center mb-8">
            //             <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            //                 <Lock className="w-6 h-6" />
            //             </div>
            //             <h2 className="text-2xl font-bold text-slate-800">Panel de Administración</h2>
            //             <p className="text-slate-500 text-sm mt-1">Inicia sesión para gestionar Sempiterno</p>
            //         </div>

            //         <form onSubmit={handleLogin} className="space-y-5">
            //             <div>
            //                 <label className="block text-sm font-medium text-slate-700 mb-1.5">Correo Electrónico</label>
            //                 <div className="relative">
            //                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            //                     <input
            //                         type="email"
            //                         required
            //                         placeholder="admin@sempiterno.com"
            //                         value={email}
            //                         onChange={(e) => setEmail(e.target.value)}
            //                         className="pl-10 w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 transition-all"
            //                     />
            //                 </div>
            //             </div>

            //             <div>
            //                 <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
            //                 <div className="relative">
            //                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            //                     <input
            //                         type="password"
            //                         required
            //                         placeholder="••••••••"
            //                         value={password}
            //                         onChange={(e) => setPassword(e.target.value)}
            //                         className="pl-10 w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 transition-all"
            //                     />
            //                 </div>
            //             </div>

            //             <button
            //                 type="submit"
            //                 className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
            //             >
            //                 Ingresar al Panel
            //             </button>
            //         </form>
            //     </div>
            // </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex text-slate-800">
            {/* BARRA LATERAL (Mismo código de antes) */}
            <aside>...</aside>

            {/* CONTENIDO DINÁMICO */}
            <main className="flex-1 p-10">
                {activeTab === 'tickets' && <p>Componente Tickets aquí...</p>}

                {/* Cuando entren a Leads, se renderiza tu componente modular que hace el fetch */}
                {activeTab === 'leads' && <LeadsSection />}

                {activeTab === 'cupones' && <p>Componente Cupones aquí...</p>}
                {activeTab === 'users' && <p>Componente Usuarios aquí...</p>}
            </main>
        </div>
    )
}