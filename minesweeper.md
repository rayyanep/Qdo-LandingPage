# Minesweeper — Windows 98 Style (iOS + Android)

A cross-platform mobile clone of the classic Windows 98 Minesweeper, built with
**React Native + Expo** so a single codebase ships to both App Store and Play
Store.

---

## 1. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React Native (Expo SDK 51+) | Single JS/TS codebase → iOS + Android |
| Language | TypeScript | Type safety on game state |
| Tooling | Expo CLI | Zero-config builds, OTA updates |
| Storage | `@react-native-async-storage/async-storage` | Persist high scores |
| Fonts | `expo-font` + `PressStart2P` | Pixel/retro look |

---

## 2. Project Setup

```bash
# Create the project
npx create-expo-app@latest minesweeper98 --template blank-typescript
cd minesweeper98

# Install deps
npx expo install expo-font expo-haptics @react-native-async-storage/async-storage
npx expo install expo-status-bar react-native-safe-area-context expo-av

# Run
npx expo start            # press 'a' for Android, 'i' for iOS
```

### `app.json` (key bits)

```json
{
  "expo": {
    "name": "Minesweeper 98",
    "slug": "minesweeper98",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#c0c0c0"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourname.minesweeper98"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#c0c0c0"
      },
      "package": "com.yourname.minesweeper98"
    }
  }
}
```

---

## 3. File Layout

```
minesweeper98/
├── App.tsx
├── src/
│   ├── theme.ts
│   ├── game/
│   │   ├── types.ts
│   │   ├── rng.ts            ← seedable RNG (daily challenge)
│   │   ├── engine.ts
│   │   └── useGame.ts
│   ├── components/
│   │   ├── Bevel.tsx
│   │   ├── Cell.tsx
│   │   ├── Board.tsx
│   │   ├── LcdCounter.tsx
│   │   ├── SmileyButton.tsx
│   │   ├── TitleBar.tsx
│   │   ├── DifficultyMenu.tsx
│   │   └── SettingsModal.tsx ← settings UI
│   ├── audio/
│   │   └── sfx.ts            ← sound FX
│   ├── settings/
│   │   └── useSettings.ts    ← persisted user prefs
│   └── storage/
│       └── highscore.ts
└── assets/
    ├── fonts/PressStart2P-Regular.ttf
    └── sfx/
        ├── click.wav
        ├── flag.wav
        ├── boom.wav
        └── win.wav
```

Download the font from Google Fonts ("Press Start 2P") and drop the `.ttf`
into `assets/fonts/`.

---

## 4. Theme — Windows 98 Palette

**`src/theme.ts`**

```ts
export const W98 = {
  // Surfaces
  face:        '#c0c0c0',  // classic gray
  faceDark:    '#808080',
  shadow:      '#000000',
  highlight:   '#ffffff',
  cellClosed:  '#bdbdbd',
  cellOpen:    '#bdbdbd',

  // Title bar
  titleBg:     '#000080',  // navy
  titleText:   '#ffffff',

  // Number colors (classic)
  numbers: {
    1: '#0000ff',
    2: '#008000',
    3: '#ff0000',
    4: '#000080',
    5: '#800000',
    6: '#008080',
    7: '#000000',
    8: '#808080',
  } as Record<number, string>,

  // LCD counter
  lcdBg:       '#000000',
  lcdOn:       '#ff0000',
  lcdOff:      '#3a0000',

  bombBg:      '#ff0000',
  flagRed:     '#ff0000',
};

export const FONT = 'PressStart2P';
```

---

## 5. Game Engine (pure, no React)

**`src/game/types.ts`**

```ts
export type CellState = {
  isMine: boolean;
  isOpen: boolean;
  isFlagged: boolean;
  isQuestion: boolean;
  adjacent: number;     // 0..8
};

export type Difficulty = 'beginner' | 'intermediate' | 'expert';

export const PRESETS: Record<Difficulty, { rows: number; cols: number; mines: number }> = {
  beginner:     { rows: 9,  cols: 9,  mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert:       { rows: 16, cols: 30, mines: 99 },  // landscape recommended
};

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';
```

**`src/game/rng.ts`** — tiny seedable PRNG (mulberry32) for the daily challenge.

```ts
export type RNG = () => number;

export function mulberry32(seed: number): RNG {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash a string (e.g. "2026-05-23:beginner") into a 32-bit seed. */
export function hashSeed(input: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
```

**`src/game/engine.ts`**

