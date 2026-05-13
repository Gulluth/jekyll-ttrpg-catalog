# Architecture

## How the app is structured

The codebase has two distinct layers that should never blur:

| Layer       | Location                                          | Who owns it |
| ----------- | ------------------------------------------------- | ----------- |
| **App**     | `src/` — routes, components, data loading, styles | Developer   |
| **Content** | `posts/`, `gorlab.config.js`                      | Site owner  |

SvelteKit prebuilds every route at build time (fully static output to `build/`). There is no server at runtime.

Posts are markdown files in `posts/` — flat or in subdirectories. Subdirectory names have no effect on categories; categories come entirely from the `category:` frontmatter field in each file.

```bash
src/
├── app.css                    # Tailwind + Skeleton theme imports
├── routes/
│   ├── +layout.ts             # export const prerender = true
│   ├── +layout.svelte         # global nav, theme, dark mode
│   ├── +page.server.ts        # load() — parsePosts + filter dimensions
│   ├── +page.svelte           # catalog: search, filters, sort, pagination
│   ├── resource/[slug]/
│   │   ├── +page.server.ts    # load() + entries() for prerender
│   │   └── +page.svelte       # resource detail page
│   ├── submit/
│   │   └── +page.svelte       # community submission form (POSTs to submitUrl; backend is a separate add-on)
│   └── feed.xml/
│       └── +server.ts         # prerendered RSS 2.0 feed
└── lib/
    ├── posts.ts               # parsePosts(), getCategories(), normalizeSubtexts()
    ├── filters.ts             # applyFilters(), sortPosts(), paginate(), getAuthors/Genres/Costs()
    ├── catalog.ts             # reads gorlab.config.js, applies defaults
    ├── config.ts              # TypeScript interfaces (CatalogConfig, CustomField, …)
    ├── CardGrid.svelte        # responsive grid, empty state
    ├── ResourceCard.svelte    # card with cover image / gradient placeholder
    ├── FilterBar.svelte       # dropdown filters + sort select
    ├── TagCloud.svelte        # category pill buttons
    ├── SearchInput.svelte     # text search input
    └── Pagination.svelte      # Skeleton Pagination wrapper
```

## Design principles

Three principles define the boundary between app responsibility and operator responsibility. Keep them in mind when adding features.

**1. Graceful degradation over required fields.**
`name` is the only frontmatter field the app enforces. Every other field — `category`, `summary`, `author`, cover image, and so on — degrades cleanly when absent. Components use `{#if}` guards; `posts.ts` normalises missing values to `null` or `[]`. Never add a hard dependency on an optional field.

**2. The build succeeds with no content.**
An empty or absent `posts/` directory is valid. The catalog renders its empty state; the search index step is skipped. This is intentional: the app is the developer's responsibility; the content is the operator's. A broken build caused by missing content is a framework bug, not a content error.

**3. Features are operator-controlled via `gorlab.config.js`.**
Nearly every UI feature is a toggle (`showCost`, `showTagCloud`, `showFilterBar`, `showSubmitForm`, per-dimension `filters`). When adding an optional feature, expose a toggle in `gorlab.config.js` and default it to the least-surprising state. Do not hardcode feature presence.

**4. The form is gorlab's concern; the backend is not.**
The `/submit/` route is a generic form UI. It POSTs to `config.submitUrl` — an opaque URL supplied by a separate backend add-on package. Do not add backend-specific logic (auth headers, payload shaping for a specific service) to the core form. The boundary: gorlab renders the form and fires the POST; the add-on owns everything after that.

## Component conventions

- **Svelte 5 runes** everywhere: `$state`, `$derived`, `$effect`, `$props`, `$bindable`. No legacy Options API.
- Filter state lives in `+page.svelte`. Components receive values and emit changes via `bind:` props; they own no global state.
- All internal links must include the `base` import from `$app/paths` and prefix hrefs: `` href=`${base}/resource/${slug}/` ``.
- Local cover image paths need the same `base` prefix since `paths.base` is set in `svelte.config.js`.
- `FilterBar` and `TagCloud` accept a `show` prop; `+page.svelte` passes `data.config.showFilterBar` / `data.config.showTagCloud` directly — no `{#if}` wrappers at the call site.
- `FilterBar` owns the sort select. Pass `bind:sort` from `+page.svelte`.

### Adding a component test

Tests live next to the component file (`src/lib/Foo.test.ts`). The vitest config aliases `$lib` and mocks `$app/paths` (`base = ''`) so components can be imported in jsdom without the SvelteKit runtime.

```ts
import { render, screen } from '@testing-library/svelte'
import MyComponent from './MyComponent.svelte'

test('renders correctly', () => {
  render(MyComponent, { prop: 'value' })
  expect(screen.getByText('value')).toBeInTheDocument()
})
```

Run `npm run test:unit` to confirm.
