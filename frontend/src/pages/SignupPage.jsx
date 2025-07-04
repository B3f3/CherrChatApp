import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2} from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import CherryFlowerLogo from "../components/CherryFlowerLogo";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.username.trim()) return toast.error("Username  is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/*Left side of the screen*/}
      <div className="flex flex-col items-center justify-center p-6 sm:p-10 min-h-screen">
        <div className="w-full max-w-md h-full flex flex-col justify-center space-y-8">

            {/* LOGO */}
                <div className="text-center mb-8">
                  <div className="flex flex-col items-center gap-2 group">
                    <div
                      className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                    group-hover:bg-primary/20 transition-colors"
                    >
                      <CherryFlowerLogo />
                    </div>
                    <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                    <p className="text-base-content/60">Get started with your free account</p>
                  </div>
                </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center items-center h-full">
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Sign Up</legend>

                {/* FORM TO SIGNUP */}
                <label className="label">Full name</label> 
                <div className="relative">
                <input
                      type="text"
                      className="input"
                      placeholder="fullname"
                      value={formData.fullname}
                      onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    />
                </div>

                <label className="label">Username</label>
                <div className="relative">
                <input
                      type="text"
                      className="input"
                      placeholder="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </div>

                <label className="label">Email</label>
                <div className="relative">
                  <input
                      type="email"
                      className="input"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input w-full pr-10"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-base-content/40"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
                
                <div className="relative">
                <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                  {isSigningUp ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Loading...
                    </>
                    ) : (
                      "Create Account"
                  )}
                </button>
                </div>

              </fieldset>

            </div>
          </form>
          <div className="text-center">
              <p className="text-base-content/60">
                  Already have an account?{" "}
                  <Link to="/login" className="link link-primary">
                  Sign in
                  </Link>
              </p>
            </div>

        </div>
      </div>

      {/*Right Side*/}  
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}

export default SignupPage