```ts
import { CellState } from './types';
import { RNG } from './rng';

export function makeEmptyBoard(rows: number, cols: number): CellState[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isOpen: false,
      isFlagged: false,
      isQuestion: false,
      adjacent: 0,
    })),
  );
}

/**
 * Place mines AFTER the first tap so the first cell is never a mine
 * (matches classic Minesweeper behaviour). Pass a seeded `rng` for
 * reproducible boards (daily challenge); omit for Math.random.
 */
export function placeMines(
  board: CellState[][],
  mines: number,
  safeR: number,
  safeC: number,
  rng: RNG = Math.random,
): CellState[][] {
  const rows = board.length;
  const cols = board[0].length;
  const next = board.map(row => row.map(c => ({ ...c })));

  const forbidden = new Set<number>();
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const r = safeR + dr, c = safeC + dc;
      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        forbidden.add(r * cols + c);
      }
    }
  }

  let placed = 0;
  while (placed < mines) {
    const idx = Math.floor(rng() * rows * cols);
    if (forbidden.has(idx)) continue;
    const r = Math.floor(idx / cols);
    const c = idx % cols;
    if (next[r][c].isMine) continue;
    next[r][c].isMine = true;
    placed++;
  }

  // Adjacency counts
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (next[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && next[nr][nc].isMine) {
            count++;
          }
        }
      }
      next[r][c].adjacent = count;
    }
  }

  return next;
}

/** Iterative flood-fill open: opens cell and cascades through 0-adjacent neighbours. */
export function openCell(
  board: CellState[][],
  r: number,
  c: number,
): { board: CellState[][]; hitMine: boolean } {
  const rows = board.length;
  const cols = board[0].length;
  const next = board.map(row => row.map(x => ({ ...x })));

  if (next[r][c].isFlagged || next[r][c].isOpen) {
    return { board: next, hitMine: false };
  }

  if (next[r][c].isMine) {
    next[r][c].isOpen = true;
    // Reveal all mines on loss
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (next[i][j].isMine) next[i][j].isOpen = true;
      }
    }
    return { board: next, hitMine: true };
  }

  const stack: [number, number][] = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop()!;
    const cell = next[cr][cc];
    if (cell.isOpen || cell.isFlagged || cell.isMine) continue;
    cell.isOpen = true;
    if (cell.adjacent === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = cr + dr, nc = cc + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) stack.push([nr, nc]);
        }
      }
    }
  }
  return { board: next, hitMine: false };
}

export function toggleFlag(
  board: CellState[][],
  r: number,
  c: number,
  allowQuestion = true,
): CellState[][] {
  const next = board.map(row => row.map(x => ({ ...x })));
  const cell = next[r][c];
  if (cell.isOpen) return next;
  if (!cell.isFlagged && !cell.isQuestion) cell.isFlagged = true;
  else if (cell.isFlagged) {
    cell.isFlagged = false;
    if (allowQuestion) cell.isQuestion = true;
  } else { cell.isQuestion = false; }
  return next;
}

/**
 * "Chord" — when an opened number cell has exactly N flags around it
 * (N = its adjacent count), open all unflagged neighbours. If any of
 * those neighbours is a mine, the game is lost.
 */
export function chord(
  board: CellState[][],
  r: number,
  c: number,
): { board: CellState[][]; hitMine: boolean; changed: boolean } {
  const rows = board.length;
  const cols = board[0].length;
  const cell = board[r][c];
  if (!cell.isOpen || cell.adjacent === 0) {
    return { board, hitMine: false, changed: false };
  }

  let flags = 0;
  const neighbours: [number, number][] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (board[nr][nc].isFlagged) flags++;
      else if (!board[nr][nc].isOpen) neighbours.push([nr, nc]);
    }
  }
  if (flags !== cell.adjacent || neighbours.length === 0) {
    return { board, hitMine: false, changed: false };
  }

  let cur = board;
  let hitMine = false;
  for (const [nr, nc] of neighbours) {
    const r1 = openCell(cur, nr, nc);
    cur = r1.board;
    if (r1.hitMine) hitMine = true;
  }
  return { board: cur, hitMine, changed: true };
}

export function checkWin(board: CellState[][]): boolean {
  for (const row of board) {
    for (const cell of row) {
      if (!cell.isMine && !cell.isOpen) return false;
    }
  }
  return true;
}

export function countFlags(board: CellState[][]): number {
  let n = 0;
  for (const row of board) for (const c of row) if (c.isFlagged) n++;
  return n;
}
```

**`src/game/useGame.ts`**

