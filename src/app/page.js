"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Card from "@/app/components/Card";
import Input from "@/app/components/FormItems/Input";

import { auth, db, storage } from "@/app/Firebase/firebase";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore"
import { toast } from "react-hot-toast";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    // Validate form data
    if (!formData.name || !formData.email || !formData.password || !file) {
      setFormError("Please enter all the required information.");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const storageRef = ref(storage, `images/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          setFormError("Something went wrong");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile((await res).user, {
              displayName: formData.name,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              name: formData.name,
              email: formData.email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            toast.success("Account created successfully");
            router.push("/home");
          });
        }
      );
    } catch (err) {
      toast.error("Email already exists. Please try again.");
    }
  };

  console.log('Hello',process.env.FIREBASE_API_KEY)

  return (
    <Card heading="Sign Up">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <Input
          name="name"
          label="Display Name"
          value={formData.name || ""}
          onChange={(e) => handleChange(e)}
        />
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
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file"
          className="flex items-center gap-2 ms-10 text-green-800 text-sm cursor-pointer"
        >
          <img src="/images/addAvatar.png" alt="" className="w-8" />
          <span>Add an avatar</span>
        </label>
        {formError && <span className="text-red-500">{formError}</span>}
        <button
          disabled={false}
          type="submit"
          className="text-green-700 font-bold py-2 px-4 rounded-md cursor-pointer"
        >
          {false ? "Uploading image please wait..." : "Sign up"}
        </button>
      </form>
      <p className="text-sm text-green-800">
        You already have an account?{" "}
        <Link className="ms-2" href="/login">
          Login
        </Link>
      </p>
    </Card>
  );
};

export default Register;
