# Elison's World — Game Design Document
## A Hidden Music Universe

**Version:** 0.1  
**Date:** May 7, 2026  
**Status:** Draft — Room 001 Complete, Rooms 002+ In Design  

---

## 1. CORE CONCEPT

**Genre:** Atmospheric puzzle-adventure / Hidden object / Musical narrative  
**Platform:** Web (mobile-first, PWA-ready)  
**Target Session:** 5–15 minutes per room  
**Monetization:** None — artist brand experience, lead capture at exit points  

**The Hook:**  
> "Your music is hidden in a world. Find it."

Each room contains fragments of an unreleased song. Players tap hidden relics, solve environmental puzzles, and unlock the full track. The deeper they go, the more of Elison's universe they discover.

---

## 2. NARRATIVE FRAMEWORK

### The Story Layer (Light Touch)

The game doesn't explain much. It implies. Players piece together:

- Elison is a creator who built worlds
- Each world holds a song, a memory, a truth
- The Phoenix is a recurring symbol — rebirth through creation
- "Déjame Perderme" is the first key. More songs await in deeper rooms.

### Narrative Delivery

| Method | Example |
|--------|---------|
| Relic lyric fragments | "She don't need a map..." |
| Environmental text | Crumbling wall: "He built this alone" |
| Audio cues | Distant thunder before a reveal |
| Visual storytelling | Ruins of a studio, a broken microphone |
| Postcard messages | "From the jungle where it started" |

**Rule:** Never more than 2 sentences of text per screen. Let the environment speak.

---

## 3. WORLD STRUCTURE

### The Map (Planned)

```
SURFACE (elison-world.vercel.app)
├── Landing page — "Enter the Universe"
└── /world/ — Game entry
    ├── ROOM 001: THE CLEARING ✓ COMPLETE
    │   ├── Song: "Déjame Perderme"
    │   ├── Relics: 4 (feather, shell, mask, key)
    │   ├── Unlock: Phoenix + full song
    │   └── Exit: Distant doorway glow → Room 002
    ├── ROOM 002: THE JUNGLE ⏳ DESIGN
    │   ├── Song: [TBD — next single]
    │   ├── Mechanic: Rhythm tap + pattern memory
    │   └── Theme: Overgrown, humid, alive
    ├── ROOM 003: THE RUINS ⏳ CONCEPT
    │   ├── Song: [TBD]
    │   ├── Mechanic: Inventory puzzle (key from 001)
    │   └── Theme: Crumbled studio, nostalgia
    ├── ROOM 004: THE OBSERVATORY ⏳ CONCEPT
    │   ├── Song: [TBD]
    │   ├── Mechanic: Star constellation + audio mixing
    │   └── Theme: Night sky, cosmic, infinite
    └── THE NEXUS (final room)
        ├── All songs unlocked → secret track
        └── "Postcards from Elison's World" email capture
```

### Room Naming Convention

- Format: "ROOM ###: THE [PLACE]"
- All caps, evocative, single word where possible
- Subtitle hints at the mechanic

---

## 4. MECHANICS

### 4.1 Core Loop (Per Room)

```
ENTER → EXPLORE → DISCOVER → COLLECT → SOLVE → UNLOCK → EXIT
```

| Phase | Action | Time |
|-------|--------|------|
| Enter | Fade in, ambient audio starts | 2s |
| Explore | Player looks around, taps environment | 30-60s |
| Discover | Finds first relic, audio cue plays | — |
| Collect | Taps all relics, lyric fragments revealed | 60-120s |
| Solve | Heart unlocks, phoenix rises | 5s animation |
| Unlock | Full song plays, visualizer active | 3-5 min |
| Exit | Doorway glows, tap to next room | — |

### 4.2 Interaction Types

| Type | Description | Used In |
|------|-------------|---------|
| Tap | Single tap to reveal / collect | All rooms |
| Hold | Long press to activate | Room 003 (power up ancient gear) |
| Swipe | Drag to connect / draw | Room 004 (constellation lines) |
| Rhythm | Tap in time with beat | Room 002 (drum patterns) |
| Sequence | Repeat pattern | Room 003 (melody memory) |
| Mix | Drag sliders to blend audio | Room 004 (layer stems) |

### 4.3 Progression System

**Per-Room Progress:**
- 4 relics per room (standard)
- Progress dots at bottom of screen
- Heart in center tracks completion

**Global Progress:**
- Rooms unlocked: shown on map screen
- Songs collected: playlist view
- Secrets found: counter (hidden achievements)
- Postcards sent: email capture count

**Save System:**
- localStorage for progress
- Optional: email + password for cloud save
- Guest mode: progress lost on clear

---

## 5. ROOM DEEP DIVES

### ROOM 001: THE CLEARING ✓ COMPLETE

**Theme:** Twilight beach, liminal space between day and night  
**Song:** "Déjame Perderme"  
**Mood:** Mysterious, inviting, slightly melancholic  

**Layout:**
- Full-screen immersive (no scroll)
- 4 relics positioned in diamond pattern
- Heart in center (locked → unlocked)
- Minimal UI: room title, mute button, progress dots

**Relics:**

