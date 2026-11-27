"use client";

import * as React from "react";
import { styled } from "next-yak";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";
import { EMAIL_FOOTER, REPLY_TO } from "@/features/automatic-emails/footer";
import { previewLinkFor } from "../data";

/*
 * The invite email a friend gets when a member picks Send invite (docs/backend/referrals.md, "For the
 * sender"). Shown the way the friend meets it: first as a row in their inbox, then opened. Demo data:
 * Amara Okafor invites Priya Sharma. Copy is a draft for the PM; the design-review bar is not part of the
 * email.
 *
 * Laid out like every email SDC sends (renderDelivery in src/features/automatic-emails/render.ts, and the
 * footer saved in Settings, src/features/email-footer/doc.ts): plain text, links as text (the editor has no
 * buttons), a thin line, then the small grey footer. No header band.
 */

const REFERRER = "Amara Okafor";
const REFERRER_FIRST = REFERRER.split(" ")[0];
const FRIEND = { fullName: "Priya Sharma", email: "priya@gmail.com" };
const LINK = previewLinkFor(FRIEND.email) ?? "";
/**
 * Where the links go in this demo: the join page design (/design/membership, from justin/membership-design)
 * as a referral, with the same code as the friend's link. In the product it's LINK.
 */
const JOIN_DEMO = `/design/membership?via=referral&ref=${new URL(LINK).searchParams.get("ref") ?? ""}`;

/** Draft copy for the PM. The greeting is the open question (see GREETINGS). */
const EMAIL = {
  fromName: "Social Development Centre",
  subject: `${REFERRER} invited you to join SDC`,
  preheader: `${REFERRER_FIRST} thought you'd be a great fit, and we'd love to meet you`,
  intro: `${REFERRER} thought you'd enjoy getting involved with the Social Development Centre, so they asked us to send you an invite!`,
  about:
    "We're neighbours working together on housing, poverty and climate across Waterloo Region, and our members help decide what we take on next.",
  ctaLead: "Sound like you? You can ",
  cta: "join SDC here",
  ctaTail: " for whatever you can afford.",
  signOff: "Hope to see you soon,",
  signature: "The SDC team",
  /** The footer's reason line, for someone who isn't a member yet (the Settings footer says "you're an SDC member"). */
  reason: `You're getting this because ${REFERRER_FIRST} invited you, and it's the only email we'll send unless you join.`,
  /** The same words as the footer's fixed link (FOOTER_LINKS.unsubscribe on main). */
  unsubscribe: "Unsubscribe from emails",
};

/*
 * Two rules disagree (docs/backend/referrals.md): the backend never puts the typed name in SDC's email
 * ("Hi,"), and the Nov design notes greet by first name ("Hi Priya"). Both are here so the PM can pick.
 */
const GREETINGS = [
  { id: "name", label: "Hi Priya", text: `Hi ${FRIEND.fullName.split(/\s+/)[0]},` },
  { id: "none", label: "Hi there", text: "Hi there," },
];

const WIDTHS = [
  { id: "computer", label: "Computer" },
  { id: "phone", label: "Phone" },
];

const Page = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-7) var(--space-6) var(--space-8);

  @media (max-width: 599px) {
    padding: var(--space-6) var(--space-4) var(--space-7);
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: var(--text-xl);
  font-weight: var(--weight-medium);
  line-height: var(--leading-heading);
  color: var(--color-text);
`;

const Lede = styled.p`
  margin: var(--space-2) 0 0;
  font-size: var(--text-md);
  line-height: var(--leading-body);
  color: var(--color-text-muted);
`;

const Review = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
`;

const ReviewItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
`;

const Section = styled.section<{ $phone: boolean }>`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
  max-width: ${({ $phone }) => ($phone ? "360px" : "600px")};
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text-muted);
`;

/* One row of the friend's inbox: sender, subject and the first line of the email. */
const InboxRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-1) var(--space-3);
  align-items: baseline;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface-raised);
  font-size: var(--text-sm);
  line-height: var(--leading-ui);
  color: var(--color-text);
`;

const Unread = styled.span`
  grid-row: span 2;
  align-self: center;
  width: var(--space-2);
  height: var(--space-2);
  border-radius: 50%;
  background: var(--color-primary);
`;

const Sender = styled.span`
  font-weight: var(--weight-medium);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Time = styled.span`
  color: var(--color-text-muted);
`;

const Snippet = styled.span`
  grid-column: 2 / 4;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-text-muted);

  & strong {
    font-weight: var(--weight-medium);
    color: var(--color-text);
  }
`;

/* The email app's reading pane. */
const Email = styled.article`
  container-type: inline-size;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface-raised);
  overflow: hidden;
`;

/* What the email app shows above the message: subject, from, to and reply-to. */
const Envelope = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--color-border);

  @container (max-width: 599px) {
    padding: var(--space-4);
  }
`;

const Subject = styled.p`
  margin: 0;
  font-size: var(--text-lg);
  font-weight: var(--weight-medium);
  line-height: var(--leading-heading);
  color: var(--color-text);
`;

