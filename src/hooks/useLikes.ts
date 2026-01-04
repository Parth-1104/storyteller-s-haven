import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { getSessionId } from '@/lib/sessionId';

export const useLikes = (storyId: string) => {
  const sessionId = getSessionId();
  
  return useQuery({
    queryKey: ['likes', storyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('story_id', storyId);
      
      if (error) throw error;
      
      const hasLiked = data.some(like => like.session_id === sessionId);
      return { count: data.length, hasLiked };
    },
    enabled: !!storyId,
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const sessionId = getSessionId();
  
  return useMutation({
    mutationFn: async ({ storyId, hasLiked }: { storyId: string; hasLiked: boolean }) => {
      if (hasLiked) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('story_id', storyId)
          .eq('session_id', sessionId);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('likes')
          .insert({ story_id: storyId, session_id: sessionId });
        
        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['likes', variables.storyId] });
    },
  });
};
