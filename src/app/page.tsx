import { fetchLandingConfig } from "../lib/landingConfig";
import LandingScreen from "../components/landing-screen/landing-screen";

export async function generateMetadata() {
  return {
    title: "Landing Page",
  };
}

export default async function Page() {
  const config = await fetchLandingConfig();
  return (
    <LandingScreen config={config} />
  );
}


