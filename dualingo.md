# Dualingo — Persian ↔ English (iOS + Android)

A Duolingo-style bidirectional language app:

- **Persian for English speakers** (Farsi from scratch, with RTL + transliteration)
- **English for Persian speakers** (LTR, with Persian translations & tips)

Same codebase, same engine, just a flipped content direction. Built with
**React Native + Expo** to match the rest of the apps in this repo.

This doc covers the full gamification stack — XP, streaks, hearts, gems,
daily goal, crown levels, leagues, achievements, SRS review, and the
notification ladder.

---

## 1. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React Native (Expo SDK 51+) | One codebase → iOS + Android |
| Language | TypeScript | Type-safe content schema |
| Navigation | `@react-navigation/native` + stack/tabs | Standard mobile nav |
| State | Zustand | Tiny, persistable global store |
| Storage | `@react-native-async-storage/async-storage` | All progress local-first |
| Notifications | `expo-notifications` | Local + push streak nudges |
| Audio | `expo-av` + `expo-speech` | SFX + word pronunciation TTS |
| Haptics | `expo-haptics` | Correct/wrong feedback |
| Animation | `react-native-reanimated` v3 | Smooth lesson UI |
| Fonts | `expo-font` (Vazirmatn + Inter) | Excellent Persian + Latin |
| Icons | `@expo/vector-icons` | Lucide/Ionicons mascot stand-ins |

---

## 2. Project Setup

```bash
npx create-expo-app@latest dualingo --template blank-typescript
cd dualingo

npx expo install \
  @react-navigation/native @react-navigation/native-stack \
  @react-navigation/bottom-tabs react-native-screens \
  react-native-safe-area-context react-native-gesture-handler \
  react-native-reanimated expo-status-bar expo-font \
  expo-notifications expo-av expo-speech expo-haptics \
  @react-native-async-storage/async-storage @expo/vector-icons \
  zustand
```

**`babel.config.js`**

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'], // last
  };
};
```

**`app.json`** (essentials)

```json
{
  "expo": {
    "name": "Dualingo",
    "slug": "dualingo",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "splash": { "image": "./assets/splash.png", "backgroundColor": "#58cc02" },
    "ios": {
      "bundleIdentifier": "com.yourname.dualingo",
      "supportsTablet": true,
      "infoPlist": { "UIBackgroundModes": ["remote-notification"] }
    },
    "android": {
      "package": "com.yourname.dualingo",
      "useNextNotificationsApi": true,
      "permissions": ["NOTIFICATIONS", "VIBRATE"]
    },
    "plugins": [
      ["expo-notifications", { "icon": "./assets/notif.png", "color": "#58cc02" }]
    ]
  }
}
```

---

## 3. File Layout

```
dualingo/
├── App.tsx
├── src/
│   ├── theme.ts
│   ├── i18n/
│   │   ├── ui-strings.ts          ← UI labels per UI language
│   │   └── rtl.ts                 ← LTR/RTL helpers
│   ├── content/
│   │   ├── types.ts               ← Course / Unit / Lesson / Exercise schema
│   │   ├── persian-for-en.ts      ← Course: EN-speaker → Persian
│   │   ├── english-for-fa.ts      ← Course: FA-speaker → English
│   │   └── index.ts               ← Course registry
│   ├── game/
│   │   ├── store.ts               ← Zustand state (persisted)
│   │   ├── xp.ts                  ← XP rules, crown levels
│   │   ├── streak.ts              ← Streak logic + freeze
│   │   ├── hearts.ts              ← 5-heart system + regen
│   │   ├── league.ts              ← Weekly leagues
│   │   ├── achievements.ts        ← Badge unlock rules
│   │   └── srs.ts                 ← Spaced-repetition (Leitner-lite)
│   ├── lesson/
│   │   ├── engine.ts              ← Exercise queue + grading
│   │   ├── exercises/
│   │   │   ├── MultipleChoice.tsx
│   │   │   ├── Translate.tsx
│   │   │   ├── Match.tsx
│   │   │   ├── Listen.tsx
│   │   │   └── Speak.tsx
│   │   └── LessonScreen.tsx
│   ├── notifications/
│   │   ├── schedule.ts            ← Notification ladder
│   │   └── handlers.ts
│   ├── screens/
│   │   ├── OnboardingScreen.tsx
│   │   ├── PathScreen.tsx         ← The vertical skill tree
│   │   ├── LeaguesScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── ShopScreen.tsx
│   │   ├── ReviewScreen.tsx       ← SRS practice
│   │   └── SettingsScreen.tsx
│   ├── components/
│   │   ├── Mascot.tsx
│   │   ├── XPBar.tsx
│   │   ├── HeartsCounter.tsx
│   │   ├── StreakFlame.tsx
│   │   ├── GemCounter.tsx
│   │   ├── ChoiceButton.tsx
│   │   ├── BigButton.tsx
│   │   └── ConfettiBurst.tsx
│   └── audio/
│       └── sfx.ts
└── assets/
    ├── fonts/
    │   ├── Vazirmatn-Regular.ttf
    │   ├── Vazirmatn-Bold.ttf
    │   ├── Inter-Regular.ttf
    │   └── Inter-Bold.ttf
    └── sfx/
        ├── correct.mp3
        ├── wrong.mp3
        ├── levelup.mp3
        └── streak.mp3
```

---

## 4. Brand & Theme

**`src/theme.ts`**

```ts
export const C = {
  // Brand
  primary:        '#58cc02', // signature green
  primaryDark:    '#46a302',
  primaryShadow:  '#3a8500',

  // Accents
  blue:           '#1cb0f6', // listening
  purple:         '#ce82ff', // legendary
  orange:         '#ff9600', // streak flame
  red:            '#ff4b4b', // hearts / wrong
  gold:           '#ffc800', // XP / gems
  teal:           '#00cd9c',

  // Neutrals
  bg:             '#ffffff',
  bgDim:          '#f7f7f7',
  card:           '#ffffff',
  border:         '#e5e5e5',
  text:           '#3c3c3c',
  textMuted:      '#777777',
  disabled:       '#e5e5e5',
  disabledText:   '#afafaf',

  // Dark theme
  darkBg:         '#131f24',
  darkCard:       '#1f2c34',
  darkText:       '#f7f7f7',
};

export const RADII = { sm: 8, md: 12, lg: 16, pill: 999 };

export const FONTS = {
  latin:        'Inter',
  latinBold:    'InterBold',
  persian:      'Vazirmatn',
  persianBold:  'VazirmatnBold',
};

/** Pick a font family based on whether the text contains Persian characters. */
export function pickFont(text: string, bold = false): string {
  const hasPersian = /[؀-ۿ]/.test(text);
  if (hasPersian) return bold ? FONTS.persianBold : FONTS.persian;
  return bold ? FONTS.latinBold : FONTS.latin;
}
```

---

## 5. Bidirectional Content Schema

The schema is direction-agnostic: one set of "vocabulary pairs" + exercise
templates. The runtime picks which side is the **prompt** (the language
the learner already knows) and which is the **answer** (the language being
learned).

**`src/content/types.ts`**

```ts
export type Lang = 'en' | 'fa';

