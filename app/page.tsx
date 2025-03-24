import Image from "next/image";
import Link from "next/link";
import Nav from "./(components)/navbar";
import About from "./(components)/about";
import FormSection from "./(components)/formSection";
import QuestionsSections from "./(components)/questionsSection";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="relative w-full h-[calc(100vh-60px)]">
        <Image
          src="/greenhouse.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center mt-25">
            <h1 className="text-white text-5xl font-bold">
              Fresh from the Farm, Straight to Your Table!
            </h1>
            <h3 className="text-white">
              Organic, Locally-Sourced Produce for a Healthier You – Delivered
              Fresh Every Day!
            </h3>
            <Link href="/products">
              <button className="bg-white text-black mt-10 text-xl px-8 py-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                Discover More
              </button>
            </Link>
          </div>
        </div>
      </div>
      <About />
      <FormSection />
      <QuestionsSections />
    </>
  );
}
