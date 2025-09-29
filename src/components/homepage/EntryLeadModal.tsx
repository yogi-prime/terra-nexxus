import React, { useEffect, useMemo, useState } from "react";
import {
  Home,
  Building2,
  Landmark,
  HandCoins,
  Users,
  Phone,
  User,
  Mail,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import API from "@/api/api";

/* ----------------- Terranexxus services ----------------- */
const SERVICE_OPTIONS = [
  { value: "buy",       label: "Buy Property",        Icon: Home },
  { value: "rent",      label: "Rent Property",       Icon: Building2 },
  { value: "lease",     label: "Lease Property",      Icon: Landmark },
  { value: "mortgage",  label: "Mortgage Solutions",  Icon: HandCoins },
  { value: "commercial",label: "Commercial Spaces",   Icon: Landmark },
  { value: "coliving",  label: "Co-living / PG",      Icon: Users },
] as const;

type ServiceKey = (typeof SERVICE_OPTIONS)[number]["value"];

type LeadForm = {
  name: string;
  phone: string; // 10-digit only (no +91)
  email: string;
  service: ServiceKey | "";
};

const initial: LeadForm = { name: "", phone: "", email: "", service: "" };

/* --------------- validators --------------- */
// Exactly 10 digits, starts 6-9
const isValidPhone = (v: string) => /^[6-9]\d{9}$/.test(v.trim());

/* --------------- Component --------------- */
export default function EntryLeadModal() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<LeadForm>(initial);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const key = "entryLeadModalShown";
    if (!sessionStorage.getItem(key)) {
      setOpen(true);
      sessionStorage.setItem(key, "1");
    }
  }, []);

  const ServiceIcon = useMemo(() => {
    const found = SERVICE_OPTIONS.find((s) => s.value === form.service);
    return found?.Icon ?? Home;
  }, [form.service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const phoneDigits = form.phone.replace(/\D/g, ""); // enforce digits-only

    if (name.length < 2) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!isValidPhone(phoneDigits)) {
      toast({
        title: "Invalid mobile number",
        description: "Enter a valid 10-digit Indian mobile.",
        variant: "destructive",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Use a valid email like name@example.com",
        variant: "destructive",
      });
      return;
    }
    if (!form.service) {
      toast({ title: "Select a service", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        phone: phoneDigits, // send 10-digit number; backend accepts with/without +91
        email,
        service: form.service as ServiceKey,
      };

      const res = await API.post("/modal-info", payload);

      toast({
        title: "Thanks! We’re on it.",
        description: "A Terranexxus expert will call you after sometime.",
      });
      setOpen(false);
      setForm(initial);
      console.debug("ModalInfo saved:", res.data);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong while saving. Please try again.";
      const errors = err?.response?.data?.errors;
      let detail = "";
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        if (firstKey && Array.isArray(errors[firstKey]) && errors[firstKey][0]) {
          detail = errors[firstKey][0];
        }
      }
      toast({
        title: "Could not submit",
        description: detail || msg,
        variant: "destructive",
      });
      console.error("ModalInfo save failed:", err?.response || err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          p-0 overflow-hidden max-w-3xl
          md:grid md:grid-cols-[1.1fr,1fr]
          rounded-2xl border-2 border-emerald-200/40
          shadow-[0_30px_80px_rgba(16,185,129,0.25)]
        "
        aria-describedby={undefined}
      >
        {/* Left: Brand Visual */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-600" />
          <div
            className="absolute inset-0 bg-[url('/modal/modal1.webp')] bg-cover bg-center opacity-70"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/45 to-transparent" />
          <div className="relative h-full w-full p-8 flex flex-col justify-end text-left text-white">
            <div>
              <p className="text-xs tracking-wider uppercase opacity-90">
                Terranexxus • Marketplace
              </p>
              <h3 className="text-2xl font-bold leading-tight mt-1">
                Buy, Rent, Lease or Mortgage  — all in one platform.
              </h3>
              <ul className="mt-4 space-y-1 text-sm text-white/90">
                <li>• 50,000+ verified listings</li>
                <li>• 500+ trusted developers</li>
                <li>• Expert assistance in under 2 minutes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-6 md:p-7 bg-white">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl">Get a quick callback</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Share a few details and our concierge will reach out.
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="lead-name">Full Name</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="lead-name"
                  placeholder="Your name"
                  className="pl-10"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  autoFocus
                />
              </div>
            </div>

            {/* Phone (static +91, 10-digit only) */}
            <div>
              <Label htmlFor="lead-phone">Mobile Number</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                {/* static +91 badge */}
                <span
                  className={cn(
                    "absolute left-9 top-1/2 -translate-y-1/2",
                    "text-xs font-medium text-slate-600 px-2 py-1",
                    "rounded-md ring-1 ring-slate-200 bg-slate-50"
                  )}
                >
                  +91
                </span>

                <Input
                  id="lead-phone"
                  inputMode="numeric"
                  placeholder="98XXXXXXXX" // no +91 in placeholder
                  className="pl-24"       // make room for +91 badge
                  value={form.phone}
                  onChange={(e) => {
                    // keep only digits, cap at 10
                    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setForm((f) => ({ ...f, phone: digits }));
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="lead-email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="lead-email"
                  type="email"
                  placeholder="you@email.com"
                  className="pl-10"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Service */}
            <div>
              <Label>Service Needed</Label>
              <div className="relative mt-1">
                <div
                  className={cn(
                    "absolute left-1.5 top-1/2 -translate-y-1/2",
                    "inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 ring-1 ring-emerald-200"
                  )}
                >
                  <ServiceIcon className="w-4 h-4 text-emerald-700" />
                </div>

                <Select
                  value={form.service}
                  onValueChange={(value: ServiceKey) =>
                    setForm((f) => ({ ...f, service: value }))
                  }
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_OPTIONS.map(({ value, label }) => (
                      <SelectItem key={value} value={value} className="gap-2">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-3">
              <Button
                type="submit"
                className="min-w-[140px] bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-700 hover:to-lime-600 text-white"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  "Get Callback"
                )}
              </Button>

              <p className="text-xs text-muted-foreground">
                By continuing you agree to our Terms & Privacy.
              </p>
            </div>
          </form>

          {/* corner close (mobile) */}
          <DialogClose asChild>
            <button
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
              aria-label="Close"
            />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
