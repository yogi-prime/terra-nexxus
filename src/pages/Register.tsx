import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import terraLogo from "../assets/logo-white.png";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Upload, Camera, CheckCircle2, User, FileText, Shield, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const [formData, setFormData] = useState({
    // Step 1 - Basic Details
    fullName: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    agreedToTerms: false,
    
    // Step 2 - KYC
    aadhaar: "",
    pan: "",
    aadhaarFront: null as File | null,
    aadhaarBack: null as File | null,
    panImage: null as File | null,
    
    // Step 3 - Profile Photo
    profilePhoto: null as File | null,
    
    // Step 4 - OTP
    otp: ""
  });

  const steps = [
    { id: 1, title: "Basic Details", icon: User, required: true },
    { id: 2, title: "KYC Documents", icon: FileText, required: false },
    { id: 3, title: "Profile Photo", icon: Camera, required: false },
    { id: 4, title: "Verify OTP", icon: Shield, required: true },
    { id: 5, title: "Complete", icon: CheckCircle, required: true }
  ];

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const validateStep1 = () => {
    const { fullName, email, phone, address, role, agreedToTerms } = formData;
    if (!fullName || !email || !phone || !address || !role || !agreedToTerms) {
      toast({ variant: "destructive", description: "Please fill all required fields and agree to terms" });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({ variant: "destructive", description: "Please enter a valid email address" });
      return false;
    }
    if (phone.length !== 10) {
      toast({ variant: "destructive", description: "Please enter a valid 10-digit phone number" });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    
    if (currentStep === 4) {
      // Verify OTP
      if (formData.otp.length !== 6) {
        toast({ variant: "destructive", description: "Please enter complete OTP" });
        return;
      }
      if (formData.otp !== "123456") {
        toast({ variant: "destructive", description: "Invalid OTP. Use 123456 for demo" });
        return;
      }
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      
      // Send OTP when reaching step 4
      if (currentStep === 3) {
        sendOTP();
      }
      
      // Complete registration on step 5
      if (currentStep === 4) {
        completeRegistration();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const sendOTP = () => {
    setResendTimer(30);
    toast({ description: `OTP sent to +91-${formData.phone}` });
    
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

  const completeRegistration = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({ description: "Registration successful! Redirecting to dashboard..." });
      navigate("/investor/1");
    }, 2000);
  };

  const handleFileUpload = (field: string, file: File) => {
    setFormData({ ...formData, [field]: file });
    toast({ description: `${file.name} uploaded successfully` });
  };

return (
  <div className="relative min-h-screen lg:h-screen overflow-x-hidden  lg:overflow-hidden">
    {/* background layers */}
    {/* background image with 70% opacity */}
  <div
    className="absolute inset-0 bg-cover bg-center z-10 opacity-10"
    style={{ backgroundImage: "url('/bg-hero.jpeg')" }}
  />
    <div className="absolute inset-0 bg-premium" />
    <div className="absolute inset-0 bg-grid opacity-40" />
    <div className="absolute inset-0 bg-noise" />
    <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30 bg-emerald-400" />
    <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full blur-3xl opacity-25 bg-sky-500" />

    {/* split grid */}
    <div className="relative z-10 grid h-full grid-cols-1 lg:grid-cols-12">
      {/* LEFT: logo + stepper */}
{/* LEFT: logo + stepper (responsive + consistent spacing) */}
<aside className="hidden lg:flex lg:col-span-4 flex-col px-10">
  {/* Logo */}
  <div className="pt-8 pb-6">
    <div className="inline-flex items-center gap-2">
      {/* replace with your logo img if you have it */}
      <Link to="/">
    <img
      src={terraLogo}
      alt="Terra Nexxus Logo"
      className="w-auto h-10 object-contain cursor-pointer"
    />
  </Link>
    </div>
  </div>

  {/* Intro + Stepper */}
  <div className="flex-1 flex flex-col justify-center">
    <div className="mb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15 text-white/80 text-xs">
        Terra Nexxus • Onboarding
      </div>
      <h1 className="mt-3 text-2xl font-bold text-white">Create your account</h1>
      <p className="text-white/70">Invest or list properties — finish in a few steps</p>
    </div>

    {/* Stepper */}
    <div className="relative">
      {/* vertical track (faint) */}
      <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-white/12 rounded-full" />

      {/* progress fill */}
      <div
        className="absolute left-6 top-0 w-[2px] rounded-full bg-gradient-to-b from-emerald-400 via-amber-400 to-sky-400 transition-all duration-500"
        style={{ height: `calc(${progress}% + 24px)` }}
      />

      <ul className="space-y-7">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;

          // colors: done=emerald, active=YELLOW (brand secondary), idle=faint white
          const dotClasses = isDone
            ? "bg-emerald-500 text-white shadow-[0_0_0_6px_rgba(16,185,129,.15)]"
            : isActive
            ? // if you want a custom hex for secondary, replace bg-amber-400 with [background-color:var(--brand-secondary)]
              "bg-amber-400 text-slate-900 ring-4 ring-amber-300/30"
            : "bg-white/10 text-white/70 ring-1 ring-white/15";

          return (
            <li key={step.id} className="relative">
              {/* connector piece between items for perfect alignment */}
              {idx < steps.length - 1 && (
                <div className="absolute left-6 top-12 bottom-[-18px] w-[2px] bg-white/12" />
              )}

              <div className="flex items-center min-h-[48px]">
                {/* dot */}
                <button
                  onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                  disabled={step.id >= currentStep}
                  className={`flex-none h-12 w-12 rounded-full grid place-items-center transition-all ${dotClasses}`}
                >
                  {isDone ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                </button>

                {/* labels */}
                <div className="ml-4 flex-1 min-w-0">
                  <p className={`text-sm font-semibold leading-tight ${isActive ? "text-white" : "text-white/85"}`}>
                    {step.title}
                  </p>
                  {!step.required && <p className="text-xs text-white/60">Optional</p>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>

    {/* slim progress bar */}
    <div className="mt-8 h-1 w-[92%] max-w-[420px] rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-1 bg-gradient-to-r from-emerald-400 via-amber-400 to-sky-400 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
</aside>


      {/* RIGHT: form panel */}
      <main className="col-span-12 lg:col-span-8 flex items-center justify-center px-4 py-8 sm:py-10 lg:py-0 overflow-y-visible lg:overflow-y-auto">
        <div className="w-full max-w-[640px] sm:max-w-[720px] lg:max-w-2xl rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)] ring-1 ring-emerald-400/60 backdrop-blur-xl bg-[rgba(22,28,45,0.75)]">
          {/* mobile header */}
          <div className="lg:hidden text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">Terra Nexxus</h1>
            <p className="text-white/80">Join Premium Fractional Real Estate</p>
          </div>

          {/* STEP 1 (two-column to fit 100vh) */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-white mb-1">Basic Details</h2>
                <p className="text-sm text-white/70">Let's start with your basic information</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/85" htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-2 bg-white/[.06] border border-white/20 text-white placeholder:text-white/55 focus:bg-white/[.09] focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
                  />
                </div>

                <div>
                  <Label className="text-white/85" htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 bg-white/[.06] border border-white/20 text-white placeholder:text-white/55 focus:bg-white/[.09] focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
                  />
                </div>

                <div>
                  <Label className="text-white/85" htmlFor="phone">Phone Number *</Label>
                  <div className="flex mt-2">
                    <div className="bg-white/[.08] border border-r-0 border-white/20 rounded-l-md px-3 py-2 text-sm text-white/85">+91</div>
                    <Input
                      id="phone"
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

                <div>
                  <Label className="text-white/85" htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="mt-2 bg-white/[.06] border border-white/20 text-white placeholder:text-white/55 focus:bg-white/[.09] focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
                    rows={3}
                  />
                </div>

                {/* role tiles */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-white/15 bg-white/[.04] hover:bg-white/[.07]">
                    <RadioGroup value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="investor" id="investor" />
                        <Label htmlFor="investor" className="flex-1 cursor-pointer text-white">
                          <div className="font-medium">Investor</div>
                          <div className="text-xs text-white/70">I want to invest in properties</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-white/15 bg-white/[.04] hover:bg-white/[.07]">
                    <RadioGroup value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v })}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dealer" id="dealer" />
                        <Label htmlFor="dealer" className="flex-1 cursor-pointer text-white">
                          <div className="font-medium">Property Dealer</div>
                          <div className="text-xs text-white/70">I want to list my properties</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="md:col-span-2 flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreedToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: !!checked })}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-white/85 leading-relaxed cursor-pointer">
                    I agree to the{" "}
                    <button className="text-emerald-300 hover:underline">Terms of Service</button>{" "}
                    and{" "}
                    <button className="text-emerald-300 hover:underline">Privacy Policy</button>
                  </Label>
                </div>
              </div>

              <p className="text-xs text-white/60 text-center">
                We'll never share your contact info without consent.
              </p>
            </div>
          )}

          {/* STEP 2 (dark inputs + dashed white uploaders) */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-white mb-1">KYC Documents</h2>
                <p className="text-sm text-white/65">Optional now, required before investing</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-white/85" htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input
                    id="aadhaar"
                    placeholder="XXXX-XXXX-XXXX"
                    value={formData.aadhaar}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 12);
                      const formatted = value.replace(/(\d{4})(?=\d)/g, "$1-");
                      setFormData({ ...formData, aadhaar: formatted });
                    }}
                    className="mt-2 bg-white/[.06] border border-white/25 text-white placeholder:text-white/55 focus:bg-white/[.09] focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-white/85">Aadhaar Front</Label>
                    <div className="mt-2 border-2 border-dashed rounded-lg p-5 text-center bg-white/[.03] border-white/35 hover:border-emerald-400/60 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload("aadhaarFront", e.target.files[0])}
                        className="hidden"
                        id="aadhaar-front"
                      />
                      <label htmlFor="aadhaar-front" className="cursor-pointer">
                        <Upload className="h-7 w-7 mx-auto mb-2 text-white/70" />
                        <p className="text-xs text-white/70">
                          {formData.aadhaarFront ? formData.aadhaarFront.name : "Upload Front"}
                        </p>
                      </label>
                    </div>
                  </div>
                  <div>
                    <Label className="text-white/85">Aadhaar Back</Label>
                    <div className="mt-2 border-2 border-dashed rounded-lg p-5 text-center bg-white/[.03] border-white/35 hover:border-emerald-400/60 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload("aadhaarBack", e.target.files[0])}
                        className="hidden"
                        id="aadhaar-back"
                      />
                      <label htmlFor="aadhaar-back" className="cursor-pointer">
                        <Upload className="h-7 w-7 mx-auto mb-2 text-white/70" />
                        <p className="text-xs text-white/70">
                          {formData.aadhaarBack ? formData.aadhaarBack.name : "Upload Back"}
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-white/85" htmlFor="pan">PAN Number</Label>
                  <Input
                    id="pan"
                    placeholder="AAAAA9999A"
                    value={formData.pan}
                    onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase().slice(0, 10) })}
                    className="mt-2 bg-white/[.06] border border-white/25 text-white placeholder:text-white/55 focus:bg-white/[.09] focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/30"
                  />
                </div>

                <div>
                  <Label className="text-white/85">PAN Card Image</Label>
                  <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center bg-white/[.03] border-white/35 hover:border-emerald-400/60 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload("panImage", e.target.files[0])}
                      className="hidden"
                      id="pan-image"
                    />
                    <label htmlFor="pan-image" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-3 text-white/70" />
                      <p className="text-sm text-white/70">
                        {formData.panImage ? formData.panImage.name : "Upload PAN Card"}
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-white/60">
                  Your documents are encrypted at rest and processed securely.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-white mb-1">Profile Photo</h2>
                <p className="text-sm text-white/65">A clear profile helps with faster verifications</p>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-white/[.08] border border-white/15 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                    {formData.profilePhoto ? (
                      <img
                        src={URL.createObjectURL(formData.profilePhoto)}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-16 w-16 text-white/70" />
                    )}
                  </div>

                  <div className="border-2 border-dashed border-white/35 rounded-lg p-6 bg-white/[.03] hover:border-emerald-400/60 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload("profilePhoto", e.target.files[0])}
                      className="hidden"
                      id="profile-photo"
                    />
                    <label htmlFor="profile-photo" className="cursor-pointer">
                      <Camera className="h-8 w-8 mx-auto mb-3 text-white/70" />
                      <p className="text-sm text-white/80">
                        {formData.profilePhoto ? "Change Photo" : "Upload or Take Photo"}
                      </p>
                      <p className="text-xs text-white/60 mt-1">Square photos work best</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-white mb-1">Verify OTP</h2>
                <p className="text-sm text-white/65">
                  Code sent to +91-{formData.phone.slice(0, 2)}XX-XX{formData.phone.slice(-2)}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-white/85">Enter 6-digit OTP</Label>
                  <div className="flex justify-center mt-4">
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

                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-white/70">
                      Resend OTP in 00:{resendTimer.toString().padStart(2, "0")}
                    </p>
                  ) : (
                    <button onClick={sendOTP} className="text-sm text-emerald-300 hover:underline">
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-white/60 text-center">Code expires in 10 minutes</p>
            </div>
          )}

          {/* STEP 5 */}
          {currentStep === 5 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 mx-auto bg-emerald-400/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-emerald-400" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-2">Welcome to Terra Nexxus!</h2>
                <p className="text-sm text-white/75">
                  {formData.role === "investor"
                    ? "Your portfolio will unlock after KYC completion"
                    : "You can now submit your first property listing"}
                </p>
              </div>

              <div className="rounded-lg p-4 bg-white/[.06] border border-white/15">
                <p className="text-sm text-white/85">Redirecting to your dashboard...</p>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-2 rounded-full animate-pulse" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          )}

          {/* NAV */}
          {/* NAV */}
{currentStep < 5 && (
  <div className="mt-8 pt-6 border-t border-white/10">
    {/* mobile: stack, desktop: row */}
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      {/* Left side: Back (mobile full width) */}
      {currentStep > 1 ? (
        <Button
          variant="outline"
          onClick={handleBack}
          className="
            w-full sm:w-auto
            h-11 sm:h-10
            px-4 sm:px-4
            text-sm
            border-white/20 text-black hover:bg-white/[.08] hover:text-white
            min-w-0 shrink
          "
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      ) : (
        <span className="hidden sm:block" />
      )}

      {/* Right side: Skip + Continue (mobile: stacked) */}
      <div className="flex flex-col sm:flex-row gap-3 min-w-0 shrink">
        {(currentStep === 2 || currentStep === 3) && (
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="
              w-full sm:w-auto
              h-11 sm:h-10
              px-4 text-sm
              text-white/80 hover:bg-amber-400 
              min-w-0 shrink
            "
          >
            Skip for now
          </Button>
        )}

        <Button
          onClick={handleNext}
          variant="hero"
          disabled={isLoading}
          className="
            w-full sm:w-auto
            h-11 sm:h-10
            px-4 text-sm
            bg-emerald-500 hover:bg-emerald-400 text-white
            shadow-[0_10px_25px_-10px_rgba(16,185,129,.7)]
            whitespace-nowrap min-w-0 shrink
          "
        >
          {currentStep === 4 ? "Verify & Complete" : "Continue"}
          {currentStep < 4 && <ArrowRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>
    </div>
  </div>
)}


          {/* footer link */}
          <div className="text-center mt-6">
            <p className="text-xs text-white/60">
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="text-emerald-300 hover:underline">
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
);


};

export default Register;