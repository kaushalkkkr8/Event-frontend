import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import bg1 from "@/assets/bg1.jpg";
import Navbar from "@/components/Navbar";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/eventPage");
    }
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      await logIn(data);
    } catch (error) {
      setError("Either email or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white/80">
        <div className="flex flex-col items-center justify-center space-y-2">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <p className="text-sm text-gray-700">Logging in...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <Card className="w-full max-w-md mx-auto shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer absolute right-3 top-2.5 text-gray-500 hover:text-black"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    Password is required
                  </p>
                )}
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <Button
                type="submit"
                className="cursor-pointer w-full"
                style={{ background: "#428c8d" }}
              >
                Login
              </Button>
            </form>

            <p className="text-center text-sm mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
