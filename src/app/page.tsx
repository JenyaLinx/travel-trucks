import Hero from "@/components/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Find the camper of your dreams with TravelTrucks and start your next journey.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}