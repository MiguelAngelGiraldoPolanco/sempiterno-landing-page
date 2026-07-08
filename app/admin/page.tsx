"use client"

import { UserSearch } from 'lucide-react'
import React, { useState } from 'react'
import {
    Ticket,
    Tag,
    Users,
    UserCheck,
    LogOut,
    Lock,
    Mail,
    Plus,
    TrendingUp,
    CheckCircle,
    Clock
} from 'lucide-react'
import { loginUser } from '../api/fetch-user'
import { UserSection } from './components/user-section'
import { LeadsSection } from './components/lead-section'
import { CouponSection } from './components/coupon-section'
import { TicketSection } from './components/ticket-section'

export default function AdminDashboard() {
    // Estados para simular la autenticación y la navegación
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [activeTab, setActiveTab] = useState('tickets')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Manejador del Login 
    const handleLogin = async (e: React.FormEvent) => {
        try {
            e.preventDefault()

            const data = await loginUser({ email, password })

            localStorage.setItem("token", data.access_token)

            localStorage.setItem("userId", String(data.id))

            setIsLoggedIn(true)

        } catch (error) {
            console.error("Error al iniciar sesión:", error)
        }
    }

    // VISTA 1: PANTALLA DE LOGIN
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Panel de Administración</h2>
                        <p className="text-slate-500 text-sm mt-1">Inicia sesión para gestionar Sempiterno</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Correo Electrónico</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="email"
                                    required
                                    placeholder="admin@sempiterno.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
                        >
                            Ingresar al Panel
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    // VISTA 2: DASHBOARD DE ADMINISTRACIÓN (FONDO BLANCO)
    return (
        <div className="min-h-screen bg-white flex text-slate-800 font-sans">

            {/* BARRA LATERAL IZQUIERDA */}
            <aside className="w-64 border-r border-slate-100 flex flex-col justify-between p-6 bg-white shrink-0 sticky top-0 h-screen">
                <div>
                    {/* Logo / Título del proyecto */}
                    <div className="mb-10 px-2">
                        <span className="font-serif text-xl font-bold bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent">
                            Sempiterno Admin
                        </span>
                        <p className="text-xs text-slate-400 font-medium tracking-wider uppercase mt-1">Control General</p>
                    </div>

                    {/* Menú de Navegación */}
                    <nav className="space-y-1.5">
                        <button
                            onClick={() => setActiveTab('tickets')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'tickets'
                                ? 'bg-slate-900 text-white shadow-md shadow-slate-950/10'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <Ticket className="w-5 h-5" />
                            Facturas
                        </button>

                        <button
                            onClick={() => setActiveTab('cupones')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'cupones'
                                ? 'bg-slate-900 text-white shadow-md shadow-slate-950/10'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <Tag className="w-5 h-5" />
                            Cupones de Descuento
                        </button>

                        <button
                            onClick={() => setActiveTab('leads')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'leads'
                                ? 'bg-slate-900 text-white shadow-md shadow-slate-950/10'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <TrendingUp className="w-5 h-5" />
                            Leads de Contacto
                        </button>

                        <button
                            onClick={() => setActiveTab('users')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'users'
                                ? 'bg-slate-900 text-white shadow-md shadow-slate-950/10'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <UserCheck className="w-5 h-5" />
                            Sección de Usuarios
                        </button>
                    </nav>
                </div>

                {/* Botón de Logout abajo del panel */}
                <button
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-rose-600 hover:bg-rose-50 transition-all mt-auto"
                >
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                </button>
            </aside>

            {/* CONTENIDO PRINCIPAL DE LA PÁGINA */}
            <main className="flex-1 p-10 max-w-6xl overflow-y-auto">

                {/* SECCIÓN 1: TICKETS */}
                {activeTab === 'tickets' && (
                    <TicketSection />
                )}

                {/* SECCIÓN 2: CUPONES */}
                {activeTab === 'cupones' && (
                    <CouponSection />
                )}

                {/* SECCIÓN 3: LEADS */}
                {activeTab === 'leads' && (
                    <LeadsSection />
                )}

                {/* SECCIÓN 4: USERS */}
                {activeTab === 'users' && (
                    <UserSection />
                )}

            </main>
        </div>
    )
}