import { API_BASE } from "./config";

export interface Health {
    status: string;
}

const API_URL = `${API_BASE}/health`;

export async function getHealth(): Promise<Health> {
    const response = await fetch(`${API_URL}`, {
        method: "GET",
    });
    return await response.json();
}
