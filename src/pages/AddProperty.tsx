import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import API from "@/api/api";
import terraLogo from "../assets/terra_logo.png";
import {
  Home,
  Info,
  Building2,
  Image as ImageIcon,
  Check,
} from "lucide-react";

interface PropertyForm {
  property_type: string;
  property_name: string;
  address: string;
  price: string;
  price_ksqft: string;
  property_sqft: string;
  possession: string;
  configurations: string;
  bathroom: string;
  property_status: string;
  project_size: string;
  project_area: string;
  about_property: string;
  project_specifications: string;
  project_amenities: string[];
  nearby_facilitys: string[];
  emi_starts_price: string;
  cover_image: File | null;
  images: File[];
  video: File | null;
  download_brochure: File | null;
  map_link: string;
  google_map: string;
}

const steps = [
  { id: 1, title: "Property Type", desc: "Choose property purpose", icon: Home },
  { id: 2, title: "Basic Info", desc: "Enter core property details", icon: Info },
  { id: 3, title: "Project Details", desc: "Fill in project information", icon: Building2 },
  { id: 4, title: "Media Uploads", desc: "Add images, video & brochure", icon: ImageIcon },
];

const PropertyWizard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<PropertyForm>({
    property_type: "",
    property_name: "",
    address: "",
    price: "",
    price_ksqft: "",
    property_sqft: "",
    possession: "",
    configurations: "",
    bathroom: "",
    property_status: "",
    project_size: "",
    project_area: "",
    about_property: "",
    project_specifications: "",
    project_amenities: [],
    nearby_facilitys: [],
    emi_starts_price: "",
    cover_image: null,
    images: [],
    video: null,
    download_brochure: null,
    map_link: "",
    google_map: "",
  });

  const [preview, setPreview] = useState<{
    cover_image?: string;
    video?: string;
    images?: string[];
  }>({});

  /** File preview handler */
  const handleFilePreview = (
    field: keyof PropertyForm,
    file: File | null,
    multiple = false
  ) => {
    if (!file && !multiple) {
      setFormData((s) => ({ ...s, [field]: null }));
      setPreview((p) => ({ ...p, [field]: undefined }));
      return;
    }

    if (multiple && file) {
      const newFiles = [...formData.images, file];
      setFormData({ ...formData, images: newFiles });
      const newPreviews = [
        ...(preview.images || []),
        URL.createObjectURL(file),
      ];
      setPreview({ ...preview, images: newPreviews });
      return;
    }

    if (!multiple && file) {
      setFormData((s) => ({ ...s, [field]: file }));
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        setPreview((p) => ({ ...p, [field]: URL.createObjectURL(file) }));
      }
    }
  };

  /** Cleanup previews */
  useEffect(() => {
    return () => {
      if (preview.cover_image) URL.revokeObjectURL(preview.cover_image);
      if (preview.video) URL.revokeObjectURL(preview.video);
      preview.images?.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview]);

  const handleInputChange = (field: keyof PropertyForm, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  /** Step validation */
  const validateStep = () => {
    switch (step) {
      case 1:
        return !!formData.property_type;
      case 2:
        return (
          formData.property_name &&
          formData.address &&
          formData.price &&
          formData.price_ksqft &&
          formData.property_sqft &&
          formData.possession &&
          formData.configurations &&
          formData.bathroom &&
          formData.property_status
        );
      case 3:
        return (
          formData.project_size &&
          formData.project_area &&
          formData.about_property &&
          formData.project_specifications &&
          formData.project_amenities.length > 0 &&
          formData.nearby_facilitys.length > 0 &&
          formData.emi_starts_price
        );
      case 4:
        return (
          formData.cover_image &&
          formData.images.length > 0 &&
          formData.map_link &&
          formData.google_map
        );
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep()) {
      toast({
        variant: "destructive",
        description: "Please fill all required fields before proceeding.",
      });
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  /** Submit property */
  const submitProperty = async () => {
    if (!validateStep()) {
      toast({
        variant: "destructive",
        description: "Please complete all required fields.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val instanceof File) {
          body.append(key, val);
        } else if (Array.isArray(val)) {
          val.forEach((v) => body.append(`${key}[]`, v));
        } else {
          body.append(key, val as string);
        }
      });

      const res = await API.post("/properties", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        toast({ description: "Property submitted successfully" });
        navigate(`/investor/${res.data.id}`);
      } else {
        toast({
          variant: "destructive",
          description: res.data.message || "Failed to submit property",
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: err?.message || "Network error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow flex flex-col">
        <div className="flex items-center justify-center h-20 border-b border-gray-200">
          <img src={terraLogo} alt="Logo" className="h-10" />
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-lg font-semibold mb-6 text-gray-700">
            Add Property
          </h2>
          <ul className="relative">
            {steps.map((st, idx) => {
              const isCompleted = step > st.id;
              const isActive = step === st.id;
              const isLocked = step < st.id && !isCompleted;
              const Icon = st.icon;

              return (
                <li
                  key={st.id}
                  className={`flex items-start gap-3 mb-8 cursor-pointer relative ${
                    isLocked ? "cursor-not-allowed opacity-60" : ""
                  }`}
                  onClick={() => {
                    if (!isLocked) setStep(st.id);
                  }}
                >
                  {/* Connector line */}
                  {idx !== steps.length - 1 && (
                    <span
                      className={`absolute left-5 top-10 w-0.5 h-8 ${
                        isCompleted ? "bg-green-400" : "bg-gray-300"
                      }`}
                    />
                  )}

                  {/* Icon circle */}
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 z-10 ${
                      isActive
                        ? "border-yellow-400 bg-yellow-100 text-yellow-600"
                        : isCompleted
                        ? "border-green-400 bg-green-100 text-green-600"
                        : "border-gray-300 bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                  </div>

                  <div className="flex flex-col">
                    <span
                      className={`font-medium ${
                        isActive
                          ? "text-yellow-600"
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {st.title}
                    </span>
                    <span className="text-xs text-gray-400">{st.desc}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          {/* Steps */}
          {step === 1 && (
            <>
              <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
                Step {step}: {steps[step - 1].title}
              </h3>
              <Label className="text-sm font-medium text-gray-600">
                Property Type
              </Label>
              <select
                value={formData.property_type}
                onChange={(e) =>
                  handleInputChange("property_type", e.target.value)
                }
                className="mt-2 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select property type</option>
                <option value="list">List</option>
                <option value="sell">Sell</option>
                <option value="buy">Buy</option>
                <option value="mortgage">Mortgage</option>
              </select>
            </>
          )}

{/* Step 2 */}
{step === 2 && (
  <div>
    <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
      Step {step}: {steps[step - 1].title}
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label className="text-sm font-medium text-gray-600">Property Name</Label>
        <Input
          value={formData.property_name}
          onChange={(e) => handleInputChange("property_name", e.target.value)}
          placeholder="e.g. Sunshine Residency"
          className="mt-2"
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-sm font-medium text-gray-600">Address</Label>
        <Textarea
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="Enter complete property address"
          className="mt-2"
        />
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-600">Price</Label>
        <Input
          value={formData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
          placeholder="e.g. 250000"
          className="mt-2"
        />
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-600">Price per Sqft</Label>
        <Input
          value={formData.price_ksqft}
          onChange={(e) => handleInputChange("price_ksqft", e.target.value)}
          placeholder="e.g. 1500"
          className="mt-2"
        />
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-600">Property Sqft</Label>
        <Input
          value={formData.property_sqft}
          onChange={(e) => handleInputChange("property_sqft", e.target.value)}
          placeholder="e.g. 1200"
          className="mt-2"
        />
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-600">Possession</Label>
        <Input
          value={formData.possession}
          onChange={(e) => handleInputChange("possession", e.target.value)}
          placeholder="e.g. Dec 2025"
          className="mt-2"
        />
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-600">Configurations</Label>
        <Input
          value={formData.configurations}
          onChange={(e) => handleInputChange("configurations", e.target.value)}
          placeholder="e.g. 2BHK, 3BHK"
          className="mt-2"
        />
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-600">Bathrooms</Label>
        <Input
          value={formData.bathroom}
          onChange={(e) => handleInputChange("bathroom", e.target.value)}
          placeholder="e.g. 2"
          className="mt-2"
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-sm font-medium text-gray-600">Property Status</Label>
        <Input
          value={formData.property_status}
          onChange={(e) => handleInputChange("property_status", e.target.value)}
          placeholder="e.g. Under Construction / Ready to Move"
          className="mt-2"
        />
      </div>
    </div>
  </div>
)}

{/* Step 3 */}
{step === 3 && (
  <div>
    <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
      Step {step}: {steps[step - 1].title}
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label className="text-sm font-medium text-gray-600">Project Size</Label>
        <Input
          value={formData.project_size}
          onChange={(e) => handleInputChange("project_size", e.target.value)}
          placeholder="e.g. 10 Towers"
          className="mt-2"
        />
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-600">Project Area</Label>
        <Input
          value={formData.project_area}
          onChange={(e) => handleInputChange("project_area", e.target.value)}
          placeholder="e.g. 50 Acres"
          className="mt-2"
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-sm font-medium text-gray-600">About Property</Label>
        <Textarea
          value={formData.about_property}
          onChange={(e) => handleInputChange("about_property", e.target.value)}
          placeholder="Write a short description of the property"
          className="mt-2"
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-sm font-medium text-gray-600">Project Specifications</Label>
        <Textarea
          value={formData.project_specifications}
          onChange={(e) =>
            handleInputChange("project_specifications", e.target.value)
          }
          placeholder="Enter specifications like structure, flooring, fittings..."
          className="mt-2"
        />
      </div>
      <div className="md:col-span-2">
        <Label className="text-sm font-medium text-gray-600">Project Amenities</Label>
        <Input
          value={formData.project_amenities.join(",")}
          onChange={(e) =>
            handleInputChange("project_amenities", e.target.value.split(","))
          }
          placeholder="e.g. Swimming Pool, Gym, Park"
          className="mt-2"
        />
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-600">Nearby Facilities</Label>
        <Input
  value={formData.nearby_facilitys.join(",")}
  onChange={(e) =>
    handleInputChange("nearby_facilitys", e.target.value.split(","))
  }
  placeholder="e.g. School, Hospital, Mall"
  className="mt-2"
/>
      </div>
      <div>
        <Label className="text-sm font-medium text-gray-600">EMI Starts Price</Label>
        <Input
          value={formData.emi_starts_price}
          onChange={(e) => handleInputChange("emi_starts_price", e.target.value)}
          placeholder="e.g. 15,000/month"
          className="mt-2"
        />
      </div>
    </div>
  </div>
)}

{/* Step 4 */}
{step === 4 && (
  <div>
    <h3 className="text-xl font-semibold mb-6 text-gray-800">
      Step {step}: {steps[step - 1].title}
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Cover Image */}
<div className="md:col-span-2">
  <Label className="text-sm font-medium text-gray-600">Cover Image</Label>
  <input
    id="coverInput"
    type="file"
    accept="image/*"
    className="mt-2 block w-40 text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 
               file:rounded-md file:border-0 file:text-sm file:font-medium 
               file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
    onChange={(e) =>
      e.target.files?.[0] &&
      handleFilePreview("cover_image", e.target.files[0])
    }
  />
  {preview.cover_image && (
    <div className="relative group mt-3 max-w-3xl h-56 rounded-md overflow-hidden border">
      <img
        src={preview.cover_image}
        alt="Cover Preview"
        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      <button
        type="button"
        onClick={() => setPreview((prev) => ({ ...prev, cover_image: "" }))}
        className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full p-1 opacity-80 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  )}
</div>

{/* Gallery Images */}
<div className="md:col-span-2">
  <Label className="text-sm font-medium text-gray-600">
    Gallery Images (Max 5)
  </Label>
  <input
    id="galleryInput"
    type="file"
    multiple
    accept="image/*"
    className="mt-2 block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 
               file:rounded-md file:border-0 file:text-sm file:font-medium 
               file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
    onChange={(e) => {
      if (e.target.files) {
        let files = Array.from(e.target.files);
        const availableSlots = 5 - (preview.images?.length || 0);
        if (files.length > availableSlots) {
          alert(`You can only upload ${availableSlots} more image(s).`);
          files = files.slice(0, availableSlots);
        }
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreview((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...newPreviews],
        }));
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...files],
        }));
      }
    }}
  />

  {preview.images && preview.images.length > 0 && (
    <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {preview.images.map((src, i) => (
        <div
          key={i}
          className="relative group rounded-md overflow-hidden border"
        >
          <img
            src={src}
            alt={`Preview ${i}`}
            className="h-32 w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <button
            type="button"
            onClick={() => {
              const newPreviews = preview.images.filter((_, idx) => idx !== i);
              const newFiles = formData.images.filter((_, idx) => idx !== i);
              setPreview((prev) => ({ ...prev, images: newPreviews }));
              setFormData((prev) => ({ ...prev, images: newFiles }));
            }}
            className="absolute top-1 right-1 bg-red-500 text-white text-xs 
                       rounded-full p-1 opacity-80 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
</div>

{/* Video */}
<div>
  <Label className="text-sm font-medium text-gray-600">Video</Label>
  <input
    type="file"
    accept="video/*"
    className="mt-2 block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 
               file:rounded-md file:border-0 file:text-sm file:font-medium 
               file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
    onChange={(e) =>
      e.target.files?.[0] && handleFilePreview("video", e.target.files[0])
    }
  />
  {preview.video && (
    <div className="relative group mt-3 w-full h-56 rounded-md overflow-hidden border">
      <video
        src={preview.video}
        controls
        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      <button
        type="button"
        onClick={() => setPreview((prev) => ({ ...prev, video: "" }))}
        className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full p-1 opacity-80 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  )}
</div>


  {/* Download Brochure */}
  <div>
    <Label className="text-sm font-medium text-gray-600">Download Brochure</Label>
    <input
      type="file"
      accept=".pdf,.docx"
      className="mt-2 block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 
                 file:rounded-md file:border-0 file:text-sm file:font-medium 
                 file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
      onChange={(e) =>
        e.target.files?.[0] &&
        handleInputChange("download_brochure", e.target.files[0])
      }
    />

    {formData.download_brochure && (
      <div className="mt-3 flex items-center justify-between rounded-md border p-3 bg-gray-50">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          📄 {formData.download_brochure.name}
        </div>
        <button
          type="button"
          onClick={() => handleInputChange("download_brochure", null)}
          className="text-red-500 text-xs hover:underline"
        >
          Remove
        </button>
      </div>
    )}
  </div>

      {/* Map Link */}
      <div>
        <Label className="text-sm font-medium text-gray-600">Map Link</Label>
        <Input
          value={formData.map_link}
          onChange={(e) => handleInputChange("map_link", e.target.value)}
          placeholder="Paste map link"
          className="mt-2"
        />
      </div>

      {/* Google Map Embed */}
      <div>
        <Label className="text-sm font-medium text-gray-600">
          Google Map Embed
        </Label>
        <Input
          value={formData.google_map}
          onChange={(e) => handleInputChange("google_map", e.target.value)}
          placeholder="Paste Google Map embed URL"
          className="mt-2"
        />
      </div>
    </div>
  </div>
)}

    {/* Navigation */}
          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700"
                onClick={prevStep}
              >
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button
                className="bg-yellow-400 hover:bg-yellow-500 text-black"
                onClick={nextStep}
              >
                Next
              </Button>
            ) : (
              <Button
                className="bg-yellow-400 hover:bg-yellow-500 text-black"
                onClick={submitProperty}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Property"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyWizard;