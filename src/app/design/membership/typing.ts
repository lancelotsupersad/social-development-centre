/*
 * Help while typing on the join page. Both match what the referral page does (Gaurav's email completion in
 * src/features/referrals/recipient.ts, and capitalizeName in /design/referrals).
 */

/**
 * A name with the first letter of each word in capitals: "mary-jane o'neil" becomes "Mary-Jane O'neil". Only
 * a letter at the start of the name or right after a space or hyphen changes; the rest stays as typed, so
 * "McKenzie" and "DeShawn" keep their capitals. Same length as what was typed, so the cursor stays put.
 */
export function capitalizeName(name: string) {
  return name.replace(/(^|[\s-])(\p{Ll})/gu, (_, before: string, letter: string) => before + letter.toUpperCase());
}

/**
 * For a name field's onChange: capitalizes what's typed or pasted in place, keeping the cursor where it was
 * (setting a field's value otherwise sends the cursor to the end). Returns the new value.
 */
export function capitalizeField(input: HTMLInputElement) {
  const capitalized = capitalizeName(input.value);
  if (capitalized !== input.value) {
    const { selectionStart, selectionEnd } = input;
    input.value = capitalized;
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  return capitalized;
}

/** Common email domains, most used first, so "@g" offers gmail.com. */
const DOMAINS = [
  "gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "yahoo.ca", "icloud.com", "live.com",
  "rogers.com", "bell.net", "sympatico.ca", "uwaterloo.ca", "wlu.ca", "conestogac.on.ca",
];

/** The rest of the address to offer after what's typed ("alex@g" → "mail.com"), or null. */
export function completeEmail(value: string): string | null {
  const at = value.indexOf("@");
  if (at < 1 || value.indexOf("@", at + 1) !== -1) return null;
  const typed = value.slice(at + 1).toLowerCase();
  if (!typed) return null;
  const match = DOMAINS.find((domain) => domain.startsWith(typed) && domain !== typed);
  return match ? match.slice(typed.length) : null;
}
