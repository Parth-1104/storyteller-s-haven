import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLikes, useToggleLike } from '@/hooks/useLikes';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface LikeButtonProps {
  storyId: string;
}

const LikeButton = ({ storyId }: LikeButtonProps) => {
  const { data: likesData, isLoading } = useLikes(storyId);
  const toggleLike = useToggleLike();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async () => {
    if (!likesData) return;
    
    setIsAnimating(true);
    
    try {
      await toggleLike.mutateAsync({
        storyId,
        hasLiked: likesData.hasLiked,
      });
      
      if (!likesData.hasLiked) {
        toast.success('You loved this story!');
      }
    } catch (error) {
      toast.error('Failed to update like');
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (isLoading) {
    return (
      <Button variant="outline" disabled className="gap-2">
        <Heart className="w-5 h-5" />
        <span>--</span>
      </Button>
    );
  }

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button
        variant={likesData?.hasLiked ? 'default' : 'outline'}
        onClick={handleLike}
        disabled={toggleLike.isPending}
        className="gap-2 font-body"
      >
        <motion.div
          animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Heart
            className={`w-5 h-5 ${likesData?.hasLiked ? 'fill-current' : ''}`}
          />
        </motion.div>
        <span>{likesData?.count || 0} {likesData?.count === 1 ? 'Like' : 'Likes'}</span>
      </Button>
    </motion.div>
  );
};

export default LikeButton;