```ts
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CellState, Difficulty, GameStatus, PRESETS,
} from './types';
import {
  makeEmptyBoard, placeMines, openCell, toggleFlag, chord as chordFn,
  checkWin, countFlags,
} from './engine';
import { mulberry32, hashSeed, todayKey } from './rng';

export type GameMode = 'normal' | 'daily';

export type GameOpts = {
  initial?: Difficulty;
  allowQuestion?: boolean;   // settings: question marks on/off
  mode?: GameMode;           // 'daily' → seeded RNG
  onEvent?: (e: 'open' | 'flag' | 'win' | 'lose') => void; // sound/haptics hook
};

export function useGame(opts: GameOpts = {}) {
  const {
    initial = 'beginner',
    allowQuestion = true,
    mode = 'normal',
    onEvent,
  } = opts;

  const [difficulty, setDifficulty] = useState<Difficulty>(initial);
  const cfg = PRESETS[difficulty];

  const [board, setBoard] = useState<CellState[][]>(() => makeEmptyBoard(cfg.rows, cfg.cols));
  const [status, setStatus] = useState<GameStatus>('idle');
  const [elapsed, setElapsed] = useState(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = useCallback((d: Difficulty = difficulty) => {
    const p = PRESETS[d];
    setDifficulty(d);
    setBoard(makeEmptyBoard(p.rows, p.cols));
    setStatus('idle');
    setElapsed(0);
    if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; }
  }, [difficulty]);

  useEffect(() => {
    if (status === 'playing' && !tickRef.current) {
      tickRef.current = setInterval(() => setElapsed(e => Math.min(e + 1, 999)), 1000);
    }
    if (status !== 'playing' && tickRef.current) {
      clearInterval(tickRef.current); tickRef.current = null;
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [status]);

  const finish = (s: 'won' | 'lost') => {
    setStatus(s);
    onEvent?.(s === 'won' ? 'win' : 'lose');
  };

  const open = useCallback((r: number, c: number) => {
    if (status === 'won' || status === 'lost') return;
    setBoard(prev => {
      let working = prev;
      if (status === 'idle') {
        const rng = mode === 'daily'
          ? mulberry32(hashSeed(`${todayKey()}:${difficulty}`))
          : Math.random;
        working = placeMines(prev, cfg.mines, r, c, rng);
        setStatus('playing');
      }
      const { board: next, hitMine } = openCell(working, r, c);
      if (hitMine) finish('lost');
      else if (checkWin(next)) finish('won');
      else onEvent?.('open');
      return next;
    });
  }, [status, cfg.mines, mode, difficulty, onEvent]);

  const flag = useCallback((r: number, c: number) => {
    if (status === 'won' || status === 'lost') return;
    setBoard(prev => toggleFlag(prev, r, c, allowQuestion));
    onEvent?.('flag');
  }, [status, allowQuestion, onEvent]);

  const chord = useCallback((r: number, c: number) => {
    if (status !== 'playing') return;
    setBoard(prev => {
      const res = chordFn(prev, r, c);
      if (!res.changed) return prev;
      if (res.hitMine) finish('lost');
      else if (checkWin(res.board)) finish('won');
      else onEvent?.('open');
      return res.board;
    });
  }, [status, onEvent]);

  const minesLeft = cfg.mines - countFlags(board);

  return {
    board, status, elapsed, minesLeft,
    rows: cfg.rows, cols: cfg.cols, totalMines: cfg.mines,
    difficulty, setDifficulty: reset,
    open, flag, chord, reset: () => reset(difficulty),
  };
}
```

---

## 6. UI Components

**`src/components/Bevel.tsx`** — the classic 2-pixel raised/inset border.

```tsx
import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { W98 } from '../theme';

type Props = { raised?: boolean; thick?: boolean; style?: ViewStyle; children?: ReactNode };

export const Bevel: React.FC<Props> = ({ raised = true, thick = false, style, children }) => {
  const top    = raised ? W98.highlight : W98.faceDark;
  const left   = raised ? W98.highlight : W98.faceDark;
  const right  = raised ? W98.faceDark  : W98.highlight;
  const bottom = raised ? W98.faceDark  : W98.highlight;
  const w = thick ? 3 : 2;

  return (
    <View
      style={[
        {
          backgroundColor: W98.face,
          borderTopColor: top,
          borderLeftColor: left,
          borderRightColor: right,
          borderBottomColor: bottom,
          borderTopWidth: w,
          borderLeftWidth: w,
          borderRightWidth: w,
          borderBottomWidth: w,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
```

**`src/components/LcdCounter.tsx`** — the red 7-seg-ish counter.

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { W98, FONT } from '../theme';
import { Bevel } from './Bevel';

export const LcdCounter: React.FC<{ value: number }> = ({ value }) => {
  const clamped = Math.max(-99, Math.min(999, value));
  const text = clamped < 0
    ? '-' + String(Math.abs(clamped)).padStart(2, '0')
    : String(clamped).padStart(3, '0');

  return (
    <Bevel raised={false}>
      <View style={{ backgroundColor: W98.lcdBg, paddingHorizontal: 4, paddingVertical: 2 }}>
        <Text style={{ color: W98.lcdOn, fontFamily: FONT, fontSize: 22, letterSpacing: 2 }}>
          {text}
        </Text>
      </View>
    </Bevel>
  );
};
```

**`src/components/SmileyButton.tsx`** — the face button.

```tsx
import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { Bevel } from './Bevel';
import { GameStatus } from '../game/types';

const FACE: Record<GameStatus | 'pressed', string> = {
  idle: '🙂', playing: '🙂', won: '😎', lost: '😵', pressed: '😮',
};

export const SmileyButton: React.FC<{ status: GameStatus; onPress: () => void }> = ({ status, onPress }) => {
  const [down, setDown] = useState(false);
  return (
    <Pressable onPress={onPress} onPressIn={() => setDown(true)} onPressOut={() => setDown(false)}>
      <Bevel raised={!down} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 22 }}>{FACE[down ? 'pressed' : status]}</Text>
      </Bevel>
    </Pressable>
  );
};
```

**`src/components/Cell.tsx`** — long-press to flag, double-tap on an opened number to **chord**.

```tsx
import React, { memo, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Bevel } from './Bevel';
import { W98, FONT } from '../theme';
import { CellState } from '../game/types';