export type Vocab = {
  id: string;
  en: string;
  fa: string;
  faTranslit: string;        // e.g. "Salām"
  pos: 'noun' | 'verb' | 'phrase' | 'adj' | 'pronoun';
  audio?: { en?: string; fa?: string }; // url or require()
  notes?: string;
};

export type ExerciseDef =
  | { kind: 'mcq';        vocabId: string; distractors: number }       // pick the right translation
  | { kind: 'translate';  vocabId: string; from: Lang }                // build sentence from word bank
  | { kind: 'listen';     vocabId: string }                            // hear → type/select
  | { kind: 'match';      vocabIds: string[] }                         // 5-pair match
  | { kind: 'speak';      vocabId: string };                           // record & compare

export type Lesson = {
  id: string;
  title: { en: string; fa: string };
  vocabIds: string[];           // vocab introduced
  exercises: ExerciseDef[];     // ~12–16 per lesson
  xpReward: number;             // base XP (×2 if first time perfect)
};

export type Unit = {
  id: string;
  index: number;                // for the path UI
  title: { en: string; fa: string };
  color: keyof typeof import('../theme').C;
  description: { en: string; fa: string };
  lessons: Lesson[];
  checkpointId?: string;        // optional "unit review" lesson id
};

export type Course = {
  id: 'persian-for-en' | 'english-for-fa';
  uiLang: Lang;          // what UI is shown in
  learnLang: Lang;       // what the user is learning
  promptLang: Lang;      // same as uiLang
  vocabulary: Record<string, Vocab>;
  units: Unit[];
};
```

**`src/content/persian-for-en.ts`** (sample slice — full course in repo)

```ts
import { Course, Vocab } from './types';

const V = (v: Vocab) => v;

const vocab: Vocab[] = [
  V({ id: 'hello',    en: 'hello',    fa: 'سلام',    faTranslit: 'salām',     pos: 'phrase' }),
  V({ id: 'bye',      en: 'goodbye',  fa: 'خداحافظ', faTranslit: 'khodāhāfez', pos: 'phrase' }),
  V({ id: 'thanks',   en: 'thank you',fa: 'ممنون',   faTranslit: 'mamnūn',    pos: 'phrase' }),
  V({ id: 'yes',      en: 'yes',      fa: 'بله',     faTranslit: 'bale',      pos: 'phrase' }),
  V({ id: 'no',       en: 'no',       fa: 'نه',      faTranslit: 'na',        pos: 'phrase' }),
  V({ id: 'i',        en: 'I',        fa: 'من',      faTranslit: 'man',       pos: 'pronoun' }),
  V({ id: 'you',      en: 'you',      fa: 'تو',      faTranslit: 'to',        pos: 'pronoun' }),
  V({ id: 'water',    en: 'water',    fa: 'آب',      faTranslit: 'āb',        pos: 'noun' }),
  V({ id: 'bread',    en: 'bread',    fa: 'نان',     faTranslit: 'nān',       pos: 'noun' }),
  V({ id: 'mother',   en: 'mother',   fa: 'مادر',    faTranslit: 'mādar',     pos: 'noun' }),
  V({ id: 'father',   en: 'father',   fa: 'پدر',     faTranslit: 'pedar',     pos: 'noun' }),
  V({ id: 'good',     en: 'good',     fa: 'خوب',     faTranslit: 'khūb',      pos: 'adj' }),
];

export const PERSIAN_FOR_EN: Course = {
  id: 'persian-for-en',
  uiLang: 'en',
  learnLang: 'fa',
  promptLang: 'en',
  vocabulary: Object.fromEntries(vocab.map(v => [v.id, v])),
  units: [
    {
      id: 'u1',
      index: 1,
      title:       { en: 'Greetings',   fa: 'احوال‌پرسی' },
      color: 'primary',
      description: { en: 'Say hi and bye', fa: 'سلام و خداحافظی' },
      lessons: [
        {
          id: 'u1l1',
          title: { en: 'Hi & Bye', fa: 'سلام و خداحافظ' },
          vocabIds: ['hello', 'bye', 'thanks'],
          xpReward: 10,
          exercises: [
            { kind: 'mcq',       vocabId: 'hello',  distractors: 3 },
            { kind: 'listen',    vocabId: 'hello' },
            { kind: 'mcq',       vocabId: 'bye',    distractors: 3 },
            { kind: 'translate', vocabId: 'thanks', from: 'en' },
            { kind: 'match',     vocabIds: ['hello','bye','thanks','yes','no'] },
            { kind: 'speak',     vocabId: 'hello' },
          ],
        },
        // …more lessons
      ],
    },
    // …Unit 2: Family, Unit 3: Food, etc.
  ],
};
```

**`src/content/english-for-fa.ts`** is the same data shape with
`uiLang: 'fa'`, `learnLang: 'en'`, `promptLang: 'fa'`. Because vocab is
bidirectional, you can reuse the same vocabulary table — only the units /
exercise ordering changes.

**`src/content/index.ts`**

```ts
import { PERSIAN_FOR_EN } from './persian-for-en';
import { ENGLISH_FOR_FA } from './english-for-fa';
import { Course } from './types';

export const COURSES: Record<Course['id'], Course> = {
  'persian-for-en': PERSIAN_FOR_EN,
  'english-for-fa': ENGLISH_FOR_FA,
};
```

---

## 6. Global State (Zustand, persisted)

**`src/game/store.ts`**

```ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Course } from '../content/types';

export type SrsCard = {
  vocabId: string;
  bucket: 0 | 1 | 2 | 3 | 4 | 5; // 0=new, 5=mastered
  dueAt: number;                  // epoch ms
  lastSeenAt: number;
  correct: number;
  wrong: number;
};

export type State = {
  // Onboarding
  courseId: Course['id'] | null;

  // Resources
  xp: number;
  xpByDay: Record<string, number>;   // 'YYYY-MM-DD' → xp
  gems: number;
  hearts: number;                    // 0..5
  heartsRefillAt: number | null;     // epoch ms when next heart returns
  streakFreezes: number;             // how many freeze items in inventory

  // Streak
  streak: number;
  longestStreak: number;
  lastActiveDay: string | null;      // 'YYYY-MM-DD'

  // Daily goal
  dailyGoal: 10 | 20 | 30 | 50;

  // Progress
  completedLessons: Record<string, { count: number; crowns: number; lastCompletedAt: number }>;
  crownTotal: number;

  // League
  league: {
    tier: number;                    // 0..9 (Bronze..Diamond)
    cohortId: string | null;
    weekKey: string | null;          // ISO week, e.g. '2026-W21'
    weeklyXp: number;
    promotedThisWeek: boolean;
  };

  // SRS
  srs: Record<string, SrsCard>;

  // Achievements
  achievements: Record<string, { tier: number; unlockedAt: number }>;

  // Settings
  settings: {
    sound: boolean;
    haptics: boolean;
    notifications: boolean;
    reminderHour: number;            // 0..23 local time
    darkMode: boolean;
  };
};

