"use client";

import * as React from "react";
import { styled } from "next-yak";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";
import { EMAIL_FOOTER } from "@/features/automatic-emails/footer";

/*
 * The refer link in the footer of every SDC email to a member, as #99 builds it (from #95): one footer for
 * all of SDC, saved in Settings (src/features/email-footer/doc.ts), with "Refer a friend" right after
 * Unsubscribe. Admins can change the link's words (up to 40 characters) but not remove it. Shown in a
 * placeholder email laid out like every SDC email (renderDelivery): the message, a thin line, then the small
 * grey footer. The wording options are for the PM; the design-review bar is not part of the email.
 */

/** Words admins might give the refer link. The first is #99's default. */
const OPTIONS = [
  { id: "refer", label: "Refer a friend" },
  { id: "invite", label: "Invite a friend" },
  { id: "share", label: "Share SDC with a friend" },
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
  gap: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-muted);

  & > div {
    max-width: 100%;
    overflow-x: auto;
  }
`;

/* The email app's reading pane, roughly as wide as an email. */
const Email = styled.article`
  container-type: inline-size;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface-raised);
`;

/* The message, laid out as the sender sends it: plain paragraphs. */
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

  @container (max-width: 599px) {
    padding: var(--space-5) var(--space-4);
  }
`;

const Placeholder = styled.p`
  && {
    color: var(--color-text-muted);
  }
`;

/* The thin line and small grey footer every SDC email ends with (footerHtml). */
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

export function FooterDesign() {
  const [optionId, setOptionId] = React.useState(OPTIONS[0].id);
  const option = OPTIONS.find((o) => o.id === optionId) ?? OPTIONS[0];

  return (
    <Page>
      <header>
        <Title>Email footer: Refer a friend</Title>
        <Lede>Every email SDC sends a member ends with a link to invite a friend, right after Unsubscribe.</Lede>
      </header>

      <Review>
        <span id="footer-option">Design review: link words</span>
        <ToggleGroup
          type="single"
          value={optionId}
          onValueChange={(v) => v && setOptionId(v)}
          aria-labelledby="footer-option"
        >
          {OPTIONS.map((o) => (
            <ToggleGroupItem key={o.id} value={o.id}>
              {o.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Review>

      <Email aria-label="Example SDC email">
        <Message>
          <p>Hi Maya,</p>
          <Placeholder>
            Placeholder email body. This is where an automatic email&rsquo;s message goes, for example a thank-you
            after joining or a check-in a month later.
          </Placeholder>
          <p>The team at SDC</p>
          <Footer>
            <p>{EMAIL_FOOTER.organization}</p>
            <p>
              {EMAIL_FOOTER.address} &middot; {EMAIL_FOOTER.contact}
            </p>
            <p>
              {EMAIL_FOOTER.reason} <a href="#unsubscribe">Unsubscribe from emails</a> &middot;{" "}
              <a href="/design/referrals">{option.label}</a>
            </p>
          </Footer>
        </Message>
      </Email>

      <Notes>
        <li>
          The link sits in the footer&rsquo;s last line, after Unsubscribe, the way #99 adds it to the one footer in
          Settings. Cancel membership joins that line once it has a page to go to.
        </li>
        <li>
          Admins choose the link&rsquo;s words in Settings (up to 40 characters, no web or email addresses) but
          can&rsquo;t remove it. Only current members get it; the invite email to a friend doesn&rsquo;t have it.
        </li>
        <li>
          The link opens the member&rsquo;s own refer page (<code>/refer/&lt;token&gt;</code>). A forwarded
          email&rsquo;s link still belongs to the original member.
        </li>
      </Notes>
    </Page>
  );
}
