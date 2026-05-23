# Block Blast — Mobile (iOS + Android)

A polished clone of the Block Blast / wood-block puzzle genre: an 8×8
board, a tray of three drag-and-drop pieces, and a scoring loop built on
row / column / 3×3-square clears with combo multipliers.

Built with **React Native + Expo** to match the rest of the apps in this
repo. The hard part — accurate drag-with-snap-preview — is implemented
with `react-native-gesture-handler` + `react-native-reanimated` v3.

---

## 1. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React Native (Expo SDK 51+) | One codebase → iOS + Android |
| Language | TypeScript | Type-safe piece/grid model |
| Gestures | `react-native-gesture-handler` | Pan + snap-to-grid drag |
| Animation | `react-native-reanimated` v3 | 60 fps on the UI thread |
| Storage | `@react-native-async-storage/async-storage` | Best score + saved game |
| Haptics | `expo-haptics` | Place / clear / game-over |
| Audio | `expo-av` | SFX on clears + combos |
| Fonts | system | Just bold numerals |

---

## 2. Project Setup

```bash
npx create-expo-app@latest blockblast --template blank-typescript
cd blockblast

npx expo install \
  react-native-gesture-handler react-native-reanimated \
  react-native-safe-area-context expo-status-bar \
  expo-haptics expo-av \
  @react-native-async-storage/async-storage
```

**`babel.config.js`**

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'], // must be last
  };
};
```

**`app.json`** (essentials)

```json
{
  "expo": {
    "name": "Block Blast",
    "slug": "blockblast",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "dark",
    "splash": { "image": "./assets/splash.png", "backgroundColor": "#0f1530" },
    "ios": { "bundleIdentifier": "com.yourname.blockblast", "supportsTablet": true },
    "android": { "package": "com.yourname.blockblast" }
  }
}
```

---

## 3. File Layout

```
blockblast/
├── App.tsx
├── src/
│   ├── theme.ts
│   ├── game/
│   │   ├── types.ts
│   │   ├── pieces.ts        ← piece catalog + bag/draw
│   │   ├── engine.ts        ← place / clear / game-over
│   │   └── useGame.ts
│   ├── components/
│   │   ├── Board.tsx
│   │   ├── Cell.tsx
│   │   ├── PieceShape.tsx   ← shared piece renderer
│   │   ├── PieceTray.tsx
│   │   ├── DraggablePiece.tsx
│   │   ├── ScorePanel.tsx
│   │   ├── ComboBanner.tsx
│   │   └── GameOverModal.tsx
│   ├── audio/
│   │   └── sfx.ts
│   └── storage/
│       └── save.ts
└── assets/
    └── sfx/
        ├── place.mp3
        ├── clear.mp3
        ├── combo.mp3
        └── gameover.mp3
```

---

## 4. Theme

**`src/theme.ts`**

```ts
export const C = {
  // Background
  bg:          '#0f1530',
  bgPanel:     '#1a2347',
  bgHeader:    '#0a0f25',

  // Grid
  cellEmpty:   '#1f2a52',
  cellShadow:  '#0b1130',
  gridGap:     '#0f1530',

  // Pieces (cycled per piece)
  piece: [
    '#3aa7ff', // blue
    '#ff6f61', // coral
    '#ffc107', // yellow
    '#7ed957', // green
    '#b083ff', // purple
    '#ff7ac6', // pink
    '#ff9b3a', // orange
    '#19d4c8', // teal
  ],

  // States
  ghostValid:   'rgba(255,255,255,0.22)',
  ghostInvalid: 'rgba(255,75,75,0.30)',
  clearFlash:   '#ffffff',

  // Text
  text:        '#f7f9ff',
  textMuted:   '#9aa4cc',
  accent:      '#ffd54a',
};

export const RADII = { cell: 6, tile: 8, panel: 14 };

export function pieceColor(seed: number): string {
  return C.piece[seed % C.piece.length];
}
```

---

## 5. Pieces (Catalog + Bag)

Every piece is a list of `(row, col)` offsets from a top-left origin.
This makes rotation, drawing, and placement uniform.

**`src/game/pieces.ts`**

```ts
export type PieceShape = {
  id: string;
  cells: [number, number][]; // (r, c) offsets from origin
  width: number;             // bounding box w
  height: number;            // bounding box h
};

const make = (id: string, grid: number[][]): PieceShape => {
  const cells: [number, number][] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c]) cells.push([r, c]);
    }
  }
  return { id, cells, width: grid[0].length, height: grid.length };
};

