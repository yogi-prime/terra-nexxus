import React, { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Phone,
  User,
  Mail,
  Home,
  Building2,
  Landmark,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import API from "@/api/api"; // ✅ NEW: use your axios instance

type Msg = { id: string; role: "bot" | "user"; text: string };
type Step = 0 | 1 | 2 | 3 | 4;

const SERVICES = [
  { value: "Buy Property", icon: Home },
  { value: "Rent Property", icon: Building2 },
  { value: "Lease Property", icon: Landmark },
  { value: "Mortgage Solutions", icon: ShieldCheck },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 20) return "Good evening";
  return "Hello";
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const randThink = () => delay(500 + Math.random() * 600);
const uid = () => Math.random().toString(36).slice(2);

/** Normalize phone to 10 digits for backend */
function toTenDigits(p: string) {
  const d = p.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) return d.slice(-10);
  return d.slice(-10);
}

export default function ChatbotLeadForm() {
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>(0); // 1 name, 2 phone, 3 email, 4 service
  const [typing, setTyping] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false); // ✅ NEW

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" });
  }, [messages, typing]);

  // boot conversation on open
  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      setMessages([]);
      setCompleted(false);
      setTyping(true);
      await randThink();
      pushBot(`${greeting()}! 👋 Welcome to **Terranexxus** — India’s premium real-estate marketplace.`);
      await randThink();
      pushBot("I’ll take a few quick details to connect you with the right expert.");
      await randThink();
      pushBot("First up, what’s your **name**?");
      setStep(1);
      setTyping(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const pushBot = (text: string) =>
    setMessages((m) => [...m, { id: uid(), role: "bot", text }]);
  const pushUser = (text: string) =>
    setMessages((m) => [...m, { id: uid(), role: "user", text }]);

  // validations + step handlers
  const handleName = async () => {
    const v = name.trim();
    if (v.length < 2) {
      toast({
        title: "Name looks too short",
        description: "Please enter your full first name.",
        variant: "destructive",
      });
      return;
    }
    pushUser(v);
    setTyping(true);
    await randThink();
    pushBot(`Nice to meet you, **${v}**.`);
    await randThink();
    pushBot("Could you share your **phone number**?");
    setStep(2);
    setTyping(false);
  };

  const handlePhone = async () => {
    const v = phone.replace(/\s+/g, "");
    const isIndian = /^(\+?91)?[6-9]\d{9}$/.test(v);
    if (!isIndian) {
      toast({
        title: "Invalid phone number",
        description:
          "Use a valid Indian mobile (e.g., 98XXXXXXXX or +91 98XXXXXXXX).",
        variant: "destructive",
      });
      return;
    }
    pushUser(v);
    setTyping(true);
    await randThink();
    pushBot("Got it ✅");
    await randThink();
    pushBot("What’s your **email address**?");
    setStep(3);
    setTyping(false);
  };

  const handleEmail = async () => {
    const v = email.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (!ok) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email like name@example.com.",
        variant: "destructive",
      });
      return;
    }
    pushUser(v);
    setTyping(true);
    await randThink();
    pushBot("Thanks! Finally, which **service** do you need?");
    setStep(4);
    setTyping(false);
  };

  const handleService = async () => {
    if (!service) {
      toast({
        title: "Pick a service",
        description: "Choose the service you’re interested in.",
        variant: "destructive",
      });
      return;
    }
    pushUser(service);
    setTyping(true);
    await randThink();
    pushBot(
      `Awesome, **${name}**! We’ll call **${mask(phone)}** and email **${email}** about **${service}** shortly.`
    );
    await randThink();
    pushBot(
      "✨ *Thank you for connecting with Terranexxus.* Our specialist will reach out within **2 minutes**."
    );
    setTyping(false);
    setCompleted(true); // lock UI

    // ✅ Save to backend
    try {
      setSubmitting(true);
      const payload = {
        name: name.trim(),
        phone: toTenDigits(phone),         // send 10-digit normalized
        email: email.trim(),
        service,                           // e.g., "Buy Property"
      };
      const res = await API.post("/chatbot-leads", payload);
      console.debug("Chatbot lead saved:", res.data);
      toast({ title: "Saved", description: "Your details are recorded." });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Could not save your details. Please try again.";
      const errors = err?.response?.data?.errors;
      let detail = "";
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        if (firstKey && Array.isArray(errors[firstKey]) && errors[firstKey][0]) {
          detail = errors[firstKey][0];
        }
      }
      toast({ title: "Save failed", description: detail || msg, variant: "destructive" });
      console.error("Chatbot lead save failed:", err?.response || err);
    } finally {
      setSubmitting(false);
    }
  };

  const onEnter =
    (fn: () => void) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") fn();
    };

  /* ---------- FAB (minimized) ---------- */
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <style>{`
          .fab-wrap { position: relative; }
          .halo {
            position: absolute; inset: 0;
            border-radius: 9999px;
            background: radial-gradient(closest-side, rgba(16,185,129,.35), transparent 70%);
            opacity: .35; filter: blur(8px);
            transform: scale(1);
            animation: haloPulse 2.6s ease-in-out infinite;
            pointer-events: none;
          }
          @keyframes haloPulse {
            0%,100% { opacity:.28; transform: scale(1); }
            50% { opacity:.6; transform: scale(1.06); }
          }
        `}</style>

        <div className="fab-wrap">
          <div className="halo" aria-hidden />
          <Button
            onClick={() => setIsOpen(true)}
            className="relative w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all duration-300 bg-gradient-to-br from-emerald-600 to-lime-500"
            size="icon"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>
    );
  }

  /* ---------- Open chat ---------- */
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* typing dots CSS */}
      <style>{`
        @keyframes chatDots {0%{opacity:.2} 20%{opacity:1} 100%{opacity:.2}}
        .typing-dot{animation:chatDots 1.2s infinite}
        .typing-dot:nth-child(2){animation-delay:.2s}
        .typing-dot:nth-child(3){animation-delay:.4s}
      `}</style>

      <Card className="w-[320px] md:w-[360px] rounded-2xl overflow-hidden border-2 border-emerald-200/40 shadow-[0_20px_60px_rgba(16,185,129,0.25)] bg-white/95 backdrop-blur">
        <CardHeader className="pb-3 bg-gradient-to-r from-emerald-50 to-lime-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
              </span>
              Concierge • Terranexxus
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              disabled={submitting} // avoid closing mid-save
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            We’ll connect you to an expert. Average response: <b>2 min</b>.
          </p>
        </CardHeader>

        <CardContent className="p-0">
          {/* Messages */}
          <div
            ref={scrollRef}
            className="max-h-[340px] overflow-auto p-3 space-y-2 bg-white"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-2xl px-3 py-2 text-sm leading-relaxed shadow
                    ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-emerald-600 to-lime-500 text-white rounded-br-md"
                        : "bg-emerald-50 text-emerald-900"
                    }
                  `}
                  dangerouslySetInnerHTML={{
                    __html: m.text.replace(/\n/g, "<br/>"),
                  }}
                />
              </div>
            ))}

            {typing && (
              <div className="flex items-center gap-1 pl-1 text-emerald-600">
                <span className="typing-dot">•</span>
                <span className="typing-dot">•</span>
                <span className="typing-dot">•</span>
              </div>
            )}
          </div>

          {/* INPUT AREA — hidden after completion */}
          {!completed && (
            <div className="border-t p-3 space-y-3 bg-white">
              {step === 1 && (
                <div>
                  <Label htmlFor="name" className="text-xs font-medium">
                    Your Name
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="name"
                      autoFocus
                      placeholder="e.g., Saurav"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={onEnter(handleName)}
                      className="flex-1"
                    />
                    <Button onClick={handleName} className="bg-emerald-600 hover:bg-emerald-700">
                      Send
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <Label htmlFor="phone" className="text-xs font-medium">
                    Phone
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="phone"
                      autoFocus
                      inputMode="tel"
                      placeholder="+91 98XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onKeyDown={onEnter(handlePhone)}
                      className="flex-1"
                    />
                    <Button onClick={handlePhone} className="bg-emerald-600 hover:bg-emerald-700">
                      Send
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <Label htmlFor="email" className="text-xs font-medium">
                    Email
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="email"
                      autoFocus
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={onEnter(handleEmail)}
                      className="flex-1"
                    />
                    <Button onClick={handleEmail} className="bg-emerald-600 hover:bg-emerald-700">
                      Send
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <Label className="text-xs font-medium">Service Needed</Label>
                <div className="flex gap-2 mt-1">
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger className="flex-1">
                        <Home className="w-4 h-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICES.map(({ value, icon: Icon }) => (
                          <SelectItem key={value} value={value}>
                            <div className="inline-flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              {value}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={handleService}
                      className="bg-emerald-600 hover:bg-emerald-700"
                      disabled={submitting} // ✅ avoid double submit
                    >
                      {submitting ? "Saving..." : "Finish"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FOOTER STATUS after completion */}
          {completed && (
            <div className="border-t p-3 text-xs text-muted-foreground flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Request received — our expert will call shortly.</span>
              </div>
              <Button size="sm" variant="outline" onClick={() => setIsOpen(false)} disabled={submitting}>
                Close
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* helpers */
function mask(p: string) {
  const v = p.replace(/\D/g, "");
  if (v.length < 4) return v;
  return v.slice(0, 2) + "******" + v.slice(-2);
}
