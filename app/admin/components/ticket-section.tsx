'use client'

import { useState } from "react"
import {
    FilePlus, Search, Pencil, Trash2, Download, FileSpreadsheet,
    ArrowLeft, Plus, X, CheckCircle, Clock, AlertTriangle,
} from "lucide-react"
import {
    createTicket, getTicketById, updateTicket, deleteTicket, descargarFactura,
    type Ticket, type ProductoItem, type TicketUpdate,
} from "@/app/api/fetch-ticket"

// Las 5 "pantallas" de esta sección: el menú de mosaicos + una por acción.
type View = 'menu' | 'crear' | 'ver' | 'modificar' | 'eliminar'

// Representación del producto EN EL FORMULARIO: todo string, para que el usuario
// pueda teclear libre (incluidos estados intermedios como "0." o vacío).
// Se convierte a número solo al enviar (parsing at the boundary).
interface ProductForm {
    nombre: string
    cantidad: string
    precio_unidad: string
}
const emptyProductForm: ProductForm = { nombre: '', cantidad: '', precio_unidad: '' }

// ---- estilos reutilizados (evita repetir clases largas por todo el JSX) ----
const inputCls =
    "w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 transition-all"
const primaryBtn =
    "bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-xl inline-flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
const ghostBtn =
    "text-slate-600 hover:text-slate-900 text-sm font-medium px-4 py-2.5 rounded-xl inline-flex items-center gap-2 transition-all"

