import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/compenent/partial/Select.jsx";

import Input from "@/compenent/partial/Input";
import Label from "@/compenent/partial/Labels";
import Button from "@/compenent/partial/Button";
import { registerUtils } from "./utils/utils_register";
import { PasswordInput } from "@/compenent/partial/PasswordInput";

export function RegisterPage() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    phone: "",
    password: "",
    gender: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password == null) {
      setError("Password tidak boleh kosong")
      return
    }
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setError("Password tidak sama.");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUtils(form);
      if (response?.status) navigate("/login");
    } catch (err) {
      setError("Failed to register. Please check your input.");
    } finally {
      setLoading(false);
    }
  };

  const slideAnimation = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* ICON */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-xl">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Register to access the LMS system
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* SLIDE AREA */}
            <div className="relative min-h-[260px]">
              <AnimatePresence mode="wait">

                {/* ---------- SLIDE 1 ---------- */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    {...slideAnimation}
                    className="space-y-5 absolute w-full"
                  >
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>

                    <div>
                      <Label>Username</Label>
                      <Input
                        value={form.username}
                        onChange={(e) => handleChange("username", e.target.value)}
                        placeholder="Choose username"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* ---------- SLIDE 2 ---------- */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    {...slideAnimation}
                    className="space-y-5 absolute w-full"
                  >
                    <div>
                      <Label>Role</Label>
                      <Select value={form.role} onValueChange={(val) => handleChange("role", val)}>
                        <SelectTrigger className="w-full h-auto py-3">
                          <SelectValue placeholder="Choose role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ST">Student</SelectItem>
                          <SelectItem value="TC">Teacher</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Gender</Label>
                      <Select value={form.role} onValueChange={(val) => handleChange("gender", val)}>
                        <SelectTrigger className="w-full h-auto py-3">
                          <SelectValue placeholder="Choose role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* ---------- SLIDE 3 ---------- */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    {...slideAnimation}
                    className="space-y-5 absolute w-full"
                  >
                    <div>
                      <Label>Password</Label>
                      <PasswordInput 
                        value={form.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        placeholder="Create password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>

                    <div>
                      <Label>Confirm Password</Label>
                      <PasswordInput
                        value={form.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        placeholder="Confirm password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-between">
              {step > 1 && (
                <Button  className="bg-blue-600 hover:bg-blue-700 text-white w-25" type="button" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}

              {step < 3? (
                <Button  className={"bg-blue-600 hover:bg-blue-700 text-white " + (step == 1 ? "w-full" : "w-25")} type="button" onClick={() => setStep(step + 1)}>
                  Next
                </Button>
              ) : (
                <Button  className="bg-blue-600 hover:bg-blue-700 text-white w-25" type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Register"}
                </Button>
              )}
            </div>
          </form>

        </div>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 font-medium hover:text-blue-700 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign In
            </span>
          </p>
      </div>
    </div>
  );
}