const Meta = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-1) var(--space-3);
  margin: 0;
  font-size: var(--text-sm);
  line-height: var(--leading-ui);
  color: var(--color-text-muted);

  & dd {
    margin: 0;
    min-width: 0;
    overflow-wrap: anywhere;
    color: var(--color-text);
  }
`;

/* The message, laid out as the sender sends it: plain paragraphs, links as blue text. */
const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
  font-size: var(--text-md);
  line-height: var(--leading-body);
  color: var(--color-text);

  & p {
    margin: 0;
  }
  & a {
    color: var(--color-info);
    text-decoration: underline;
  }

  @container (max-width: 599px) {
    padding: var(--space-5) var(--space-4);
  }
`;

/* The thin line and small grey footer every SDC email ends with (footerHtml on main). */
const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
  font-size: var(--text-xs);
  line-height: var(--leading-body);
  color: var(--color-text-muted);

  && a {
    color: var(--color-text-muted);
  }
`;

const Notes = styled.ul`
  margin: 0;
  padding-left: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-size: var(--text-sm);
  line-height: var(--leading-body);
  color: var(--color-text-muted);
`;

export function InviteEmailDesign() {
  const [greetingId, setGreetingId] = React.useState(GREETINGS[0].id);
  const [widthId, setWidthId] = React.useState(WIDTHS[0].id);
  const greeting = GREETINGS.find((g) => g.id === greetingId) ?? GREETINGS[0];
  const phone = widthId === "phone";

  return (
    <Page>
      <header>
        <Title>Invite email: what the friend sees</Title>
        <Lede>
          The email someone gets when they&rsquo;ve been referred. SDC sends it once, when a member picks Send
          invite, never for Copy link. Here it is as it arrives in the friend&rsquo;s inbox and when they open it.
        </Lede>
      </header>

      <Review>
        <ReviewItem>
          <span id="greeting-option">Design review: greeting</span>
          <ToggleGroup
            type="single"
            value={greetingId}
            onValueChange={(v) => v && setGreetingId(v)}
            aria-labelledby="greeting-option"
          >
            {GREETINGS.map((g) => (
              <ToggleGroupItem key={g.id} value={g.id}>
                {g.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </ReviewItem>
        <ReviewItem>
          <span id="width-option">Screen</span>
          <ToggleGroup
            type="single"
            value={widthId}
            onValueChange={(v) => v && setWidthId(v)}
            aria-labelledby="width-option"
          >
            {WIDTHS.map((w) => (
              <ToggleGroupItem key={w.id} value={w.id}>
                {w.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </ReviewItem>
      </Review>

      <Section $phone={phone} aria-labelledby="inbox-title">
        <SectionTitle id="inbox-title">In their inbox</SectionTitle>
        <InboxRow>
          <Unread aria-label="Unread" role="img" />
          <Sender>{EMAIL.fromName}</Sender>
          <Time>10:42 AM</Time>
          <Snippet>
            <strong>{EMAIL.subject}</strong> &ndash; {EMAIL.preheader}
          </Snippet>
        </InboxRow>
      </Section>

      <Section $phone={phone} aria-labelledby="opened-title">
        <SectionTitle id="opened-title">Opened</SectionTitle>
        <Email aria-label="Invite email to Priya">
          <Envelope>
            <Subject>{EMAIL.subject}</Subject>
            <Meta>
              <dt>From</dt>
              <dd>{EMAIL.fromName}</dd>
              <dt>To</dt>
              <dd>{FRIEND.email}</dd>
              <dt>Reply-to</dt>
              <dd>{REPLY_TO}</dd>
            </Meta>
          </Envelope>
          <Message>
            <p>{greeting.text}</p>
            <p>{EMAIL.intro}</p>
            <p>{EMAIL.about}</p>
            <p>
              {EMAIL.ctaLead}
              <a href={JOIN_DEMO}>{EMAIL.cta}</a>
              {EMAIL.ctaTail}
            </p>
            <p>
              {EMAIL.signOff}
              <br />
              {EMAIL.signature}
            </p>
            <Footer>
              <p>{EMAIL_FOOTER.organization}</p>
              <p>
                {EMAIL_FOOTER.address} &middot; {EMAIL_FOOTER.contact}
              </p>
              <p>
                {EMAIL.reason} <a href="#unsubscribe">{EMAIL.unsubscribe}</a>
              </p>
            </Footer>
          </Message>
        </Email>
      </Section>

      <Notes>
        <li>
          Same layout as every SDC email: the message, a thin line, then the footer from Settings. The only change to
          the footer is its reason line, since the friend isn&rsquo;t a member yet, and there&rsquo;s no Refer a friend
          link for the same reason.
        </li>
        <li>
          The link opens the join page as a referral (<code>/join?via=referral&amp;ref=&lt;code&gt;</code>; here, the
          join page design), which greets them with &ldquo;{REFERRER_FIRST} invited you to join SDC&rdquo;.
        </li>
        <li>
          The subject names the member in full, so the friend knows who it&rsquo;s from before they open it.
        </li>
        <li>
          Greeting: &ldquo;Hi Priya&rdquo; is friendlier, but uses a name the member typed, which the backend rules
          keep out of SDC&rsquo;s emails. &ldquo;Hi there&rdquo; keeps that rule. The PM picks.
        </li>
      </Notes>
    </Page>
  );
}
