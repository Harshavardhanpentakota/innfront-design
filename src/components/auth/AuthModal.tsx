import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { authApi, ApiError } from "@/lib/api";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultMode?: "login" | "register";
}

export const AuthModal = ({ open, onClose, defaultMode = "login" }: AuthModalProps) => {
  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<"login" | "register" | "forgot">(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });

  // Forgot password flow states
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        const identifier = form.phone.trim() || form.email.trim();
        if (!identifier) { setError("Enter your phone number or email."); return; }
        await login(identifier, form.password);
      } else {
        await register({
          name: form.name,
          phone: form.phone,
          email: form.email.trim() || undefined,
          password: form.password,
        });
      }
      onClose();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors && err.errors.length > 0 ? err.errors.map(x => x.message).join("\n") : err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setForgotLoading(true);
    try {
      if (!otpSent) {
        if (!forgotEmail.trim()) { setError("Email is required."); setForgotLoading(false); return; }
        const res = await authApi.forgotPassword(forgotEmail.trim());
        setOtpSent(true);
        setSuccessMsg(res.message || "OTP sent successfully.");
      } else {
        if (!otp.trim() || otp.trim().length !== 6) { setError("Please enter a valid 6-digit OTP."); setForgotLoading(false); return; }
        if (!newPassword || newPassword.length < 8) { setError("Password must be at least 8 characters long."); setForgotLoading(false); return; }
        const res = await authApi.resetPassword({
          email: forgotEmail.trim(),
          otp: otp.trim(),
          newPassword: newPassword,
        });
        setSuccessMsg(res.message || "Password reset successfully!");
        setTimeout(() => {
          setMode("login");
          setOtpSent(false);
          setForgotEmail("");
          setOtp("");
          setNewPassword("");
          setSuccessMsg("");
        }, 2000);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors && err.errors.length > 0 ? err.errors.map(x => x.message).join("\n") : err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setForgotLoading(false);
    }
  };

  const switchMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setError("");
    setSuccessMsg("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl border border-border bg-card p-0 shadow-elevated">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="font-display text-2xl font-semibold">
            {mode === "login" ? "Welcome back" : mode === "register" ? "Create account" : "Reset password"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login"
              ? "Sign in to manage your bookings at Hotel Abhitej Inn"
              : mode === "register"
              ? "Join us for seamless hotel experiences"
              : "We will send a 6-digit OTP to your email"}
          </p>
        </DialogHeader>

        {mode === "forgot" ? (
          <form onSubmit={handleForgotSubmit} className="space-y-4 px-6 py-5">
            {!otpSent ? (
              <div>
                <Label>Email address</Label>
                <Input
                  type="email"
                  className="mt-1.5 h-12 rounded-xl"
                  placeholder="you@email.com"
                  value={forgotEmail}
                  onChange={(e) => { setForgotEmail(e.target.value); setError(""); }}
                  required
                />
              </div>
            ) : (
              <>
                <div className="rounded-lg bg-primary-soft/50 p-3 text-xs text-primary leading-normal">
                  A 6-digit verification code has been sent to <strong>{forgotEmail}</strong>. Please check your inbox.
                </div>
                <div>
                  <Label>One-Time Password (OTP)</Label>
                  <Input
                    type="text"
                    maxLength={6}
                    className="mt-1.5 h-12 rounded-xl text-center font-mono text-lg tracking-[0.5em]"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "")); setError(""); }}
                    required
                  />
                </div>
                <div>
                  <Label>New Password</Label>
                  <div className="relative mt-1.5">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="h-12 rounded-xl pr-12"
                      placeholder="Min 8 characters"
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword((s) => !s)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {error && (
              <p className="rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive whitespace-pre-wrap">
                {error}
              </p>
            )}

            {successMsg && (
              <p className="rounded-lg bg-green-50 px-4 py-2.5 text-sm text-green-700">
                {successMsg}
              </p>
            )}

            <Button
              type="submit"
              disabled={forgotLoading}
              className="w-full h-12 rounded-full bg-gradient-sky text-primary-foreground shadow-glow text-base"
            >
              {forgotLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : !otpSent ? (
                "Send OTP"
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
            {mode === "register" && (
              <div>
                <Label>Full name</Label>
                <Input
                  className="mt-1.5 h-12 rounded-xl"
                  placeholder="Aarav Patel"
                  value={form.name}
                  onChange={set("name")}
                  required
                />
              </div>
            )}

            <div>
              <Label>Phone number {mode === "register" && <span className="text-destructive">*</span>}</Label>
              <Input
                type="tel"
                className="mt-1.5 h-12 rounded-xl"
                placeholder="+91 82477 86920"
                value={form.phone}
                onChange={set("phone")}
                required={mode === "register"}
              />
            </div>

            {mode === "login" && (
              <div>
                <Label className="text-muted-foreground text-xs">Or sign in with email</Label>
                <Input
                  type="email"
                  className="mt-1.5 h-12 rounded-xl"
                  placeholder="you@email.com (optional)"
                  value={form.email}
                  onChange={set("email")}
                />
              </div>
            )}

            {mode === "register" && (
              <div>
                <Label>Email <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input
                  type="email"
                  className="mt-1.5 h-12 rounded-xl"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={set("email")}
                />
              </div>
            )}

            <div>
              <div className="flex justify-between items-center">
                <Label>Password</Label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => { setMode("forgot"); setError(""); setSuccessMsg(""); setOtpSent(false); }}
                    className="text-xs font-medium text-primary hover:underline focus:outline-none"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative mt-1.5">
                <Input
                  type={showPassword ? "text" : "password"}
                  className="h-12 rounded-xl pr-12"
                  placeholder={mode === "register" ? "Min 8 chars, 1 uppercase, 1 number" : "Your password"}
                  value={form.password}
                  onChange={set("password")}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive whitespace-pre-wrap">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-full bg-gradient-sky text-primary-foreground shadow-glow text-base"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        )}

        <div className="border-t border-border px-6 py-4 text-center text-sm text-muted-foreground">
          {mode === "forgot" ? (
            <button onClick={() => { setMode("login"); setError(""); setSuccessMsg(""); setOtpSent(false); }} className="font-medium text-primary hover:underline">
              Back to sign in
            </button>
          ) : mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button onClick={switchMode} className="font-medium text-primary hover:underline">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={switchMode} className="font-medium text-primary hover:underline">
                Sign in
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
