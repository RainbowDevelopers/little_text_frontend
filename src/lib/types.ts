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

// Backend data structures
export interface BackendBlogPost {
  _id: string;
  title: string;
  description: string;
  content: string;
  banner_image?: string;
  additional_images?: string[];
  category_id?: any;
  author?: any;
  status: 'PUBLISHED' | 'DRAFT';
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
}

export interface BackendCategory {
  _id: string;
  category_name: string;
  category_slug?: string;
  category_description?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BackendPodcast {
  _id: string;
  title: string;
  description: string;
  audio_file: string;
  banner_image?: string;
  category_id?: any;
  author?: any;
  duration?: number;
  status: 'PUBLISHED' | 'DRAFT';
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
}

export interface BackendVideo {
  _id: string;
  title: string;
  description: string;
  youtube_url: string;
  video_thumbnail?: string;
  banner_image?: string;
  category_id?: any;
  author?: any;
  duration?: number;
  status: 'PUBLISHED' | 'DRAFT';
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
}

export interface BackendPaginationResponse {
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
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
