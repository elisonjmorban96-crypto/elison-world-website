# Elison's World — MVP v1 Scope (FROZEN)
## May 7, 2026

**Status:** ✅ COMMITTED, ✅ DEPLOYED, 🔄 POLISHING  
**Live URL:** https://elisonworld.com/world/  
**Repo:** https://github.com/elisonjmorban96-crypto/elison-world-website  

---

## FROZEN SCOPE — DO NOT EXPAND

### What's In (MVP v1)

| Feature | Status | Notes |
|---------|--------|-------|
| ROOM 001: THE CLEARING | ✅ Live | Full immersive room |
| 4 Relics (feather, shell, mask, key) | ✅ Live | Real lyric fragments from Déjame Perderme |
| Cracked Heart unlock | ✅ Live | Phoenix rises, song plays |
| Full song reveal | ✅ Live | Déjame Perderme with visualizer |
| Postcards email capture | ✅ Live | Formspree integration |
| localStorage progress save | ✅ Live | Returns show collected relics |
| Mobile-first responsive | ✅ Live | Tested on iPhone |
| AudioManager (Web Audio API) | ✅ Live | Howler.js fallback |
| Particle effects | ✅ Live | Fireflies, ambient drift |

### What's Out (Post-MVP)

| Feature | Planned For | Status |
|---------|-------------|--------|
| Room 002 (The Jungle) | v2 | ❌ Not started |
| Score/stats system | v2 | ❌ Not started |
| Branching paths | v2 | ❌ Not started |
| Cloud save | v2 | ❌ Not started |
| Inventory system | v3 | ❌ Not started |
| Multiplayer/leaderboards | Future | ❌ Not started |
| Mobile app (Capacitor) | Future | ❌ Not started |

---

## POLISH CHECKLIST (Before v2)

### Audio
- [x] Preload first relic sound to reduce tap latency
- [x] Add mute/unmute persistence across sessions
- [ ] Test audio on low-end Android devices

### Visual
- [ ] Add loading state for song playback
- [ ] Smooth transition between landing page and /world/
- [ ] Test heart unlock animation on older iPhones

### Interaction
- [ ] Add haptic feedback on relic tap (if supported)
- [x] Prevent double-tap zoom on mobile
- [ ] Test with screen reader (accessibility)

### Performance
- [ ] Lazy load song audio (only on unlock)
- [ ] Compress particle canvas for low-end devices
- [ ] Add reduced-motion support

### Bugs
- [ ] Fix empty string src warning in build
- [ ] Verify email capture works end-to-end
- [ ] Test localStorage clear/reset flow

### World Map (New)
- [x] Add mystical map teaser after Room 001 completion
- [x] Show 5 locations with locked/unlocked/completed states
- [x] Gold paths, teal shadows, parchment styling
- [x] Mobile-first responsive

---

## DEPLOYMENT LOG

| Date | Action | Result |
|------|--------|--------|
| May 7, 2026 | Commit to GitHub | ✅ ad6428a |
| May 7, 2026 | Deploy to Vercel | ✅ elisonworld.com |
| May 7, 2026 | Verify /world/ route | ✅ 200 OK |

---

## NEXT STEPS (After Polish)

1. **Room 002 Design Doc** — The Jungle, rhythm mechanics
2. **Asset creation** — 4 new relics, ambient audio, song stems
3. **Build Room 002** — Parallel to v1 polish
4. **v2 Deploy** — When Room 002 + polish complete

---

**DO NOT BUILD ROOM 002 UNTIL v1 POLISH IS COMPLETE.**

**DO NOT ADD FEATURES TO v1.**

**POLISH → TEST → SHIP v1 → THEN PLAN v2.**