/** The full piece catalog — ~40 shapes spanning the genre. */
export const PIECES: PieceShape[] = [
  // singles & small lines
  make('1',           [[1]]),
  make('h2',          [[1,1]]),
  make('h3',          [[1,1,1]]),
  make('h4',          [[1,1,1,1]]),
  make('h5',          [[1,1,1,1,1]]),
  make('v2',          [[1],[1]]),
  make('v3',          [[1],[1],[1]]),
  make('v4',          [[1],[1],[1],[1]]),
  make('v5',          [[1],[1],[1],[1],[1]]),

  // squares
  make('sq2',         [[1,1],[1,1]]),
  make('sq3',         [[1,1,1],[1,1,1],[1,1,1]]),

  // L (4 rotations, two sizes)
  make('L2',          [[1,0],[1,1]]),
  make('L2r',         [[1,1],[1,0]]),
  make('L2rr',        [[1,1],[0,1]]),
  make('L2rrr',       [[0,1],[1,1]]),
  make('L3-a',        [[1,0,0],[1,0,0],[1,1,1]]),
  make('L3-b',        [[1,1,1],[1,0,0],[1,0,0]]),
  make('L3-c',        [[1,1,1],[0,0,1],[0,0,1]]),
  make('L3-d',        [[0,0,1],[0,0,1],[1,1,1]]),

  // T, S, Z, plus
  make('T',           [[1,1,1],[0,1,0]]),
  make('Tu',          [[0,1,0],[1,1,1]]),
  make('Tl',          [[1,0],[1,1],[1,0]]),
  make('Tr',          [[0,1],[1,1],[0,1]]),
  make('S',           [[0,1,1],[1,1,0]]),
  make('Z',           [[1,1,0],[0,1,1]]),
  make('plus',        [[0,1,0],[1,1,1],[0,1,0]]),

  // diagonals (3-cell)
  make('diag-a',      [[1,0,0],[0,1,0],[0,0,1]]),
  make('diag-b',      [[0,0,1],[0,1,0],[1,0,0]]),

  // big corner / boomerang
  make('corner-tl',   [[1,1],[1,0]]),
  make('corner-tr',   [[1,1],[0,1]]),
  make('corner-bl',   [[1,0],[1,1]]),
  make('corner-br',   [[0,1],[1,1]]),
];

const PIECE_BY_ID: Record<string, PieceShape> = Object.fromEntries(PIECES.map(p => [p.id, p]));
export const pieceById = (id: string) => PIECE_BY_ID[id];

/**
 * "Bag" draw — shuffle the catalog and deal 3 pieces. Lightly weights
 * smaller pieces so the player isn't constantly drowning in 3×3s.
 */
const SMALL_IDS = new Set(['1','h2','v2','h3','v3','L2','L2r','L2rr','L2rrr','S','Z','T','Tu']);

export function dealHand(): PieceShape[] {
  const pool = [...PIECES, ...PIECES.filter(p => SMALL_IDS.has(p.id))]; // 2× weight on smalls
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}
```

---

## 6. Game Types & Engine

**`src/game/types.ts`**

```ts
export const BOARD_SIZE = 8;

export type CellColor = string | null; // null = empty
export type Board = CellColor[][];

export type HandSlot = {
  pieceId: string;
  colorSeed: number;        // index into theme.C.piece
  used: boolean;
};

export type GameState = {
  board: Board;
  hand: HandSlot[];         // exactly 3 slots
  score: number;
  best: number;
  combo: number;            // consecutive piece placements that cleared something
  status: 'playing' | 'lost';
};

export type Placement = { row: number; col: number; };
```

**`src/game/engine.ts`**

```ts
import { Board, BOARD_SIZE, GameState, HandSlot, Placement } from './types';
import { PieceShape, dealHand, pieceById } from './pieces';

export const emptyBoard = (): Board =>
  Array.from({ length: BOARD_SIZE }, () => Array<string | null>(BOARD_SIZE).fill(null));

export function newGame(best = 0): GameState {
  return {
    board: emptyBoard(),
    hand: makeHand(),
    score: 0,
    best,
    combo: 0,
    status: 'playing',
  };
}

let colorSeedCounter = 0;
function makeHand(): HandSlot[] {
  return dealHand().map(p => ({
    pieceId: p.id,
    colorSeed: colorSeedCounter++,
    used: false,
  }));
}

/** Can `piece` be placed with its origin at (r, c)? */
export function canPlace(board: Board, piece: PieceShape, at: Placement): boolean {
  for (const [dr, dc] of piece.cells) {
    const r = at.row + dr, c = at.col + dc;
    if (r < 0 || c < 0 || r >= BOARD_SIZE || c >= BOARD_SIZE) return false;
    if (board[r][c]) return false;
  }
  return true;
}

/** Is there ANY valid placement for `piece` on `board`? */
export function pieceFitsAnywhere(board: Board, piece: PieceShape): boolean {
  for (let r = 0; r <= BOARD_SIZE - piece.height; r++) {
    for (let c = 0; c <= BOARD_SIZE - piece.width; c++) {
      if (canPlace(board, piece, { row: r, col: c })) return true;
    }
  }
  return false;
}

/** Detect all full rows, columns, and 3×3 boxes (boxes start at row/col % 3 === 0). */
export function findClears(board: Board): {
  rows: number[]; cols: number[]; boxes: [number, number][];
} {
  const rows: number[] = [];
  const cols: number[] = [];
  const boxes: [number, number][] = [];

  for (let r = 0; r < BOARD_SIZE; r++) {
    if (board[r].every(c => c !== null)) rows.push(r);
  }
  for (let c = 0; c < BOARD_SIZE; c++) {
    let full = true;
    for (let r = 0; r < BOARD_SIZE; r++) if (!board[r][c]) { full = false; break; }
    if (full) cols.push(c);
  }
  // 3x3 boxes — using a fixed grid of 3×3 boxes anchored at multiples of 3.
  // For an 8×8 board this catches (0,0)-(2,2), (0,3)-(2,5), (3,0)-(5,2), (3,3)-(5,5).
  // (You can change the anchoring strategy or remove this rule entirely.)
  for (let br = 0; br + 3 <= BOARD_SIZE; br += 3) {
    for (let bc = 0; bc + 3 <= BOARD_SIZE; bc += 3) {
      let full = true;
      outer:
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (!board[br + r][bc + c]) { full = false; break outer; }
        }
      }
      if (full) boxes.push([br, bc]);
    }
  }
  return { rows, cols, boxes };
}