| Relic | Position | Lyric Fragment | Sound Cue |
|-------|----------|----------------|-----------|
| Broken Phoenix Feather | Top-left | "She don't need a map..." | Chorus vocal snippet |
| Glowing Shell | Top-right | "She makes love feel like home..." | Sub-bass + dembow |
| Gold Mask | Bottom-left | "No sé qué tiene pero se siente real..." | Verse 1 snippet |
| Floating Key | Bottom-right | "Let me get lost where she goes..." | Bridge snippet |

**Unlock Sequence:**
1. All 4 relics found → heart pulses orange/gold
2. Tap heart → crack widens, lock breaks
3. Phoenix rises from center (SVG animation, 2s)
4. "Play Déjame Perderme" button appears
5. Song plays with audio visualizer bars
6. Exit doorway glows faintly at bottom

**Post-Unlock:**
- Song continues playing
- Visualizer active
- Tap doorway → transition to Room 002

---

### ROOM 002: THE JUNGLE ⏳ IN DESIGN

**Theme:** Dense, humid, alive — overgrown with sound  
**Song:** [Next single — TBD]  
**Mood:** Energetic, tribal, rhythmic  

**New Mechanic: Rhythm Tap**
- Hidden drum circles in the environment
- Tap in time with the ambient beat
- Success builds a rhythm layer into the song
- Failure: sound dampens, try again

**Layout:**
- Vertical scroll (first scroll room)
- Canopy overhead, roots below
- Fireflies as interactive beat-markers
- Hidden paths behind leaves (swipe to clear)

**Relics (Draft):**

| Relic | Position | Mechanic | Lyric Fragment |
|-------|----------|----------|----------------|
| Tribal Drum | Hidden behind leaves | Rhythm tap 8 beats | "The jungle has a heartbeat..." |
| Crystal Frog | On lily pad in swamp | Hold to charge croak | "Every sound is a signal..." |
| Vine-Wrapped Mic | Hanging from canopy | Swipe to unwrap | "I recorded this in the dark..." |
| Ancient Flute | Inside hollow log | Sequence: repeat 5 notes | "The melody came first..." |

**Unlock Sequence:**
1. All 4 relics collected → drum circle forms in center
2. Rhythm challenge: tap 16 beats in time
3. Success: song layers build, full track plays
4. Jungle opens — path to Room 003 revealed

**Environmental Audio:**
- Cicadas, distant thunder, running water
- Beat gradually emerges from ambient noise
- Player's taps add percussion layers

---

### ROOM 003: THE RUINS ⏳ CONCEPT

**Theme:** Crumbled creator studio, nostalgia, dust  
**Song:** [TBD — possibly slower, reflective track]  
**Mood:** Bittersweet, intimate, abandoned  

**New Mechanic: Inventory + Environmental Puzzle**
- Items from previous rooms carry over
- Floating Key (from 001) unlocks a door
- Broken Phoenix Feather repairs a torch
- Glowing Shell reveals hidden text

