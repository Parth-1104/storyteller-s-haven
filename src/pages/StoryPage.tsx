import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User } from 'lucide-react';
import Header from '@/components/Header';
import LikeButton from '@/components/LikeButton';
import CommentsSection from '@/components/CommentsSection';
import { useStory } from '@/hooks/useStories';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

const StoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: story, isLoading, error } = useStory(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="h-8 bg-muted rounded animate-pulse mb-4 w-1/2" />
            <div className="h-12 bg-muted rounded animate-pulse mb-8" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 container mx-auto px-6 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Story not found
          </h1>
          <p className="font-body text-muted-foreground mb-8">
            The story you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button variant="default" className="gap-2 font-body">
              <ArrowLeft className="w-4 h-4" />
              Back to Stories
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  // Split content into paragraphs
  const paragraphs = story.content.split('\n\n').filter(p => p.trim());

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Image */}
        {story.cover_image && (
          <div className="w-full h-[40vh] relative overflow-hidden">
            <img
              src={story.cover_image}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        <article className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Stories
            </Link>

            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={story.cover_image ? '-mt-32 relative z-10' : 'mt-8'}
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                {story.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-body">{story.author_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-body">
                    {format(new Date(story.created_at), 'MMMM d, yyyy')}
                  </span>
                </div>
              </div>
            </motion.header>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl p-8 md:p-12 card-elevated mb-8"
            >
              <div className="story-content">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className={index === 0 ? '' : 'first-letter:text-base first-letter:float-none first-letter:mr-0'}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <LikeButton storyId={story.id} />
            </motion.div>

            <CommentsSection storyId={story.id} />
          </div>
        </article>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="font-body text-muted-foreground">
            © {new Date().getFullYear()} StoryHaven. All stories belong to their respective authors.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StoryPage;
