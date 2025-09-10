import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Phone } from "lucide-react";

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
    <div className="min-h-screen gradient-premium flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Terra Nexxus</h1>
          <p className="text-white/80">Premium Fractional Real Estate</p>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-2xl p-8 shadow-premium border border-accent/20">
          {step === "input" ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
                <p className="text-muted-foreground">Sign in to your Terra Nexxus account</p>
              </div>

              <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as "email" | "phone")} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4 mt-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="phone" className="space-y-4 mt-6">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex mt-2">
                      <div className="bg-muted border border-r-0 rounded-l-md px-3 py-2 text-sm text-muted-foreground">
                        +91
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center space-x-2 mb-6">
                <Checkbox
                  id="remember"
                  checked={formData.rememberDevice}
                  onCheckedChange={(checked) => setFormData({ ...formData, rememberDevice: !!checked })}
                />
                <Label htmlFor="remember" className="text-sm">Remember this device for 30 days</Label>
              </div>

              <Button
                onClick={handleSendOTP}
                className="w-full"
                variant="hero"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>

              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-primary hover:underline font-medium"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setStep("input")}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Verify OTP</h2>
                  <p className="text-sm text-muted-foreground">
                    Code sent to {loginMethod === "email" 
                      ? `${formData.email.slice(0, 3)}***@${formData.email.split('@')[1] || 'email.com'}`
                      : `+91-${formData.phone.slice(0, 2)}XX-XX${formData.phone.slice(-2)}`
                    }
                  </p>
                </div>
              </div>

              <div className="space-y-6">
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

                <Button
                  onClick={handleVerifyOTP}
                  className="w-full"
                  variant="hero"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify & Login"}
                </Button>

                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Resend OTP in 00:{resendTimer.toString().padStart(2, '0')}
                    </p>
                  ) : (
                    <button
                      onClick={handleResendOTP}
                      className="text-sm text-primary hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-white/60">
            Code expires in 10 minutes. Your data is encrypted and secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;