export const CELL_SIZE = 28;
const DOUBLE_TAP_MS = 260;

type Props = {
  cell: CellState;
  row: number;
  col: number;
  exploded?: boolean;
  hapticsOn?: boolean;
  onOpen: (r: number, c: number) => void;
  onFlag: (r: number, c: number) => void;
  onChord: (r: number, c: number) => void;
};

function CellInner({ cell, row, col, exploded, hapticsOn, onOpen, onFlag, onChord }: Props) {
  const lastTap = useRef(0);

  const handleLong = () => {
    if (hapticsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    onFlag(row, col);
  };

  if (cell.isOpen) {
    const bg = exploded && cell.isMine ? W98.bombBg : W98.cellOpen;
    const isChordable = cell.adjacent > 0;

    const onTapOpened = () => {
      if (!isChordable) return;
      const now = Date.now();
      if (now - lastTap.current < DOUBLE_TAP_MS) {
        lastTap.current = 0;
        onChord(row, col);
      } else {
        lastTap.current = now;
      }
    };

    return (
      <Pressable onPress={isChordable ? onTapOpened : undefined}>
        <View
          style={{
            width: CELL_SIZE, height: CELL_SIZE,
            backgroundColor: bg,
            borderWidth: 1, borderColor: W98.faceDark,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {cell.isMine ? (
            <Text style={{ fontSize: 16 }}>💣</Text>
          ) : cell.adjacent > 0 ? (
            <Text style={{
              fontFamily: FONT,
              fontSize: 14,
              color: W98.numbers[cell.adjacent] ?? '#000',
            }}>
              {cell.adjacent}
            </Text>
          ) : null}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={() => onOpen(row, col)} onLongPress={handleLong} delayLongPress={220}>
      <Bevel style={{ width: CELL_SIZE, height: CELL_SIZE, alignItems: 'center', justifyContent: 'center' }}>
        {cell.isFlagged ? (
          <Text style={{ fontSize: 16, color: W98.flagRed }}>🚩</Text>
        ) : cell.isQuestion ? (
          <Text style={{ fontFamily: FONT, fontSize: 14 }}>?</Text>
        ) : null}
      </Bevel>
    </Pressable>
  );
}

export const Cell = memo(CellInner);
```

**`src/components/Board.tsx`**

```tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Bevel } from './Bevel';
import { Cell, CELL_SIZE } from './Cell';
import { CellState } from '../game/types';

type Props = {
  board: CellState[][];
  exploded: boolean;
  hapticsOn?: boolean;
  onOpen: (r: number, c: number) => void;
  onFlag: (r: number, c: number) => void;
  onChord: (r: number, c: number) => void;
};

export const Board: React.FC<Props> = ({ board, exploded, hapticsOn, onOpen, onFlag, onChord }) => {
  const rows = board.length;
  const cols = board[0]?.length ?? 0;
  const boardW = cols * CELL_SIZE;
  const boardH = rows * CELL_SIZE;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Bevel raised={false} thick style={{ padding: 0 }}>
          <View style={{ width: boardW, height: boardH }}>
            {board.map((row, r) => (
              <View key={r} style={{ flexDirection: 'row' }}>
                {row.map((cell, c) => (
                  <Cell
                    key={`${r}-${c}`}
                    cell={cell}
                    row={r}
                    col={c}
                    exploded={exploded}
                    hapticsOn={hapticsOn}
                    onOpen={onOpen}
                    onFlag={onFlag}
                    onChord={onChord}
                  />
                ))}
              </View>
            ))}
          </View>
        </Bevel>
      </ScrollView>
    </ScrollView>
  );
};
```

**`src/components/TitleBar.tsx`**

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { W98, FONT } from '../theme';

export const TitleBar: React.FC<{ title: string }> = ({ title }) => (
  <View
    style={{
      backgroundColor: W98.titleBg,
      paddingHorizontal: 6,
      paddingVertical: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Text style={{ color: W98.titleText, fontFamily: FONT, fontSize: 10 }}>{title}</Text>
    <View style={{ flexDirection: 'row' }}>
      {['_', '□', '×'].map(g => (
        <View
          key={g}
          style={{
            width: 18, height: 16, marginLeft: 2,
            backgroundColor: W98.face,
            borderTopColor: W98.highlight, borderLeftColor: W98.highlight,
            borderRightColor: W98.faceDark, borderBottomColor: W98.faceDark,
            borderWidth: 2,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text style={{ fontFamily: FONT, fontSize: 8 }}>{g}</Text>
        </View>
      ))}
    </View>
  </View>
);
```

**`src/components/DifficultyMenu.tsx`**

```tsx
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Bevel } from './Bevel';
import { Difficulty } from '../game/types';
import { FONT } from '../theme';

const OPTIONS: { key: Difficulty; label: string }[] = [
  { key: 'beginner',     label: 'Beginner' },
  { key: 'intermediate', label: 'Intermed.' },
  { key: 'expert',       label: 'Expert' },
];

export const DifficultyMenu: React.FC<{
  current: Difficulty;
  onChange: (d: Difficulty) => void;
}> = ({ current, onChange }) => (
  <View style={{ flexDirection: 'row', padding: 4, gap: 4 }}>
    {OPTIONS.map(o => {
      const active = o.key === current;
      return (
        <Pressable key={o.key} onPress={() => onChange(o.key)}>
          <Bevel raised={!active} style={{ paddingHorizontal: 8, paddingVertical: 6 }}>
            <Text style={{ fontFamily: FONT, fontSize: 9 }}>{o.label}</Text>
          </Bevel>
        </Pressable>
      );
    })}
  </View>
);
```

---

## 7. Persistence

**`src/storage/highscore.ts`**

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Difficulty } from '../game/types';

const KEY = (d: Difficulty) => `ms98:best:${d}`;

export async function getBest(d: Difficulty): Promise<number | null> {
  const v = await AsyncStorage.getItem(KEY(d));
  return v ? Number(v) : null;
}

export async function setBestIfBetter(d: Difficulty, seconds: number): Promise<boolean> {
  const cur = await getBest(d);
  if (cur === null || seconds < cur) {
    await AsyncStorage.setItem(KEY(d), String(seconds));
    return true;
  }
  return false;
}
```

---

## 8. Root — `App.tsx`

```tsx
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';

import { W98, FONT } from './src/theme';
import { Bevel } from './src/components/Bevel';
import { Board } from './src/components/Board';
import { LcdCounter } from './src/components/LcdCounter';
import { SmileyButton } from './src/components/SmileyButton';
import { TitleBar } from './src/components/TitleBar';
import { DifficultyMenu } from './src/components/DifficultyMenu';
import { useGame } from './src/game/useGame';
import { setBestIfBetter, getBest } from './src/storage/highscore';

export default function App() {
  const [fontReady, setFontReady] = useState(false);
  const [best, setBest] = useState<number | null>(null);

  const g = useGame('beginner');

  useEffect(() => {
    Font.loadAsync({
      [FONT]: require('./assets/fonts/PressStart2P-Regular.ttf'),
    }).then(() => setFontReady(true));
  }, []);

  useEffect(() => {
    getBest(g.difficulty).then(setBest);
  }, [g.difficulty]);

  useEffect(() => {
    if (g.status === 'won') {
      setBestIfBetter(g.difficulty, g.elapsed).then(updated => {
        if (updated) setBest(g.elapsed);
      });
    }
  }, [g.status, g.elapsed, g.difficulty]);

  if (!fontReady) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#008080' /* teal desktop */ }}>
        <StatusBar style="light" />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 12 }}>
          {/* The "window" */}
          <Bevel thick style={{ padding: 0 }}>
            <TitleBar title="Minesweeper" />

            <DifficultyMenu current={g.difficulty} onChange={g.setDifficulty} />

            {/* Status panel */}
            <View style={{ paddingHorizontal: 8, paddingTop: 4 }}>
              <Bevel raised={false} thick style={{ padding: 6 }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <LcdCounter value={g.minesLeft} />
                  <SmileyButton status={g.status} onPress={g.reset} />
                  <LcdCounter value={g.elapsed} />
                </View>
              </Bevel>

              {/* Board */}
              <View style={{ marginTop: 6, marginBottom: 8 }}>
                <Board
                  board={g.board}
                  exploded={g.status === 'lost'}
                  onOpen={g.open}
                  onFlag={g.flag}
                />
              </View>

              <View style={{ alignItems: 'center', paddingBottom: 6 }}>
                <Text style={{ fontFamily: FONT, fontSize: 9, color: '#000' }}>
                  {g.status === 'won'  && 'YOU WIN!'}
                  {g.status === 'lost' && 'GAME OVER'}
                  {(g.status === 'idle' || g.status === 'playing') &&
                    `Tap to reveal · Long-press to flag${best !== null ? ` · Best ${best}s` : ''}`}
                </Text>
              </View>
            </View>
          </Bevel>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
```

---

## 9. Controls (Mobile-friendly Mapping)

Classic Minesweeper relies on left/right mouse. On touch:

| Action | Gesture |
|--------|---------|
| Reveal a cell | Tap |
| Toggle flag → question → clear | Long-press (220 ms) + haptic |
| Reset game | Tap the smiley |
| Change difficulty | Tap Beginner / Intermed. / Expert |

Expert mode (16×30) is wider than most phone screens — the board is wrapped
in nested `ScrollView`s so you can pan horizontally.

---

## 10. Building & Shipping

```bash
# Local dev
npx expo start

# Native builds via EAS (recommended)
npm i -g eas-cli
eas login
eas build:configure
eas build --platform android   # → .aab for Play Store
eas build --platform ios       # → .ipa for App Store (needs Apple dev acct)

# Optional: OTA updates without resubmitting binaries
eas update --branch production
```

---

## 11. Settings (Persisted User Prefs)

**`src/settings/useSettings.ts`**

```ts
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeName = 'classic' | 'dark';

export type Settings = {
  sound: boolean;
  haptics: boolean;
  questionMarks: boolean;
  theme: ThemeName;
};

const DEFAULTS: Settings = {
  sound: true,
  haptics: true,
  questionMarks: true,
  theme: 'classic',
};

const KEY = 'ms98:settings';

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then(raw => {
      if (raw) {
        try { setSettings({ ...DEFAULTS, ...JSON.parse(raw) }); } catch {}
      }
      setLoaded(true);
    });
  }, []);

  const update = useCallback(<K extends keyof Settings>(k: K, v: Settings[K]) => {
    setSettings(prev => {
      const next = { ...prev, [k]: v };
      AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  return { settings, update, loaded };
}
```

### Themes — extend `src/theme.ts`

```ts
import { ThemeName } from './settings/useSettings';

const CLASSIC = {
  face: '#c0c0c0', faceDark: '#808080', highlight: '#ffffff',
  cellClosed: '#bdbdbd', cellOpen: '#bdbdbd',
  titleBg: '#000080', titleText: '#ffffff',
  desktop: '#008080',
  numbers: { 1:'#0000ff',2:'#008000',3:'#ff0000',4:'#000080',
             5:'#800000',6:'#008080',7:'#000000',8:'#808080' } as Record<number,string>,
  lcdBg: '#000000', lcdOn: '#ff0000',
  bombBg: '#ff0000', flagRed: '#ff0000',
};

const DARK: typeof CLASSIC = {
  ...CLASSIC,
  face: '#2a2a2a', faceDark: '#000000', highlight: '#555555',
  cellClosed: '#2a2a2a', cellOpen: '#1a1a1a',
  titleBg: '#1f1f3f', titleText: '#eaeaea',
  desktop: '#101010',
  numbers: { 1:'#5aa9ff',2:'#5fcf6b',3:'#ff6b6b',4:'#b08bff',
             5:'#ff9b6b',6:'#7fe6e6',7:'#eaeaea',8:'#9a9a9a' } as Record<number,string>,
};

export function themeFor(name: ThemeName) {
  return name === 'dark' ? DARK : CLASSIC;
}

// Backward-compat singleton used by components — overwritten at runtime by App.
export let W98 = CLASSIC;
export function applyTheme(name: ThemeName) { W98 = themeFor(name); }

export const FONT = 'PressStart2P';
```

> The simplest integration: call `applyTheme(settings.theme)` once during
> startup (before render). For instant live theme switching, lift `W98` into
> a React context — same shape, no API changes elsewhere.

### Settings Modal — `src/components/SettingsModal.tsx`

```tsx
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Bevel } from './Bevel';
import { TitleBar } from './TitleBar';
import { W98, FONT } from '../theme';
import { Settings, ThemeName } from '../settings/useSettings';

type Props = {
  visible: boolean;
  settings: Settings;
  onChange: <K extends keyof Settings>(k: K, v: Settings[K]) => void;
  onClose: () => void;
};

const Checkbox: React.FC<{ checked: boolean; onToggle: () => void; label: string }> =
  ({ checked, onToggle, label }) => (
  <Pressable onPress={onToggle} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 6 }}>
    <Bevel raised={false} style={{ width: 18, height: 18, alignItems: 'center', justifyContent: 'center' }}>
      {checked && <Text style={{ fontFamily: FONT, fontSize: 10 }}>X</Text>}
    </Bevel>
    <Text style={{ fontFamily: FONT, fontSize: 9, marginLeft: 8 }}>{label}</Text>
  </Pressable>
);