const initial: State = {
  courseId: null,
  xp: 0, xpByDay: {}, gems: 500, hearts: 5, heartsRefillAt: null, streakFreezes: 2,
  streak: 0, longestStreak: 0, lastActiveDay: null,
  dailyGoal: 20,
  completedLessons: {}, crownTotal: 0,
  league: { tier: 0, cohortId: null, weekKey: null, weeklyXp: 0, promotedThisWeek: false },
  srs: {},
  achievements: {},
  settings: { sound: true, haptics: true, notifications: true, reminderHour: 19, darkMode: false },
};

export type Actions = {
  setCourse: (id: Course['id']) => void;
  reset: () => void;
  patch: (p: Partial<State>) => void;
  patchSettings: (p: Partial<State['settings']>) => void;
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initial,
      setCourse: (id) => set({ courseId: id }),
      reset: () => set(initial),
      patch: (p) => set(p as any),
      patchSettings: (p) => set(s => ({ settings: { ...s.settings, ...p } })),
    }),
    { name: 'dualingo:v1', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
```

---

## 7. XP, Crowns & Daily Goal

**`src/game/xp.ts`**

```ts
import { useStore } from './store';

export const CROWN_LEVELS = 5; // per lesson, like Duolingo
export const LEGENDARY = 6;    // optional purple tier

export const XP_RULES = {
  baseLesson: 10,
  perfectBonus: 5,              // no mistakes
  speedBonus: 3,                // < 2 minutes
  goalMetMultiplier: 2,         // 2× XP for the next lesson after meeting daily goal? (optional)
};

const todayKey = () => new Date().toISOString().slice(0, 10);

export function awardLessonXp(args: {
  baseXp: number;
  perfect: boolean;
  underTwoMinutes: boolean;
}): number {
  let xp = args.baseXp;
  if (args.perfect)         xp += XP_RULES.perfectBonus;
  if (args.underTwoMinutes) xp += XP_RULES.speedBonus;

  const s = useStore.getState();
  const day = todayKey();
  const xpByDay = { ...s.xpByDay, [day]: (s.xpByDay[day] ?? 0) + xp };
  useStore.setState({
    xp: s.xp + xp,
    xpByDay,
    league: { ...s.league, weeklyXp: s.league.weeklyXp + xp },
  });
  return xp;
}

export function todayProgress(): { xp: number; goal: number; pct: number } {
  const s = useStore.getState();
  const xp = s.xpByDay[todayKey()] ?? 0;
  const pct = Math.min(1, xp / s.dailyGoal);
  return { xp, goal: s.dailyGoal, pct };
}

export function recordCrown(lessonId: string): { crowns: number; leveledUp: boolean } {
  const s = useStore.getState();
  const cur = s.completedLessons[lessonId] ?? { count: 0, crowns: 0, lastCompletedAt: 0 };
  const next = {
    count: cur.count + 1,
    crowns: Math.min(CROWN_LEVELS, cur.crowns + 1),
    lastCompletedAt: Date.now(),
  };
  const leveledUp = next.crowns > cur.crowns;
  useStore.setState({
    completedLessons: { ...s.completedLessons, [lessonId]: next },
    crownTotal: s.crownTotal + (leveledUp ? 1 : 0),
  });
  return { crowns: next.crowns, leveledUp };
}
```

---

## 8. Streak & Streak Freeze

**`src/game/streak.ts`**

```ts
import { useStore } from './store';

const dayKey = (d = new Date()) => d.toISOString().slice(0, 10);
const yesterdayKey = () => {
  const d = new Date(); d.setDate(d.getDate() - 1); return dayKey(d);
};

/** Call when daily goal is met. */
export function bumpStreak(): { streak: number; longest: number; isNew: boolean } {
  const s = useStore.getState();
  const today = dayKey();
  if (s.lastActiveDay === today) return { streak: s.streak, longest: s.longestStreak, isNew: false };

  const continued = s.lastActiveDay === yesterdayKey();
  const newStreak = continued ? s.streak + 1 : 1;
  const newLongest = Math.max(s.longestStreak, newStreak);
  useStore.setState({
    streak: newStreak,
    longestStreak: newLongest,
    lastActiveDay: today,
  });
  return { streak: newStreak, longest: newLongest, isNew: true };
}

/**
 * Apply at app launch: if the user missed yesterday AND has a freeze,
 * silently consume one freeze and keep the streak. Otherwise reset.
 */
export function reconcileStreakOnLaunch(): { broken: boolean; frozen: boolean } {
  const s = useStore.getState();
  const today = dayKey();
  if (!s.lastActiveDay || s.lastActiveDay === today) return { broken: false, frozen: false };

  // last active was yesterday → still alive, no action
  if (s.lastActiveDay === yesterdayKey()) return { broken: false, frozen: false };

  // missed at least one day
  if (s.streakFreezes > 0) {
    useStore.setState({
      streakFreezes: s.streakFreezes - 1,
      lastActiveDay: yesterdayKey(), // bridge the gap
    });
    return { broken: false, frozen: true };
  }
  useStore.setState({ streak: 0, lastActiveDay: null });
  return { broken: true, frozen: false };
}
```

---

## 9. Hearts (5-Heart System)

**`src/game/hearts.ts`**

```ts
import { useStore } from './store';

export const MAX_HEARTS = 5;
export const REFILL_MS = 30 * 60 * 1000;        // 30 min per heart
export const REFILL_COST_GEMS = 350;            // full refill

/** Lose a heart on wrong answer. Returns whether the lesson can continue. */
export function loseHeart(): { hearts: number; canContinue: boolean } {
  const s = useStore.getState();
  const hearts = Math.max(0, s.hearts - 1);
  let refillAt = s.heartsRefillAt;
  if (hearts < MAX_HEARTS && !refillAt) refillAt = Date.now() + REFILL_MS;
  useStore.setState({ hearts, heartsRefillAt: refillAt });
  return { hearts, canContinue: hearts > 0 };
}

/** Run on app launch / lesson start to apply free regen. */
export function regenHearts(): void {
  const s = useStore.getState();
  if (s.hearts >= MAX_HEARTS || !s.heartsRefillAt) return;
  const now = Date.now();
  const elapsed = now - s.heartsRefillAt;
  if (elapsed <= 0) return;
  const earned = Math.floor(elapsed / REFILL_MS) + 1;
  const hearts = Math.min(MAX_HEARTS, s.hearts + earned);
  const remainder = elapsed - (earned - 1) * REFILL_MS;
  const refillAt = hearts >= MAX_HEARTS ? null : now + (REFILL_MS - remainder);
  useStore.setState({ hearts, heartsRefillAt: refillAt });
}

export function refillWithGems(): boolean {
  const s = useStore.getState();
  if (s.gems < REFILL_COST_GEMS) return false;
  useStore.setState({
    gems: s.gems - REFILL_COST_GEMS,
    hearts: MAX_HEARTS,
    heartsRefillAt: null,
  });
  return true;
}
```

---

## 10. Leagues (Weekly Leaderboards)

**`src/game/league.ts`**

```ts
import { useStore } from './store';

export const LEAGUE_TIERS = [
  { name: 'Bronze',    color: '#cd7f32' },
  { name: 'Silver',    color: '#c0c0c0' },
  { name: 'Gold',      color: '#ffd700' },
  { name: 'Sapphire',  color: '#0f52ba' },
  { name: 'Ruby',      color: '#9b111e' },
  { name: 'Emerald',   color: '#50c878' },
  { name: 'Amethyst',  color: '#9966cc' },
  { name: 'Pearl',     color: '#eae0c8' },
  { name: 'Obsidian',  color: '#0b1215' },
  { name: 'Diamond',   color: '#b9f2ff' },
];

/** ISO week key, e.g. '2026-W21'. */
function isoWeekKey(d = new Date()): string {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (t.getUTCDay() + 6) % 7;
  t.setUTCDate(t.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((+t - +firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return `${t.getUTCFullYear()}-W${String(week).padStart(2,'0')}`;
}

/** Promote (top 3), demote (bottom 5), reset weekly XP. Server-side IRL — this is a local stub. */
export function endOfWeekRollover(rankInCohort: number): { tier: number; outcome: 'promoted'|'demoted'|'stay' } {
  const s = useStore.getState();
  let tier = s.league.tier;
  let outcome: 'promoted'|'demoted'|'stay' = 'stay';
  if (rankInCohort <= 3 && tier < LEAGUE_TIERS.length - 1) { tier++; outcome = 'promoted'; }
  else if (rankInCohort > 25 && tier > 0)                  { tier--; outcome = 'demoted'; }
  useStore.setState({
    league: { tier, cohortId: null, weekKey: isoWeekKey(), weeklyXp: 0, promotedThisWeek: outcome === 'promoted' },
  });
  return { tier, outcome };
}

/** Call at app launch — resets weeklyXp at the start of a new ISO week. */
export function maybeResetWeek(): void {
  const s = useStore.getState();
  const k = isoWeekKey();
  if (s.league.weekKey !== k) {
    useStore.setState({
      league: { ...s.league, weekKey: k, weeklyXp: 0, promotedThisWeek: false },
    });
  }
}
```

> In production, leagues live on the server: the client sends `weeklyXp`,
> the server assigns cohorts of 30 and ranks them. The local stub is fine
> for offline/MVP — just generate mock cohort entries from seeded RNG.

---

## 11. Spaced Repetition (Leitner-lite)

**`src/game/srs.ts`**

```ts
import { useStore, SrsCard } from './store';

// Bucket → next-review delay in ms
const SCHEDULE = [
  10 * 60 * 1000,            // 0 → 10 min
  4  * 60 * 60 * 1000,       // 1 → 4 h
  24 * 60 * 60 * 1000,       // 2 → 1 day
  3  * 24 * 60 * 60 * 1000,  // 3 → 3 days
  7  * 24 * 60 * 60 * 1000,  // 4 → 1 week
  30 * 24 * 60 * 60 * 1000,  // 5 → 1 month
];

export function seedCard(vocabId: string): void {
  const s = useStore.getState();
  if (s.srs[vocabId]) return;
  const card: SrsCard = {
    vocabId, bucket: 0, dueAt: Date.now(),
    lastSeenAt: 0, correct: 0, wrong: 0,
  };
  useStore.setState({ srs: { ...s.srs, [vocabId]: card } });
}

export function review(vocabId: string, correct: boolean): void {
  const s = useStore.getState();
  const c = s.srs[vocabId];
  if (!c) { seedCard(vocabId); return review(vocabId, correct); }
  const bucket = correct
    ? Math.min(5, c.bucket + 1) as SrsCard['bucket']
    : 0;
  const next: SrsCard = {
    ...c,
    bucket,
    dueAt: Date.now() + SCHEDULE[bucket],
    lastSeenAt: Date.now(),
    correct: c.correct + (correct ? 1 : 0),
    wrong:   c.wrong   + (correct ? 0 : 1),
  };
  useStore.setState({ srs: { ...s.srs, [vocabId]: next } });
}

export function dueCards(limit = 20): SrsCard[] {
  const now = Date.now();
  return Object.values(useStore.getState().srs)
    .filter(c => c.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt)
    .slice(0, limit);
}
```

---

## 12. Achievements

**`src/game/achievements.ts`**

```ts
import { useStore } from './store';

export type AchievementDef = {
  id: string;
  title: string;
  description: string;
  tiers: number[];      // thresholds, e.g. [3, 7, 14, 30, 50, 100, 365]
  metric: (s: ReturnType<typeof useStore.getState>) => number;
};

const wordsLearned = (s: ReturnType<typeof useStore.getState>) =>
  Object.values(s.srs).filter(c => c.bucket >= 3).length;

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'wildfire', title: 'Wildfire',     description: 'Reach a streak of',
    tiers: [3, 7, 14, 30, 50, 100, 365],   metric: s => s.streak },
  { id: 'scholar',  title: 'Scholar',      description: 'Learn vocabulary words',
    tiers: [10, 50, 100, 250, 500, 1000],  metric: wordsLearned },
  { id: 'sage',     title: 'Sage',         description: 'Earn total XP',
    tiers: [50, 250, 1000, 5000, 25000, 100000], metric: s => s.xp },
  { id: 'sharpshooter', title: 'Sharpshooter', description: 'Get N lessons with no mistakes',
    tiers: [3, 10, 25, 50, 100, 250],
    metric: s => Object.values(s.completedLessons).reduce((n, l) => n + (l.crowns >= 5 ? 1 : 0), 0) },
  { id: 'champion', title: 'Champion',     description: 'Finish top 3 in your league',
    tiers: [1, 5, 10, 25],
    metric: s => 0 /* server-tracked in real app */ },
];

/** Returns newly unlocked tier (1-indexed), or null. */
export function checkAchievement(id: string): number | null {
  const def = ACHIEVEMENTS.find(a => a.id === id);
  if (!def) return null;
  const s = useStore.getState();
  const value = def.metric(s);
  const currentTier = s.achievements[id]?.tier ?? 0;
  let newTier = currentTier;
  for (let i = currentTier; i < def.tiers.length; i++) {
    if (value >= def.tiers[i]) newTier = i + 1; else break;
  }
  if (newTier > currentTier) {
    useStore.setState({
      achievements: {
        ...s.achievements,
        [id]: { tier: newTier, unlockedAt: Date.now() },
      },
    });
    return newTier;
  }
  return null;
}

export function checkAllAchievements(): { id: string; tier: number }[] {
  return ACHIEVEMENTS
    .map(a => ({ id: a.id, tier: checkAchievement(a.id) ?? 0 }))
    .filter(x => x.tier > 0);
}
```

---

## 13. Lesson Engine

**`src/lesson/engine.ts`**

```ts
import { ExerciseDef, Lesson } from '../content/types';

export type GradeResult = {
  correct: boolean;
  expected?: string;
  given?: string;
};

export type LessonRun = {
  lesson: Lesson;
  queue: ExerciseDef[];     // FIFO; wrong answers get re-queued
  index: number;
  total: number;
  mistakes: number;
  startedAt: number;
  finished: boolean;
};

export function startRun(lesson: Lesson): LessonRun {
  return {
    lesson,
    queue: [...lesson.exercises],
    index: 0,
    total: lesson.exercises.length,
    mistakes: 0,
    startedAt: Date.now(),
    finished: false,
  };
}

/** Move to the next exercise; on wrong, push the current one back near the end. */
export function advance(run: LessonRun, lastResult: GradeResult): LessonRun {
  const [current, ...rest] = run.queue;
  if (!current) return { ...run, finished: true };

  let queue = rest;
  let mistakes = run.mistakes;
  if (!lastResult.correct) {
    mistakes += 1;
    const insertAt = Math.min(queue.length, 2 + Math.floor(Math.random() * 2));
    queue = [...queue.slice(0, insertAt), current, ...queue.slice(insertAt)];
  }

  return {
    ...run,
    queue,
    index: run.index + 1,
    mistakes,
    finished: queue.length === 0,
  };
}

export function isPerfect(run: LessonRun): boolean { return run.mistakes === 0; }
export function elapsedSec(run: LessonRun): number { return Math.floor((Date.now() - run.startedAt) / 1000); }
```

---

## 14. Exercise Components

All exercises follow the same contract:

```ts
type ExerciseProps = {
  course: Course;
  def: ExerciseDef;
  onAnswer: (result: GradeResult) => void;  // called when user taps Check
};
```

### `MultipleChoice.tsx`

```tsx
import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { Course, ExerciseDef } from '../../content/types';
import { GradeResult } from '../engine';
import { ChoiceButton } from '../../components/ChoiceButton';
import { BigButton } from '../../components/BigButton';
import { C, pickFont } from '../../theme';

export const MultipleChoice: React.FC<{
  course: Course;
  def: Extract<ExerciseDef, { kind: 'mcq' }>;
  onAnswer: (r: GradeResult) => void;
}> = ({ course, def, onAnswer }) => {
  const vocab = course.vocabulary[def.vocabId];
  const promptLang = course.promptLang;
  const answerLang = course.learnLang;

  const prompt = vocab[promptLang];
  const correct = vocab[answerLang];

  const options = useMemo(() => {
    const pool = Object.values(course.vocabulary).filter(v => v.id !== vocab.id);
    const distractors = pool.sort(() => 0.5 - Math.random()).slice(0, def.distractors).map(v => v[answerLang]);
    return [...distractors, correct].sort(() => 0.5 - Math.random());
  }, [vocab.id]);

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontFamily: pickFont('en', true), fontSize: 14, color: C.textMuted, marginBottom: 8 }}>
        {promptLang === 'fa' ? 'ترجمه را انتخاب کنید' : 'Pick the translation'}
      </Text>
      <Text style={{ fontFamily: pickFont(prompt, true), fontSize: 30, color: C.text, marginBottom: 24 }}>
        {prompt}
      </Text>
      <View style={{ gap: 10 }}>
        {options.map(opt => (
          <ChoiceButton
            key={opt}
            label={opt}
            selected={opt === selected}
            onPress={() => setSelected(opt)}
          />
        ))}
      </View>
      <View style={{ marginTop: 'auto' }}>
        <BigButton
          label="Check"
          disabled={!selected}
          onPress={() => onAnswer({ correct: selected === correct, expected: correct, given: selected ?? '' })}
        />
      </View>
    </View>
  );
};
```

### `Translate.tsx` (word-bank, both directions)

```tsx
import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Course, ExerciseDef } from '../../content/types';
import { GradeResult } from '../engine';
import { BigButton } from '../../components/BigButton';
import { C, pickFont } from '../../theme';

