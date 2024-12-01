import { Leaf, Sprout, Sun } from "lucide-react";
import { lazy } from "react";

const Hero = lazy(() => import("@/components/homepage/hero"));
const PlayersDescription = lazy(
  () => import("@/components/homepage/players-description")
);
const ProductDescription = lazy(
  () => import("@/components/homepage/product-description")
);
const Supporters = lazy(() => import("@/components/homepage/supporters"));

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F9F4]">
      {/* Hero Section */}
      <Hero />

      {/* Product Description Area */}
      <ProductDescription />

      {/* Players Description */}
      <PlayersDescription />

      {/* Supporters Carousel */}
      <Supporters />
    </div>
  );
}
