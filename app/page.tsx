import LandingPage from "./components/landingpage";
import { fetchBanner, fetchFeatures } from "./lib/api";

export default async function Home() {
  const [features, banner] = await Promise.all([
    fetchFeatures(),
    fetchBanner(),
  ]);

  return <LandingPage features={features} banner={banner} />;
}