/**
 * Apply a placement. Returns the next state + a `result` object
 * describing what cleared (for animations / score popups).
 */
export function place(
  state: GameState,
  handIndex: number,
  at: Placement,
): {
  state: GameState;
  result: {
    placedCells: [number, number][];
    clearedRows: number[];
    clearedCols: number[];
    clearedBoxes: [number, number][];
    gainedScore: number;
    comboLevel: number;
  } | null;
} {
  const slot = state.hand[handIndex];
  if (!slot || slot.used) return { state, result: null };
  const piece = pieceById(slot.pieceId);
  if (!canPlace(state.board, piece, at)) return { state, result: null };

  // 1) Lay the piece
  const board = state.board.map(row => row.slice());
  const placedCells: [number, number][] = [];
  const color = `piece-${slot.colorSeed}`;
  for (const [dr, dc] of piece.cells) {
    const r = at.row + dr, c = at.col + dc;
    board[r][c] = color;
    placedCells.push([r, c]);
  }

  // 2) Detect clears
  const clears = findClears(board);
  const linesCleared = clears.rows.length + clears.cols.length + clears.boxes.length;

  // 3) Clear cells
  if (clears.rows.length) for (const r of clears.rows) for (let c = 0; c < BOARD_SIZE; c++) board[r][c] = null;
  if (clears.cols.length) for (const c of clears.cols) for (let r = 0; r < BOARD_SIZE; r++) board[r][c] = null;
  for (const [br, bc] of clears.boxes) {
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) board[br + r][bc + c] = null;
  }

  // 4) Scoring
  //    Per cell placed = 1 point
  //    Per line cleared = 10 points, +10 each additional in the same move (combo of THIS move)
  //    Cross-move "combo" multiplier scales with consecutive clearing placements.
  const cellsPoints = placedCells.length;
  let linePoints = 0;
  for (let i = 0; i < linesCleared; i++) linePoints += 10 + i * 10; // 10, 20, 30, …

  const newCombo = linesCleared > 0 ? state.combo + 1 : 0;
  const comboMult = 1 + Math.max(0, newCombo - 1) * 0.5; // ×1, ×1.5, ×2, ×2.5…
  const gained = Math.round((cellsPoints + linePoints) * comboMult);

  // 5) Mark slot used; deal next hand if all 3 are spent
  const hand = state.hand.map((s, i) => i === handIndex ? { ...s, used: true } : s);
  const allUsed = hand.every(s => s.used);
  const nextHand = allUsed ? makeHand() : hand;

  // 6) Update state
  const score = state.score + gained;
  const best = Math.max(state.best, score);

  // 7) Game-over check — for every remaining piece, must fit somewhere.
  let lost = false;
  for (const s of nextHand) {
    if (s.used) continue;
    const p = pieceById(s.pieceId);
    if (!pieceFitsAnywhere(board, p)) { lost = true; break; }
  }

  return {
    state: {
      ...state,
      board,
      hand: nextHand,
      score,
      best,
      combo: newCombo,
      status: lost ? 'lost' : 'playing',
    },
    result: {
      placedCells,
      clearedRows: clears.rows,
      clearedCols: clears.cols,
      clearedBoxes: clears.boxes,
      gainedScore: gained,
      comboLevel: newCombo,
    },
  };
}

