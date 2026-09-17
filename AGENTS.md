# Minimal API Reference — Nuxt UI & VueUse (Summary)

> This file exists only to give coding agents a quick mental model of the most
> common component/function APIs in this project.

---

## 📋 Project Basics

### Commands

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `pnpm install`    | Install dependencies             |
| `pnpm dev`        | Start development server (Nuxt)  |
| `pnpm build`      | Build for production             |
| `pnpm lint --fix` | Run ESLint autofix               |
| `pnpm typecheck`  | Run TypeScript type checking     |

### Tooling

- **Prefer `jq`** for parsing JSON over inline python/node scripts.
- Use `find` and `grep` for searching files:
  - `find . -name '*.ts'` — list all TypeScript files
  - `find . -type f -iname '*.vue' | xargs grep 'useFetch'` — search for
    'useFetch' in all Vue files
  - `grep -rn 'useToast' ./app/components` — recursive search with line numbers
  - `grep -ri 'error' .` — case-insensitive search in all files

### Structure

```
.
├── app/
│   ├── app.config.ts
│   ├── app.vue
│   ├── assets/           # static assets processed by the build (CSS, fonts, images)
│   ├── components/       # auto-imported Vue components
│   └── pages/            # file-based routes (index.vue, about.vue, etc.)
├── public/               # files served at root, not processed (favicon, robots.txt)
├── nuxt.config.ts
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
└── AGENTS.md
```

### Subpages / Nested Routes

The app uses **3 levels of page nesting** for every entity
(`camara/deputados`, `camara/partidos`, `senado/senadores`, ...):

```
app/pages/camara/deputados/
├── index.vue            → /camara/deputados          (level 2: list page)
├── [did].vue            → /camara/deputados/:did     (level 3: parent shell)
└── [did]/
    ├── despesas.vue     → /camara/deputados/:did/despesas (level 4: subpage)
    ├── proposicoes.vue  → ...
    └── ...              (one file per subpage)
```

**Parent shell (`[did].vue`, `[sid].vue`, ...)** — must follow this contract:

- Read the id from the route: `const did = useRoute().params.did as string`
- Fetch the entity detail (drives header/hero content)
- Build a `NavigationMenuItem[]` whose `to` values point at child routes
- Render the subpage nav with `<UNavigationMenu :items="items" />`
- **Always render `<NuxtPage />`** — without it, child routes break
  (`NUXT_E4016` error)

**Subpages (`[did]/despesas.vue`, ...)** — fully self-contained:

- Re-read the parent param: `const did = route.params.did as string`
- Fetch their own data with a dedicated `useFetch` (no props passed from
  the parent, no shared state)

**Route resolution:** `/path` → `index.vue` · `/path/:id` → `[id].vue` ·
`/path/:id/sub` → `[id].vue` renders `<NuxtPage />` with `[id]/sub.vue`
inside. `app.vue` wraps everything with an outer `<NuxtPage />`.

**Gotchas:** don't delete `<NuxtPage />` from a parent when adding subpages;
no `pageKey`/`definePageMeta key` is used (default re-rendering is fine).

### API Proxy (`nuxt.config.ts`)

There are **no server-side endpoints** — all data comes from the Câmara
open-data API via a `routeRules` proxy:

```ts
'/api/camara/**': {
  proxy: 'https://dadosabertos.camara.leg.br/api/v2/**',
  cache: { allowQuery: true, maxAge: 60 * 5, staleMaxAge: 60 * 10, swr: true }
}
```

- Components call `useFetch('/api/camara/...')`; the `/**` suffix is
  forwarded to the upstream (e.g. `/api/camara/deputados?nome=x` →
  `.../api/v2/deputados?nome=x`).
- `allowQuery: true` — query params are part of the cache key (per-filter
  caching)
- SWR cache: serve stale up to 10 min while revalidating, cache fresh for
  5 min
- Cache is persisted in the Cloudflare `CACHE` KV binding
  (`nitro.storage.cloudflare-kv-binding`), so entries survive restarts and
  are shared across workers
- `'/'` is also prerendered (`routeRules` `prerender: true`)

**Gotcha:** keep proxying under `/api/camara/**` — the CACHE KV also stores
responses, so `allowQuery` + `maxAge`/`staleMaxAge` values are the tuning
knobs if stale data shows up.

### Coding Guidelines

- **Prefer early returns.** Exit functions as soon as pre-conditions fail; avoid
  deep nesting.
- **Happy path on the right.** Only worry about the happy path.
- **Prefer `const` over `let`.** Use immutable bindings by default; only use
  `let` when reassignment is truly required.
- **Don't overthink TypeScript types.** If types are taking too long to fix,
  ignore them, but add a TODO comment in the code.

---

## 🎨 Nuxt UI v4 Components

All components share `color`, `variant`, `size`, `class`, and `ui` props
(slot overrides) unless noted.

### Buttons & Inputs

