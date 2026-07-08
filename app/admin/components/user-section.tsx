'use client'

import {
    type User,
    getUserById,
} from "@/app/api/fetch-user"

import { useState, useEffect } from "react"

import { Users } from "lucide-react"

export function UserSection() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (userId) {
                    const user = await getUserById(Number(userId));
                    setUsers([user]);
                }
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            } finally {
                setLoading(false);
            }
        };

        userData();
    }, []);
    return (
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
                {users.map((user) => (
                    <div key={user.id} className="border border-slate-100 rounded-2xl p-5 shadow-sm text-center bg-white">
                        {/* <div className="w-14 h-14 bg-slate-900 text-white font-bold rounded-full flex items-center justify-center text-lg mx-auto mb-3">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </div> */}
                        <h3 className="font-bold text-slate-800">{user.email}</h3>
                        <p className="text-xs text-slate-400 font-medium mb-3">{user.email}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}
