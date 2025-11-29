// API Client for LittleText backend

import { Post, Category, Podcast, Video, ContactFormData, ApiResponse, PaginatedResponse } from './types';

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
 * Transform backend blog post to frontend Post type
 */
function transformBlogPost(backendPost: any): Post {
  // Generate a proper slug from title, removing special characters
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/--+/g, '-')      // Replace multiple hyphens with single
      .replace(/^-|-$/g, '');    // Remove leading/trailing hyphens
  };

  return {
    id: backendPost._id,
    title: backendPost.title,
    slug: generateSlug(backendPost.title) || backendPost._id, // Fallback to ID if slug is empty
    excerpt: backendPost.description,
    content: backendPost.content,
    featuredImage: backendPost.banner_image,
    bannerImage: backendPost.banner_image,
    additionalImages: backendPost.additional_images || [],
    author: {
      id: backendPost.author?._id || backendPost.author,
      name: backendPost.author?.firstname 
        ? `${backendPost.author.firstname} ${backendPost.author.lastname || ''}`.trim()
        : 'Admin',
      email: backendPost.author?.email || '',
      avatar: backendPost.author?.avatar,
      bio: backendPost.author?.bio,
    },
    category: backendPost.category_id ? {
      id: backendPost.category_id._id,
      name: backendPost.category_id.category_name,
      slug: backendPost.category_id.category_name.toLowerCase().replace(/\s+/g, '-'),
      description: backendPost.category_id.description,
    } : undefined,
    publishedAt: backendPost.createdAt,
    updatedAt: backendPost.updatedAt,
    readTime: Math.ceil(backendPost.content.split(' ').length / 200), // Estimate read time
    featured: false,
  };
}

/**
 * Posts API
 */
export const postsAPI = {
  // Get all posts
  getAll: async (page = 1, limit = 10, categorySlug?: string): Promise<PaginatedResponse<Post>> => {
    const categoryParam = categorySlug ? `&category=${categorySlug}` : '';
    const response = await fetchAPI<{ 
      data: { 
        data: any[]; 
        pagination: { page: number; limit: number; totalPages: number; totalCount: number } 
      } 
    }>(
      `/blog?page=${page}&limit=${limit}${categoryParam}`
    );
    
    return {
      data: response.data.data.map(transformBlogPost),
      pagination: {
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        total: response.data.pagination.totalCount,
        totalPages: response.data.pagination.totalPages,
      }
    };
  },

  // Get posts by category
  getByCategory: async (categorySlug: string, page = 1, limit = 10): Promise<PaginatedResponse<Post>> => {
    const response = await fetchAPI<{ 
      data: { 
        data: any[]; 
        pagination: { page: number; limit: number; totalPages: number; totalCount: number } 
      } 
    }>(
      `/blog?category=${categorySlug}&page=${page}&limit=${limit}`
    );
    
    return {
      data: response.data.data.map(transformBlogPost),
      pagination: {
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        total: response.data.pagination.totalCount,
        totalPages: response.data.pagination.totalPages,
      }
    };
  },

  // Get featured posts
  getFeatured: async (limit = 6): Promise<Post[]> => {
    return fetchAPI<Post[]>(`/posts/featured?limit=${limit}`);
  },

  // Get single post by slug
  getBySlug: async (slug: string): Promise<Post> => {
    // First, get all posts to find the one matching the slug
    const response = await fetchAPI<{ 
      data: { 
        data: any[]; 
      } 
    }>(`/blog?limit=100`); // Get a large batch to search through
    
    const posts = response.data.data.map(transformBlogPost);
    const post = posts.find(p => p.slug === slug);
    
    if (!post) {
      throw new Error('Post not found');
    }
    
    // Now fetch the full post by ID
    const fullPostResponse = await fetchAPI<{ data: any }>(`/blog/${post.id}`);
    return transformBlogPost(fullPostResponse.data);
  },

  // Get related posts
  getRelated: async (postId: string, limit = 3): Promise<Post[]> => {
    try {
      // Since /posts/:id/related doesn't exist, fetch posts from same category
      // First get the post to find its category
      const postResponse = await fetchAPI<{ data: any }>(`/blog/${postId}`);
      const post = transformBlogPost(postResponse.data);
      
      if (!post.category) {
        // If no category, return recent posts
        const response = await fetchAPI<{ 
          data: { 
            data: any[]; 
          } 
        }>(`/blog?limit=${limit + 1}`);
        
        return response.data.data
          .filter(p => p._id !== postId)
          .slice(0, limit)
          .map(transformBlogPost);
      }
      
      // Get posts from same category
      const response = await fetchAPI<{ 
        data: { 
          data: any[]; 
        } 
      }>(`/blog?limit=${limit + 1}`);
      
      return response.data.data
        .filter(p => p._id !== postId && p.category_id?._id === post.category.id)
        .slice(0, limit)
        .map(transformBlogPost);
    } catch (error) {
      console.error('Error fetching related posts:', error);
      return [];
    }
  },

  // Search posts
  search: async (query: string): Promise<Post[]> => {
    return fetchAPI<Post[]>(`/posts/search?q=${encodeURIComponent(query)}`);
  },

  // Get featured posts (for Latest section)
  getFeatured: async (): Promise<Post[]> => {
    const response = await fetchAPI<{ data: any[] }>('/blog/featured/list');
    return response.data.map(transformBlogPost);
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
 * Transform backend podcast to frontend Podcast type
 */
function transformPodcast(backendPodcast: any): Podcast {
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '');
  };

  return {
    id: backendPodcast._id,
    title: backendPodcast.title,
    slug: generateSlug(backendPodcast.title) || backendPodcast._id,
    description: backendPodcast.description,
    audioUrl: backendPodcast.audio_file,
    bannerImage: backendPodcast.banner_image,
    author: {
      id: backendPodcast.author?._id || backendPodcast.author,
      name: backendPodcast.author?.firstname 
        ? `${backendPodcast.author.firstname} ${backendPodcast.author.lastname || ''}`.trim()
        : 'Admin',
      email: backendPodcast.author?.email || '',
      avatar: backendPodcast.author?.avatar,
      bio: backendPodcast.author?.bio,
    },
    category: backendPodcast.category_id ? {
      id: backendPodcast.category_id._id,
      name: backendPodcast.category_id.category_name,
      slug: backendPodcast.category_id.category_name.toLowerCase().replace(/\s+/g, '-'),
      description: backendPodcast.category_id.description,
    } : undefined,
    duration: backendPodcast.duration,
    publishedAt: backendPodcast.createdAt,
    updatedAt: backendPodcast.updatedAt,
  };
}