**Layout:**
- Multi-screen (left/right scroll)
- Collapsed walls, broken equipment
- Dark areas need light sources
- Hidden journal entries (Elison's notes)

**Puzzle Example:**
```
Dark corridor → Use Phoenix Feather → Light torch
Lit corridor → See mural → Mural shows shell shape
Mural → Tap Glowing Shell → Shell illuminates hidden door
Door → Use Floating Key → Opens to studio
Studio → Find 4 relics among broken gear
```

---

### ROOM 004: THE OBSERVATORY ⏳ CONCEPT

**Theme:** Night sky, cosmic, infinite perspective  
**Song:** [TBD — epic, expansive]  
**Mood:** Awe, wonder, smallness  

**New Mechanic: Constellation Drawing + Stem Mixing**
- Connect stars to form constellation shapes
- Each constellation unlocks a song stem (drums, bass, vocals, synth)
- Mix stems with sliders to create your version
- Your mix plays during unlock sequence

**Layout:**
- 360° drag to rotate sky
- Zoom in/out for different star layers
- Horizon shows all previous rooms as tiny lights

---

## 6. AUDIO DESIGN

### Principles

1. **Every tap makes sound** — no silent interactions
2. **Ambient layers build** — room gets richer as you progress
3. **Song stems as rewards** — each relic adds a layer
4. **Full song = ultimate reward** — only plays at unlock

### Audio Layers Per Room

| Layer | Source | Triggers |
|-------|--------|----------|
| Ambient | Room-specific (waves, jungle, wind) | Always on |
| Relic | Song stem snippet | Tap relic |
| Interaction | UI sounds (tap, unlock, transition) | Player action |
| Build | Layered stems combining | 2+ relics found |
| Full Song | Complete track | Heart unlock |

### Technical

- Web Audio API for low-latency playback
- Howler.js for cross-browser compatibility
- MP3 + OGG formats
- Preload: ambient + first relic only
- Stream: full song on unlock

---

## 7. VISUAL DESIGN

### Color Palette (Per Room)

| Room | Primary | Secondary | Accent | Background |
|------|---------|-----------|--------|------------|
| 001 Clearing | Teal (#0A6464) | Gold (#D4A853) | Orange (#E86A33) | Deep navy (#0F1F2F) |
| 002 Jungle | Emerald (#0A8C5A) | Jade (#1EBC9B) | Gold (#D4A853) | Dark green (#0A1F0F) |
| 003 Ruins | Rust (#B85C3E) | Dust (#C4A882) | Amber (#E8A838) | Charcoal (#1A1A1A) |
| 004 Observatory | Midnight (#0A0A1F) | Starlight (#E8E8F0) | Nebula (#9B59B6) | Black (#050505) |

### Typography

- **Headings:** Oswald (condensed, bold, uppercase)
- **Body:** Inter (clean, readable)
- **Lyrics:** Cursive/script (personal, handwritten feel)
- **UI:** 9px uppercase for labels (minimal)

### Animation Principles

- **Easing:** Ease-out for reveals, ease-in-out for loops
- **Duration:** 200ms micro, 800ms standard, 2000ms dramatic
- **Stagger:** 100ms between sequential elements
- **Performance:** CSS animations only, no JS animation loops

---

## 8. TECHNICAL ARCHITECTURE

### Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Audio | Web Audio API + Howler.js |
| State | React Context + localStorage |
| Routing | React Router (hash routes for rooms) |
| Deploy | Vercel |

### File Structure

```
src/
  world/
    WorldApp.tsx          # Entry point
    WorldContext.tsx      # Global state
    AudioManager.ts       # Audio engine
    useParticles.ts       # Particle system
    rooms/
      Clearing.tsx        # Room 001 ✓
      Jungle.tsx          # Room 002 ⏳
      Ruins.tsx           # Room 003 ⏳
      Observatory.tsx     # Room 004 ⏳
    components/
      InteractiveObject.tsx
      Heart.tsx
      ProgressDots.tsx
      AudioVisualizer.tsx
      PostcardSignup.tsx
  pages/
    LandingPage.tsx
    WorldPage.tsx
```

### Performance Targets

- First paint: < 1.5s
- Time to interactive: < 3s
- Audio latency: < 50ms
- 60fps on mid-tier mobile
- Total bundle: < 500KB (excluding audio)

---

## 9. MONETIZATION & LEADS

### No Direct Monetization

This is a brand experience, not a product. Revenue comes indirectly:

| Touchpoint | Action | Destination |
|------------|--------|-------------|
| Postcard signup | Email capture | Mailchimp/ConvertKit |
| "Enter the Universe" CTA | External link | devhouseai.com |
| Song unlock | Spotify pre-save | Spotify profile |
| Final room | "Book Elison" | Calendly |
| Share button | Social share | Twitter/Instagram |

### Email Capture (Postcards)

- Trigger: After first song unlock, or at Nexus
- Copy: "Send me postcards from new rooms"
- Fields: Email only (minimal friction)
- Incentive: "Be first to enter new rooms"

---

## 10. POST-LAUNCH ROADMAP

### Phase 1: Room 002 (2–3 weeks)
- Design complete
- Audio assets ready
- Build + test
- Deploy as update

### Phase 2: Rooms 003–004 (4–6 weeks)
- Parallel development
- Inventory system
- Cloud save

### Phase 3: The Nexus + Secrets (2 weeks)
- Final room
- Hidden achievements
- Easter eggs

### Phase 4: Mobile App (Future)
- React Native or Capacitor
- Push notifications for new rooms
- Offline play

---

## 11. SUCCESS METRICS

| Metric | Target | Tracking |
|--------|--------|----------|
| Session duration | > 5 min | GA4 |
| Room completion rate | > 60% | Custom event |
| Email capture rate | > 15% | Form submission |
| Return visits | > 30% | localStorage + GA4 |
| Social shares | > 5% | Share button clicks |
| Song plays | > 80% of completions | Audio event |

---

## 12. OPEN QUESTIONS

1. **Room 002 song:** Which track? Next single or existing?
2. **Cloud save:** Worth the complexity for v1?
3. **Multiplayer:** Any async elements (leaderboards, shared discoveries)?
4. **Accessibility:** How to make audio puzzles work for deaf players?
5. **Performance:** Audio file sizes — streaming vs. preloading strategy?
6. **SEO:** How to make /world/ indexable while keeping game feel?

---

## APPENDIX A: ASSET INVENTORY

### Room 001 (Complete)

| Asset | Type | Size | Location |
|-------|------|------|----------|
| déjame-perderme.mp3 | Audio | 5.5MB | /audio/ |
| phoenix-feather.svg | Vector | 12KB | Inline |
| shell.svg | Vector | 8KB | Inline |
| mask.svg | Vector | 15KB | Inline |
| key.svg | Vector | 10KB | Inline |
| heart.svg | Vector | 6KB | Inline |
| phoenix-full.svg | Vector | 20KB | Inline |

### Needed for Room 002

- [ ] Jungle ambient loop (30s, seamless)
- [ ] Drum sample kit (8 sounds)
- [ ] Next single audio file
- [ ] 4 new relic SVGs
- [ ] Jungle background layers (CSS or image)
- [ ] Firefly particle sprites

---

*Document status: Draft v0.1 — ready for review and iteration*
