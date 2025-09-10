import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostsHero } from "@/components/posts/PostsHero";
import { FilterSidebar } from "@/components/posts/FilterSidebar";
import { TrendingHighlights } from "@/components/posts/TrendingHighlights";
import { PostGrid } from "@/components/posts/PostGrid";
import { AnalyticsInsights } from "@/components/posts/AnalyticsInsights";
import { CaseStudyCards } from "@/components/posts/CaseStudyCards";
import { VideoHub } from "@/components/posts/VideoHub";
import { CommunityStories } from "@/components/posts/CommunityStories";
import { PostModal } from "@/components/posts/PostModal";
import { PostsCTA } from "@/components/posts/PostsCTA";
import { useState } from "react";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  type: "blog" | "news" | "case-study" | "story" | "video" | "research";
  category: "residential" | "commercial" | "agri-land" | "farmhouse" | "plots" | "industrial";
  author: string;
  publishDate: string;
  views: number;
  likes: number;
  readTime: number;
  thumbnail: string;
  tags: string[];
  trending?: boolean;
  featured?: boolean;
  editorsPick?: boolean;
  content?: string;
}

const Posts = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    sortBy: "latest",
    searchTerm: "",
    dateRange: "all"
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PostsHero />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 space-y-12">
              <TrendingHighlights onPostClick={setSelectedPost} />
              <AnalyticsInsights />
              <PostGrid filters={filters} onPostClick={setSelectedPost} />
            </div>
          </div>
          
          <div className="mt-16 space-y-16">
            <CaseStudyCards onPostClick={setSelectedPost} />
            <VideoHub onPostClick={setSelectedPost} />
            <CommunityStories onPostClick={setSelectedPost} />
          </div>
        </div>
        
        <PostsCTA />
      </main>
      <Footer />
      
      {selectedPost && (
        <PostModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
    </div>
  );
};

export default Posts;