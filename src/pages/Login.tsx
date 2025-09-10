import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import terraLogo from "../assets/logo-white.png";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<"input" | "otp">("input");
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    otp: "",
    rememberDevice: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const handleSendOTP = async () => {
    if (loginMethod === "email" && !formData.email) {
      toast({ variant: "destructive", description: "Please enter your email address" });
      return;
    }
    if (loginMethod === "phone" && !formData.phone) {
      toast({ variant: "destructive", description: "Please enter your phone number" });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setResendTimer(30);
      toast({ description: `OTP sent to your ${loginMethod}` });
      
      // Start countdown
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (formData.otp.length !== 6) {
      toast({ variant: "destructive", description: "Please enter complete OTP" });
      return;
    }

    // Fake validation - accept 123456 or any 6 digits
    if (formData.otp === "123456" || formData.otp.length === 6) {
      setIsLoading(true);
      setTimeout(() => {
        toast({ description: "Login successful! Redirecting..." });
        navigate("/investor/1");
      }, 1000);
    } else {
      toast({ variant: "destructive", description: "Invalid OTP. Try 123456" });
    }
  };

  const handleResendOTP = () => {
    setResendTimer(30);
    toast({ description: `OTP resent to your ${loginMethod}` });
    
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

return (
  <div className="relative min-h-screen lg:h-screen overflow-x-hidden lg:overflow-hidden">
    {/* Background layers (behind content) */}
    <div
      className="absolute inset-0 bg-cover bg-center z-10 opacity-10"
      style={{ backgroundImage: "url('src/assets/hero-login.jpeg')" }}
    />
    <div className="absolute inset-0 bg-premium z-0" />
    <div className="absolute inset-0 bg-grid opacity-40 z-0" />
    <div className="absolute inset-0 bg-noise z-0" />
    <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30 bg-emerald-400" />
    <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full blur-3xl opacity-25 bg-sky-500" />

    {/* Split layout */}
    <div className="relative z-10 grid h-full grid-cols-1 lg:grid-cols-12">
      {/* LEFT: brand / value props (desktop only) */}
      <aside className="hidden lg:flex lg:col-span-5 flex-col justify-between px-10 py-10">
        {/* Logo */}
        <div className="inline-flex items-center gap-2">
          {/* swap with your logo img if needed */}
          {/* replace with your logo img if you have it */}
      <Link to="/">
    <img
      src={terraLogo}
      alt="Terra Nexxus Logo"
      className="w-auto h-10 object-contain cursor-pointer"
    />
  </Link>
        </div>

        {/* Messaging */}
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-white">Premium Fractional Real Estate</h1>
          <p className="mt-2 text-white/75">
            Invest from ₹10K. Own fractions across residential, commercial, land & more.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-emerald-400/20 text-emerald-300 grid place-items-center">✓</div>
              <p className="text-white/80">Bank-grade security & KYC</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-400/20 text-amber-300 grid place-items-center">★</div>
              <p className="text-white/80">Diversify across 6 property categories</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-sky-400/20 text-sky-300 grid place-items-center">↗</div>
              <p className="text-white/80">Transparent analytics & real-time insights</p>
            </div>
          </div>
          <div className="h-1 mt-10 w-full bg-gradient-to-r from-emerald-400 via-amber-400 to-sky-400" />
        </div>

        {/* Subtle progress strip / accent */}
        <div className="">
          
        </div>
      </aside>

      {/* RIGHT: auth card */}
      <main className="col-span-12 lg:col-span-7 flex items-center justify-center px-4 py-10 lg:py-0 overflow-y-visible lg:overflow-y-auto">
        <div className="w-full max-w-[640px] sm:max-w-[720px] lg:max-w-[520px] rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)] ring-1 ring-emerald-400/60 backdrop-blur-xl bg-[rgba(22,28,45,0.75)]">
          {/* Mobile header */}
          <div className="lg:hidden text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">Terra Nexxus</h2>
            <p className="text-white/80">Premium Fractional Real Estate</p>
          </div>

          {step === "input" ? (
            <>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-1">Welcome back</h3>
                <p className="text-sm text-white/70">Sign in to your Terra Nexxus account</p>
              </div>

              {/* Tabs: Email / Phone */}
              <Tabs
                value={loginMethod}
                onValueChange={(v) => setLoginMethod(v as "email" | "phone")}
                className="mb-6"
              >
                <TabsList className="grid w-full grid-cols-2 bg-white/10 ring-1 ring-white/15">
                  <TabsTrigger
                    value="email"
                    className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger
                    value="phone"
                    className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                  >
                    <Phone className="h-4 w-4" />
                    Phone
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4 mt-6">
                  <div>
                    <Label className="text-white/85" htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 bg-white/[.06] border border-white/20 text-white placeholder:text-white/55 focus:bg-white/[.09] focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="phone" className="space-y-4 mt-6">
                  <div>
                    <Label className="text-white/85" htmlFor="phone">Phone Number</Label>
                    <div className="flex mt-2">
                      <div className="bg-white/[.08] border border-r-0 border-white/20 rounded-l-md px-3 py-2 text-sm text-white/85">
                        +91
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                          })
                        }
                        className="rounded-l-none bg-white/[.06] border border-white/20 text-white placeholder:text-white/55 focus:bg-white/[.09] focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Remember device */}
              <div className="flex items-center gap-2 mb-6">
                <Checkbox
                  id="remember"
                  checked={formData.rememberDevice}
                  onCheckedChange={(c) => setFormData({ ...formData, rememberDevice: !!c })}
                />
                <Label htmlFor="remember" className="text-sm text-white/85">
                  Remember this device for 30 days
                </Label>
              </div>

              {/* CTA */}
              <Button
                onClick={handleSendOTP}
                className="w-full h-11 bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_10px_25px_-10px_rgba(16,185,129,.7)]"
                variant="hero"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>

              {/* Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-white/70">
                  Don&apos;t have an account?{" "}
                  <button onClick={() => navigate("/register")} className="text-emerald-300 hover:underline font-medium">
                    Register here
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <Button variant="ghost" size="icon" onClick={() => setStep("input")} className="text-white/80 hover:bg-white/[.08]">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h4 className="text-xl font-bold text-white">Verify OTP</h4>
                  <p className="text-sm text-white/70">
                    Code sent to{" "}
                    {loginMethod === "email"
                      ? `${formData.email.slice(0, 3)}***@${formData.email.split("@")[1] || "email.com"}`
                      : `+91-${formData.phone.slice(0, 2)}XX-XX${formData.phone.slice(-2)}`}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-white/85">Enter 6-digit OTP</Label>
                  <div className="flex justify-center mt-4 w-full overflow-x-auto">
                    <InputOTP
                      maxLength={6}
                      value={formData.otp}
                      onChange={(value) => setFormData({ ...formData, otp: value })}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-xs text-white/60 text-center mt-2">Use 123456 for demo purposes</p>
                </div>

                <Button
                  onClick={handleVerifyOTP}
                  className="w-full h-11 bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_10px_25px_-10px_rgba(16,185,129,.7)]"
                  variant="hero"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify & Login"}
                </Button>

                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-white/70">
                      Resend OTP in 00:{resendTimer.toString().padStart(2, "0")}
                    </p>
                  ) : (
                    <button onClick={handleResendOTP} className="text-sm text-emerald-300 hover:underline">
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Footer note */}
          <div className="text-center mt-6">
            <p className="text-xs text-white/60">
              Code expires in 10 minutes. Your data is encrypted and secure.
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
);

};

export default Login;