import { API_BASE } from "./config";

export interface Coupon {
    id: number;
    name: string;
    create_at: string;
    finish_at: string;
    discount: number;
}


const API_URL = `${API_BASE}/coupons`;


export async function getAllCoupons(): Promise<Coupon[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener los cupones");
    return await response.json();
}

export async function createCoupon(nuevoCoupon: Coupon): Promise<Coupon> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCoupon),
    });
    if (!response.ok) throw new Error("Error al crear el cupon");
    return await response.json();
}

export async function getAllCouponsByDate(init_date: string, finish_date: string): Promise<Coupon[]> {
    const response = await fetch(`${API_URL}/reporte/fechas?inicio=${init_date}&fin=${finish_date}`);
    if (!response.ok) throw new Error("Error al obtener los cupones por fechas");
    return await response.json();
}

export async function getCouponByName(name: string): Promise<Coupon> {
    const response = await fetch(`${API_URL}/name/${name}`);
    if (!response.ok) throw new Error("Error al obtener el cupon por el nombre");
    return await response.json();
}
