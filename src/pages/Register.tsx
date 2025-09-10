import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
    <div className="min-h-screen gradient-premium">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Terra Nexxus</h1>
          <p className="text-white/80">Join Premium Fractional Real Estate</p>
        </div>

        {/* Progress Stepper */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const isAccessible = step.id <= currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <button
                    onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                    disabled={!isAccessible || step.id >= currentStep}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-success text-success-foreground"
                        : isActive
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                    } ${isAccessible && step.id < currentStep ? "hover:scale-105 cursor-pointer" : ""}`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <StepIcon className="h-6 w-6" />
                    )}
                  </button>
                  <div className="mt-2 text-center">
                    <p className={`text-xs font-medium ${isActive ? "text-white" : "text-white/60"}`}>
                      {step.title}
                    </p>
                    {!step.required && (
                      <p className="text-xs text-white/40">Optional</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-premium border border-accent/20">
            {/* Step 1 - Basic Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-foreground mb-2">Basic Details</h2>
                  <p className="text-sm text-muted-foreground">Let's start with your basic information</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="flex mt-2">
                      <div className="bg-muted border border-r-0 rounded-l-md px-3 py-2 text-sm">+91</div>
                      <Input
                        id="phone"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>I am a *</Label>
                    <RadioGroup
                      value={formData.role}
                      onValueChange={(value) => setFormData({ ...formData, role: value })}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-accent/50">
                        <RadioGroupItem value="investor" id="investor" />
                        <Label htmlFor="investor" className="flex-1 cursor-pointer">
                          <div className="font-medium">Investor</div>
                          <div className="text-xs text-muted-foreground">I want to invest in properties</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-accent/50">
                        <RadioGroupItem value="dealer" id="dealer" />
                        <Label htmlFor="dealer" className="flex-1 cursor-pointer">
                          <div className="font-medium">Property Dealer</div>
                          <div className="text-xs text-muted-foreground">I want to list my properties</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: !!checked })}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <button className="text-primary hover:underline">Terms of Service</button>
                      {" "}and{" "}
                      <button className="text-primary hover:underline">Privacy Policy</button>
                    </Label>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  We'll never share your contact info without consent.
                </p>
              </div>
            )}

            {/* Step 2 - KYC Documents */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-foreground mb-2">KYC Documents</h2>
                  <p className="text-sm text-muted-foreground">Optional now, required before investing</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="aadhaar">Aadhaar Number</Label>
                    <Input
                      id="aadhaar"
                      placeholder="XXXX-XXXX-XXXX"
                      value={formData.aadhaar}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                        const formatted = value.replace(/(\d{4})(?=\d)/g, '$1-');
                        setFormData({ ...formData, aadhaar: formatted });
                      }}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Aadhaar Front</Label>
                      <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload('aadhaarFront', e.target.files[0])}
                          className="hidden"
                          id="aadhaar-front"
                        />
                        <label htmlFor="aadhaar-front" className="cursor-pointer">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">
                            {formData.aadhaarFront ? formData.aadhaarFront.name : "Upload Front"}
                          </p>
                        </label>
                      </div>
                    </div>
                    <div>
                      <Label>Aadhaar Back</Label>
                      <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload('aadhaarBack', e.target.files[0])}
                          className="hidden"
                          id="aadhaar-back"
                        />
                        <label htmlFor="aadhaar-back" className="cursor-pointer">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">
                            {formData.aadhaarBack ? formData.aadhaarBack.name : "Upload Back"}
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="pan">PAN Number</Label>
                    <Input
                      id="pan"
                      placeholder="AAAAA9999A"
                      value={formData.pan}
                      onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase().slice(0, 10) })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>PAN Card Image</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('panImage', e.target.files[0])}
                        className="hidden"
                        id="pan-image"
                      />
                      <label htmlFor="pan-image" className="cursor-pointer">
                        <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {formData.panImage ? formData.panImage.name : "Upload PAN Card"}
                        </p>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Your documents are encrypted at rest and processed securely.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3 - Profile Photo */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-foreground mb-2">Profile Photo</h2>
                  <p className="text-sm text-muted-foreground">A clear profile helps with faster verifications</p>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center mb-4 overflow-hidden">
                      {formData.profilePhoto ? (
                        <img
                          src={URL.createObjectURL(formData.profilePhoto)}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-16 w-16 text-muted-foreground" />
                      )}
                    </div>

                    <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload('profilePhoto', e.target.files[0])}
                        className="hidden"
                        id="profile-photo"
                      />
                      <label htmlFor="profile-photo" className="cursor-pointer">
                        <Camera className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {formData.profilePhoto ? "Change Photo" : "Upload or Take Photo"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Square photos work best
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 - Verify OTP */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-foreground mb-2">Verify OTP</h2>
                  <p className="text-sm text-muted-foreground">
                    Code sent to +91-{formData.phone.slice(0, 2)}XX-XX{formData.phone.slice(-2)}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Enter 6-digit OTP</Label>
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
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Use 123456 for demo purposes
                    </p>
                  </div>

                  <div className="text-center">
                    {resendTimer > 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Resend OTP in 00:{resendTimer.toString().padStart(2, '0')}
                      </p>
                    ) : (
                      <button
                        onClick={sendOTP}
                        className="text-sm text-primary hover:underline"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Code expires in 10 minutes
                </p>
              </div>
            )}

            {/* Step 5 - Success */}
            {currentStep === 5 && (
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 mx-auto bg-success/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-success" />
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Welcome to Terra Nexxus!</h2>
                  <p className="text-sm text-muted-foreground">
                    {formData.role === "investor" 
                      ? "Your portfolio will unlock after KYC completion"
                      : "You can now submit your first property listing"
                    }
                  </p>
                </div>

                <div className="bg-accent/20 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    Redirecting to your dashboard...
                  </p>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                {currentStep > 1 ? (
                  <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}

                <div className="flex gap-3">
                  {(currentStep === 2 || currentStep === 3) && (
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="text-muted-foreground"
                    >
                      Skip for now
                    </Button>
                  )}
                  
                  <Button
                    onClick={handleNext}
                    variant="hero"
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    {currentStep === 4 ? "Verify & Complete" : "Continue"}
                    {currentStep < 4 && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-white/60">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-white hover:underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;