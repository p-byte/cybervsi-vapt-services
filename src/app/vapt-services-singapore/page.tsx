import { MarketVaptPage } from "@/components/MarketVaptPage";
import { pageMetadata } from "@/lib/seo";
import { singaporeVapt } from "@/lib/vaptMarkets";

export const metadata = pageMetadata({ title: singaporeVapt.title, description: singaporeVapt.description, path: singaporeVapt.path });

export default function VaptSingaporePage() {
  return <MarketVaptPage market={singaporeVapt} />;
}