const ThemePick: React.FC<{ value: ThemeName; onPick: (t: ThemeName) => void }> = ({ value, onPick }) => (
  <View style={{ flexDirection: 'row', gap: 6, paddingVertical: 6 }}>
    {(['classic','dark'] as ThemeName[]).map(t => (
      <Pressable key={t} onPress={() => onPick(t)}>
        <Bevel raised={value !== t} style={{ paddingHorizontal: 8, paddingVertical: 6 }}>
          <Text style={{ fontFamily: FONT, fontSize: 9 }}>{t.toUpperCase()}</Text>
        </Bevel>
      </Pressable>
    ))}
  </View>
);

export const SettingsModal: React.FC<Props> = ({ visible, settings, onChange, onClose }) => (
  <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
    <View style={{ flex: 1, backgroundColor: '#0008', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Bevel thick style={{ minWidth: 260 }}>
        <TitleBar title="Settings" />
        <View style={{ padding: 12 }}>
          <Checkbox label="Sound"          checked={settings.sound}         onToggle={() => onChange('sound', !settings.sound)} />
          <Checkbox label="Haptics"        checked={settings.haptics}       onToggle={() => onChange('haptics', !settings.haptics)} />
          <Checkbox label="Question marks" checked={settings.questionMarks} onToggle={() => onChange('questionMarks', !settings.questionMarks)} />
          <Text style={{ fontFamily: FONT, fontSize: 9, marginTop: 8 }}>Theme</Text>
          <ThemePick value={settings.theme} onPick={t => onChange('theme', t)} />
          <Pressable onPress={onClose} style={{ alignSelf: 'flex-end', marginTop: 10 }}>
            <Bevel style={{ paddingHorizontal: 14, paddingVertical: 6 }}>
              <Text style={{ fontFamily: FONT, fontSize: 9 }}>OK</Text>
            </Bevel>
          </Pressable>
        </View>
      </Bevel>
    </View>
  </Modal>
);
```

---

## 12. Sound FX

Drop four short WAVs into `assets/sfx/`. Free options: open-game-art,
freesound.org. Keep them under ~50 KB each.

**`src/audio/sfx.ts`**

```ts
import { Audio } from 'expo-av';

type SfxName = 'click' | 'flag' | 'boom' | 'win';

const FILES: Record<SfxName, number> = {
  click: require('../../assets/sfx/click.wav'),
  flag:  require('../../assets/sfx/flag.wav'),
  boom:  require('../../assets/sfx/boom.wav'),
  win:   require('../../assets/sfx/win.wav'),
};

const cache: Partial<Record<SfxName, Audio.Sound>> = {};
let enabled = true;
let ready = false;

export async function initSfx() {
  if (ready) return;
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    staysActiveInBackground: false,
    shouldDuckAndroid: true,
  });
  for (const name of Object.keys(FILES) as SfxName[]) {
    const { sound } = await Audio.Sound.createAsync(FILES[name], { volume: 0.7 });
    cache[name] = sound;
  }
  ready = true;
}