export const Translate: React.FC<{
  course: Course;
  def: Extract<ExerciseDef, { kind: 'translate' }>;
  onAnswer: (r: GradeResult) => void;
}> = ({ course, def, onAnswer }) => {
  const v = course.vocabulary[def.vocabId];
  const prompt = v[def.from];
  const answerLang = def.from === 'en' ? 'fa' : 'en';
  const correct = v[answerLang];

  const tokens = useMemo(() => {
    const real = correct.split(/\s+/);
    const decoys = Object.values(course.vocabulary)
      .filter(x => x.id !== v.id)
      .flatMap(x => x[answerLang].split(/\s+/))
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.max(2, 6 - real.length));
    return [...real, ...decoys].sort(() => 0.5 - Math.random());
  }, [v.id]);

  const [picked, setPicked] = useState<string[]>([]);
  const remaining = tokens.filter((t, i) => !picked.includes(t + ':' + i));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 14, color: C.textMuted, marginBottom: 8 }}>Translate</Text>
      <Text
        style={{
          fontFamily: pickFont(prompt, true), fontSize: 26, color: C.text, marginBottom: 24,
          writingDirection: def.from === 'fa' ? 'rtl' : 'ltr',
        }}
      >
        {prompt}
      </Text>

      <View style={{
        minHeight: 80, borderBottomWidth: 2, borderColor: C.border,
        flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 20,
      }}>
        {picked.map((tok, i) => (
          <Pressable key={i} onPress={() => setPicked(p => p.filter((_, idx) => idx !== i))}>
            <Text style={{
              borderWidth: 2, borderColor: C.border, borderBottomWidth: 4,
              borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8,
              fontFamily: pickFont(tok.split(':')[0], true),
            }}>
              {tok.split(':')[0]}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {tokens.map((tok, i) => {
          const key = tok + ':' + i;
          if (picked.includes(key)) return <View key={key} style={{ height: 36, width: 60, opacity: 0 }} />;
          return (
            <Pressable key={key} onPress={() => setPicked(p => [...p, key])}>
              <Text style={{
                borderWidth: 2, borderColor: C.border, borderBottomWidth: 4,
                borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8,
                fontFamily: pickFont(tok, true),
              }}>
                {tok}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={{ marginTop: 'auto' }}>
        <BigButton
          label="Check"
          disabled={picked.length === 0}
          onPress={() => {
            const given = picked.map(p => p.split(':')[0]).join(' ').trim();
            onAnswer({ correct: given === correct, expected: correct, given });
          }}
        />
      </View>
    </View>
  );
};
```

### `Listen.tsx` (TTS via `expo-speech`)

```tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import { Course, ExerciseDef } from '../../content/types';
import { GradeResult } from '../engine';
import { ChoiceButton } from '../../components/ChoiceButton';
import { BigButton } from '../../components/BigButton';
import { C, pickFont } from '../../theme';

export const Listen: React.FC<{
  course: Course;
  def: Extract<ExerciseDef, { kind: 'listen' }>;
  onAnswer: (r: GradeResult) => void;
}> = ({ course, def, onAnswer }) => {
  const v = course.vocabulary[def.vocabId];
  const learnLang = course.learnLang;
  const word = v[learnLang];
  const localeCode = learnLang === 'fa' ? 'fa-IR' : 'en-US';

  const speak = () => Speech.speak(word, { language: localeCode, rate: 0.9 });

  useEffect(() => { speak(); }, []);

  const options = useMemo(() => {
    const pool = Object.values(course.vocabulary).filter(x => x.id !== v.id);
    const distractors = pool.sort(() => 0.5 - Math.random()).slice(0, 3).map(x => x[learnLang]);
    return [...distractors, word].sort(() => 0.5 - Math.random());
  }, [v.id]);

  const [sel, setSel] = useState<string | null>(null);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 14, color: C.textMuted, marginBottom: 8 }}>What did you hear?</Text>
      <View style={{ alignItems: 'center', marginVertical: 24 }}>
        <Pressable onPress={speak} style={{
          width: 96, height: 96, borderRadius: 48, backgroundColor: C.blue,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Ionicons name="volume-high" size={48} color="#fff" />
        </Pressable>
      </View>
      <View style={{ gap: 10 }}>
        {options.map(o => (
          <ChoiceButton key={o} label={o} selected={o === sel} onPress={() => setSel(o)} />
        ))}
      </View>
      <View style={{ marginTop: 'auto' }}>
        <BigButton
          label="Check"
          disabled={!sel}
          onPress={() => onAnswer({ correct: sel === word, expected: word, given: sel ?? '' })}
        />
      </View>
    </View>
  );
};
```

### `Match.tsx` and `Speak.tsx`

Follow the same contract.

- **Match** — 5 prompt cards on the left + 5 shuffled answers on the right;
  tap a left, then a right; correct pair fades green, wrong flashes red and
  costs a heart. Lesson advances when all 5 are matched.
- **Speak** — `expo-av` records ~3 seconds, you compare a stripped/lowercased
  transcript (ideally via a server STT endpoint; in MVP just accept any
  recording and count as correct after listening to your own).

Both components live in `src/lesson/exercises/` and import the same
`GradeResult` type.

---

## 15. `LessonScreen.tsx` — putting it together

```tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { COURSES } from '../content';
import { useStore } from '../game/store';
import { Lesson } from '../content/types';
import { startRun, advance, isPerfect, elapsedSec, GradeResult, LessonRun } from './engine';
import { awardLessonXp, recordCrown, todayProgress } from '../game/xp';
import { bumpStreak } from '../game/streak';
import { loseHeart, regenHearts } from '../game/hearts';
import { review, seedCard } from '../game/srs';
import { checkAllAchievements } from '../game/achievements';
import { play } from '../audio/sfx';
import { MultipleChoice } from './exercises/MultipleChoice';
import { Translate } from './exercises/Translate';
import { Listen } from './exercises/Listen';
import { HeartsCounter } from '../components/HeartsCounter';
import { XPBar } from '../components/XPBar';
import { BigButton } from '../components/BigButton';
import { ConfettiBurst } from '../components/ConfettiBurst';
import { C } from '../theme';

export const LessonScreen: React.FC<{ lesson: Lesson; onExit: () => void }> = ({ lesson, onExit }) => {
  const courseId = useStore(s => s.courseId)!;
  const course = COURSES[courseId];
  const hearts = useStore(s => s.hearts);
  const haptics = useStore(s => s.settings.haptics);

  const [run, setRun] = useState<LessonRun>(() => startRun(lesson));
  const [feedback, setFeedback] = useState<null | { correct: boolean; expected?: string }>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    regenHearts();
    lesson.vocabIds.forEach(seedCard);
  }, []);

  const current = run.queue[0];

  const grade = (r: GradeResult) => {
    setFeedback({ correct: r.correct, expected: r.expected });
    if (r.correct) {
      play('correct');
      if (haptics) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    } else {
      play('wrong');
      if (haptics) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      const { canContinue } = loseHeart();
      if (!canContinue) { setDone(true); return; }
    }
    // record for SRS — try to map the exercise back to a vocabId
    const vid = 'vocabId' in current ? (current as any).vocabId : undefined;
    if (vid) review(vid, r.correct);
  };

  const next = () => {
    if (!feedback) return;
    const r = feedback;
    setFeedback(null);
    setRun(prev => advance(prev, { correct: r.correct }));
  };

  useEffect(() => {
    if (run.finished && !done) finalize();
  }, [run.finished]);

  const finalize = () => {
    const perfect = isPerfect(run);
    const underTwo = elapsedSec(run) < 120;
    awardLessonXp({ baseXp: lesson.xpReward, perfect, underTwoMinutes: underTwo });
    recordCrown(lesson.id);
    const today = todayProgress();
    if (today.pct >= 1) bumpStreak();
    checkAllAchievements();
    play('levelup');
    setDone(true);
  };

  if (done) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.bg }}>
        <ConfettiBurst />
        <Text style={{ fontSize: 28, fontWeight: '800', color: C.primary }}>Lesson complete!</Text>
        <Text style={{ marginTop: 8, color: C.textMuted }}>+{lesson.xpReward} XP</Text>
        <View style={{ marginTop: 24, width: '70%' }}>
          <BigButton label="Continue" onPress={onExit} />
        </View>
      </View>
    );
  }

  if (!current) return null;

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 }}>
        <Ionicons name="close" size={28} color={C.textMuted} onPress={onExit} />
        <View style={{ flex: 1 }}>
          <XPBar value={run.index} max={run.total} />
        </View>
        <HeartsCounter value={hearts} />
      </View>

      {current.kind === 'mcq'       && <MultipleChoice course={course} def={current} onAnswer={grade} />}
      {current.kind === 'translate' && <Translate     course={course} def={current} onAnswer={grade} />}
      {current.kind === 'listen'    && <Listen        course={course} def={current} onAnswer={grade} />}
      {/* match + speak: same pattern */}

      {feedback && (
        <View style={{
          padding: 16, backgroundColor: feedback.correct ? '#d7ffb8' : '#ffdfe0',
        }}>
          <Text style={{ fontWeight: '800', color: feedback.correct ? '#58a700' : '#ea2b2b' }}>
            {feedback.correct ? 'Nice!' : `Correct answer: ${feedback.expected}`}
          </Text>
          <BigButton label="Continue" onPress={next} />
        </View>
      )}
    </View>
  );
};
```

---

## 16. Notifications — The Full Ladder

This is the part Duolingo is famous for. The schedule below mirrors what
the green owl actually does, with copy that adapts to where the user is
in their journey.

**`src/notifications/schedule.ts`**

```ts
import * as Notifications from 'expo-notifications';
import { useStore } from '../game/store';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true,
  }),
});

