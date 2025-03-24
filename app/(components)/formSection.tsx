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

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data using Zod
    try {
      formSchema.parse(formData); // Will throw an error if invalid
      console.log("Form Data Submitted:", formData);

      const response = await fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (response.ok) {
        // Handle success (e.g., show a success message)
        console.log("Form successfully submitted");
        // Optionally reset the form after submission
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        // Handle error (e.g., show an error message)
        console.error("Error submitting the form:", response.statusText);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // If validation fails, set errors to display
        const validationErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
      } else {
        // Handle network or other errors
        console.error("Network error:", error);
      }
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
            required
            className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] max-w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            required
            className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] max-w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-white font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] max-w-full h-32 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.message && <p className="text-red-500">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-white text-black w-full sm:w-auto px-4 py-2 rounded-md hover:bg-yellow-300 transition"
        >
          Submit
        </button>
      </form>
      <div className="mx-10">
        <GoogleMaps />
      </div>
    </div>
  );
};

export default FormSection;
