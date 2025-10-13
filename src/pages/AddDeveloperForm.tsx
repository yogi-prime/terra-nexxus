import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import API from "@/api/api";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface DeveloperForm {
  name: string;
  logo: File | null;
  logoPreview: string | null;
  bannerImage: File | null;
  bannerPreview: string | null;
  yearEstablished: string;
  totalProjects: string;
  liveProjects: string;
  rating: number;
  categories: string[];
  portfolioLink: string;
  contactEmail: string;
  contactPhone: string;
}

const projectTypes = ["Residential", "Commercial", "Mixed", "Sustainable"];
const BASE_URL = API.defaults.baseURL.replace("/api", "");

const AddDeveloperForm = () => {
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [developer, setDeveloper] = useState<DeveloperForm>({
    name: "",
    logo: null,
    logoPreview: null,
    bannerImage: null,
    bannerPreview: null,
    yearEstablished: "",
    totalProjects: "",
    liveProjects: "",
    rating: 0,
    categories: [],
    portfolioLink: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  // Fetch existing developer data if editing
  useEffect(() => {
    if (!isEdit) return;

    const fetchDeveloper = async () => {
      setFetching(true);
      try {
        const res = await API.get(`/developers/${id}`);
        const data = res.data.developer;
        setDeveloper({
          name: data.name || "",
          logo: null,
          logoPreview: data.logo ? `${BASE_URL}/storage/${data.logo}` : null,
          bannerImage: null,
          bannerPreview: data.banner_image ? `${BASE_URL}/storage/${data.banner_image}` : null,
          yearEstablished: data.year_established || "",
          totalProjects: data.total_projects?.toString() || "",
          liveProjects: data.live_projects?.toString() || "",
          rating: data.rating || 0,
          categories: data.categories || [],
          portfolioLink: data.portfolio_link || "",
          contactEmail: data.contact_email || "",
          contactPhone: data.contact_phone || "",
        });
      } catch (err: any) {
        toast({ variant: "destructive", description: "Failed to fetch developer" });
      } finally {
        setFetching(false);
      }
    };

    fetchDeveloper();
  }, [id]);

  // Input handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDeveloper({ ...developer, [name]: value });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDeveloper({ ...developer, logo: file, logoPreview: URL.createObjectURL(file) });
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDeveloper({ ...developer, bannerImage: file, bannerPreview: URL.createObjectURL(file) });
    }
  };

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setDeveloper({ ...developer, categories: options });
  };

  const handleRatingClick = (star: number) => {
    setDeveloper({ ...developer, rating: star });
  };

  // Submit handler
  const submitDeveloper = async () => {
    if (!developer.name || developer.rating === 0) {
      toast({ variant: "destructive", description: "Please fill required fields" });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", developer.name);
      formData.append("rating", developer.rating.toString());
      formData.append("year_established", developer.yearEstablished || "");
      formData.append(
        "total_projects",
        developer.totalProjects ? Number(developer.totalProjects).toString() : ""
      );
      formData.append(
        "live_projects",
        developer.liveProjects ? Number(developer.liveProjects).toString() : ""
      );
      formData.append("portfolio_link", developer.portfolioLink || "");
      formData.append("contact_email", developer.contactEmail || "");
      formData.append("contact_phone", developer.contactPhone || "");

      // Categories
      if (developer.categories.length > 0) {
        developer.categories.forEach((cat) => formData.append("categories[]", cat));
      }

      // Logo & Banner
      if (developer.logo) formData.append("logo", developer.logo);
      if (developer.bannerImage) formData.append("banner_image", developer.bannerImage);

      const res = isEdit
        ? await API.post(`/developers/${id}?_method=PUT`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await API.post("/developers", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      if (res.status === 201 || res.status === 200) {
        toast({ description: `Developer ${isEdit ? "updated" : "added"} successfully` });
        navigate("/admin/dashboard");
      } else {
        toast({ variant: "destructive", description: res.data.message || "Failed to submit" });
      }
    } catch (err: any) {
      console.log("Developer submit error:", err.response?.data);
      const message =
        err.response?.data?.message ||
        (err.response?.data?.errors
          ? Object.values(err.response.data.errors)
              .flat()
              .join(", ")
          : "Network error");
      toast({ variant: "destructive", description: message });
    } finally {
      setIsLoading(false);
    }
  };

  if (fetching) return <div className="p-6">Loading developer data...</div>;

  return (
    <>
      <Header />
      <div className="flex justify-center bg-gray-50 py-12 min-h-screen">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900">
              {isEdit ? "Edit Developer Group" : "Add Developer Group"}
            </h2>
            <p className="text-gray-500 mt-1">Fill all details carefully. Fields marked * are mandatory.</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="font-medium mb-2 block text-gray-700">Developer Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter developer name"
                  value={developer.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Logo */}
              <div>
                <label className="font-medium mb-2 block text-gray-700">Logo</label>
                <input type="file" accept="image/*" onChange={handleLogoChange} className="block text-gray-600" />
                {developer.logoPreview && (
                  <img
                    src={developer.logoPreview}
                    alt="Logo Preview"
                    className="mt-3 w-28 h-28 object-cover rounded-lg border"
                  />
                )}
              </div>

              {/* Banner Image */}
              <div>
                <label className="font-medium mb-2 block text-gray-700">Banner Image</label>
                <input type="file" accept="image/*" onChange={handleBannerChange} className="block text-gray-600" />
                {developer.bannerPreview && (
                  <img
                    src={developer.bannerPreview}
                    alt="Banner Preview"
                    className="mt-3 w-full h-40 object-cover rounded-lg border"
                  />
                )}
              </div>

              {/* Year */}
              <div>
                <label className="font-medium mb-2 block text-gray-700">Year Established</label>
                <input
                  type="text"
                  name="yearEstablished"
                  placeholder="e.g., 2005"
                  value={developer.yearEstablished}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Total Projects */}
              <div>
                <label className="font-medium mb-2 block text-gray-700">Total Projects</label>
                <input
                  type="number"
                  name="totalProjects"
                  placeholder="e.g., 50"
                  value={developer.totalProjects}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Live Projects */}
              <div>
                <label className="font-medium mb-2 block text-gray-700">Live Projects</label>
                <input
                  type="number"
                  name="liveProjects"
                  placeholder="e.g., 10"
                  value={developer.liveProjects}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Rating */}
<div>
  <label className="font-medium mb-2 block text-gray-700">Rating *</label>
  <input
    type="number"
    name="rating"
    value={developer.rating}
    step="0.1"
    min="0"
    max="5"
    onChange={(e) => setDeveloper({ ...developer, rating: parseFloat(e.target.value) })}
    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
  />
</div>


              {/* Categories */}
              <div>
                <label className="font-medium mb-2 block text-gray-700">Project Categories</label>
                <select
                  multiple
                  value={developer.categories}
                  onChange={handleCategoriesChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                >
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Portfolio */}
              <div>
                <label className="font-medium mb-2 block text-gray-700">Portfolio Link</label>
                <input
                  type="url"
                  name="portfolioLink"
                  placeholder="https://example.com/portfolio"
                  value={developer.portfolioLink}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-medium mb-2 block text-gray-700">Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  placeholder="developer@example.com"
                  value={developer.contactEmail}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="font-medium mb-2 block text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  placeholder="e.g., +91 9876543210"
                  value={developer.contactPhone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-gray-100 flex justify-center">
              <button
                onClick={submitDeveloper}
                className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition w-full md:w-auto"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : isEdit ? "Update Developer" : "Submit Developer"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddDeveloperForm;
