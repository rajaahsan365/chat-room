"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Card from "@/app/components/Card";
import Input from "@/app/components/FormItems/Input";

import { auth } from "@/app/Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Validate form data
    if (!formData.email || !formData.password) {
      setFormError("Please enter both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Logged in successfully");
      router.push("/home");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card heading="Login">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-96">
        <Input
          name="email"
          label="Email"
          type="email"
          value={formData.email || ""}
          onChange={(e) => handleChange(e)}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={formData.password || ""}
          onChange={(e) => handleChange(e)}
        />
        {formError && <span className="text-red-500">{formError}</span>}
        <button
          disabled={!formData.email || !formData.password}
          type="submit"
          className="text-green-700 font-bold py-2 px-4 rounded-md cursor-pointer"
        >
          Sign in
        </button>
      </form>
      <p className="text-sm text-green-800">
        Don't have an account?
        <Link className="ms-2" href="/">
          Sign up
        </Link>
      </p>
    </Card>
  );
};

export default Login;
