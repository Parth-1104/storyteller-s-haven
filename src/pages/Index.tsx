import { motion } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StoryCard from '@/components/StoryCard';
import { useStories } from '@/hooks/useStories';
import { BookOpen } from 'lucide-react';

const Index = () => {
  const { data: stories, isLoading, error } = useStories();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <HeroSection />

        <section id="stories" className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest Stories
            </h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Explore our collection of captivating stories, each crafted with passion and imagination.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl h-80 animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-destructive font-body">
                Failed to load stories. Please try again later.
              </p>
            </div>
          ) : stories && stories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No stories yet
              </h3>
              <p className="font-body text-muted-foreground">
                Check back soon for new stories, or if you're an admin, start writing!
              </p>
            </motion.div>
          )}
        </section>
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

export default Index;
