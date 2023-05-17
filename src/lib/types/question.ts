import { Database } from './database.types';

export type QuestionDTO = Database['public']['Tables']['question']['Row'];

export type Question = Pick<
  Database['public']['Tables']['question']['Row'],
  'question_id' | 'question' | 'answer' | 'type' | 'slug'
> & { options: string[] };
