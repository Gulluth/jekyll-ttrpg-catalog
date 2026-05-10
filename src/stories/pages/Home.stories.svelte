<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Pages/Home',
    parameters: { layout: 'fullscreen' },
  });
</script>

<script lang="ts">
  import SearchInput from '$lib/SearchInput.svelte';
  import { config } from '$lib/catalog.js';
  import type { Post } from '$lib/posts.js';

  import Page from '../../routes/+page.svelte';

  function makePost(slug: string, name: string, overrides: Partial<Post> = {}): Post {
    return {
      slug, date: '2024-03-01', name,
      category: ['RPG'], summary: 'A brief description of this resource for the catalog.',
      author: 'Sample Author', source: null, 'source-url': null,
      genre: 'fantasy', cost: null, license: null, 'cover-image': null,
      tags: [], stats: null, subtexts: [], body: '', featured: false,
      sort_priority: null, meta: {},
      ...overrides,
    };
  }

  const posts: Post[] = [
    makePost('the-black-hack',          'The Black Hack',           { category: ['RPG', 'OSR'], author: 'David Black',       genre: 'fantasy',     cost: 'PWYW',   featured: true }),
    makePost('knave',                   'Knave',                    { category: ['RPG', 'OSR'], author: 'Ben Milton',        genre: 'fantasy',     cost: 'PWYW'                  }),
    makePost('maze-rats',               'Maze Rats',                { category: ['Toolkit'],    author: 'Ben Milton',        genre: 'fantasy',     cost: 'Free'                  }),
    makePost('electric-bastionland',    'Electric Bastionland',     { category: ['RPG'],        author: 'Chris McDowall',    genre: 'weird-fiction', cost: '$10'                 }),
    makePost('cairn',                   'Cairn',                    { category: ['RPG', 'OSR'], author: 'Yochai Gal',       genre: 'fantasy',     cost: 'Free'                  }),
    makePost('into-the-odd',           'Into the Odd',              { category: ['RPG'],        author: 'Chris McDowall',    genre: 'weird-fiction', cost: '$10'                 }),
    makePost('whitehack',               'Whitehack',                { category: ['RPG', 'OSR'], author: 'Christian Mehrstam', genre: 'fantasy',   cost: 'PWYW'                  }),
    makePost('mörk-borg',              'Mörk Borg',                 { category: ['RPG'],        author: 'Stockholm Kartell', genre: 'horror',      cost: '$14'                  }),
    makePost('nsr-toolkit',             'NSR Toolkit',              { category: ['Toolkit'],    author: 'Various',           genre: 'fantasy',     cost: 'Free'                  }),
    makePost('through-ultan-s-door',   "Through Ultan's Door",      { category: ['Adventure'],  author: 'Ben Laurence',      genre: 'weird-fiction', cost: 'PWYW'                }),
    makePost('the-gardens-of-ynn',     'The Gardens of Ynn',        { category: ['Adventure'],  author: 'Emmy Allen',        genre: 'fantasy',     cost: 'PWYW'                  }),
    makePost('silent-titans',           'Silent Titans',            { category: ['Adventure'],  author: 'Patrick Stuart',    genre: 'weird-fiction', cost: '$10'                 }),
  ];

  const categories = [...new Set(posts.flatMap(p => p.category))].sort();
  const authors    = [...new Set(posts.map(p => p.author).filter((a): a is string => !!a))].sort();
  const genres     = [...new Set(posts.map(p => p.genre).filter((g): g is string => !!g))].sort();
  const costs      = [...new Set(posts.map(p => p.cost).filter((c): c is string => !!c))].sort();

  const baseData = { posts, categories, authors, genres, costs, config };
</script>

<!-- Default: full catalog, all filters reset -->
<Story name="Default">
  <div class="flex min-h-screen flex-col">
    <header class="border-b border-surface-200-800 px-4 py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      <span class="justify-self-start font-bold text-lg tracking-tight">{config.title}</span>
      <div class="w-36 sm:w-56 md:w-72"><SearchInput /></div>
      <div class="justify-self-end flex items-center gap-3">
        <span class="text-sm opacity-60">Submit</span>
        <button class="btn-icon preset-tonal size-8" aria-label="Toggle dark mode">
          <svg class="size-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>
    </header>
    <main class="flex-1">
      <Page data={baseData} />
    </main>
    <footer class="border-t border-surface-200-800 px-4 py-3 text-xs opacity-40 text-center">
      {config.title} · MIT License · RSS Feed
    </footer>
  </div>
</Story>

<!-- Empty: catalog with no posts — shows the empty-state placeholder -->
<Story name="Empty">
  <div class="flex min-h-screen flex-col">
    <header class="border-b border-surface-200-800 px-4 py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      <span class="justify-self-start font-bold text-lg tracking-tight">{config.title}</span>
      <div class="w-36 sm:w-56 md:w-72"><SearchInput /></div>
      <div class="justify-self-end"></div>
    </header>
    <main class="flex-1">
      <Page data={{ posts: [], categories: [], authors: [], genres: [], costs: [], config }} />
    </main>
    <footer class="border-t border-surface-200-800 px-4 py-3 text-xs opacity-40 text-center">
      {config.title} · MIT License
    </footer>
  </div>
</Story>
