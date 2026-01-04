import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, BookOpen, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import Header from '@/components/Header';
import StoryEditor from '@/components/StoryEditor';
import { useAuth } from '@/hooks/useAuth';
import { useStories, useDeleteStory, Story } from '@/hooks/useStories';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const { data: stories, isLoading: storiesLoading, refetch } = useStories();
  const deleteStory = useDeleteStory();
  
  const [view, setView] = useState<'list' | 'edit'>('list');
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null);
  const [allStories, setAllStories] = useState<Story[]>([]);

  // Fetch all stories (including unpublished) for admin
  useEffect(() => {
    if (isAdmin) {
      const fetchAllStories = async () => {
        const { data, error } = await supabase
          .from('stories')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          setAllStories(data as Story[]);
        }
      };
      fetchAllStories();
    }
  }, [isAdmin, stories]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading || storiesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 container mx-auto px-6">
          <div className="animate-pulse text-center text-muted-foreground">
            Loading...
          </div>
        </main>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Access Denied
            </h1>
            <p className="font-body text-muted-foreground mb-8">
              You don't have admin privileges. Please contact the site administrator.
            </p>
            <Button onClick={() => navigate('/')} className="font-body">
              Back to Stories
            </Button>
          </motion.div>
        </main>
      </div>
    );
  }

  const handleEdit = (story: Story) => {
    setEditingStory(story);
    setView('edit');
  };

  const handleDelete = async () => {
    if (!storyToDelete) return;

    try {
      await deleteStory.mutateAsync(storyToDelete.id);
      toast.success('Story deleted');
      setAllStories(prev => prev.filter(s => s.id !== storyToDelete.id));
    } catch (error) {
      toast.error('Failed to delete story');
    }
    setDeleteDialogOpen(false);
    setStoryToDelete(null);
  };

  const handleSave = async () => {
    setView('list');
    setEditingStory(null);
    // Refetch all stories
    const { data } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setAllStories(data as Story[]);
    refetch();
  };

  if (view === 'edit') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 container mx-auto px-6">
          <StoryEditor
            story={editingStory}
            onBack={() => {
              setView('list');
              setEditingStory(null);
            }}
            onSave={handleSave}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Story Management
              </h1>
              <p className="font-body text-muted-foreground">
                Create, edit, and manage your stories
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingStory(null);
                setView('edit');
              }}
              className="gap-2 font-body"
            >
              <Plus className="w-4 h-4" />
              New Story
            </Button>
          </div>

          {allStories.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl">
              <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No stories yet
              </h3>
              <p className="font-body text-muted-foreground mb-6">
                Start by creating your first story.
              </p>
              <Button
                onClick={() => setView('edit')}
                className="gap-2 font-body"
              >
                <Plus className="w-4 h-4" />
                Create Story
              </Button>
            </div>
          ) : (
            <div className="bg-card rounded-xl overflow-hidden card-elevated">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="px-6 py-4 text-left font-display font-semibold text-foreground">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left font-display font-semibold text-foreground">
                        Author
                      </th>
                      <th className="px-6 py-4 text-left font-display font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left font-display font-semibold text-foreground">
                        Date
                      </th>
                      <th className="px-6 py-4 text-right font-display font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {allStories.map((story, index) => (
                      <motion.tr
                        key={story.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="font-body font-medium text-foreground">
                            {story.title}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-body text-muted-foreground">
                            {story.author_name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {story.published ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-sm font-body">
                              <Eye className="w-3 h-3" />
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-sm font-body">
                              <EyeOff className="w-3 h-3" />
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-body text-muted-foreground">
                            {format(new Date(story.created_at), 'MMM d, yyyy')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(story)}
                              className="gap-1"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setStoryToDelete(story);
                                setDeleteDialogOpen(true);
                              }}
                              className="gap-1 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Delete Story?</AlertDialogTitle>
            <AlertDialogDescription className="font-body">
              This will permanently delete "{storyToDelete?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-body">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground font-body"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPage;