export async function requestPermission(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

type Tier =
  | 'practice-reminder'    // soft nudge at user's reminder hour
  | 'streak-protect'       // 9 PM if no activity yet
  | 'streak-savior'        // 11 PM if still nothing (LAST CHANCE)
  | 'streak-broken'        // next morning after a miss
  | 'comeback'             // multi-day absence
  | 'league-warning'       // bottom of league, day 6
  | 'league-promotion'     // promoted
  | 'friend-passed'        // a friend overtook you
  | 'achievement'          // newly unlocked tier
  | 'new-content';         // course updated

const COPY: Record<Tier, { en: string[]; fa: string[] }> = {
  'practice-reminder': {
    en: ['Time for your daily Persian!', 'Your owl misses you.', 'Just 5 minutes — let’s go.'],
    fa: ['وقت تمرین انگلیسی است!', 'جغد تو دلش برایت تنگ شده.', 'فقط ۵ دقیقه — شروع کن.'],
  },
  'streak-protect': {
    en: ['Don’t lose your {streak}-day streak!', 'Protect that flame 🔥'],
    fa: ['نوار {streak} روزه‌ات را از دست نده!', 'شعله را خاموش نگذار 🔥'],
  },
  'streak-savior': {
    en: ['Last chance to save your streak!', '1 hour left to keep your streak alive.'],
    fa: ['آخرین فرصت برای حفظ نوارت!', 'فقط یک ساعت تا پایان روز.'],
  },
  'streak-broken': {
    en: ['Your streak is gone, but we believe in you. Start fresh today.'],
    fa: ['نوارت تمام شد، اما به تو ایمان داریم. امروز دوباره شروع کن.'],
  },
  'comeback': {
    en: ['We’ve missed you! Get back into Persian today.'],
    fa: ['دلمان برایت تنگ شده! امروز برگرد به انگلیسی.'],
  },
  'league-warning': {
    en: ['You’re in the demotion zone! Earn XP today to stay safe.'],
    fa: ['در منطقه سقوط لیگ هستی! امروز XP بگیر.'],
  },
  'league-promotion': {
    en: ['You were promoted to the next league! 🏆'],
    fa: ['به لیگ بعدی صعود کردی! 🏆'],
  },
  'friend-passed': {
    en: ['{friend} just passed you in XP. Take the lead!'],
    fa: ['{friend} از تو پیش افتاد. جلو بزن!'],
  },
  'achievement': {
    en: ['New achievement unlocked: {name}'],
    fa: ['دستاورد جدید: {name}'],
  },
  'new-content': {
    en: ['New lessons are available!'],
    fa: ['درس‌های جدید اضافه شد!'],
  },
};

function pickCopy(tier: Tier, vars: Record<string, string | number> = {}): string {
  const s = useStore.getState();
  const lang = s.courseId === 'persian-for-en' ? 'en' : 'fa';
  const lines = COPY[tier][lang];
  const line = lines[Math.floor(Math.random() * lines.length)];
  return line.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

/** Build the full daily ladder. Call once per app launch — it replaces prior scheduling. */
export async function rescheduleAll(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  const s = useStore.getState();
  if (!s.settings.notifications) return;

  const tomorrow = (h: number, m = 0) => {
    const d = new Date(); d.setHours(h, m, 0, 0);
    if (d.getTime() < Date.now()) d.setDate(d.getDate() + 1);
    return d;
  };

  // 1) Soft reminder at the user's chosen hour
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Dualingo', body: pickCopy('practice-reminder') },
    trigger: tomorrow(s.settings.reminderHour),
  });

  // 2) Streak protect — 9 PM
  if (s.streak > 0) {
    await Notifications.scheduleNotificationAsync({
      content: { title: 'Keep your streak!', body: pickCopy('streak-protect', { streak: s.streak }) },
      trigger: tomorrow(21),
    });
  }

  // 3) Streak savior — 11 PM (final hour)
  if (s.streak > 0) {
    await Notifications.scheduleNotificationAsync({
      content: { title: '🔥 1 hour left!', body: pickCopy('streak-savior') },
      trigger: tomorrow(23),
    });
  }
}

