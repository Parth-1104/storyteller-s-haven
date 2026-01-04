import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Story {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  author_name: string;
  created_at: string;
  updated_at: string;
  published: boolean;
}

export const useStories = () => {
  return useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Story[];
    },
  });
};

export const useStory = (id: string) => {
  return useQuery({
    queryKey: ['story', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Story | null;
    },
    enabled: !!id,
  });
};

export const useCreateStory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (story: Omit<Story, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('stories')
        .insert(story)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
};

export const useUpdateStory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...story }: Partial<Story> & { id: string }) => {
      const { data, error } = await supabase
        .from('stories')
        .update(story)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      queryClient.invalidateQueries({ queryKey: ['story', data.id] });
    },
  });
};

export const useDeleteStory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('stories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
};
