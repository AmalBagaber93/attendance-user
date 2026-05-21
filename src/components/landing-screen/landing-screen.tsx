"use client"
import { LandingPageConfig } from "@/src/lib/landingConfig";
import Sponsors from "./components/Sponsors";
import CtaBanner from "./components/CtaBanner";
import Speakers from "./components/Speakers";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Schedule from "./components/Schedule";
import Testimonials from "./components/Testimonials";

interface landingScreenProps {
    config: LandingPageConfig;
}

export default function LandingScreen({ config }: landingScreenProps) {
    const theme = config.theme ?? {};

    const themeVars = [
        theme.primaryColor && `--color-primary: ${theme.primaryColor};`,
        theme.secondaryColor && `--color-secondary: ${theme.secondaryColor};`,
        theme.accentColor && `--color-tertiary: ${theme.accentColor};`,
    ]
        .filter(Boolean)
        .join("\n    ");

    return (
        <>
            {themeVars && (
                <style>{`:root {\n    ${themeVars}\n  }`}</style>
            )}

            <Navbar config={config} />

            <main>
                <Hero config={config} />
                <Speakers config={config} />
                <Sponsors config={config} />
                <Schedule config={config} />
                <Testimonials config={config} />
                {/* <CtaBanner config={config} /> */}

            </main>

            <Footer config={config} />
        </>
    );
}