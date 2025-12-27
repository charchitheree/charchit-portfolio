import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, User, UserX, Star, MessageCircle, Lightbulb, Sparkles, Edit2, Trash2, X, Check, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SpaceBackground from "@/components/SpaceBackground";
import { User as SupabaseUser } from "@supabase/supabase-js";

type FeedbackType = "general" | "best_part" | "suggestion" | "improvement";

interface Feedback {
  id: string;
  display_name: string | null;
  is_anonymous: boolean;
  feedback_type: FeedbackType;
  content: string;
  rating: number | null;
  created_at: string;
  user_id: string | null;
}

const FEEDBACK_TYPES = [
  { value: "general" as FeedbackType, label: "General", icon: MessageCircle, bgClass: "bg-google-blue/20", textClass: "text-google-blue", borderClass: "border-google-blue" },
  { value: "best_part" as FeedbackType, label: "Best Part", icon: Star, bgClass: "bg-google-yellow/20", textClass: "text-google-yellow", borderClass: "border-google-yellow" },
  { value: "suggestion" as FeedbackType, label: "Suggestion", icon: Lightbulb, bgClass: "bg-google-green/20", textClass: "text-google-green", borderClass: "border-google-green" },
  { value: "improvement" as FeedbackType, label: "Improvement", icon: Sparkles, bgClass: "bg-google-red/20", textClass: "text-google-red", borderClass: "border-google-red" },
];

