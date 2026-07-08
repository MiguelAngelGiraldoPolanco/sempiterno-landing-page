
'use client'

import { getAllLeads, createLead, type Lead } from "@/app/api/fetch-lead"
import { useEffect, useState } from "react"

export function LeadsSection() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllLeads().then(setLeads).catch(() => setLoading(false)).finally(() => setLoading(false))
  }, []);

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Leads de Contacto</h1>
        <p className="text-slate-500 mt-1">Crea y supervisa los leads creados por la pagina o contactos de clientes. EJEMPLOS PARA PROXIMAS MEJORAS</p>
      </div>
      {/* <button className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl inline-flex items-center gap-2 transition-all">
                                <Plus className="w-4 h-4" /> Crear Cupón
                            </button> */}
    </div>

  )
}