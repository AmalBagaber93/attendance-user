import LandingScreen from "../../components/landing-screen/landing-screen";
import EventsSection from "../../components/events/EventsSection";
import { fetchLandingConfig } from "../../lib/landingConfig";

export async function generateMetadata() {
  return {
    title: "Landing Page",
  };
}

export default async function LandingPage() {
  const config = await fetchLandingConfig();
  return (
    <>
      {/* <LandingScreen config={config} /> */}
      <EventsSection />
    </>
  );
}


