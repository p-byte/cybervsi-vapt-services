import { MarketVaptPage } from "@/components/MarketVaptPage";
import { pageMetadata } from "@/lib/seo";
import { indiaVapt } from "@/lib/vaptMarkets";

export const metadata = pageMetadata({ title: indiaVapt.title, description: indiaVapt.description, path: indiaVapt.path });

export default function VaptIndiaPage() {
  return <MarketVaptPage market={indiaVapt} />;
}
