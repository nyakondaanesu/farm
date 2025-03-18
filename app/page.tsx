import Image from "next/image";
import App from "./(components)/navbar";
import Nav from "./(components)/navbar";

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
        <div className="relative z-10">wassup</div>
      </div>
    </>
  );
}
