"use client"

import { getHealth, type Health } from "@/app/api/fetch-health"
import React, { useState, useEffect } from 'react'
import {
    Ticket,
    Tag,
    UserCheck,
    TrendingUp,
    LogOut,
    Lock,
    Mail,
    Menu,
    X,
    AlertTriangle,
    LogIn,
    Loader2
} from 'lucide-react'
import { loginUser } from '../api/fetch-user'
import { UserSection } from './components/user-section'
import { LeadsSection } from './components/lead-section'
import { CouponSection } from './components/coupon-section'
import { TicketSection } from './components/ticket-section'
import { ApiError } from '../api/api-error'


// Items del menú en un solo sitio (DRY): los pintamos igual en el sidebar de escritorio
// y en el desplegable de móvil, sin repetir el JSX de cada botón.
const navItems = [
    { key: 'tickets', label: 'Facturas', icon: Ticket },
    { key: 'cupones', label: 'Cupones de Descuento', icon: Tag },
    { key: 'leads', label: 'Leads de Contacto', icon: TrendingUp },
    { key: 'users', label: 'Sección de Usuarios', icon: UserCheck },
] as const

function ErrorMsg({ error }: { error: string | null }) {
    if (!error) return null
    return (
        <div className="mb-5 flex items-center gap-2 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
            <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
        </div>
    )
}
export default function AdminDashboard() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [activeTab, setActiveTab] = useState('tickets')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    //Cargamos previamente la api
    useEffect(() => {
        const healthData = async () => {
            try {
                await getHealth();
            } catch {
                // fire-and-forget: si falla no importa solo queria despertar la api.
            }
        };
        healthData();
    }, []);


    // Manejador del Login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null);
        setLoading(true)
        try {
            const data = await loginUser({ email, password })
            localStorage.setItem("token", data.access_token)
            localStorage.setItem("userId", String(data.id))
            setIsLoggedIn(true)
        } catch (error) {
            if (error instanceof ApiError) {
                console.error(error);
                switch (error.status) {
                    case 400:
                        setError("Los datos enviados no son válidos.");
                        break;
                    case 401:
                        setError("Correo o contraseña incorrectos.");
                        break;
                    case 422:
                        setError("Fallo de validacion.");
                        break;
                    case 500:
                        setError("Error interno, contacta con el equipo tecnico.");
                        break;
                    default:
                        setError("Ocurrió un error inesperado. Contacta con el equipo técnico.");
                        break;
                }

            } else {
                console.error(error);
                setError("Ocurrió un error inesperado. Contacta con el equipo tecnico.")
            }
        } finally { setLoading(false) }
    }

    // seleccionar una sección: además cierra el menú móvil
    const selectTab = (key: string) => {
        setActiveTab(key)
        setMobileMenuOpen(false)
    }

    // cerrar sesión: limpia el token y sale
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        setMobileMenuOpen(false)
        setIsLoggedIn(false)
    }

    // botones de navegación (se reutilizan en escritorio y móvil)
    const renderNav = () =>
        navItems.map(({ key, label, icon: Icon }) => (
            <button
                key={key}
                onClick={() => selectTab(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === key
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-950/10'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
            >
                <Icon className="w-5 h-5" /> {label}
            </button>
        ))

    const logoutButton = (
        <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-rose-600 hover:bg-rose-50 transition-all"
        >
            <LogOut className="w-5 h-5" /> Cerrar Sesión
        </button>
    )

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
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                        >
                            {loading
                                ? <><Loader2 className="w-5 h-5 animate-spin" /> Ingresando…</>
                                : <><LogIn className="w-5 h-5" /> Ingresar al Panel</>}
                        </button>
                    </form>
                    <ErrorMsg error={error} />
                </div>
            </div>
        )
    }

    // VISTA 2: DASHBOARD
    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col md:flex-row">

            {/* ===== BARRA SUPERIOR (SOLO MÓVIL) ===== */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-100 sticky top-0 bg-white z-30">
                <span className="font-serif text-lg font-bold bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent">
                    Sempiterno Admin
                </span>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 text-slate-700"
                    aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* ===== MENÚ DESPLEGABLE (SOLO MÓVIL) ===== */}
            {mobileMenuOpen && (
                <nav className="md:hidden border-b border-slate-100 bg-white p-4 space-y-1.5">
                    {renderNav()}
                    <div className="pt-2 mt-2 border-t border-slate-100">{logoutButton}</div>
                </nav>
            )}

            {/* ===== SIDEBAR (SOLO ESCRITORIO) ===== */}
            <aside className="hidden md:flex w-64 border-r border-slate-100 flex-col justify-between p-6 bg-white shrink-0 sticky top-0 h-screen">
                <div>
                    <div className="mb-10 px-2">
                        <span className="font-serif text-xl font-bold bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent">
                            Sempiterno Admin
                        </span>
                        <p className="text-xs text-slate-400 font-medium tracking-wider uppercase mt-1">Control General</p>
                    </div>
                    <nav className="space-y-1.5">{renderNav()}</nav>
                </div>
                <div className="mt-auto">{logoutButton}</div>
            </aside>

            {/* ===== CONTENIDO PRINCIPAL ===== */}
            <main className="flex-1 w-full p-6 md:p-10 max-w-6xl overflow-y-auto">
                {activeTab === 'tickets' && <TicketSection />}
                {activeTab === 'cupones' && <CouponSection />}
                {activeTab === 'leads' && <LeadsSection />}
                {activeTab === 'users' && <UserSection />}
            </main>
        </div>
    )
}
