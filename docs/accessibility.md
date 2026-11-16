# Accessibility Review

## Current interface

The application uses semantic headings, labels, forms, buttons, and links in several places. It also uses animated transitions and custom interactive elements. This document records current considerations and a practical validation plan. It does not claim formal WCAG conformance.

## Known review points

- The header brand is a clickable motion div rather than a semantic link or button.
- The mobile menu button does not currently expose an `aria-expanded` state or an accessible menu label.
- The expandable rows in `CompetitorFindings` are clickable divs rather than keyboard-operable buttons.
- The paginated result controls use buttons, but page changes do not announce updated content to assistive technology.
- Loading indicators are visual; status text and live-region announcements should be added.
- Confidence is conveyed as text, which is preferable to color-only communication, but the score's meaning needs clear explanation.
- Motion-heavy transitions should respect reduced-motion preferences.
- Some landing-page controls are demonstrative and do not have a meaningful action.

## Manual validation checklist

- [ ] Navigate every page using only a keyboard.
- [ ] Confirm visible focus indicators.
- [ ] Confirm every form control has a programmatic label.
- [ ] Confirm menu and expandable controls expose state and keyboard behavior.
- [ ] Test with a screen reader.
- [ ] Verify color contrast for text, controls, and focus indicators.
- [ ] Test at 200% zoom and narrow viewport widths.
- [ ] Check reduced-motion behavior.
- [ ] Confirm errors and loading states are announced.
- [ ] Verify links have meaningful names and destinations.

## Recommended implementation order

1. Replace clickable non-semantic containers with links or buttons.
2. Add accessible names and state attributes to mobile navigation.
3. Add live-region status messages for loading, errors, and result counts.
4. Add keyboard-operable disclosure controls.
5. Respect reduced-motion preferences.
6. Run an automated accessibility scan, then manually test keyboard and screen-reader flows.

Use WCAG 2.2 AA as a target for future remediation. No conformance claim is made by this repository.
