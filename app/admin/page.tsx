"use client"

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
                            Tickets de Soporte
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
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tickets de Soporte</h1>
                                <p className="text-slate-500 mt-1">Gestiona los problemas y dudas de los clientes.</p>
                            </div>
                            <button className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl inline-flex items-center gap-2 transition-all">
                                <Plus className="w-4 h-4" /> Nuevo Ticket
                            </button>
                        </div>

                        {/* Listado de ejemplo */}
                        <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                                        <th className="p-4 pl-6">ID</th>
                                        <th className="p-4">Cliente</th>
                                        <th className="p-4">Asunto</th>
                                        <th className="p-4">Estado</th>
                                        <th className="p-4 pr-6 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    <tr>
                                        <td className="p-4 pl-6 font-mono text-slate-400">#TK-1024</td>
                                        <td className="p-4 font-medium">Carlos Mendoza</td>
                                        <td className="p-4 text-slate-600">Error en pasarela de pago al comprar vela personalizada</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                                <Clock className="w-3 h-3" /> Pendiente
                                            </span>
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <button className="text-indigo-600 hover:text-indigo-900 font-medium">Responder</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 pl-6 font-mono text-slate-400">#TK-1023</td>
                                        <td className="p-4 font-medium">Laura Restrepo</td>
                                        <td className="p-4 text-slate-600">Modificación de dirección de envío</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                <CheckCircle className="w-3 h-3" /> Resuelto
                                            </span>
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <button className="text-slate-400 hover:text-slate-600 font-medium">Ver Historial</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* SECCIÓN 2: CUPONES */}
                {activeTab === 'cupones' && (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Cupones de Descuento</h1>
                                <p className="text-slate-500 mt-1">Crea y supervisa las campañas de marketing con códigos promocionales.</p>
                            </div>
                            <button className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl inline-flex items-center gap-2 transition-all">
                                <Plus className="w-4 h-4" /> Crear Cupón
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border border-slate-100 rounded-2xl p-6 shadow-sm bg-white hover:border-slate-200 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-mono font-bold px-3 py-1 rounded-md tracking-wider">
                                            VELASEMPITERNA15
                                        </span>
                                        <h3 className="font-bold text-lg text-slate-800 mt-2">15% de Descuento General</h3>
                                    </div>
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Activo</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-4">Válido para la primera compra en la línea de aromas florales.</p>
                                <div className="text-xs text-slate-400 font-medium">Uso: 142 veces • Expira: 31 Dic 2026</div>
                            </div>

                            <div className="border border-slate-100 rounded-2xl p-6 shadow-sm bg-white hover:border-slate-200 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="bg-slate-50 text-slate-600 border border-slate-200 text-xs font-mono font-bold px-3 py-1 rounded-md tracking-wider">
                                            BIENVENIDACALI
                                        </span>
                                        <h3 className="font-bold text-lg text-slate-800 mt-2">Envío Gratis en Cali</h3>
                                    </div>
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Activo</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-4">Aplicable exclusivamente para entregas dentro del área metropolitana.</p>
                                <div className="text-xs text-slate-400 font-medium">Uso: 89 veces • Expira: Sin límite</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SECCIÓN 3: LEADS */}
                {activeTab === 'leads' && (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Leads de Contacto</h1>
                            <p className="text-slate-500 mt-1">Clientes potenciales interesados a través del formulario web o WhatsApp.</p>
                        </div>

                        <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                                        <th className="p-4 pl-6">Nombre</th>
                                        <th className="p-4">Contacto / Celular</th>
                                        <th className="p-4">Interés Primario</th>
                                        <th className="p-4">Fecha</th>
                                        <th className="p-4 pr-6 text-right">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    <tr>
                                        <td className="p-4 pl-6 font-medium">Mariana Gómez</td>
                                        <td className="p-4 text-slate-600">+57 315 789 4432</td>
                                        <td className="p-4"><span className="bg-purple-50 text-purple-700 px-2.5 py-1 border border-purple-100 text-xs font-medium rounded-md">Velas Recuerdos Bodas</span></td>
                                        <td className="p-4 text-slate-500 text-xs">Hace 2 horas</td>
                                        <td className="p-4 pr-6 text-right"><button className="text-indigo-600 hover:text-indigo-900 font-medium">Gestionar</button></td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 pl-6 font-medium">Andrés Felipe Palacio</td>
                                        <td className="p-4 text-slate-600">+57 300 456 1122</td>
                                        <td className="p-4"><span className="bg-sky-50 text-sky-700 px-2.5 py-1 border border-sky-100 text-xs font-medium rounded-md">Regalos Corporativos</span></td>
                                        <td className="p-4 text-slate-500 text-xs">Ayer</td>
                                        <td className="p-4 pr-6 text-right"><button className="text-indigo-600 hover:text-indigo-900 font-medium">Gestionar</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* SECCIÓN 4: USERS */}
                {activeTab === 'users' && (
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sección de Usuarios</h1>
                                <p className="text-slate-500 mt-1">Controla los accesos y los roles del personal administrativo de la plataforma.</p>
                            </div>
                            <button className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl inline-flex items-center gap-2 transition-all">
                                <Users className="w-4 h-4" /> Añadir Operador
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="border border-slate-100 rounded-2xl p-5 shadow-sm text-center bg-white">
                                <div className="w-14 h-14 bg-slate-900 text-white font-bold rounded-full flex items-center justify-center text-lg mx-auto mb-3">
                                    MG
                                </div>
                                <h3 className="font-bold text-slate-800">Miguel Giraldo</h3>
                                <p className="text-xs text-slate-400 font-medium mb-3">miguel@sempiterno.dev</p>
                                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">Super Admin</span>
                            </div>

                            <div className="border border-slate-100 rounded-2xl p-5 shadow-sm text-center bg-white">
                                <div className="w-14 h-14 bg-slate-100 text-slate-700 font-bold rounded-full flex items-center justify-center text-lg mx-auto mb-3">
                                    AR
                                </div>
                                <h3 className="font-bold text-slate-800">Angélica Rubio</h3>
                                <p className="text-xs text-slate-400 font-medium mb-3">angelica@sempiterno.com</p>
                                <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">Editor Comercial</span>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    )
}