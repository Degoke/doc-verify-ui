import type { V2_MetaFunction } from "@remix-run/node";
import { links, footerLinks } from "../content/index"
import { Footer } from "./index/footer";
import { Header } from "./index/header";
import { Hero } from "./index/hero";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Header links={links} />
      <Hero />
      <Footer links={footerLinks} />
    </div>
  );
}