const getTypeStyles = (type: FeedbackType) => {
  const found = FEEDBACK_TYPES.find(t => t.value === type);
  return {
    bgClass: found?.bgClass || "bg-google-blue/20",
    textClass: found?.textClass || "text-google-blue",
    borderClass: found?.borderClass || "border-google-blue"
  };
};

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("general");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchFeedbacks();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('feedback-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'feedback' },
        () => {
          fetchFeedbacks();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchFeedbacks = async () => {
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    
    if (error) {
      toast.error("Failed to load feedback");
    } else {
      setFeedbacks((data as Feedback[]) || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to submit feedback");
      navigate("/auth");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please write something!");
      return;
    }
    
    if (!isAnonymous && !displayName.trim()) {
      toast.error("Please enter your name or go anonymous");
      return;
    }
    
    setSubmitting(true);
    
    const { error } = await supabase.from("feedback").insert({
      display_name: isAnonymous ? null : displayName.trim(),
      is_anonymous: isAnonymous,
      feedback_type: feedbackType,
      content: content.trim(),
      rating,
      user_id: user.id,
    });
    
    if (error) {
      toast.error("Failed to submit feedback");
    } else {
      toast.success("Thanks for your feedback!");
      setContent("");
      setRating(null);
    }
    
    setSubmitting(false);
  };

  const handleEdit = (feedback: Feedback) => {
    setEditingId(feedback.id);
    setEditContent(feedback.content);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editContent.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    const { error } = await supabase
      .from("feedback")
      .update({ content: editContent.trim() })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update feedback");
    } else {
      toast.success("Feedback updated!");
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("feedback")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete feedback");
    } else {
      toast.success("Feedback deleted");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
  };

  const formatTime = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getTypeIcon = (type: FeedbackType) => {
    const found = FEEDBACK_TYPES.find(t => t.value === type);
    return found?.icon || MessageCircle;
  };

  const isOwner = (feedback: Feedback) => user && feedback.user_id === user.id;

  return (
    <div className="min-h-screen flex flex-col relative">
      <SpaceBackground />
      <div className="scanlines" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-card/80 border-b border-border/50">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-pixel text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <h1 className="font-pixel text-sm">
            <span className="text-google-blue">V</span>
            <span className="text-google-red">o</span>
            <span className="text-google-yellow">i</span>
            <span className="text-google-green">c</span>
            <span className="text-google-blue">e</span>
            <span className="text-google-red">s</span>
          </h1>
          
          <div className="flex items-center gap-2">
            {user ? (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1 font-pixel text-xs text-muted-foreground hover:text-google-red transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className="font-pixel text-xs text-google-blue hover:underline"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Submit Form */}
          <div className="backdrop-blur-md bg-card/90 border border-border/50 rounded-lg p-4">
            <h2 className="font-pixel text-xs text-google-blue mb-4">Share Your Voice</h2>
            
            {!user && (
              <div className="mb-4 p-3 bg-google-yellow/10 border border-google-yellow/30 rounded-lg">
                <p className="font-code text-xs text-google-yellow">
                  <button onClick={() => navigate("/auth")} className="underline hover:no-underline">
                    Sign in
                  </button> to submit and manage your feedback
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anonymous Toggle */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsAnonymous(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                    !isAnonymous ? "bg-google-blue/20 border-google-blue text-google-blue" : "border-border text-muted-foreground hover:border-border/80"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="font-code text-xs">With Name</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAnonymous(true)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                    isAnonymous ? "bg-google-red/20 border-google-red text-google-red" : "border-border text-muted-foreground hover:border-border/80"
                  }`}
                >
                  <UserX className="w-4 h-4" />
                  <span className="font-code text-xs">Anonymous</span>
                </button>
              </div>

              {/* Name Input */}
              {!isAnonymous && (
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name..."
                  maxLength={50}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg font-code text-sm outline-none focus:border-google-blue transition-colors"
                />
              )}

              {/* Feedback Type */}
              <div className="grid grid-cols-2 gap-2">
                {FEEDBACK_TYPES.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFeedbackType(type.value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                      feedbackType === type.value 
                        ? `${type.bgClass} ${type.borderClass} ${type.textClass}` 
                        : "border-border text-muted-foreground hover:border-border/80"
                    }`}
                  >
                    <type.icon className="w-4 h-4" />
                    <span className="font-code text-xs">{type.label}</span>
                  </button>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <span className="font-code text-xs text-muted-foreground">Rate:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(rating === star ? null : star)}
                    className="p-1"
                  >
                    <Star 
                      className={`w-5 h-5 transition-colors ${
                        rating && star <= rating ? "text-google-yellow fill-google-yellow" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Content */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind? Share your thoughts about the portfolio, suggest improvements, or tell me what you liked best..."
                maxLength={500}
                rows={4}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-code text-sm outline-none focus:border-google-blue transition-colors resize-none"
              />
              
              <div className="flex items-center justify-between">
                <span className="font-code text-xs text-muted-foreground">{content.length}/500</span>
                <button
                  type="submit"
                  disabled={submitting || !user}
                  className="flex items-center gap-2 px-4 py-2 bg-google-blue text-white rounded-lg font-code text-sm hover:bg-google-blue/90 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Submit"}
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Feedback Wall */}
          <div className="space-y-4">
            <h2 className="font-pixel text-xs text-google-green">Community Voices</h2>
            
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="backdrop-blur-md bg-card/90 border border-border/50 rounded-lg p-4">
                    <div className="skeleton h-4 w-24 mb-2 rounded" />
                    <div className="skeleton h-16 w-full rounded" />
                  </div>
                ))}
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="backdrop-blur-md bg-card/90 border border-border/50 rounded-lg p-6 text-center">
                <MessageCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-code text-sm text-muted-foreground">No voices yet. Be the first!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {feedbacks.map((feedback) => {
                  const TypeIcon = getTypeIcon(feedback.feedback_type);
                  const typeStyles = getTypeStyles(feedback.feedback_type);
                  const canEdit = isOwner(feedback);
                  const isEditing = editingId === feedback.id;
                  
                  return (
                    <div key={feedback.id} className="backdrop-blur-md bg-card/90 border border-border/50 rounded-lg p-4 animate-fade-in">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full ${typeStyles.bgClass} flex items-center justify-center`}>
                            {feedback.is_anonymous ? (
                              <UserX className="w-3 h-3 text-muted-foreground" />
                            ) : (
                              <User className="w-3 h-3 text-foreground" />
                            )}
                          </div>
                          <span className="font-code text-sm text-foreground">
                            {feedback.is_anonymous ? "Anonymous" : feedback.display_name}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-pixel ${typeStyles.bgClass} ${typeStyles.textClass}`}>
                            {feedback.feedback_type.replace("_", " ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {canEdit && !isEditing && (
                            <>
                              <button
                                onClick={() => handleEdit(feedback)}
                                className="p-1 text-muted-foreground hover:text-google-blue transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDelete(feedback.id)}
                                className="p-1 text-muted-foreground hover:text-google-red transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </>
                          )}
                          <span className="font-code text-[10px] text-muted-foreground">
                            {formatTime(feedback.created_at)}
                          </span>
                        </div>
                      </div>
                      
                      {feedback.rating && (
                        <div className="flex gap-0.5 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= feedback.rating! ? "text-google-yellow fill-google-yellow" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      
                      {isEditing ? (
                        <div className="space-y-2">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            maxLength={500}
                            rows={3}
                            className="w-full px-3 py-2 bg-secondary border border-border rounded-lg font-code text-sm outline-none focus:border-google-blue transition-colors resize-none"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveEdit(feedback.id)}
                              className="flex items-center gap-1 px-3 py-1 bg-google-green text-white rounded font-code text-xs hover:bg-google-green/90"
                            >
                              <Check className="w-3 h-3" />
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="flex items-center gap-1 px-3 py-1 bg-secondary border border-border rounded font-code text-xs hover:bg-secondary/80"
                            >
                              <X className="w-3 h-3" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="font-code text-sm text-muted-foreground leading-relaxed">
                          {feedback.content}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedbackPage;
