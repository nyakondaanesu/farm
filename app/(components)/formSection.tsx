"use client";
import { useState } from "react";
import GoogleMaps from "./googleMaps";

const FormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="w-full flex  bg-[#6f9f29] py-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="md:ml-8 sm:p-10 shadow-md rounded-md  w-full max-w-lg"
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
