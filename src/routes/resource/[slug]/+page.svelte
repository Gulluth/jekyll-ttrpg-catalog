<script lang="ts">
  import { base } from '$app/paths'
  const { data } = $props()
  const post = $derived(data.post)
  const config = $derived(data.config)
  const orientation = $derived(post.imageOrientation ?? config.imageOrientation)

  function hashString(s: string): number {
    let h = 0
    for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
    return Math.abs(h)
  }

  function placeholderGradient(name: string): string {
    const h = hashString(name)
    const hue1 = h % 360
    const hue2 = (h + 137) % 360
    return `linear-gradient(135deg, color-mix(in oklch, var(--color-surface-200-800) 75%, oklch(0.5 0.15 ${hue1}) 25%), color-mix(in oklch, var(--color-surface-300-700) 70%, oklch(0.5 0.15 ${hue2}) 30%))`
  }

  const hasCover = $derived(Boolean(post['cover-image']))
  const coverSrc = $derived(
    post['cover-image']?.startsWith('/') ? `${base}${post['cover-image']}` : (post['cover-image'] ?? '')
  )
  const coverStyle = $derived(hasCover ? '' : `background: ${placeholderGradient(post.name ?? post.slug)};`)
</script>

<svelte:head>
  <title>{post.name}</title>
</svelte:head>

{#snippet coverImage(classes: string)}
  {#if hasCover}
    <img
      src={coverSrc}
      alt={post.name ?? ''}
      class="w-full rounded-container-token object-cover {classes}"
    />
  {:else}
    <div
      class="{orientation === 'portrait' ? 'aspect-2/3' : 'aspect-3/2'} w-full rounded-container-token {classes}"
      style={coverStyle}
    ></div>
  {/if}
{/snippet}

{#snippet metadataBlock()}
  <h1 class="text-3xl font-bold leading-tight">{post.name}</h1>

  <div class="flex flex-col gap-1.5">
    {#if post.author}
      <span class="text-sm opacity-60">By <a href="{base}/search/?q={encodeURIComponent(post.author)}" class="hover:underline">{post.author}</a>{config.showCost && post.cost ? ` · ${post.cost}` : ''}</span>
    {/if}
    {#if post.genre || post.license}
      <div class="flex flex-wrap gap-1.5">
        {#if post.genre}<a href="{base}/search/?q={encodeURIComponent(post.genre)}" class="chip preset-tonal text-xs">{post.genre}</a>{/if}
        {#if post.license}<a href="{base}/search/?q={encodeURIComponent(post.license)}" class="chip preset-tonal text-xs">{post.license}</a>{/if}
      </div>
    {/if}
  </div>

  {#if post.summary}
    <p class="text-base opacity-80">{post.summary}</p>
  {/if}

  {#if post.stats}
    <p class="font-mono text-xs bg-surface-100-900 rounded p-3">{post.stats}</p>
  {/if}

  {#if post.subtexts.length > 0}
    <ul class="list-none space-y-1 text-sm opacity-80">
      {#each post.subtexts as line}
        <li>{line}</li>
      {/each}
    </ul>
  {/if}

  {#if config.customFields && config.customFields.length > 0}
    <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
      {#each config.customFields as field}
        {#if post.meta[field.key] !== undefined}
          <dt class="opacity-60 font-medium">{field.label}</dt>
          <dd>
            {#if field.type === 'url'}
              <a href={String(post.meta[field.key])} target="_blank" rel="noopener noreferrer" class="anchor">
                {post.meta[field.key]}
              </a>
            {:else if field.multiple && Array.isArray(post.meta[field.key])}
              {(post.meta[field.key] as string[]).join(', ')}
            {:else}
              {post.meta[field.key]}
            {/if}
          </dd>
        {/if}
      {/each}
    </dl>
  {/if}

  {#if post.tags.length > 0}
    <div class="flex flex-wrap gap-1.5">
      {#each post.tags as tag}
        <a href="{base}/?tags={encodeURIComponent(tag)}" class="chip preset-tonal text-xs">{tag}</a>
      {/each}
    </div>
  {/if}

  {#if post['source-url']}
    <a
      href={post['source-url']}
      target="_blank"
      rel="noopener noreferrer"
      class="mt-auto btn preset-filled self-start inline-flex items-center gap-2"
    >
      {post.source ? `Get it on ${post.source}` : 'View Resource'}
      <svg class="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6m0 0v6m0-6L10 14"/>
      </svg>
    </a>
  {/if}
{/snippet}

<div data-pagefind-body class="px-4 py-8 max-w-4xl mx-auto">

  {#if post.category.length > 0}
    <div data-pagefind-meta="category" style="display: none;">{post.category.join(', ')}</div>
  {/if}

  {#if orientation === 'portrait'}
    <!-- Two-column on desktop: image left, metadata right.
         DOM order = mobile order: metadata first, cover second.
         On desktop, explicit grid placement swaps them visually. -->
    <div class="flex flex-col gap-6 md:grid md:grid-cols-2 md:items-start mb-8">
      <div class="flex flex-col gap-4 md:col-start-2 md:row-start-1">
        {@render metadataBlock()}
      </div>
      {@render coverImage('md:col-start-1 md:row-start-1')}
    </div>
  {:else}
    <!-- Stacked: image above metadata (or no image for 'none') -->
    <div class="flex flex-col gap-6 mb-8">
      {#if orientation !== 'none'}
        {@render coverImage('')}
      {/if}
      <div class="flex flex-col gap-4">
        {@render metadataBlock()}
      </div>
    </div>
  {/if}

  <!-- Markdown body: always full-width below -->
  {#if data.bodyHtml}
    <div class="prose prose-sm max-w-none pt-6 border-t border-surface-200-800">
      {@html data.bodyHtml}
    </div>
  {/if}

  <!-- Back link -->
  <div class="mt-8 pt-4 border-t border-surface-200-800">
    <a href="{base}/" class="text-sm opacity-60 hover:opacity-100 transition-opacity">← Back to catalog</a>
  </div>

</div>