// ---- helpers puros (a nivel de módulo) ----
const cop = (n: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

// convierte texto → número, tolerando coma decimal (Colombia) y vacío
const toNumber = (s: string) => {
    const n = Number(String(s).replace(',', '.'))
    return Number.isFinite(n) ? n : 0
}

// convierte un producto del backend (números) al formato del formulario (strings)
const toForm = (p: ProductoItem): ProductForm => ({
    nombre: p.nombre,
    cantidad: String(p.cantidad),
    precio_unidad: String(p.precio_unidad),
})

// ============ SUB-COMPONENTES A NIVEL DE MÓDULO ============
// Fuera de TicketSection para que NO se recreen en cada render
// (si estuvieran dentro, los inputs perderían el foco tras cada tecla).

function Header({ title, onBack }: { title: string; onBack: () => void }) {
    return (
        <div className="flex items-center gap-3 mb-8">
            <button onClick={onBack} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-all">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        </div>
    )
}

function ErrorMsg({ error }: { error: string | null }) {
    if (!error) return null
    return (
        <div className="mb-5 flex items-center gap-2 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
            <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
        </div>
    )
}

function TicketCard({ t }: { t: Ticket }) {
    return (
        <div className="border border-slate-200 rounded-2xl p-6 shadow-sm bg-white">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-xs font-mono text-slate-400">FACTURA #{t.id}</p>
                    <h3 className="text-lg font-bold text-slate-800">{t.customerName}</h3>
                </div>
                <div className="flex gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${t.paid ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                        {t.paid ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />} {t.paid ? 'Pagada' : 'Pendiente'}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${t.delivered ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                        {t.delivered ? 'Entregada' : 'Sin entregar'}
                    </span>
                </div>
            </div>
            <table className="w-full text-sm mb-4">
                <thead>
                    <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                        <th className="text-left py-2">Producto</th>
                        <th className="text-right py-2">Cant.</th>
                        <th className="text-right py-2">Precio</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {t.products.map((p, i) => (
                        <tr key={i}>
                            <td className="py-2 text-slate-700">{p.nombre}</td>
                            <td className="py-2 text-right text-slate-600">{p.cantidad}</td>
                            <td className="py-2 text-right text-slate-600">{cop(p.precio_unidad)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center pt-3 border-t border-slate-100 text-sm">
                <span className="text-slate-500">IVA aplicado: {(t.iva * 100).toFixed(0)}%</span>
                <span className="text-lg font-bold text-slate-900">Total: {cop(t.total)}</span>
            </div>
        </div>
    )
}

// Editor de productos: recibe la lista y los handlers por props.
function ProductsEditor({
    products, onUpdate, onAdd, onRemove,
}: {
    products: ProductForm[]
    onUpdate: (i: number, field: keyof ProductForm, value: string) => void
    onAdd: () => void
    onRemove: (i: number) => void
}) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Productos</label>
            {products.map((p, i) => (
                <div key={i} className="flex gap-2 items-center">
                    <input className={inputCls} type="text" placeholder="Nombre" value={p.nombre}
                        onChange={e => onUpdate(i, 'nombre', e.target.value)} />
                    <input className={`${inputCls} w-24`} type="text" inputMode="numeric" placeholder="Cant." value={p.cantidad}
                        onChange={e => onUpdate(i, 'cantidad', e.target.value)} />
                    <input className={`${inputCls} w-36`} type="text" inputMode="decimal" placeholder="Precio" value={p.precio_unidad}
                        onChange={e => onUpdate(i, 'precio_unidad', e.target.value)} />
                    <button type="button" onClick={() => onRemove(i)}
                        className="p-2 text-slate-400 hover:text-rose-600 transition-all shrink-0 disabled:opacity-30"
                        disabled={products.length === 1}>
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
            <button type="button" onClick={onAdd} className={ghostBtn}>
                <Plus className="w-4 h-4" /> Añadir producto
            </button>
        </div>
    )
}

// ============================ COMPONENTE PRINCIPAL ============================

export function TicketSection() {
    const [view, setView] = useState<View>('menu')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // formulario de crear / modificar (todo string mientras se escribe)
    const [customerName, setCustomerName] = useState('')
    const [iva, setIva] = useState('')
    const [products, setProducts] = useState<ProductForm[]>([{ ...emptyProductForm }])

    // ver / modificar / eliminar por id
    const [idInput, setIdInput] = useState('')
    const [ticket, setTicket] = useState<Ticket | null>(null)   // resultado a mostrar
    const [resultId, setResultId] = useState<number | null>(null) // id creado/editado para el botón PDF
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleted, setDeleted] = useState(false)

    // vuelve al menú y limpia TODO el estado (para que cada acción empiece de cero)
    function volver() {
        setView('menu'); setError(null); setLoading(false)
        setCustomerName(''); setIva(''); setProducts([{ ...emptyProductForm }])
        setIdInput(''); setTicket(null); setResultId(null)
        setConfirmDelete(false); setDeleted(false)
    }

    // ---- helpers del editor de productos ----
    function updateProduct(i: number, field: keyof ProductForm, value: string) {
        setProducts(prev => prev.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)))
    }
    const addProduct = () => setProducts(prev => [...prev, { ...emptyProductForm }])
    const removeProduct = (i: number) => setProducts(prev => prev.filter((_, idx) => idx !== i))

    // convierte el formulario (strings) al payload del backend (números)
    function parseProducts(): ProductoItem[] {
        return products.map(p => ({
            nombre: p.nombre,
            cantidad: toNumber(p.cantidad),
            precio_unidad: toNumber(p.precio_unidad),
        }))
    }

    // descarga el PDF de una factura (blob -> enlace temporal -> click automático)
    async function handleDescargarPdf(id: number) {
        try {
            const blob = await descargarFactura(id)
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `factura_${id}.pdf`
            a.click()
            URL.revokeObjectURL(url)
        } catch {
            setError("No se pudo descargar el PDF.")
        }
    }

    // ---- acciones contra el backend ----
    async function handleCrear(e: React.FormEvent) {
        e.preventDefault()
        setError(null); setLoading(true); setTicket(null); setResultId(null)
        try {
            const nuevo = await createTicket({ customerName, products: parseProducts(), iva: toNumber(iva) })
            setTicket(nuevo)
            setResultId(nuevo.id)
        } catch {
            setError("No se pudo crear la factura. Revisa los datos.")
        } finally { setLoading(false) }
    }

    async function handleBuscar() {
        setError(null); setLoading(true); setTicket(null)
        try {
            setTicket(await getTicketById(Number(idInput)))
        } catch {
            setError(`No se encontró ninguna factura con el ID ${idInput}.`)
        } finally { setLoading(false) }
    }

    // carga la factura en el formulario para editarla
    async function handleCargarParaModificar() {
        setError(null); setLoading(true)
        try {
            const t = await getTicketById(Number(idInput))
            setTicket(t)
            setIva(String(t.iva))
            setProducts(t.products.length ? t.products.map(toForm) : [{ ...emptyProductForm }])
        } catch {
            setError(`No se encontró ninguna factura con el ID ${idInput}.`)
        } finally { setLoading(false) }
    }

    async function handleModificar(e: React.FormEvent) {
        e.preventDefault()
        if (!ticket) return
        setError(null); setLoading(true)
        try {
            const cambios: TicketUpdate = { iva: toNumber(iva), products: parseProducts() }
            const actualizado = await updateTicket(ticket.id, cambios)
            setTicket(actualizado)
            setResultId(actualizado.id)
        } catch {
            setError("No se pudo modificar la factura.")
        } finally { setLoading(false) }
    }

    async function handleEliminar() {
        setError(null); setLoading(true)
        try {
            await deleteTicket(Number(idInput))
            setDeleted(true)
        } catch {
            setError(`No se pudo eliminar la factura ${idInput}.`)
        } finally { setLoading(false) }
    }

    // ============================ RENDER ============================

    // ---------------- MENÚ (4 mosaicos) ----------------
    if (view === 'menu') {
        const tiles = [
            { key: 'crear', icon: FilePlus, title: 'Crear Factura', desc: 'Registra una nueva factura con sus productos.', color: 'bg-indigo-50 text-indigo-600' },
            { key: 'ver', icon: Search, title: 'Ver Facturas', desc: 'Busca una factura por su ID y consulta el detalle.', color: 'bg-sky-50 text-sky-600' },
            { key: 'modificar', icon: Pencil, title: 'Modificar Factura', desc: 'Edita los datos de una factura existente.', color: 'bg-amber-50 text-amber-600' },
            { key: 'eliminar', icon: Trash2, title: 'Eliminar Factura', desc: 'Borra una factura de forma permanente.', color: 'bg-rose-50 text-rose-600' },
        ] as const

        return (
            <div>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Facturas</h1>
                    <p className="text-slate-500 mt-1">Gestiona las facturas y pagos de los clientes.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
                    {tiles.map(({ key, icon: Icon, title, desc, color }) => (
                        <button key={key} onClick={() => setView(key)}
                            className="group flex flex-col items-start gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-800">{title}</h3>
                                <p className="text-sm text-slate-500 mt-1">{desc}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        )
    }

    // ---------------- CREAR ----------------
    if (view === 'crear') {
        return (
            <div className="max-w-2xl">
                <Header title="Crear Factura" onBack={volver} />
                <ErrorMsg error={error} />
                {resultId ? (
                    <div className="space-y-5">
                        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm">
                            <CheckCircle className="w-4 h-4" /> Factura #{resultId} creada correctamente.
                        </div>
                        {ticket && <TicketCard t={ticket} />}
                        <div className="flex gap-3">
                            <button onClick={() => handleDescargarPdf(resultId)} className={primaryBtn}>
                                <Download className="w-4 h-4" /> Descargar PDF
                            </button>
                            <button onClick={volver} className={ghostBtn}>Crear otra</button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleCrear} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre del cliente</label>
                            <input className={inputCls} type="text" required value={customerName}
                                onChange={e => setCustomerName(e.target.value)} placeholder="Andrea Perea" />
                        </div>
                        <ProductsEditor products={products} onUpdate={updateProduct} onAdd={addProduct} onRemove={removeProduct} />
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">IVA (ej. 0.19 = 19%)</label>
                            <input className={`${inputCls} w-40`} type="text" inputMode="decimal" placeholder="0.19" value={iva}
                                onChange={e => setIva(e.target.value)} />
                        </div>
                        <button type="submit" className={primaryBtn} disabled={loading}>
                            <FilePlus className="w-4 h-4" /> {loading ? 'Creando…' : 'Crear factura'}
                        </button>
                    </form>
                )}
            </div>
        )
    }

    // ---------------- VER ----------------
    if (view === 'ver') {
        return (
            <div className="max-w-2xl">
                <Header title="Ver Facturas" onBack={volver} />
                <ErrorMsg error={error} />
                <div className="flex gap-2 mb-6">
                    <input className={inputCls} type="text" inputMode="numeric" placeholder="ID de la factura" value={idInput}
                        onChange={e => setIdInput(e.target.value)} />
                    <button onClick={handleBuscar} className={primaryBtn} disabled={loading || !idInput}>
                        <Search className="w-4 h-4" /> {loading ? 'Buscando…' : 'Buscar'}
                    </button>
                    {/* Placeholder de la próxima funcionalidad (export a Excel de todas las facturas) */}
                    <button className={ghostBtn} disabled title="Próximamente: exportar todas las facturas a Excel">
                        <FileSpreadsheet className="w-4 h-4" /> Descargar reporte
                    </button>
                </div>
                {ticket && (
                    <div className="space-y-4">
                        <TicketCard t={ticket} />
                        <button onClick={() => handleDescargarPdf(ticket.id)} className={primaryBtn}>
                            <Download className="w-4 h-4" /> Descargar PDF
                        </button>
                    </div>
                )}
            </div>
        )
    }

    // ---------------- MODIFICAR ----------------
    if (view === 'modificar') {
        return (
            <div className="max-w-2xl">
                <Header title="Modificar Factura" onBack={volver} />
                <ErrorMsg error={error} />
                {!ticket ? (
                    <div className="flex gap-2">
                        <input className={inputCls} type="text" inputMode="numeric" placeholder="ID de la factura a modificar" value={idInput}
                            onChange={e => setIdInput(e.target.value)} />
                        <button onClick={handleCargarParaModificar} className={primaryBtn} disabled={loading || !idInput}>
                            <Search className="w-4 h-4" /> {loading ? 'Cargando…' : 'Cargar'}
                        </button>
                    </div>
                ) : resultId ? (
                    <div className="space-y-5">
                        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm">
                            <CheckCircle className="w-4 h-4" /> Factura #{resultId} modificada correctamente.
                        </div>
                        <TicketCard t={ticket} />
                        <div className="flex gap-3">
                            <button onClick={() => handleDescargarPdf(resultId)} className={primaryBtn}>
                                <Download className="w-4 h-4" /> Descargar PDF
                            </button>
                            <button onClick={volver} className={ghostBtn}>Volver al menú</button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleModificar} className="space-y-5">
                        <p className="text-sm text-slate-500">Editando la factura <b>#{ticket.id}</b> de {ticket.customerName}.</p>
                        <ProductsEditor products={products} onUpdate={updateProduct} onAdd={addProduct} onRemove={removeProduct} />
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">IVA (ej. 0.19 = 19%)</label>
                            <input className={`${inputCls} w-40`} type="text" inputMode="decimal" placeholder="0.19" value={iva}
                                onChange={e => setIva(e.target.value)} />
                        </div>
                        <button type="submit" className={primaryBtn} disabled={loading}>
                            <Pencil className="w-4 h-4" /> {loading ? 'Guardando…' : 'Guardar cambios'}
                        </button>
                    </form>
                )}
            </div>
        )
    }

    // ---------------- ELIMINAR ----------------
    if (view === 'eliminar') {
        return (
            <div className="max-w-2xl">
                <Header title="Eliminar Factura" onBack={volver} />
                <ErrorMsg error={error} />
                {deleted ? (
                    <div className="space-y-5">
                        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm">
                            <CheckCircle className="w-4 h-4" /> La factura #{idInput} fue eliminada permanentemente.
                        </div>
                        <button onClick={volver} className={ghostBtn}>Volver al menú</button>
                    </div>
                ) : !confirmDelete ? (
                    <div className="flex gap-2">
                        <input className={inputCls} type="text" inputMode="numeric" placeholder="ID de la factura a eliminar" value={idInput}
                            onChange={e => setIdInput(e.target.value)} />
                        <button onClick={() => setConfirmDelete(true)} className={primaryBtn} disabled={!idInput}>
                            <Trash2 className="w-4 h-4" /> Continuar
                        </button>
                    </div>
                ) : (
                    <div className="border border-rose-200 bg-rose-50 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                            <div>
                                <h3 className="font-bold text-rose-800">¿Está seguro que desea eliminar esta factura?</h3>
                                <p className="text-sm text-rose-700 mt-1">
                                    Va a eliminar la factura <b>#{idInput}</b>. Este cambio será <b>permanente</b> y no se puede deshacer.
                                </p>
                                <div className="flex gap-3 mt-4">
                                    <button onClick={handleEliminar} disabled={loading}
                                        className="bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl inline-flex items-center gap-2 transition-all disabled:opacity-50">
                                        <Trash2 className="w-4 h-4" /> {loading ? 'Eliminando…' : 'Sí, eliminar permanentemente'}
                                    </button>
                                    <button onClick={() => setConfirmDelete(false)} className={ghostBtn}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return null
}
