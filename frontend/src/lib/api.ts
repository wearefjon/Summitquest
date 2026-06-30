const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface Destination {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  image_url: string;
  tag: string;
  tourist_centers: string[] | null;
  created_at: string;
  updated_at: string | null;
}

export async function fetchDestinations(): Promise<Destination[]> {
  const response = await fetch(`${API_BASE_URL}/destinations`, {
    next: { revalidate: 60 }, // ISR caching
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch destinations: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchDestinationBySlug(slug: string): Promise<Destination> {
  const response = await fetch(`${API_BASE_URL}/destinations/${slug}`, {
    next: { revalidate: 60 },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch destination: ${response.statusText}`);
  }
  
  return response.json();
}

export interface Adventure {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  activity_type: string;
  difficulty: string;
  duration_days: number;
  price: number;
  image_url: string;
  destination_id: string;
  operator_id?: string;
  created_at: string;
  updated_at: string | null;
}

export interface Operator {
  id: string;
  name: string;
  description: string;
  avatar_url?: string;
  cover_image_url?: string;
  location?: string;
  rating: number;
  review_count: number;
  is_verified: boolean;
  member_since: string;
}

export async function fetchOperatorById(id: string): Promise<Operator> {
  const response = await fetch(`${API_BASE_URL}/operators/${id}`, {
    next: { revalidate: 60 },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch operator: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchOperators(): Promise<Operator[]> {
  const response = await fetch(`${API_BASE_URL}/operators`, {
    next: { revalidate: 60 },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch operators: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchAdventures(filters?: Record<string, string>): Promise<Adventure[]> {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
  }
  
  const queryString = queryParams.toString();
  const url = `${API_BASE_URL}/adventures${queryString ? `?${queryString}` : ''}`;
  
  const response = await fetch(url, {
    next: { revalidate: 0 }, // no-store for filtering
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch adventures: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchAdventureBySlug(slug: string): Promise<Adventure> {
  const response = await fetch(`${API_BASE_URL}/adventures/${slug}`, {
    next: { revalidate: 60 },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch adventure: ${response.statusText}`);
  }
  
  return response.json();
}

import axios from 'axios';
import { supabase } from './supabase';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (data: any) => {
    const res = await apiClient.post('/auth/login', data);
    return res.data;
  },
  register: async (data: any) => {
    const res = await apiClient.post('/auth/register', data);
    return res.data;
  }
};

export const bookingApi = {
  createBooking: async (data: { adventure_id: string; booking_date: string; guests: number }) => {
    const res = await apiClient.post('/bookings', data);
    return res.data;
  },
  getMyBookings: async () => {
    const res = await apiClient.get('/bookings/me');
    return res.data;
  },
  confirmBooking: async (bookingId: string) => {
    const res = await apiClient.post(`/bookings/${bookingId}/confirm`);
    return res.data;
  }
};

export const dashboardApi = {
  getCustomerDashboard: async () => {
    const res = await apiClient.get('/dashboard/customer');
    return res.data;
  },
  getOperatorDashboard: async () => {
    const res = await apiClient.get('/dashboard/operator');
    return res.data;
  }
};

export const adminApi = {
  getStats: async () => {
    const res = await apiClient.get('/admin/stats');
    return res.data;
  },
  getUsers: async () => {
    const res = await apiClient.get('/admin/users');
    return res.data;
  },
  getOperators: async () => {
    const res = await apiClient.get('/admin/operators');
    return res.data;
  },
  verifyOperator: async (id: string) => {
    const res = await apiClient.put(`/admin/operators/${id}/verify`);
    return res.data;
  },
  getAdventures: async () => {
    const res = await apiClient.get('/admin/adventures');
    return res.data;
  },
  updateAdventureStatus: async (id: string, status: string) => {
    const res = await apiClient.put(`/admin/adventures/${id}/status?new_status=${status}`);
    return res.data;
  }
};
