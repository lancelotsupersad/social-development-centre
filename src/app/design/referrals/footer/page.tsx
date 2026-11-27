import type { Metadata } from "next";
import { FooterDesign } from "./FooterDesign";

export const metadata: Metadata = { title: "Email footer: Refer a friend" };

/** The Refer a friend link in every member email's footer (#99), with wording options for the PM. */
export default function ReferralFooterDesign() {
  return <FooterDesign />;
}
