import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import bg1 from "@/assets/bg1.jpg";
import Navbar from "@/components/Navbar";

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/eventPage");
    }
  }, []);

  const onSubmit = async (data) => {
    setError("");
    try {
      await signUp(data);
    } catch (error) {
      setError(error);
    }
  };
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bg1})` }}>
        <Card className="w-full max-w-md mx-auto shadow-xl bg-white/90 backdrop-blur-sm ">
          <CardHeader>
            <CardTitle className="text-center text-xl">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" {...register("name", { required: true })} />
                {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email", { required: true })} />
                {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} {...register("password", { required: true })} />
                  <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="cursor-pointer absolute right-3 top-2.5 text-gray-500 hover:text-black" tabIndex={-1}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
              </div>

              {error && <p className="text-red-500 text-sm">Either email or password is incorrect</p>}

              <Button type="submit" className="cursor-pointer w-full " style={{ background: "#428c8d" }}>
                Sign Up
              </Button>
            </form>

            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 hover:underline">
                Log In
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
