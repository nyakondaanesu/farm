"use client";
import { useState } from "react";
import { z } from "zod";
import GoogleMaps from "./googleMaps";

// Define the Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  message: z.string().min(1, "Message is required"),
});

const FormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Validate form data using Zod
      formSchema.parse(formData);

      console.log("Submitting form data:", formData);

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // Added to prevent potential issues
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "message sent successfully!",
        });
        console.log("Form successfully submitted:", data);
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || "Error sending message",
        });
        console.error("Error submitting the form:", response.statusText);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
      } else {
        setSubmitStatus({ success: false, message: "Network error occurred" });
        console.error("Network error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex bg-[#6f9f29] py-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="md:ml-8 sm:p-10 shadow-md rounded-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>

        <div className="mb-4">
          <label className="block text-white font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-white font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-white font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full h-32 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.message && <p className="text-red-500">{errors.message}</p>}
        </div>

        {submitStatus && (
          <div
            className={`mt-4 p-3 rounded ${
              submitStatus.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-black w-full px-4 py-2 rounded-md hover:bg-yellow-300 transition disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      <div className="mx-10">
        <GoogleMaps />
      </div>
    </div>
  );
};

export default FormSection;
