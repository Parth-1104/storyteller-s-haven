import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Comment {
  id: string;
  story_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export const useComments = (storyId: string) => {
  return useQuery({
    queryKey: ['comments', storyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('story_id', storyId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Comment[];
    },
    enabled: !!storyId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (comment: Omit<Comment, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('comments')
        .insert(comment)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.story_id] });
    },
  });
};
