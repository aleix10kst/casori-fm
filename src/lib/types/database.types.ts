export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      question: {
        Row: {
          answer: string
          created_at: string
          option_1: string
          option_2: string
          option_3: string
          question: string
          question_id: number
          slug: string
          type: string
        }
        Insert: {
          answer: string
          created_at?: string
          option_1: string
          option_2: string
          option_3: string
          question: string
          question_id?: number
          slug?: string
          type: string
        }
        Update: {
          answer?: string
          created_at?: string
          option_1?: string
          option_2?: string
          option_3?: string
          question?: string
          question_id?: number
          slug?: string
          type?: string
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