/** Fire an immediate notification (e.g. friend passed). */
export async function notifyNow(tier: Tier, vars: Record<string, string | number> = {}) {
  const s = useStore.getState();
  if (!s.settings.notifications) return;
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Dualingo', body: pickCopy(tier, vars) },
    trigger: null,
  });
}
```

**Notification ladder (per-day)**

| Time (local) | Tier | When it fires |
|--------------|------|---------------|
| User's chosen hour (default 19:00) | `practice-reminder` | Daily soft nudge |
| 21:00 | `streak-protect` | If user has a streak and no XP today |
| 23:00 | `streak-savior` | Final hour — escalated copy |
| Next morning (after a miss) | `streak-broken` | Empathetic recovery message |
| Day 2+ absence | `comeback` | "We've missed you" |
| Sunday 18:00 | `league-warning` | If in bottom 5 of cohort |
| End of week, on rollover | `league-promotion` / `league-demotion` | Outcome alert |
| Real-time | `friend-passed`, `achievement`, `new-content` | Pushed via server |

The local `expo-notifications` schedule handles the first 3 reliably even
offline. The rest typically come from your backend via push tokens.

---

## 17. Onboarding & Path

**`OnboardingScreen.tsx`** — pick direction:

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { useStore } from '../game/store';
import { BigButton } from '../components/BigButton';
import { C } from '../theme';

export const OnboardingScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const setCourse = useStore(s => s.setCourse);

  const choose = (id: 'persian-for-en' | 'english-for-fa') => {
    setCourse(id);
    onDone();
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', backgroundColor: C.bg }}>
      <Text style={{ fontSize: 28, fontWeight: '800', color: C.text, textAlign: 'center', marginBottom: 32 }}>
        What do you want to learn?
      </Text>
      <BigButton label="🇮🇷  I want to learn Persian"     onPress={() => choose('persian-for-en')} />
      <View style={{ height: 12 }} />
      <BigButton label="🇬🇧  می‌خواهم انگلیسی یاد بگیرم"  onPress={() => choose('english-for-fa')} />
    </View>
  );
};
```