/** Force-deal a new hand (used by the optional "swap" power-up). */
export function rerollHand(state: GameState): GameState {
  return { ...state, hand: makeHand() };
}
```

---

## 7. `useGame` Hook

**`src/game/useGame.ts`**

```ts
import { useCallback, useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { GameState, Placement } from './types';
import { newGame, place, rerollHand } from './engine';
import { play } from '../audio/sfx';
import { loadGame, loadBest, saveGame, saveBest } from '../storage/save';

export function useGameState() {
  const [state, setState] = useState<GameState>(() => newGame());

  // Hydrate
  useEffect(() => {
    (async () => {
      const best = (await loadBest()) ?? 0;
      const saved = await loadGame();
      if (saved && saved.status === 'playing') setState({ ...saved, best });
      else setState(s => ({ ...s, best }));
    })();
  }, []);

  // Persist
  useEffect(() => { saveGame(state); }, [state]);
  useEffect(() => { saveBest(state.best); }, [state.best]);

  const tryPlace = useCallback((handIndex: number, at: Placement, hapticsOn = true) => {
    let result: ReturnType<typeof place>['result'] = null;
    setState(prev => {
      const r = place(prev, handIndex, at);
      result = r.result;
      return r.state;
    });
    if (result) {
      const cleared =
        result.clearedRows.length + result.clearedCols.length + result.clearedBoxes.length;
      if (cleared > 1) play('combo');
      else if (cleared === 1) play('clear');
      else play('place');
      if (hapticsOn) {
        Haptics.impactAsync(
          cleared > 1 ? Haptics.ImpactFeedbackStyle.Heavy
          : cleared === 1 ? Haptics.ImpactFeedbackStyle.Medium
          : Haptics.ImpactFeedbackStyle.Light,
        ).catch(() => {});
      }
    }
    return result;
  }, []);

  const restart = useCallback(() => {
    setState(s => newGame(s.best));
  }, []);

  const reroll = useCallback(() => setState(rerollHand), []);

  return { state, tryPlace, restart, reroll };
}
```

---

## 8. UI Components

### `src/components/Cell.tsx`

```tsx
import React from 'react';
import { View } from 'react-native';
import { C, RADII } from '../theme';

export const Cell: React.FC<{
  size: number;
  color: string | null;
  ghost?: 'valid' | 'invalid' | null;
  ghostColor?: string;
}> = ({ size, color, ghost, ghostColor }) => {
  const bg = color ? colorFromKey(color)
           : ghost === 'valid'   ? (ghostColor ?? C.ghostValid)
           : ghost === 'invalid' ? C.ghostInvalid
           : C.cellEmpty;

  return (
    <View style={{
      width: size, height: size,
      backgroundColor: bg,
      borderRadius: RADII.cell,
      borderWidth: color ? 0 : 1,
      borderColor: C.cellShadow,
    }} />
  );
};

/** Color key on the board is like "piece-37" → seed 37 → palette color. */
export function colorFromKey(key: string): string {
  const m = key.match(/^piece-(\d+)$/);
  if (!m) return key;
  const idx = Number(m[1]) % C.piece.length;
  return C.piece[idx];
}
```

### `src/components/PieceShape.tsx`

```tsx
import React from 'react';
import { View } from 'react-native';
import { PieceShape as Shape } from '../game/pieces';
import { Cell } from './Cell';

export const PieceShape: React.FC<{
  shape: Shape;
  cellSize: number;
  color: string;
  opacity?: number;
}> = ({ shape, cellSize, color, opacity = 1 }) => (
  <View style={{
    width: shape.width * cellSize,
    height: shape.height * cellSize,
    opacity,
  }}>
    {shape.cells.map(([r, c], i) => (
      <View key={i} style={{
        position: 'absolute',
        top: r * cellSize, left: c * cellSize,
      }}>
        <Cell size={cellSize} color={color} />
      </View>
    ))}
  </View>
);
```

### `src/components/Board.tsx`

```tsx
import React from 'react';
import { View } from 'react-native';
import { BOARD_SIZE, Board as BoardT } from '../game/types';
import { Cell } from './Cell';
import { C, RADII } from '../theme';

export type GhostMap = Record<string, 'valid' | 'invalid'>;

export const cellKey = (r: number, c: number) => `${r}:${c}`;

export const Board: React.FC<{
  board: BoardT;
  cellSize: number;
  gap: number;
  ghost?: GhostMap;
  ghostColor?: string;
  /** Called with the board's absolute layout for hit-testing during drag. */
  onLayoutPx?: (rect: { x: number; y: number; w: number; h: number }) => void;
}> = ({ board, cellSize, gap, ghost, ghostColor, onLayoutPx }) => {
  const totalW = BOARD_SIZE * cellSize + (BOARD_SIZE + 1) * gap;

  return (
    <View
      onLayout={e => {
        const { x, y, width, height } = e.nativeEvent.layout;
        onLayoutPx?.({ x, y, w: width, h: height });
      }}
      style={{
        width: totalW, height: totalW,
        backgroundColor: C.bgPanel,
        borderRadius: RADII.panel,
        padding: gap,
      }}
    >
      {board.map((row, r) => (
        <View key={r} style={{ flexDirection: 'row' }}>
          {row.map((cell, c) => (
            <View key={c} style={{ marginRight: c === BOARD_SIZE - 1 ? 0 : gap, marginBottom: r === BOARD_SIZE - 1 ? 0 : gap }}>
              <Cell
                size={cellSize}
                color={cell}
                ghost={ghost?.[cellKey(r, c)] ?? null}
                ghostColor={ghostColor}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
```

### `src/components/DraggablePiece.tsx` — the heart of the UX

The drag flow:

1. User long-presses (or just touches) a piece in the tray.
2. The piece detaches and follows the finger, **lifted above** the finger
   so the player can see it (an offset of about 4 cells up — same as the
   real Block Blast).
3. The board reports its absolute layout. We convert finger position →
   grid `(row, col)` and render a **ghost preview** of the piece's footprint.
4. On release: if all cells of the footprint are in-bounds + empty, the
   parent commits the placement. Otherwise the piece snaps back.

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS,
} from 'react-native-reanimated';
import { PieceShape as Shape, pieceById } from '../game/pieces';
import { PieceShape as PieceRender } from './PieceShape';
import { HandSlot, BOARD_SIZE } from '../game/types';
import { pieceColor } from '../theme';

const LIFT_CELLS = 4; // raise piece above finger

export type BoardRect = { x: number; y: number; w: number; h: number };

type Props = {
  slot: HandSlot;
  handIndex: number;
  trayCellSize: number;       // small piece size while resting in tray
  boardCellSize: number;      // full cell size when over the board
  boardGap: number;
  /** Resolves the board's screen-space layout — called every frame, so memoize. */
  getBoardRect: () => BoardRect | null;
  /** Live hover update (during drag). Parent renders the ghost. */
  onHover: (handIndex: number, gridR: number | null, gridC: number | null) => void;
  /** Drop attempt — parent returns true if it actually placed. */
  onDrop:  (handIndex: number, gridR: number, gridC: number) => boolean;
};

export const DraggablePiece: React.FC<Props> = ({
  slot, handIndex, trayCellSize, boardCellSize, boardGap,
  getBoardRect, onHover, onDrop,
}) => {
  const shape = pieceById(slot.pieceId);
  const color = pieceColor(slot.colorSeed);

  const dragging = useSharedValue(0);   // 0..1
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);

  const [pieceOrigin, setPieceOrigin] = useState<{ x: number; y: number } | null>(null);
  const pieceOriginRef = React.useRef(pieceOrigin);
  pieceOriginRef.current = pieceOrigin;

  /** Convert absolute finger position to a grid (r, c). Returns null if off-board. */
  const finger2grid = (absX: number, absY: number): { r: number; c: number } | null => {
    const rect = getBoardRect();
    if (!rect) return null;
    const cellSpan = boardCellSize + boardGap;
    const localX = absX - rect.x - boardGap;
    // anchor cell = top-left cell of the piece (NOT under the finger — we lift it)
    const localY = absY - rect.y - boardGap - LIFT_CELLS * cellSpan;
    const c = Math.round(localX / cellSpan);
    const r = Math.round(localY / cellSpan);
    if (r < 0 || c < 0 || r > BOARD_SIZE - shape.height || c > BOARD_SIZE - shape.width) return null;
    return { r, c };
  };

  // Track the resting position of the piece in the tray
  const onLayout = (e: any) => {
    const { x, y } = e.nativeEvent.layout;
    setPieceOrigin({ x, y });
  };

  const pan = Gesture.Pan()
    .minDistance(0)
    .onStart(() => {
      dragging.value = withTiming(1, { duration: 80 });
    })
    .onUpdate(e => {
      tx.value = e.translationX;
      ty.value = e.translationY;
      // Hop to JS thread for grid math + parent update
      const absX = e.absoluteX, absY = e.absoluteY;
      runOnJS(reportHover)(absX, absY);
    })
    .onEnd(e => {
      const absX = e.absoluteX, absY = e.absoluteY;
      runOnJS(tryDrop)(absX, absY);
      // Spring back (parent will hide if drop succeeded)
      tx.value = withSpring(0, { damping: 18, stiffness: 220 });
      ty.value = withSpring(0, { damping: 18, stiffness: 220 });
      dragging.value = withTiming(0, { duration: 120 });
    });

  const reportHover = (absX: number, absY: number) => {
    const g = finger2grid(absX, absY);
    if (g) onHover(handIndex, g.r, g.c);
    else   onHover(handIndex, null, null);
  };

  const tryDrop = (absX: number, absY: number) => {
    const g = finger2grid(absX, absY);
    onHover(handIndex, null, null); // clear ghost regardless
    if (!g) return;
    onDrop(handIndex, g.r, g.c);
  };

  const aStyle = useAnimatedStyle(() => {
    // Scale up from tray size → board cell size while dragging
    const scale = 1 + dragging.value * (boardCellSize / trayCellSize - 1);
    return {
      transform: [
        { translateX: tx.value },
        { translateY: ty.value - dragging.value * (LIFT_CELLS * boardCellSize) },
        { scale },
      ],
      zIndex: dragging.value > 0 ? 100 : 1,
    };
  });

  if (slot.used) {
    // empty slot placeholder
    return <View style={{ width: shape.width * trayCellSize, height: shape.height * trayCellSize, opacity: 0 }} />;
  }

  return (
    <View onLayout={onLayout}>
      <GestureDetector gesture={pan}>
        <Animated.View style={aStyle}>
          <PieceRender shape={shape} cellSize={trayCellSize} color={color} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
```

> **Lift offset.** Real Block Blast lifts the piece ~4 rows above the
> finger so the player can see what they're placing. We use `LIFT_CELLS`
> for that, applied in `finger2grid` (so the snap matches the visual)
> and in the visual transform (so the piece visually rises during the
> drag).

### `src/components/PieceTray.tsx`

```tsx
import React from 'react';
import { View } from 'react-native';
import { HandSlot } from '../game/types';
import { DraggablePiece, BoardRect } from './DraggablePiece';
import { C, RADII } from '../theme';

type Props = {
  hand: HandSlot[];
  trayCellSize: number;
  boardCellSize: number;
  boardGap: number;
  getBoardRect: () => BoardRect | null;
  onHover: (handIndex: number, gridR: number | null, gridC: number | null) => void;
  onDrop:  (handIndex: number, gridR: number, gridC: number) => boolean;
};

export const PieceTray: React.FC<Props> = (p) => (
  <View style={{
    backgroundColor: C.bgPanel, borderRadius: RADII.panel,
    paddingVertical: 16, paddingHorizontal: 12,
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    minHeight: 110,
  }}>
    {p.hand.map((slot, i) => (
      <DraggablePiece
        key={`${slot.pieceId}-${slot.colorSeed}`}
        slot={slot}
        handIndex={i}
        trayCellSize={p.trayCellSize}
        boardCellSize={p.boardCellSize}
        boardGap={p.boardGap}
        getBoardRect={p.getBoardRect}
        onHover={p.onHover}
        onDrop={p.onDrop}
      />
    ))}
  </View>
);
```

### `src/components/ScorePanel.tsx`

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withSequence, withTiming, runOnJS, Easing,
} from 'react-native-reanimated';
import { C } from '../theme';

export const ScorePanel: React.FC<{ score: number; best: number }> = ({ score, best }) => {
  const prev = useRef(score);
  const [delta, setDelta] = useState<number | null>(null);
  const opacity = useSharedValue(0);
  const ty = useSharedValue(0);

  useEffect(() => {
    const diff = score - prev.current;
    prev.current = score;
    if (diff > 0) {
      setDelta(diff);
      opacity.value = 1; ty.value = 0;
      opacity.value = withSequence(withTiming(1, { duration: 40 }), withTiming(0, { duration: 600 }));
      ty.value = withTiming(-30, { duration: 640, easing: Easing.out(Easing.cubic) }, () => {
        runOnJS(setDelta)(null);
      });
    }
  }, [score]);

  const aStyle = useAnimatedStyle(() => ({
    opacity: opacity.value, transform: [{ translateY: ty.value }],
  }));

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: C.textMuted, fontSize: 11, letterSpacing: 1 }}>SCORE</Text>
        <Text style={{ color: C.text, fontSize: 32, fontWeight: '800' }}>{score}</Text>
        {delta !== null && (
          <Animated.Text style={[
            { position: 'absolute', top: 12, right: -36, color: C.accent, fontWeight: '800', fontSize: 18 },
            aStyle,
          ]}>+{delta}</Animated.Text>
        )}
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: C.textMuted, fontSize: 11, letterSpacing: 1 }}>BEST</Text>
        <Text style={{ color: C.text, fontSize: 32, fontWeight: '800' }}>{best}</Text>
      </View>
    </View>
  );
};
```

### `src/components/ComboBanner.tsx`

```tsx
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withSequence, withTiming, Easing,
} from 'react-native-reanimated';
import { C } from '../theme';

const LABELS = [
  '', 'NICE', 'GREAT!', 'AMAZING!', 'INSANE!', 'LEGEND!', 'GODLIKE!!',
];

export const ComboBanner: React.FC<{ level: number; cleared: number }> = ({ level, cleared }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.6);

  useEffect(() => {
    if (cleared > 0 && level > 0) {
      opacity.value = withSequence(
        withTiming(1, { duration: 80, easing: Easing.out(Easing.cubic) }),
        withTiming(0, { duration: 700, easing: Easing.in(Easing.cubic) }),
      );
      scale.value = withSequence(
        withTiming(1.1, { duration: 100, easing: Easing.out(Easing.back(1.6)) }),
        withTiming(1,   { duration: 200 }),
      );
    }
  }, [level, cleared]);

  const aStyle = useAnimatedStyle(() => ({
    opacity: opacity.value, transform: [{ scale: scale.value }],
  }));

  const label = LABELS[Math.min(level, LABELS.length - 1)] || `x${level}`;

  return (
    <Animated.View pointerEvents="none" style={[{
      position: 'absolute', top: '38%', alignSelf: 'center',
    }, aStyle]}>
      <Text style={{
        color: C.accent, fontSize: 44, fontWeight: '900',
        textShadowColor: '#000a', textShadowRadius: 6, textShadowOffset: { width: 0, height: 2 },
      }}>
        {label}
      </Text>
    </Animated.View>
  );
};
```

### `src/components/GameOverModal.tsx`

```tsx
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { C, RADII } from '../theme';

export const GameOverModal: React.FC<{
  visible: boolean;
  score: number;
  best: number;
  onRestart: () => void;
}> = ({ visible, score, best, onRestart }) => (
  <Modal transparent animationType="fade" visible={visible}>
    <View style={{ flex: 1, backgroundColor: '#000a', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ backgroundColor: C.bgPanel, padding: 24, borderRadius: RADII.panel, minWidth: 260, alignItems: 'center' }}>
        <Text style={{ color: C.text, fontSize: 26, fontWeight: '900' }}>Game Over</Text>
        <Text style={{ color: C.textMuted, marginTop: 8 }}>Score</Text>
        <Text style={{ color: C.accent, fontSize: 40, fontWeight: '900' }}>{score}</Text>
        <Text style={{ color: C.textMuted, marginTop: 4 }}>Best · {best}</Text>
        <Pressable
          onPress={onRestart}
          style={{ marginTop: 18, backgroundColor: C.accent, paddingHorizontal: 22, paddingVertical: 12, borderRadius: 999 }}
        >
          <Text style={{ color: '#0a0f25', fontWeight: '800' }}>Try Again</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);
```

---

## 9. Persistence

**`src/storage/save.ts`**

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState } from '../game/types';

const GAME_KEY = 'bb:game';
const BEST_KEY = 'bb:best';

export async function saveGame(s: GameState) {
  await AsyncStorage.setItem(GAME_KEY, JSON.stringify(s));
}
export async function loadGame(): Promise<GameState | null> {
  const raw = await AsyncStorage.getItem(GAME_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as GameState; } catch { return null; }
}
export async function loadBest(): Promise<number | null> {
  const raw = await AsyncStorage.getItem(BEST_KEY);
  return raw ? Number(raw) : null;
}
export async function saveBest(v: number) {
  await AsyncStorage.setItem(BEST_KEY, String(v));
}
```

---

## 10. Sound FX

**`src/audio/sfx.ts`**

```ts
import { Audio } from 'expo-av';

type SfxName = 'place' | 'clear' | 'combo' | 'gameover';

const FILES: Record<SfxName, number> = {
  place:    require('../../assets/sfx/place.mp3'),
  clear:    require('../../assets/sfx/clear.mp3'),
  combo:    require('../../assets/sfx/combo.mp3'),
  gameover: require('../../assets/sfx/gameover.mp3'),
};

const cache: Partial<Record<SfxName, Audio.Sound>> = {};
let enabled = true;
let ready = false;

export async function initSfx() {
  if (ready) return;
  await Audio.setAudioModeAsync({ playsInSilentModeIOS: true, shouldDuckAndroid: true });
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
```

---

## 11. Root — `App.tsx`

This is where the ghost preview gets wired up: the tray reports
`(handIndex, r, c)` on every drag frame, and `App` computes which board
cells should glow based on the piece's footprint + validity.

```tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

import { C, RADII, pieceColor } from './src/theme';
import { Board, cellKey, GhostMap } from './src/components/Board';
import { PieceTray } from './src/components/PieceTray';
import { ScorePanel } from './src/components/ScorePanel';
import { ComboBanner } from './src/components/ComboBanner';
import { GameOverModal } from './src/components/GameOverModal';
import { useGameState } from './src/game/useGame';
import { pieceById } from './src/game/pieces';
import { canPlace } from './src/game/engine';
import { initSfx, play } from './src/audio/sfx';
import type { BoardRect } from './src/components/DraggablePiece';

export default function App() {
  const { state, tryPlace, restart, reroll } = useGameState();
  const { width } = useWindowDimensions();

  // Board sizing: leave ~24 px margin on each side, divide into 8 cells + 9 gaps.
  const gap = 4;
  const boardWidth = Math.min(width - 24, 420);
  const cellSize = Math.floor((boardWidth - gap * 9) / 8);
  const trayCellSize = Math.round(cellSize * 0.7);

  const boardRectRef = useRef<BoardRect | null>(null);
  const getBoardRect = useCallback(() => boardRectRef.current, []);

  // Ghost state (the highlighted preview cells)
  const [hover, setHover] = useState<{ handIndex: number; r: number; c: number } | null>(null);

  const ghost: GhostMap = useMemo(() => {
    if (!hover) return {};
    const slot = state.hand[hover.handIndex];
    if (!slot || slot.used) return {};
    const shape = pieceById(slot.pieceId);
    const valid = canPlace(state.board, shape, { row: hover.r, col: hover.c });
    const m: GhostMap = {};
    for (const [dr, dc] of shape.cells) {
      m[cellKey(hover.r + dr, hover.c + dc)] = valid ? 'valid' : 'invalid';
    }
    return m;
  }, [hover, state.board, state.hand]);

  const ghostColor = hover ? pieceColor(state.hand[hover.handIndex]?.colorSeed ?? 0) : undefined;

  // Drag callbacks
  const onHover = useCallback((handIndex: number, r: number | null, c: number | null) => {
    if (r === null || c === null) setHover(null);
    else setHover({ handIndex, r, c });
  }, []);

  const onDrop = useCallback((handIndex: number, r: number, c: number): boolean => {
    const result = tryPlace(handIndex, { row: r, col: c });
    return result !== null;
  }, [tryPlace]);

  // Combo banner trigger
  const [lastClear, setLastClear] = useState<{ level: number; cleared: number; nonce: number }>({ level: 0, cleared: 0, nonce: 0 });
  useEffect(() => {
    if (state.combo > 0) setLastClear(p => ({ level: state.combo, cleared: 1, nonce: p.nonce + 1 }));
  }, [state.combo, state.score]);

  // Init audio + handle game over sound
  useEffect(() => { initSfx().catch(() => {}); }, []);
  useEffect(() => { if (state.status === 'lost') play('gameover'); }, [state.status]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
          <StatusBar style="light" />
          <View style={{ flex: 1, paddingHorizontal: 12 }}>
            <View style={{ backgroundColor: C.bgHeader, borderRadius: RADII.panel, padding: 6, marginTop: 8 }}>
              <ScorePanel score={state.score} best={state.best} />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8, paddingHorizontal: 10, paddingBottom: 6 }}>
                <Pressable onPress={reroll}>
                  <View style={{ backgroundColor: C.bgPanel, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 }}>
                    <Text style={{ color: C.text, fontWeight: '700' }}>Swap</Text>
                  </View>
                </Pressable>
                <Pressable onPress={restart}>
                  <View style={{ backgroundColor: C.bgPanel, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 }}>
                    <Text style={{ color: C.text, fontWeight: '700' }}>Restart</Text>
                  </View>
                </Pressable>
              </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Board
                board={state.board}
                cellSize={cellSize}
                gap={gap}
                ghost={ghost}
                ghostColor={ghostColor}
                onLayoutPx={r => {
                  // Convert SafeArea-local layout to absolute screen coords:
                  // SafeArea sits below the status bar; for accuracy, measure with measureInWindow.
                  boardRectRef.current = r as any;
                }}
              />
              <ComboBanner level={lastClear.level} cleared={lastClear.cleared} />
            </View>

            <View style={{ paddingBottom: 8 }}>
              <PieceTray
                hand={state.hand}
                trayCellSize={trayCellSize}
                boardCellSize={cellSize}
                boardGap={gap}
                getBoardRect={getBoardRect}
                onHover={onHover}
                onDrop={onDrop}
              />
            </View>
          </View>

          <GameOverModal
            visible={state.status === 'lost'}
            score={state.score}
            best={state.best}
            onRestart={restart}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

> **Production note on `boardRectRef`.** `onLayout` reports coordinates
> relative to the parent. For pixel-perfect hit-testing across all
> phones, replace it with `ref.measureInWindow((x, y, w, h) => …)` and
> re-measure on orientation change. The code above is the simple form
> that works fine inside a SafeArea-padded layout.

---

## 12. Controls

| Action | Gesture |
|--------|---------|
| Pick up a piece | Touch a piece in the tray |
| Aim | Drag — piece floats ~4 cells above your finger |
| Snap preview | Ghost cells light up green (valid) or red (invalid) |
| Place | Release on a valid spot |
| Cancel | Release outside the board (piece springs back) |
| **Swap** | Tap "Swap" — burn the current hand, deal a new one (optionally cost a gem) |
| Restart | Tap "Restart" |

---

## 13. Scoring

| Event | Points |
|-------|--------|
| Each placed cell | +1 |
| 1st line cleared this move | +10 |
| 2nd line cleared this move | +20 (cumulative +30) |
| 3rd line cleared this move | +30 (cumulative +60) |
| Cross-move combo (clearing N moves in a row) | × `1 + 0.5 × (N − 1)` multiplier |

So clearing 2 rows + 1 column on a single placement while already on
your 3rd clearing-move-in-a-row scores:
`cellsPlaced + 60` boosted by ×2 — fast snowball.

---

## 14. Building & Shipping

```bash
npx expo start                # local dev

# EAS builds
npm i -g eas-cli
eas login
eas build:configure
eas build --platform android  # .aab → Play Store
eas build --platform ios      # .ipa → App Store
```

---

## 15. Options & Variants

| Option | Where it lives | How to enable |
|--------|----------------|---------------|
| **Board size** (6×6 / 8×8 / 10×10) | `BOARD_SIZE` in `game/types.ts` | Swap constant; board UI auto-resizes |
| **3×3 box clears** | `findClears()` in `engine.ts` | Remove the `boxes` block to disable |
| **Hand size** (2/3/4 pieces) | `dealHand()` slice in `pieces.ts` | Change `slice(0, 3)` |
| **Small-piece weighting** | `SMALL_IDS` set in `pieces.ts` | Add/remove ids |
| **Lift offset** | `LIFT_CELLS` in `DraggablePiece.tsx` | 0 = under finger · 4 = classic Block Blast |
| **Combo decay** | `state.combo` reset rule in `place()` | Decay over time vs reset on no-clear |
| **Themes** (light/dark/neon) | Variants of `C` in `theme.ts` | Mirror minesweeper's `themeFor()` pattern |
| **Daily challenge** | Seed RNG in `pieces.ts` `dealHand()` with `mulberry32(hashSeed("YYYY-MM-DD"))` | Reuse the `rng.ts` from `dualingo.md`/`minesweeper.md` |
| **Hints** | Add a "Hint" button that finds the first `(p, r, c)` where `canPlace` is true and pulses those cells | Iterate hand × board |
| **Undo** | Push `state` snapshots on every successful place; cap at 1–3 | Same shape as `2048.md`'s history |
| **Power-ups** | Bomb (clears a 3×3), Hammer (removes one cell), Refresh (rerolls hand for free) | Add a small inventory in state |

---

## 16. Sanity Test (Engine)

```ts
import { newGame, place } from './src/game/engine';
import { pieceById } from './src/game/pieces';

let s = newGame();
// Force-place the first piece at (0,0) for a smoke test
const first = pieceById(s.hand[0].pieceId);
const r = place(s, 0, { row: 0, col: 0 });
console.log({ ok: !!r.result, score: r.state.score, cleared:
  r.result ? r.result.clearedRows.length + r.result.clearedCols.length : 0 });
```

That's the whole game — drop the files in, `npx expo start`, and start
dragging.
