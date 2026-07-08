'use client'

export function CouponSection() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Cupones de Descuento</h1>
                    <p className="text-slate-500 mt-1">Crea y supervisa las campañas de marketing con códigos promocionales. EJEMPLOS PARA PROXIMAS MEJORAS</p>
                </div>
                {/* <button className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl inline-flex items-center gap-2 transition-all">
                                <Plus className="w-4 h-4" /> Crear Cupón
                            </button> */}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-slate-100 rounded-2xl p-6 shadow-sm bg-white hover:border-slate-200 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-mono font-bold px-3 py-1 rounded-md tracking-wider">
                                EJEMPLO PROXIMAS MEJORAS
                            </span>
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

                {/* <div className="border border-slate-100 rounded-2xl p-6 shadow-sm bg-white hover:border-slate-200 transition-all">
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
                            </div>*/}
            </div>
        </div>
    )
}