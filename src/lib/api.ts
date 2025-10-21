// API Client for LittleText backend

import { Post, Category, ContactFormData, ApiResponse, PaginatedResponse } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

/**
 * Generic fetch wrapper with error handling
 */
export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include',
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API Error: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Posts API
 */
export const postsAPI = {
  // Get all posts
  getAll: async (page = 1, limit = 10, categorySlug?: string): Promise<PaginatedResponse<Post>> => {
    const categoryParam = categorySlug ? `&category=${categorySlug}` : '';
    const response = await fetchAPI<{ data: PaginatedResponse<Post> }>(
      `/blog?page=${page}&limit=${limit}${categoryParam}`
    );
    return response.data;
  },

  // Get posts by category
  getByCategory: async (categorySlug: string, page = 1, limit = 10): Promise<PaginatedResponse<Post>> => {
    const response = await fetchAPI<{ data: PaginatedResponse<Post> }>(
      `/blog?category=${categorySlug}&page=${page}&limit=${limit}`
    );
    return response.data;
  },

  // Get featured posts
  getFeatured: async (limit = 6): Promise<Post[]> => {
    return fetchAPI<Post[]>(`/posts/featured?limit=${limit}`);
  },

  // Get single post by slug
  getBySlug: async (slug: string): Promise<Post> => {
    return fetchAPI<Post>(`/posts/${slug}`);
  },

  // Get related posts
  getRelated: async (postId: string, limit = 3): Promise<Post[]> => {
    return fetchAPI<Post[]>(`/posts/${postId}/related?limit=${limit}`);
  },

  // Search posts
  search: async (query: string): Promise<Post[]> => {
    return fetchAPI<Post[]>(`/posts/search?q=${encodeURIComponent(query)}`);
  },
};

/**
 * Backend category response type
 */
interface BackendCategory {
  _id: string;
  category_name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Categories API
 */
export const categoriesAPI = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const response = await fetchAPI<{ data: BackendCategory[] }>('/blog/category');
    // Transform backend response to frontend format
    return response.data.map((cat) => ({
      id: cat._id,
      name: cat.category_name,
      slug: cat.category_name.toLowerCase().replace(/\s+/g, '-'),
      description: cat.description || `Explore ${cat.category_name.toLowerCase()} articles`,
    }));
  },

  // Get posts by category
  getBySlug: async (slug: string): Promise<Category> => {
    return fetchAPI<Category>(`/blog/category/${slug}`);
  },
};

/**
 * Contact API
 */
export const contactAPI = {
  // Submit contact form
  submit: async (data: ContactFormData): Promise<ApiResponse<void>> => {
    return fetchAPI<ApiResponse<void>>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

/**
 * Newsletter API
 */
export const newsletterAPI = {
  // Subscribe to newsletter
  subscribe: async (email: string): Promise<ApiResponse<void>> => {
    return fetchAPI<ApiResponse<void>>('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};
