import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Home,
  Users,
  Building2,
  BarChart3,
  Pencil,
  Trash2,
} from "lucide-react";
import API from "@/api/api";

type Section = "properties" | "developers" | "investors" | "reports" | null;

const extractArray = (apiResponse: any) => {
  if (!apiResponse) return [];
  if (Array.isArray(apiResponse)) return apiResponse;
  if (apiResponse.data) {
    if (Array.isArray(apiResponse.data)) return apiResponse.data;
    if (Array.isArray(apiResponse.data.data)) return apiResponse.data.data;
  }
  return [];
};

// Pagination component (shared)
const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}) => {
  const pages: (number | string)[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage > 2) pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    if (currentPage < totalPages - 1) pages.push(totalPages);
  }

  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        variant="outline"
      >
        Prev
      </Button>
      {pages.map((p, i) =>
        typeof p === "number" ? (
          <Button
            key={i}
            variant={p === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        ) : (
          <span key={i} className="px-2 text-gray-500">
            {p}
          </span>
        )
      )}
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        variant="outline"
      >
        Next
      </Button>
      <span className="ml-4 text-sm text-gray-600">
        Total: {totalItems.toLocaleString()}
      </span>
    </div>
  );
};

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const BASE_URL = API.defaults.baseURL.replace("/api", "");
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [propPage, setPropPage] = useState(1);
  const [devPage, setDevPage] = useState(1);

  /** Fetch user */
  const { data: user, isLoading: userLoading, isError: userError } = useQuery({
    queryKey: ["me"],
    queryFn: async () => (await API.get("/me")).data.user,
  });

  /** Properties */
  const { data: propertiesRaw, isLoading: propLoading } = useQuery({
    queryKey: ["properties", propPage],
    queryFn: async () =>
      (await API.get(`/admin-properties?per_page=10&page=${propPage}`)).data,
    keepPreviousData: true,
  });

  const properties = extractArray(propertiesRaw?.data?.data);
  const totalProperties = propertiesRaw?.data?.total ?? 0;
  const lastPropPage = propertiesRaw?.data?.last_page ?? 1;

  /** Developers */
  const { data: developersRaw, isLoading: devLoading } = useQuery({
    queryKey: ["developers", devPage],
    queryFn: async () =>
      (await API.get(`/developers?per_page=10&page=${devPage}`)).data,
    keepPreviousData: true,
  });

  const developers = extractArray(developersRaw?.data);
  const totalDevelopers = developersRaw?.total ?? developers.length;
  const lastDevPage = developersRaw?.last_page ?? 1;

  /** Investors */
  const { data: investorsRaw, isLoading: invLoading } = useQuery({
    queryKey: ["investors"],
    queryFn: async () => {
      const res = await API.get("/investors");
      return extractArray(res.data.data || res.data);
    },
  });
  const investors = investorsRaw || [];

  /** Reports */
  const { data: reportsRaw, isLoading: reportLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await API.get("/reports");
      return extractArray(res.data.data || res.data);
    },
  });
  const reports = reportsRaw || [];

  /** Mutations */
  const deleteDeveloper = useMutation({
    mutationFn: async (id: number) => API.delete(`/developers/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["developers", devPage] }),
  });

  const deleteProperty = useMutation({
    mutationFn: async (id: number) => API.delete(`/admin-properties/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["properties", propPage] }),
  });

  if (userLoading) return <div className="p-6">Loading...</div>;
  if (userError || !user || user.role !== "admin")
    return <div className="p-6 text-red-500">Unauthorized</div>;

  const toggleSection = (section: Section) =>
    setActiveSection(activeSection === section ? null : section);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Welcome back, {user.name} 👋
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/admin-property")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4" /> Add Property
          </Button>
          <Button
            onClick={() => navigate("/admin/add-developer")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4" /> Add Developer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <Home className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <p className="text-xl font-bold">{totalProperties}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <Building2 className="w-8 h-8 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Developers</p>
              <p className="text-xl font-bold">{totalDevelopers}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <Users className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Investors</p>
              <p className="text-xl font-bold">{investors.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { name: "Manage Properties", icon: Home, section: "properties" },
            { name: "Manage Developers", icon: Building2, section: "developers" },
            { name: "View Investors", icon: Users, section: "investors" },
            { name: "Reports & Analytics", icon: BarChart3, section: "reports" },
          ].map(({ name, icon: Icon, section }) => (
            <Card
              key={name}
              className="cursor-pointer hover:shadow-md transition"
              onClick={() => toggleSection(section as Section)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Icon className="w-6 h-6 mb-2 text-blue-500" />
                <p className="font-medium">{name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Properties */}
        {activeSection === "properties" && (
          <div className="mt-4 overflow-x-auto border rounded-lg shadow-sm">
            {propLoading ? (
              <p className="p-4">Loading properties...</p>
            ) : properties.length ? (
              <>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Title",
                        "City",
                        "Address",
                        "Service",
                        "Type",
                        "Price",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map((prop: any) => (
                      <tr key={prop.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">{prop.title}</td>
                        <td className="px-6 py-4">{prop.city}</td>
                        <td className="px-6 py-4">{prop.address_line}</td>
                        <td className="px-6 py-4 capitalize">{prop.service}</td>
                        <td className="px-6 py-4 capitalize">
                          {prop.property_type}
                        </td>
                        <td className="px-6 py-4">
                          {prop.price_actual
                            ? `$${prop.price_actual.toLocaleString()}`
                            : "-"}
                        </td>
                        <td className="px-6 py-4 flex justify-center gap-2">
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() =>
                              navigate(`/admin/edit-property/${prop.id}`)
                            }
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
  size="sm"
  className="bg-red-500 hover:bg-red-600 text-white"
  onClick={() => {
    if (window.confirm(`Are you sure you want to delete "${prop.title}"?`)) {
      deleteProperty.mutate(prop.id);
    }
  }}
>
  <Trash2 className="w-4 h-4" />
</Button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  currentPage={propPage}
                  totalPages={lastPropPage}
                  totalItems={totalProperties}
                  onPageChange={setPropPage}
                />
              </>
            ) : (
              <p className="p-4 text-center text-gray-500">
                No properties found
              </p>
            )}
          </div>
        )}

        {/* Developers */}
{activeSection === "developers" && (
  <div className="mt-4 overflow-x-auto border rounded-lg shadow-sm">
    {devLoading ? (
      <p className="p-4">Loading developers...</p>
    ) : developers.length ? (
      <>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Logo",
                "Name",
                "Established",
                "Total Projects",
                "Live Projects",
                "Rating",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 text-left text-sm font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {developers.map((dev: any) => (
              <tr key={dev.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2">
  {dev.logo ? (
    <img
      src={`${BASE_URL}/storage/${dev.logo}`}
      className="w-10 h-10 rounded-full"
      alt={dev.name}
    />
  ) : (
    <div className="w-10 h-10 bg-gray-200 rounded-full" />
  )}
</td>
                <td className="px-4 py-2">{dev.name}</td>
                <td className="px-4 py-2">{dev.year_established}</td>
                <td className="px-4 py-2">{dev.total_projects}</td>
                <td className="px-4 py-2">{dev.live_projects}</td>
                <td className="px-4 py-2">{dev.rating}</td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  {/* Edit button navigates to AddDeveloperForm with id */}
                  <Button
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() =>
                      navigate(`/admin/edit-developer/${dev.id}`)
                    }
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  {/* Delete button */}
                  <Button
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete developer "${dev.name}"?`
                        )
                      ) {
                        deleteDeveloper.mutate(dev.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination
          currentPage={devPage}
          totalPages={lastDevPage}
          totalItems={totalDevelopers}
          onPageChange={setDevPage}
        />
      </>
    ) : (
      <p className="p-4 text-center text-gray-500">No developers found</p>
    )}
  </div>
)}

        {/* Investors */}
        {activeSection === "investors" && (
          <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
            {invLoading ? (
              <p className="p-4">Loading investors...</p>
            ) : investors.length ? (
              investors.map((inv: any) => (
                <Card key={inv.id} className="shadow-sm">
                  <CardContent>
                    <p className="font-medium">{inv.name}</p>
                    <p className="text-sm text-muted-foreground">{inv.email}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="p-4 text-center text-gray-500">
                No investors found
              </p>
            )}
          </div>
        )}

        {/* Reports */}
        {activeSection === "reports" && (
          <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
            {reportLoading ? (
              <p className="p-4">Loading reports...</p>
            ) : reports.length ? (
              reports.map((report: any) => (
                <Card key={report.id} className="shadow-sm">
                  <CardContent>
                    <p className="font-medium">{report.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.summary}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="p-4 text-center text-gray-500">
                No reports found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
