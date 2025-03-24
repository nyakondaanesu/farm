"use client";
import { useState } from "react";

const faqs = [
  {
    question: "How this works?",
    answer:
      "Our platform is simple to use. Just search for what you need, explore the options, and get started with ease!",
  },
  {
    question: "Are there any additional fees?",
    answer:
      "No, our service is completely transparent. There are no hidden charges or additional fees.",
  },
  {
    question: "How can I get the app?",
    answer:
      "You can download the app from the App Store or Google Play. Simply search for our app and install it on your device.",
  },
  {
    question: "What features do you offer?",
    answer:
      "We provide seamless navigation, real-time updates, and a user-friendly interface to enhance your experience.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-12 px-8 md:px-20 py-16">
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold text-black">
          Any questions?
          <br />
          We got you.
        </h2>
        <p className="text-gray-600 mt-4">
          Have any questions? We're here to help. Browse our FAQs or reach out
          to us for further assistance.
        </p>
        <a href="#" className="text-indigo-600 font-medium mt-4 inline-block">
          More FAQs →
        </a>
      </div>

      <div className="md:w-1/2">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b py-4">
            <button
              className="w-full flex justify-between items-center text-lg font-medium text-black focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
