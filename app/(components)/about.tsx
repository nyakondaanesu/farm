import Image from "next/image";

const About = () => {
  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-10 mt-10 gap-10"
      id="About"
    >
      {/* Left Section (Images) */}
      <div className="relative">
        {/* Large Circle Image */}
        <div className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-full">
          <Image
            src="/cows.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Small Overlapping Circle */}
        <div className="absolute top-40 md:top-52 left-40 md:left-56 h-20 w-20 md:h-28 md:w-28 overflow-hidden rounded-full border-4 border-white shadow-lg bg-white">
          <Image src="/farmer.jpg" alt="Farmer" fill className="object-cover" />
        </div>
      </div>

      {/* Right Section (Text & Info Boxes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-2/3">
        {/* Text Content */}
        <div>
          <h1 className="text-black font-bold text-2xl md:text-3xl">
            Agriculture For Future Development
          </h1>
          <p className="text-gray-600 text-sm md:text-md mt-4">
            By embracing reducing chemical inputs, and prioritizing
            biodiversity, we're building resilient food systems that can
            withstand climate challenges while nourishing communities.
            <br />
            <br />
            ✔ Organic food contains more vitamins <br />
            ✔ Eat organic because supply meets demand <br />✔ Organic food is
            never irradiated
          </p>
        </div>

        {/* Info Boxes */}
        <div className="flex flex-col space-y-4 md:ml-10">
          <div className="flex items-center bg-green-300 p-4 rounded-md shadow-md">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              🍅
            </div>
            <div className="ml-4">
              <h3 className="text-black font-semibold">Natural Farming</h3>
              <p className="text-gray-700 text-sm">
                Natural farming works with nature's wisdom, using indigenous
                microorganisms, crop diversity, and zero external inputs to
                create self-sustaining agricultural ecosystems.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-yellow-300 p-4 rounded-md shadow-md">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              🌱
            </div>
            <div className="ml-4">
              <h3 className="text-black font-semibold">Quality Products</h3>
              <p className="text-gray-700 text-sm">
                Our quality products are harvested at peak ripeness, minimally
                processed, and delivered fresh to preserve nutritional value and
                authentic flavors that industrial agriculture simply cannot
                match.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
