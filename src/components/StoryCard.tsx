import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Clock } from 'lucide-react';
import { Story } from '@/hooks/useStories';
import { useLikes } from '@/hooks/useLikes';
import { useComments } from '@/hooks/useComments';
import { format } from 'date-fns';

interface StoryCardProps {
  story: Story;
  index: number;
}

const StoryCard = ({ story, index }: StoryCardProps) => {
  const { data: likesData } = useLikes(story.id);
  const { data: comments } = useComments(story.id);

  const excerpt = story.excerpt || story.content.substring(0, 150) + '...';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link to={`/story/${story.id}`}>
        <div className="bg-card rounded-xl overflow-hidden card-elevated hover:cursor-pointer">
          {story.cover_image && (
            <div className="aspect-video overflow-hidden">
              <img
                src={story.cover_image}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-[#003332] mb-3">
              <span className="text-[#003332]">{story.author_name}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{format(new Date(story.created_at), 'MMM d, yyyy')}</span>
              </div>
            </div>
            
            <h3 className="font-display text-xl font-semibold text-[#003332] mb-2 group-hover:text-primary transition-colors">
              {story.title}
            </h3>
            
            <p className="font-body text-[#003332] leading-relaxed mb-4 line-clamp-3">
              {excerpt}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className={`w-4 h-4 ${likesData?.hasLiked ? 'fill-primary text-primary' : ''}`} />
                <span>{likesData?.count || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{comments?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default StoryCard;
