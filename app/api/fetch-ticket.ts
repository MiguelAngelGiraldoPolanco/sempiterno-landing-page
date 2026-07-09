import { API_BASE } from "./config";

export interface ProductoItem {
    nombre: string;
    cantidad: number;
    precio_unidad: number;
}

export interface Ticket {
    id: number;
    customerName: string;
    products: ProductoItem[];
    iva: number;
    total: number;
    paid: boolean;
    delivered: boolean;
    create_at: string;
}

export interface TicketCreate {
    customerName: string;
    products: ProductoItem[];
    iva?: number;
}

export interface TicketUpdate {
    products?: ProductoItem[];
    iva?: number;
    paid?: boolean;
    delivered?: boolean;
}

export interface ReporteMensual {
    total_ventas: number;
    cantidad_tickets: number;
    tickets: Ticket[];
}

const API_URL = `${API_BASE}/tickets`;

function authHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getAllTickets(): Promise<Ticket[]> {
    const response = await fetch(`${API_URL}/`, {
        method: "GET",
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener los tickets");
    return await response.json();
}

export async function getTicketById(ticketId: number): Promise<Ticket> {
    const response = await fetch(`${API_URL}/${ticketId}`, {
        method: "GET",
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener el ticket");
    return await response.json();
}

export async function getReporteMensual(
    inicio: string,
    fin: string,
): Promise<ReporteMensual> {
    const response = await fetch(
        `${API_URL}/reporte/fechas?inicio=${encodeURIComponent(inicio)}&fin=${encodeURIComponent(fin)}`,
        { method: "GET", headers: authHeaders() },
    );
    if (!response.ok) throw new Error("Error al obtener el reporte mensual");
    return await response.json();
}

export async function createTicket(nuevoTicket: TicketCreate): Promise<Ticket> {
    const response = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(nuevoTicket),
    });
    if (!response.ok) throw new Error("Error al crear el ticket");
    return await response.json();
}

export async function updateTicket(
    ticketId: number,
    cambios: TicketUpdate,
): Promise<Ticket> {
    const response = await fetch(`${API_URL}/${ticketId}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(cambios),
    });
    if (!response.ok) throw new Error("Error al actualizar el ticket");
    return await response.json();
}

export async function deleteTicket(
    ticketId: number,
): Promise<{ ok?: boolean; message?: string }> {
    const response = await fetch(`${API_URL}/${ticketId}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error("Error al eliminar el ticket");
    return await response.json();
}

export async function descargarFactura(ticketId: number): Promise<Blob> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/${ticketId}/factura`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Error al descargar la factura");
    return await response.blob();
}
