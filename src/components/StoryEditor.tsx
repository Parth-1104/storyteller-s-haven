import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, ArrowLeft } from 'lucide-react';
import { useCreateStory, useUpdateStory, Story } from '@/hooks/useStories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface StoryEditorProps {
  story?: Story | null;
  onBack: () => void;
  onSave: () => void;
}

const StoryEditor = ({ story, onBack, onSave }: StoryEditorProps) => {
  const [title, setTitle] = useState(story?.title || '');
  const [content, setContent] = useState(story?.content || '');
  const [excerpt, setExcerpt] = useState(story?.excerpt || '');
  const [coverImage, setCoverImage] = useState(story?.cover_image || '');
  const [authorName, setAuthorName] = useState(story?.author_name || '');
  const [published, setPublished] = useState(story?.published ?? true);

  const createStory = useCreateStory();
  const updateStory = useUpdateStory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !authorName.trim()) {
      toast.error('Please fill in title, content, and author name');
      return;
    }

    try {
      if (story) {
        await updateStory.mutateAsync({
          id: story.id,
          title: title.trim(),
          content: content.trim(),
          excerpt: excerpt.trim() || null,
          cover_image: coverImage.trim() || null,
          author_name: authorName.trim(),
          published,
        });
        toast.success('Story updated!');
      } else {
        await createStory.mutateAsync({
          title: title.trim(),
          content: content.trim(),
          excerpt: excerpt.trim() || null,
          cover_image: coverImage.trim() || null,
          author_name: authorName.trim(),
          published,
        });
        toast.success('Story published!');
      }
      onSave();
    } catch (error) {
      toast.error('Failed to save story');
    }
  };

  const isLoading = createStory.isPending || updateStory.isPending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 gap-2 font-body"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Stories
      </Button>

      <div className="bg-card rounded-xl p-8 card-elevated">
        <h1 className="font-display text-3xl font-bold text-foreground mb-6">
          {story ? 'Edit Story' : 'New Story'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-body">Title</Label>
            <Input
              id="title"
              placeholder="Enter story title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-elegant text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author" className="font-body">Author Name</Label>
            <Input
              id="author"
              placeholder="Your name..."
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="input-elegant"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" className="font-body">Excerpt (optional)</Label>
            <Textarea
              id="excerpt"
              placeholder="A brief summary of your story..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="input-elegant resize-none"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage" className="font-body">Cover Image URL (optional)</Label>
            <Input
              id="coverImage"
              placeholder="https://example.com/image.jpg"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="input-elegant"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="font-body">Story Content</Label>
            <Textarea
              id="content"
              placeholder="Once upon a time..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input-elegant min-h-[400px] font-body text-lg leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published" className="font-body cursor-pointer">
              Publish story (visible to readers)
            </Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="gap-2 font-body"
            >
              <Save className="w-4 h-4" />
              {story ? 'Update Story' : 'Publish Story'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="font-body"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default StoryEditor;
