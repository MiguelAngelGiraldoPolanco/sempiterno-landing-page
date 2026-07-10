import { API_BASE } from "./config";

export interface Lead {
    id: number;
    name: string;
    email: string;
    create_at: string;
    marketing_consent: boolean;
    is_verify: boolean;
    verification_token: string;
    tickets: [];
    coupon_id: number;
}


const API_URL = `${API_BASE}/leads`;

const authHeaders = (): HeadersInit => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
    };
};

export async function getAllLeads(): Promise<Lead[]> {
    const response = await fetch(`${API_URL}/`, {
        method: "GET",
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener los leads");
    return await response.json();
}

export async function createLead(nuevoLead: Lead): Promise<Lead> {
    const response = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: {
            ...authHeaders(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoLead),
    });
    if (!response.ok) throw new Error("Error al crear el lead");
    return await response.json();
}

export async function getAllLeadsByDate(init_date: string, finish_date: string):
    Promise<Lead[]> {
    const response = await fetch(`${API_URL}/reporte/fechas?inicio=${init_date}&fin=${finish_date}`, {
        method: "GET",
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener los leads por fechas");
    return await response.json();
}

export async function getLeadByEmail(email: string): Promise<Lead> {
    const response = await fetch(`${API_URL}/email/${email}`, {
        method: "GET",
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener el lead por el email");
    return await response.json();
}