export function setSfxEnabled(on: boolean) { enabled = on; }

export async function play(name: SfxName) {
  if (!enabled || !ready) return;
  const s = cache[name];
  if (!s) return;
  try { await s.setPositionAsync(0); await s.playAsync(); } catch {}
}

export async function unloadSfx() {
  for (const s of Object.values(cache)) await s?.unloadAsync().catch(() => {});
}
```

---

## 13. Daily Challenge

Already wired: pass `mode: 'daily'` to `useGame`. The board is generated
from `mulberry32(hashSeed("YYYY-MM-DD:<difficulty>"))`, so every player
gets the same layout on the same calendar day.

UI toggle goes next to the difficulty picker (see `App.tsx` below). To
track daily streaks, extend `src/storage/highscore.ts`:

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { todayKey } from '../game/rng';
import { Difficulty } from '../game/types';

const DAILY_KEY = (d: Difficulty) => `ms98:daily:${d}`;

export async function recordDailyWin(d: Difficulty, seconds: number) {
  const k = DAILY_KEY(d);
  const raw = await AsyncStorage.getItem(k);
  const data = raw ? JSON.parse(raw) : { lastDate: '', streak: 0, best: null as number | null };
  const today = todayKey();
  if (data.lastDate === today) {
    if (data.best === null || seconds < data.best) data.best = seconds;
  } else {
    // Streak = +1 only if yesterday's date was the previous lastDate.
    const yest = new Date(); yest.setDate(yest.getDate() - 1);
    const y = yest.toISOString().slice(0, 10);
    data.streak = data.lastDate === y ? data.streak + 1 : 1;
    data.lastDate = today;
    data.best = seconds;
  }
  await AsyncStorage.setItem(k, JSON.stringify(data));
  return data as { lastDate: string; streak: number; best: number | null };
}
```

