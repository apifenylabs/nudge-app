export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      businesses: {
        Row: {
          id: string
          name: string
          description: string | null
          location: string
          age_range: string
          safety_rating: number | null
          amenities: string[]
          category: string
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          location: string
          age_range: string
          safety_rating?: number | null
          amenities?: string[]
          category: string
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          location?: string
          age_range?: string
          safety_rating?: number | null
          amenities?: string[]
          category?: string
          image_url?: string | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          icon: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string | null
          description?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          business_id: string
          user_id: string | null
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          business_id: string
          user_id?: string | null
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          user_id?: string | null
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          name: string
          kids_ages: string[]
          home_city: string
          avatar_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string
          kids_ages?: string[]
          home_city?: string
          avatar_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          kids_ages?: string[]
          home_city?: string
          avatar_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          destination_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          destination_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          destination_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
