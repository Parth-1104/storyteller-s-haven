import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, User } from 'lucide-react';
import { useComments, useCreateComment, Comment } from '@/hooks/useComments';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface CommentsSectionProps {
  storyId: string;
}

const CommentsSection = ({ storyId }: CommentsSectionProps) => {
  const { data: comments, isLoading } = useComments(storyId);
  const createComment = useCreateComment();
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authorName.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createComment.mutateAsync({
        story_id: storyId,
        author_name: authorName.trim(),
        content: content.trim(),
      });
      
      setContent('');
      toast.success('Comment posted!');
    } catch (error) {
      toast.error('Failed to post comment');
    }
  };

  return (
    <section className="mt-12 border-t border-border pt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 font-display text-xl font-semibold text-[#003332] mb-6 hover:text-primary transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Comments ({comments?.length || 0})</span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
              <Input
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="input-elegant"
              />
              <Textarea
                placeholder="Share your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input-elegant min-h-[100px] resize-none"
              />
              <Button
                type="submit"
                disabled={createComment.isPending}
                className="gap-2 font-body"
              >
                <Send className="w-4 h-4" />
                Post Comment
              </Button>
            </form>

            {/* Comments List */}
            {isLoading ? (
              <div className="text-center text-muted-foreground py-8">
                Loading comments...
              </div>
            ) : comments && comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <CommentItem key={comment.id} comment={comment} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No comments yet. Be the first to share your thoughts!
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const CommentItem = ({ comment, index }: { comment: Comment; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex gap-4 p-4 bg-secondary/50 rounded-lg"
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <User className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-display font-semibold text-foreground">
            {comment.author_name}
          </span>
          <span className="text-sm text-muted-foreground">
            {format(new Date(comment.created_at), 'MMM d, yyyy')}
          </span>
        </div>
        <p className="font-body text-foreground/90 leading-relaxed">
          {comment.content}
        </p>
      </div>
    </motion.div>
  );
};

export default CommentsSection;