---

## 14. Final `App.tsx` (Everything Wired)

```tsx
import React, { useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, Text, View } from 'react-native';
import * as Font from 'expo-font';

import { themeFor, applyTheme, FONT } from './src/theme';
import { Bevel } from './src/components/Bevel';
import { Board } from './src/components/Board';
import { LcdCounter } from './src/components/LcdCounter';
import { SmileyButton } from './src/components/SmileyButton';
import { TitleBar } from './src/components/TitleBar';
import { DifficultyMenu } from './src/components/DifficultyMenu';
import { SettingsModal } from './src/components/SettingsModal';
import { useGame, GameMode } from './src/game/useGame';
import { setBestIfBetter, getBest } from './src/storage/highscore';
import { recordDailyWin } from './src/storage/highscore';
import { useSettings } from './src/settings/useSettings';
import { initSfx, play, setSfxEnabled, unloadSfx } from './src/audio/sfx';

export default function App() {
  const [fontReady, setFontReady] = useState(false);
  const [best, setBest] = useState<number | null>(null);
  const [mode, setMode] = useState<GameMode>('normal');
  const [showSettings, setShowSettings] = useState(false);
  const [streak, setStreak] = useState<number | null>(null);

  const { settings, update, loaded } = useSettings();
  const theme = useMemo(() => themeFor(settings.theme), [settings.theme]);

  // Sync globals from settings
  useEffect(() => { applyTheme(settings.theme); }, [settings.theme]);
  useEffect(() => { setSfxEnabled(settings.sound); }, [settings.sound]);

  const g = useGame({
    initial: 'beginner',
    allowQuestion: settings.questionMarks,
    mode,
    onEvent: e => {
      if (e === 'open') play('click');
      if (e === 'flag') play('flag');
      if (e === 'lose') play('boom');
      if (e === 'win')  play('win');
    },
  });

  useEffect(() => {
    Promise.all([
      Font.loadAsync({ [FONT]: require('./assets/fonts/PressStart2P-Regular.ttf') }),
      initSfx().catch(() => {}),
    ]).then(() => setFontReady(true));
    return () => { unloadSfx(); };
  }, []);

  useEffect(() => { getBest(g.difficulty).then(setBest); }, [g.difficulty]);

  useEffect(() => {
    if (g.status === 'won') {
      setBestIfBetter(g.difficulty, g.elapsed).then(updated => {
        if (updated) setBest(g.elapsed);
      });
      if (mode === 'daily') {
        recordDailyWin(g.difficulty, g.elapsed).then(d => setStreak(d.streak));
      }
    }
  }, [g.status, g.elapsed, g.difficulty, mode]);

  if (!fontReady || !loaded) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.desktop }}>
        <StatusBar style="light" />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 12 }}>
          <Bevel thick style={{ padding: 0 }}>
            <TitleBar title={mode === 'daily' ? 'Minesweeper — Daily' : 'Minesweeper'} />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <DifficultyMenu current={g.difficulty} onChange={d => { setMode('normal'); g.setDifficulty(d); }} />
              <View style={{ flexDirection: 'row', gap: 4, paddingRight: 6 }}>
                <Pressable onPress={() => { setMode(m => m === 'daily' ? 'normal' : 'daily'); g.reset(); }}>
                  <Bevel raised={mode !== 'daily'} style={{ paddingHorizontal: 8, paddingVertical: 6 }}>
                    <Text style={{ fontFamily: FONT, fontSize: 9 }}>DAILY</Text>
                  </Bevel>
                </Pressable>
                <Pressable onPress={() => setShowSettings(true)}>
                  <Bevel style={{ paddingHorizontal: 8, paddingVertical: 6 }}>
                    <Text style={{ fontFamily: FONT, fontSize: 9 }}>⚙</Text>
                  </Bevel>
                </Pressable>
              </View>
            </View>

            <View style={{ paddingHorizontal: 8, paddingTop: 4 }}>
              <Bevel raised={false} thick style={{ padding: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <LcdCounter value={g.minesLeft} />
                  <SmileyButton status={g.status} onPress={g.reset} />
                  <LcdCounter value={g.elapsed} />
                </View>
              </Bevel>

              <View style={{ marginTop: 6, marginBottom: 8 }}>
                <Board
                  board={g.board}
                  exploded={g.status === 'lost'}
                  hapticsOn={settings.haptics}
                  onOpen={g.open}
                  onFlag={g.flag}
                  onChord={g.chord}
                />
              </View>

              <View style={{ alignItems: 'center', paddingBottom: 6 }}>
                <Text style={{ fontFamily: FONT, fontSize: 9, color: '#000' }}>
                  {g.status === 'won'  && (mode === 'daily' && streak ? `YOU WIN! Streak ${streak}` : 'YOU WIN!')}
                  {g.status === 'lost' && 'GAME OVER'}
                  {(g.status === 'idle' || g.status === 'playing') &&
                    `Tap · Long-press flag · Double-tap to chord${best !== null ? ` · Best ${best}s` : ''}`}
                </Text>
              </View>
            </View>
          </Bevel>
        </View>

        <SettingsModal
          visible={showSettings}
          settings={settings}
          onChange={update}
          onClose={() => setShowSettings(false)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
```

---

## 15. Options Recap

| Option | Where it lives | How to toggle |
|--------|----------------|---------------|
| **Chord click** | `engine.chord`, double-tap in `Cell` | Always on |
| **Sound FX** | `src/audio/sfx.ts`, fired from `useGame.onEvent` | Settings → Sound |
| **Haptics** | `Cell` long-press | Settings → Haptics |
| **Question marks** | `engine.toggleFlag(..., allowQuestion)` | Settings → Question marks |
| **Theme (classic/dark)** | `themeFor()` + `applyTheme()` | Settings → Theme |
| **Daily challenge** | `useGame({ mode: 'daily' })` + seeded RNG | Top-right **DAILY** button |

---

## 12. Quick Sanity Test (Engine)

```ts
import { makeEmptyBoard, placeMines, openCell, checkWin } from './src/game/engine';

const b0 = makeEmptyBoard(9, 9);
const b1 = placeMines(b0, 10, 4, 4);
const { board: b2, hitMine } = openCell(b1, 4, 4);
console.log({ hitMine, won: checkWin(b2) });
```

That's the entire app. Drop the files in, run `npx expo start`, and you've
got a Windows 98 Minesweeper on both iOS and Android.