**`PathScreen.tsx`** — the vertical skill tree (zig-zag of "nodes"):

```tsx
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COURSES } from '../content';
import { useStore } from '../game/store';
import { StreakFlame } from '../components/StreakFlame';
import { HeartsCounter } from '../components/HeartsCounter';
import { GemCounter } from '../components/GemCounter';
import { C } from '../theme';

export const PathScreen: React.FC<{ onPickLesson: (lessonId: string) => void }> = ({ onPickLesson }) => {
  const courseId = useStore(s => s.courseId)!;
  const course = COURSES[courseId];
  const completed = useStore(s => s.completedLessons);
  const streak    = useStore(s => s.streak);
  const hearts    = useStore(s => s.hearts);
  const gems      = useStore(s => s.gems);

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ flexDirection: 'row', padding: 12, gap: 12, justifyContent: 'flex-end' }}>
        <StreakFlame value={streak} />
        <GemCounter value={gems} />
        <HeartsCounter value={hearts} />
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, alignItems: 'center' }}>
        {course.units.map(u => (
          <View key={u.id} style={{ width: '100%', marginBottom: 24 }}>
            <View style={{ backgroundColor: C[u.color], padding: 14, borderRadius: 12, marginBottom: 8 }}>
              <Text style={{ color: '#fff', fontWeight: '800', fontSize: 18 }}>
                Unit {u.index} · {u.title[course.uiLang]}
              </Text>
              <Text style={{ color: '#fff', opacity: 0.9 }}>{u.description[course.uiLang]}</Text>
            </View>

            {u.lessons.map((l, i) => {
              const crowns = completed[l.id]?.crowns ?? 0;
              const offset = i % 2 === 0 ? -40 : 40;
              return (
                <Pressable
                  key={l.id}
                  onPress={() => onPickLesson(l.id)}
                  style={{
                    transform: [{ translateX: offset }],
                    width: 76, height: 76, borderRadius: 38,
                    backgroundColor: crowns > 0 ? C.gold : C[u.color],
                    borderBottomWidth: 6,
                    borderColor: '#0002',
                    alignItems: 'center', justifyContent: 'center',
                    marginVertical: 12, alignSelf: 'center',
                  }}
                >
                  <Ionicons name={crowns >= 5 ? 'trophy' : 'star'} size={32} color="#fff" />
                  {crowns > 0 && (
                    <Text style={{ color: '#fff', fontWeight: '800', marginTop: 2 }}>{crowns}/5</Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
```

