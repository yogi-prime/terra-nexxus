import { useEffect, useState } from "react";
import { Play, Eye, Clock, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import * as Dialog from "@radix-ui/react-dialog";

type ApiVideo = {
  id: string | number;
  title: string;
  thumbnail?: string;
  video_url?: string;
  type?: string;
  duration?: string;
  views?: number;
  developer?: string;
  location?: string;
  price?: string;
};

export const PropertyVideos = () => {
  const [videos, setVideos] = useState<ApiVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `https://app.terranexxus.com/api/v1/property-videos`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        const list: ApiVideo[] = json?.data ?? json?.videos ?? [];
        setVideos(list);
      } catch (err: any) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p className="text-center py-10">Loading videos...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!videos.length) return <p className="text-center py-10">No videos available.</p>;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Property Video Tours
          </h2>
          <p className="text-lg text-muted-foreground">
            Take virtual tours of premium properties from the comfort of your home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={video.thumbnail || "https://via.placeholder.com/640x360?text=No+Thumbnail"}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />

                {/* Play Button Overlay */}
                <div
                  onClick={() => video.video_url && setCurrentVideo(video.video_url)}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>

                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-600 text-white flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    {video.type || "Video"}
                  </Badge>
                </div>

                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {video.duration || "0:00"}
                </div>

                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {video.views ?? 0} views
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {video.title}
                </h3>

                {!!video.developer && (
                  <p className="text-sm text-primary font-medium mb-2">{video.developer}</p>
                )}

                {!!video.location && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{video.location}</span>
                  </div>
                )}

                {!!video.price && (
                  <div className="mb-4">
                    <span className="text-lg font-bold text-foreground">{video.price}</span>
                  </div>
                )}

                <Button
                  size="sm"
                  className="w-full"
                  variant="outline"
                  onClick={() => video.video_url && setCurrentVideo(video.video_url)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Tour
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal */}
        <Dialog.Root open={!!currentVideo} onOpenChange={(open) => !open && setCurrentVideo(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/70 z-40" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-3/4 lg:w-1/2 bg-background p-4 rounded shadow-lg z-50">
              <Dialog.Title className="sr-only">Property Video Player</Dialog.Title>
              <Dialog.Description className="sr-only">
                Watch the selected property video in a modal
              </Dialog.Description>

              <div className="flex justify-end mb-2">
                <button onClick={() => setCurrentVideo(null)} className="text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

              {currentVideo && (
                <video src={currentVideo} controls className="w-full h-[400px] object-cover rounded" />
              )}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            View All Property Videos
          </Button>
        </div>
      </div>
    </section>
  );
};
