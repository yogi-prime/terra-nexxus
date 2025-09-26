// MarketplacePropertyGallery.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileDown, Video, Image as ImageIcon, ChevronLeft, ChevronRight, X } from "lucide-react";

interface MarketplacePropertyGalleryProps {
  property: {
    images?: string[];
    video?: string | null;
    download_brochure?: string | null;
  };
}

export const MarketplacePropertyGallery = ({ property }: MarketplacePropertyGalleryProps) => {
  const images = Array.isArray(property.images) ? property.images : [];
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <Card className="rounded-2xl border shadow-sm bg-white">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-primary" />
          Gallery
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6 space-y-8">
        {/* Image Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-xl shadow-sm cursor-pointer"
                onClick={() => openModal(i)}
              >
                <img
                  src={img}
                  alt={`Gallery ${i}`}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No images available.</p>
        )}

        {/* Video */}
        {property.video && (
          <div className="rounded-xl overflow-hidden shadow-sm border">
            <video
              controls
              className="w-full max-h-[400px] object-cover"
              src={property.video}
            />
          </div>
        )}

        {/* Download Brochure */}
        {property.download_brochure && (
          <Button asChild className="w-full flex items-center gap-2 rounded-full shadow-md">
            <a
              href={property.download_brochure}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <FileDown className="w-4 h-4" />
              Download Brochure
            </a>
          </Button>
        )}
      </CardContent>

      {/* Lightbox Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-black">
          <div className="relative flex items-center justify-center">
            {/* Close */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeModal}
              className="absolute top-3 right-3 z-20 text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Prev */}
            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={prevImage}
                className="absolute left-3 z-20 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={nextImage}
                className="absolute right-3 z-20 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}

            {/* Image */}
            <img
              src={images[currentIndex]}
              alt={`Full Gallery ${currentIndex}`}
              className="max-h-[80vh] w-auto object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MarketplacePropertyGallery;
