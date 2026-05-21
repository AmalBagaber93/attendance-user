import { fetchLandingConfig } from "../../lib/landingConfig";
import Navbar from "../../components/landing-screen/components/Navbar";
import Footer from "../../components/landing-screen/components/Footer";
import Registration from "@/src/components/register-screen.tsx/Registration";

export async function generateMetadata() {
  return {
    title: "Register — InnovateX",
    description:
      "Secure your spot at InnovateX 2024. Complete your registration to access technical tracks, networking events, and developer workshops.",
  };
}

export default async function RegisterPage() {
  const config = await fetchLandingConfig();
  return (
    <>
      <Navbar config={config} />
      <main className="flex-1">
        <Registration config={config} />
      </main>
      <Footer config={config} />
    </>
  );
}
