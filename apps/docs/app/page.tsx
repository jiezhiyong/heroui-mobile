import { Spacer } from "@heroui/react";

import { A11yOtb } from "@/components/marketing/a11y-otb";
import { Community } from "@/components/marketing/community";
import { CustomThemes } from "@/components/marketing/custom-themes";
import { Customization } from "@/components/marketing/customization";
import { DarkMode } from "@/components/marketing/dark-mode";
import { FeaturesGrid } from "@/components/marketing/features-grid";
import { Hero } from "@/components/marketing/hero";
import { HeroUIProSection } from "@/components/marketing/heroui-pro-section";
import { InstallBanner } from "@/components/marketing/install-banner";
import { LastButNotLeast } from "@/components/marketing/last-but-not-least";
import landingContent from "@/content/landing";

export default async function Home() {
  return (
    <main className="container mx-auto max-w-7xl px-6 flex-grow">
      <section className="flex flex-col items-center justify-center">
        <Hero />
        <FeaturesGrid features={landingContent.topFeatures} />
        <CustomThemes />
        <A11yOtb />
        <DarkMode />
        <Customization />
        <HeroUIProSection />
        <LastButNotLeast />
        <Spacer y={24} />
        <InstallBanner />
        <Community />
        <Spacer y={24} />
      </section>
    </main>
  );
}
