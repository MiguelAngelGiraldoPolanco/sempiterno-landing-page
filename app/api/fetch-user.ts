import { API_BASE } from "./config";

export interface User {
    id: number;
    email: string;
    is_admin: boolean;
    create_at: string;
    update_at: string;
    is_active: boolean;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    id: number;
}

const API_URL = `${API_BASE}/users`;

function authHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
    };
}

export async function getUserById(user_id: number): Promise<User> {
    const response = await fetch(`${API_URL}/${user_id}`, {
        method: "GET",
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener el usuario por el id");
    return await response.json();
}

export async function createUser(nuevoUser: Omit<User, 'id' | 'create_at' | 'update_at'>): Promise<User> {
    const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUser),
    });
    if (!response.ok) throw new Error("Error al crear el usuario");
    return await response.json();
}

export async function loginUser(credentials: Pick<UserLogin, 'email' | 'password'>): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error("Error al hacer login");
    return await response.json();
}

export async function modifyUser(user_modify: Partial<User>, user_id: number): Promise<User> {
    const response = await fetch(`${API_URL}/${user_id}`, {
        method: "PUT",
        headers: {
            ...authHeaders(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user_modify),
    });
    if (!response.ok) throw new Error("Error al modificar el usuario");
    return await response.json();
}

export async function getUserByEmail(email: string): Promise<User> {
    const response = await fetch(`${API_URL}/email/${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders()
        },
    });
    if (!response.ok) throw new Error("Error al obtener el usuario por el email");
    return await response.json();
}

export async function deleteUser(userId: number): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders()
        },
    });
    if (!response.ok) throw new Error("Error al eliminar el usuario");
    return await response.json();
}