/**
 * Podcasts API
 */
export const podcastsAPI = {
  // Get all podcasts
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Podcast>> => {
    const response = await fetchAPI<{ 
      data: { 
        data: any[]; 
        pagination: { page: number; limit: number; totalPages: number; totalCount: number } 
      } 
    }>(
      `/podcast?page=${page}&limit=${limit}`
    );
    
    return {
      data: response.data.data.map(transformPodcast),
      pagination: {
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        total: response.data.pagination.totalCount,
        totalPages: response.data.pagination.totalPages,
      }
    };
  },

  // Get single podcast by slug
  getBySlug: async (slug: string): Promise<Podcast> => {
    const response = await fetchAPI<{ 
      data: { 
        data: any[]; 
      } 
    }>(`/podcast?limit=100`);
    
    const podcasts = response.data.data.map(transformPodcast);
    const podcast = podcasts.find(p => p.slug === slug);
    
    if (!podcast) {
      throw new Error('Podcast not found');
    }
    
    return podcast;
  },

  // Get podcast by ID
  getById: async (id: string): Promise<Podcast> => {
    const response = await fetchAPI<{ data: any }>(`/podcast/${id}`);
    return transformPodcast(response.data);
  },
};

/**
 * Transform backend video to frontend Video type
 */
function transformVideo(backendVideo: any): Video {
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '');
  };

  return {
    id: backendVideo._id,
    title: backendVideo.title,
    slug: generateSlug(backendVideo.title) || backendVideo._id,
    description: backendVideo.description,
    videoUrl: backendVideo.youtube_url,
    thumbnailUrl: backendVideo.banner_image,
    author: {
      id: backendVideo.author?._id || backendVideo.author,
      name: backendVideo.author?.firstname 
        ? `${backendVideo.author.firstname} ${backendVideo.author.lastname || ''}`.trim()
        : 'Admin',
      email: backendVideo.author?.email || '',
      avatar: backendVideo.author?.avatar,
      bio: backendVideo.author?.bio,
    },
    category: backendVideo.category_id ? {
      id: backendVideo.category_id._id,
      name: backendVideo.category_id.category_name,
      slug: backendVideo.category_id.category_name.toLowerCase().replace(/\s+/g, '-'),
      description: backendVideo.category_id.description,
    } : undefined,
    duration: backendVideo.duration,
    publishedAt: backendVideo.createdAt,
    updatedAt: backendVideo.updatedAt,
  };
}

/**
 * Videos API
 */
export const videosAPI = {
  // Get all videos
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Video>> => {
    const response = await fetchAPI<{ 
      data: { 
        data: any[]; 
        pagination: { page: number; limit: number; totalPages: number; totalCount: number } 
      } 
    }>(
      `/video?page=${page}&limit=${limit}`
    );
    
    return {
      data: response.data.data.map(transformVideo),
      pagination: {
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        total: response.data.pagination.totalCount,
        totalPages: response.data.pagination.totalPages,
      }
    };
  },

  // Get single video by slug
  getBySlug: async (slug: string): Promise<Video> => {
    const response = await fetchAPI<{ 
      data: { 
        data: any[]; 
      } 
    }>(`/video?limit=100`);
    
    const videos = response.data.data.map(transformVideo);
    const video = videos.find(v => v.slug === slug);
    
    if (!video) {
      throw new Error('Video not found');
    }

    return video;
  },

  // Get video by ID
  getById: async (id: string): Promise<Video> => {
    const response = await fetchAPI<{ data: any }>(`/video/${id}`);
    return transformVideo(response.data);
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