---

## 18. Tabs / Navigation

```tsx
// App.tsx (excerpt)
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

import { useStore } from './src/game/store';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { PathScreen } from './src/screens/PathScreen';
import { LeaguesScreen } from './src/screens/LeaguesScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { ShopScreen } from './src/screens/ShopScreen';
import { ReviewScreen } from './src/screens/ReviewScreen';
import { LessonScreen } from './src/lesson/LessonScreen';
import { rescheduleAll, requestPermission } from './src/notifications/schedule';
import { reconcileStreakOnLaunch } from './src/game/streak';
import { regenHearts } from './src/game/hearts';
import { maybeResetWeek } from './src/game/league';
import { initSfx } from './src/audio/sfx';
import { COURSES } from './src/content';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs({ openLesson }: { openLesson: (id: string) => void }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const map: Record<string, any> = {
            Learn: 'home', Review: 'refresh', Leagues: 'trophy', Shop: 'cart', Profile: 'person',
          };
          return <Ionicons name={map[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Learn">    {() => <PathScreen onPickLesson={openLesson} />}</Tab.Screen>
      <Tab.Screen name="Review"    component={ReviewScreen} />
      <Tab.Screen name="Leagues"   component={LeaguesScreen} />
      <Tab.Screen name="Shop"      component={ShopScreen} />
      <Tab.Screen name="Profile"   component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontReady, setFontReady] = useState(false);
  const courseId = useStore(s => s.courseId);

  useEffect(() => {
    Font.loadAsync({
      Inter:          require('./assets/fonts/Inter-Regular.ttf'),
      InterBold:      require('./assets/fonts/Inter-Bold.ttf'),
      Vazirmatn:      require('./assets/fonts/Vazirmatn-Regular.ttf'),
      VazirmatnBold:  require('./assets/fonts/Vazirmatn-Bold.ttf'),
    }).then(() => setFontReady(true));

    initSfx().catch(() => {});
    reconcileStreakOnLaunch();
    regenHearts();
    maybeResetWeek();
    requestPermission().then(ok => { if (ok) rescheduleAll(); });
  }, []);

  if (!fontReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!courseId ? (
            <Stack.Screen name="Onboarding" component={OnboardingScreen as any} />
          ) : (
            <>
              <Stack.Screen name="Main">
                {({ navigation }) => (
                  <MainTabs openLesson={(id) => navigation.navigate('Lesson', { lessonId: id })} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Lesson">
                {({ route, navigation }) => {
                  const lessonId = (route.params as any).lessonId as string;
                  const course = COURSES[courseId];
                  const lesson = course.units.flatMap(u => u.lessons).find(l => l.id === lessonId)!;
                  return <LessonScreen lesson={lesson} onExit={() => navigation.goBack()} />;
                }}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
```

---

## 19. RTL & Persian Specifics

- **Per-string direction**: don't force `I18nManager.forceRTL` globally —
  it flips the whole UI and conflicts with English-from-Persian. Instead,
  set `writingDirection` on each Persian `Text` and use the `pickFont()`
  helper from `theme.ts`.
- **Vazirmatn** is the recommended free Persian font (great hinting at small
  sizes). Bundle Regular + Bold.
- **TTS locale codes**: `fa-IR` for Persian, `en-US` for English.
- **Transliteration** (`faTranslit`) shows under the Persian word for the
  first crown level only; hide it from crown 2+ to push real reading.
- **Number digits**: Persian uses `۰۱۲۳۴۵۶۷۸۹`. For learners of Persian,
  display Latin digits to keep the UI legible; for learners of English,
  ditto. Save Persian digits for a dedicated "Numbers" unit.

---

## 20. Shop & Economy

| Item | Cost (gems) | Effect |
|------|-------------|--------|
| Streak Freeze | 200 | Auto-uses if you miss a day (max 2 stored) |
| Heart Refill  | 350 | Refill all 5 hearts immediately |
| Timed Boost   | 100 | 2× XP for 15 minutes |
| Unlimited Hearts (Super) | subscription | Hides the heart system |

Gem sources:
- +5 gems for each daily-goal hit
- +20 for a 7-day streak milestone (then 14, 30, 50, 100…)
- +50 for a league promotion
- Achievement unlocks: 10, 25, 50, 100… per tier

---

## 21. Gamification Levels Recap

| System | Levels / States | File |
|--------|-----------------|------|
| **Crowns** per lesson | 0 → 5 (gold) → 6 (Legendary/purple) | `game/xp.ts` |
| **Streak** | 1, 7, 14, 30, 50, 100, 365 day milestones | `game/streak.ts` |
| **Hearts** | 0–5, regen 30 min each | `game/hearts.ts` |
| **Daily Goal** | 10 / 20 / 30 / 50 XP | `game/store.ts` (`dailyGoal`) |
| **Leagues** | Bronze → Silver → Gold → Sapphire → Ruby → Emerald → Amethyst → Pearl → Obsidian → **Diamond** | `game/league.ts` |
| **Achievements** | Wildfire · Scholar · Sage · Sharpshooter · Champion (7 tiers each) | `game/achievements.ts` |
| **SRS Buckets** | 0 (new) → 5 (mastered, 1-month interval) | `game/srs.ts` |
| **Notifications** | practice → protect → savior → broken → comeback → league-warn → league-promo → friend-passed → achievement | `notifications/schedule.ts` |

---

## 22. Building & Shipping

```bash
npx expo start                # local dev

# EAS builds
npm i -g eas-cli
eas login
eas build:configure
eas build --platform android  # .aab → Play Store
eas build --platform ios      # .ipa → App Store

# Push notification setup (for friend-passed, league events, etc.)
eas credentials                # configure FCM (Android) + APNs (iOS)
```

For server-driven push (friend activity, league rollovers, content
updates), point Expo Push tokens at any backend that calls Expo's push
service. Local notifications cover streak nudges entirely offline.

---

## 23. What to Build Next

The scaffold above gives you a vertical-slice MVP: pick course → walk the
path → take a lesson → earn XP → keep a streak → climb a league →
receive nudges.

To go beyond MVP:

- **Stories** — short bilingual reading passages with tap-to-translate
- **Match the Pairs** as a timed bonus mini-game (10 pairs in 60s)
- **Friends graph** — server-side; show top 3 friends in the Profile tab
- **Conversation drills** with `expo-speech` + `expo-av` recording
- **Grammar tips** — Markdown sheets shown before each new skill
- **Offline pack** — bundle TTS audio for the first 50 lessons so
  pronunciation works without a network

The architecture stays the same — every new feature plugs into the same
store + content schema + notification ladder.
