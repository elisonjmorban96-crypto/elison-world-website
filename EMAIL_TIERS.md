# Email Tier System — Elison's World

## Overview

Two-tier email community built on top of existing **Formspree** form (`xqewbelg`). Formspree captures signups with a `tier` field; Elison manually migrates emails to the actual email service when ready (Buttondown, Mailchimp, or ConvertKit).

---

## Tiers

| Tier | Name | What They Get |
|------|------|---------------|
| **Inner Circle** | Early access + exclusive | Unreleased audio, story fragments, direct reply access |
| **Outer World** | Public updates | Tour announcements, major releases, general news |

---

## What Changed on the Site

**File:** `src/sections/Connection.tsx`

- Added `useState` for `tier` (`'inner' | 'outer'`) and `submitted` boolean
- Added two toggle buttons above the email field: **Inner Circle** / **Outer World**
- Dynamic description text changes based on selected tier
- Hidden `<input name="tier" value={tier} />` submitted with the form to Formspree
- Submit button label changes: "Join Inner Circle" / "Join Outer World"
- Post-submit confirmation message tailored to the chosen tier
- Kept the existing Formspree endpoint — no backend changes needed

---

## Welcome Email Sequence (Recommended)

Since Formspree does not do drip campaigns, implement one of the following:

### Option A: Buttondown (Recommended — free up to 1,000 subscribers)

1. Export Formspree submissions periodically (CSV) or use Formspree Zapier integration
2. Import into Buttondown
3. Tag subscribers: `tier:inner` or `tier:outer`
4. Set up automation:
   - **Day 0** — "Welcome to Elison's World" (all tiers)
   - **Day 3** — "The story behind the molecule" (all tiers)
   - **Day 7** — "First exclusive fragment" (Inner Circle only — use Buttondown tag filter)

### Option B: Keep Formspree + Manual Send

- Use Formspree as the capture tool
- Send welcome sequence manually from personal email or Gmail mail merge
- Good for testing before committing to a platform

---

## Monthly "Fragment" Email Template

**Subject:** Fragment — [Month Year]

**Body sections:**
1. **Personal story from Elison** (2-3 paragraphs, raw, unpolished)
2. **Exclusive preview or demo** (private SoundCloud / Dropbox link for Inner Circle; public link for Outer World)
3. **Community highlight** (best fan comment, cover, or art — with permission)

**Send cadence:** 1st of every month

---

## Direct Reply Tracking

### How to capture replies today (Formspree)

Formspree sends submission notifications to the configured email. Replies come back to Elison's regular inbox.

**To track who gets a personal reply:**

1. Add a note in the Formspree dashboard or a simple spreadsheet:
   - Email | Tier | Date Joined | Replied? | Reply Sent Date
2. Or upgrade to Buttondown / ConvertKit where reply tracking is native

### Recommended: Buttondown "Replies" Feature

- Buttondown surfaces subscriber replies in the dashboard
- You can see who replied and respond directly from the UI
- Tag engaged subscribers as `replied` for future segmentation

---

## Migration Path (Formspree → Buttondown)

| Step | Action |
|------|--------|
| 1 | Continue collecting via Formspree (site is live now) |
| 2 | Weekly: export Formspree submissions as CSV |
| 3 | Import into Buttondown, tag by `tier` column |
| 4 | Set up welcome automation in Buttondown |
| 5 | Switch site form action to Buttondown API (optional — keeps same UX) |
| 6 | Sunset Formspree once Buttondown is fully operational |

---

## Files Changed

- `src/sections/Connection.tsx` — tier UI, state, form field, confirmation

## No New Dependencies

Uses existing React + Tailwind + Formspree stack. No npm packages added.
