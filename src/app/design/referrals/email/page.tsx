import type { Metadata } from "next";
import { InviteEmailDesign } from "./InviteEmailDesign";

export const metadata: Metadata = { title: "Invite email: what the friend sees" };

/** The email SDC sends a friend when a member picks Send invite on /design/referrals. */
export default function ReferralInviteEmailDesign() {
  return <InviteEmailDesign />;
}
