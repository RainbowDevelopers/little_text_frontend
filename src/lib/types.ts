// Core types for LittleText blogging platform

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  bannerImage?: string;
  additionalImages?: string[];
  author: Author;
  category?: Category;
  tags?: Tag[];
  publishedAt: string;
  updatedAt: string;
  readTime?: number;
  featured?: boolean;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Podcast {
  id: string;
  title: string;
  slug: string;
  description: string;
  audioUrl: string;
  bannerImage?: string;
  author: Author;
  category?: Category;
  duration?: number; // in seconds
  publishedAt: string;
  updatedAt: string;
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  author: Author;
  category?: Category;
  duration?: number; // in seconds
  publishedAt: string;
  updatedAt: string;
}