| Component                               | Key props                                                                                                                                           |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UButton`                               | `label`, `icon`, `loading`, `loadingAuto`, `block`, `square`, `disabled` — variants: solid/outline/soft/ghost/link; slots: leading/default/trailing |
| `UInput` / `UTextarea`                  | `modelValue`, `placeholder`, `icon`, `autofocus`, `highlight`, `leading`, `trailing`                                                                |
| `USelect` / `USelectMenu`               | `items`, `multiple`, `searchable` (SelectMenu only), `clearable`                                                                                    |
| `UCheckbox` / `USwitch` / `URadioGroup` | `modelValue`, `label`, `description`, `color`                                                                                                       |
| `UForm` + `UFormField`                  | `state`, `schema` (Zod/Yup/Valibot), `validate`, `validateOn` (blur/change/input/submit)                                                            |
| `UInputNumber`                          | `modelValue`, `min`, `max`, `step`                                                                                                                  |
| `UInputDate`                            | `modelValue` (Date), `placeholder`, `format`                                                                                                        |
| `UColorPicker`                          | `modelValue` (hex), `format`, `modes`                                                                                                               |
| `UInputTags`                            | `modelValue` (string[]), `max`, `createItem`                                                                                                        |
| `UInputRating`                          | `modelValue` (number), `max`, `icon`                                                                                                                |

### Navigation & Layout

- **`UTabs`** — `items` (label/value/icon/badge), `modelValue`, `variant`
  (pill/line/soft), `orientation`
- **`UBreadcrumb`** — `items: Array<{ label, to?, icon?, slot? }>`
- **`UPagination`** — `v-model:page`, `total`, `itemsPerPage`, `showEdges`,
  `siblings`
- **`UCommandPalette`** — `groups`, `placeholder`
- **`UCard`** / **`UPageCard`** — `variant`; slots: header/default/footer or
  top/default/bottom
- **`UContainer`** — `padding`, `constrained`, `class`
- **`ULink`** — `to`, `href`, `external`, `active`, `activeClass`, `exact`
- **`UIcon`** — `name` (Iconify), `size`, `class`
- **`USeparator`**, **`USkeleton`**, **`UChip`**, **`UKbd`**

### Overlays & Feedback

| Component                           | Key props                                                                                             |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `UModal` / `UDrawer` / `USlideover` | `title`, `description`, `overlay`, `scrollable`, `fullscreen`, `dismissible`, `preventClose`, `close` |
| `UDropdownMenu` / `UContextMenu`    | `items` (nested `children`, `to`, `click`), `size`, `content`                                         |
| `UTooltip` / `UPopover`             | `text`, `content`, `side`, `align`, `delayDuration`                                                   |
| `UAccordion` / `UCollapsible`       | `items` (label/icon/content/slot), `multiple` (Accordion only), `defaultValue`                        |
| `UToast` / `UToaster`               | `toast.add({ title, description, icon?, color?, duration?, actions? })`                               |

### Data Display

- **`UTable`** — `data`, `columns`, `caption`, `virtualize`, `loading`, `empty`
- **`UAvatar`** — `src`/`alt`/`text` (initials fallback), sizes 3xs→3xl, `chip`
- **`UBadge`** — `label`, variants: solid/outline/soft/subtle
- **`UProgress`** / **`USlider`** — `modelValue`, `min`, `max`, `steps`
  (Slider only)

---

## ⚡ VueUse Composables (v10+)

### State & Reactivity

```ts
useToggle(initial?), useCounter(initial?, { min, max, step }),
useVModel(props, key, emit?), useVModels(props, emit?), useCloned(source),
useDebounceFn(fn, wait, options?), useThrottleFn(fn, wait, options?),
useIntervalFn(callback, interval?, options?), useTimeoutFn(fn, interval?, options?),
useInterval(interval?), useTimeout(interval?), useRafFn(fn, options?)
```

### Browser / DOM

```ts
useMouse, useMouseInElement, useWindowSize, useElementSize, useElementBounding,
useElementVisibility, useIntersectionObserver, useMutationObserver, useResizeObserver,
useScroll, useInfiniteScroll, useDraggable, useDropZone, useFocus, useFocusWithin,
useElementHover, useEventListener, useClickOutside, useKeyStroke, onKeyStroke,
useMagicKeys, useTextSelection, useTextareaAutosize, useImage, useFullscreen,
useMediaQuery, useBreakpoints, useFavicon, useTitle, useScriptTag, useStyleTag
```

### Storage & Async

```ts
useLocalStorage, useSessionStorage, useStorage, useStorageAsync,
useFetch(url, options?) → { data, error, status, refresh },
useAsyncState, useAsyncQueue, useMemoize, useCached
```

### UX / Behavior

```ts
useClipboard, useClipboardItems, useConfirmDialog, useDark, useColorMode,
useOnline, useNetwork, useIdle, usePageLeave, useWindowFocus, useDocumentVisibility,
usePermission, useGeolocation, useBattery, useShare, useWebWorker, useWebSocket,
useWebNotification, useWakeLock, useVirtualList, useFileDialog, useBase64,
useSpeechRecognition, useSpeechSynthesis, useDateFormat, useTimeAgo, useNow,
useTimestamp, useTransition, useStepper, useCountdown, useSortable, useParallax,
useParentElement, useCurrentElement, useActiveElement
```

### Array / Object helpers (`@vueuse/shared`)

```ts
useArrayDifference, useArrayEvery, useArrayFilter, useArrayFind, useArrayFindIndex,
useArrayFindLast, useArrayIncludes, useArrayJoin, useArrayMap, useArrayReduce,
useArraySome, useArrayUnique, useSorted, useGroupBy
```

### Component Patterns

```ts
useTemplateRefsList<T>(), createReusableTemplate<T>(), useMounted(),
useSupported(callback), useEventBus<T>(name?), useConfirmDialog()
```

---

## 🔧 Quick Nuxt UI Composables

```ts
const toast = useToast()               // toast.add({ title, description })
const modal = useModal()               // modal.open(Component, props), modal.close()
const overlay = useOverlay()           // overlay.create(...)
const clipboard = useCopyToClipboard() // clipboard.copy(text)
```

---

## Design Tokens (Tailwind Colors)

Nuxt UI maps the `color` prop to these theme colors:

- `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `neutral`

Variants are usually: `solid`, `outline`, `soft`, `ghost`, `link`

Sizes are usually: `xs`, `sm`, `md`, `lg`, `xl`
