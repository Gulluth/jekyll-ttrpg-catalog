<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Organisms/CardGrid',
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  import CardGrid from '$lib/CardGrid.svelte';
  import type { Post } from '$lib/posts.js';

  function makePost(slug: string, name: string, overrides: Partial<Post> = {}): Post {
    return {
      slug,
      date: '2024-01-01',
      name,
      category: ['RPG'],
      summary: 'A brief description of this resource for the catalog.',
      author: 'Sample Author',
      source: null,
      'source-url': null,
      genre: 'fantasy',
      cost: null,
      license: null,
      'cover-image': null,
      tags: [],
      stats: null,
      subtexts: [],
      body: '',
      featured: false,
      sort_priority: null,
      meta: {},
      ...overrides,
    };
  }

  const posts: Post[] = [
    makePost('the-black-hack',              'The Black Hack',              { category: ['RPG', 'OSR'], featured: true }),
    makePost('knave',                       'Knave',                       { author: 'Ben Milton', genre: 'dungeon-crawl' }),
    makePost('maze-rats',                   'Maze Rats',                   { author: 'Ben Milton', category: ['Toolkit'] }),
    makePost('electric-bastionland',        'Electric Bastionland',        { author: 'Chris McDowall' }),
    makePost('cairn',                       'Cairn',                       { category: ['OSR', 'Adventure'] }),
    makePost('into-the-odd',               'Into the Odd',                { genre: 'weird-fiction' }),
    makePost('whitehack',                   'Whitehack',                   { author: 'Christian Mehrstam', cost: 'PWYW' }),
    makePost('searchers-of-the-unknown',   'Searchers of the Unknown',    { cost: 'Free', category: ['OSR'] }),
  ];
</script>

<!-- Default: full 8-card grid at 2–4 columns depending on viewport -->
<Story name="Default">
  <CardGrid {posts} />
</Story>

<!-- Empty: "no results" placeholder with dashed border -->
<Story name="Empty">
  <CardGrid posts={[]} />
</Story>

<!-- Few: 2 cards — verifies the grid doesn't stretch to fill empty columns -->
<Story name="Few">
  <CardGrid posts={posts.slice(0, 2)} />
</Story>
