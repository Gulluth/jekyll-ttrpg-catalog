<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Design Tokens/Icons',
    tags: ['autodocs'],
  });
</script>

<script lang="ts">
  import { ChevronLeft, ChevronRight, ArrowRight, Check, X, Heart } from 'lucide-svelte';
</script>

<!-- Lucide: all lucide-svelte icons used in app components -->
<Story name="Lucide">
  <div class="grid grid-cols-3 gap-6 text-center sm:grid-cols-6">

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <ChevronLeft size={20} />
      </div>
      <code class="text-xs opacity-70">ChevronLeft</code>
      <span class="text-xs opacity-40">Pagination</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <ChevronRight size={20} />
      </div>
      <code class="text-xs opacity-70">ChevronRight</code>
      <span class="text-xs opacity-40">Pagination</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <ArrowRight size={20} />
      </div>
      <code class="text-xs opacity-70">ArrowRight</code>
      <span class="text-xs opacity-40">Button</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <Check size={20} />
      </div>
      <code class="text-xs opacity-70">Check</code>
      <span class="text-xs opacity-40">Chip</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <X size={20} />
      </div>
      <code class="text-xs opacity-70">X</code>
      <span class="text-xs opacity-40">Chip</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <Heart size={20} />
      </div>
      <code class="text-xs opacity-70">Heart</code>
      <span class="text-xs opacity-40">Badge</span>
    </div>

  </div>
</Story>

<!-- Custom: inline SVGs written directly into app components -->
<Story name="Custom">
  <div class="grid grid-cols-3 gap-6 text-center sm:grid-cols-6">

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <svg class="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path stroke-linecap="round" d="m21 21-4.35-4.35" />
        </svg>
      </div>
      <code class="text-xs opacity-70">Search</code>
      <span class="text-xs opacity-40">SearchInput</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <svg class="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
      <code class="text-xs opacity-70">ExternalLink</code>
      <span class="text-xs opacity-40">[slug]/+page</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface text-success-500">
        <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 2H4c-.55 0-1 .45-1 1v2c0 .24.09.48.25.66L10 13.38V21c0 .4.24.77.62.92a.995.995 0 0 0 1.09-.21l2-2A1 1 0 0 0 14 19v-5.62l6.75-7.72c.16-.18.25-.42.25-.66V3c0-.55-.45-1-1-1" />
        </svg>
      </div>
      <code class="text-xs opacity-70">FilterActive</code>
      <span class="text-xs opacity-40">FilterBar dirty</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21 3H5a1 1 0 0 0-1 1v2.59c0 .523.213 1.037.583 1.407L10 13.414V21a1 1 0 0 0 1.447.895l4-2c.339-.17.553-.516.553-.895v-5.586l5.417-5.417c.37-.37.583-.884.583-1.407V4a1 1 0 0 0-1-1m-6.707 9.293A1 1 0 0 0 14 13v5.382l-2 1V13a1 1 0 0 0-.293-.707L6 6.59V5h14.001l.002 1.583z" />
        </svg>
      </div>
      <code class="text-xs opacity-70">FilterIdle</code>
      <span class="text-xs opacity-40">FilterBar clean</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <svg class="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path stroke-linecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </div>
      <code class="text-xs opacity-70">Sun</code>
      <span class="text-xs opacity-40">+layout light</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex size-12 items-center justify-center rounded-container preset-tonal-surface">
        <svg class="size-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
      <code class="text-xs opacity-70">Moon</code>
      <span class="text-xs opacity-40">+layout dark</span>
    </div>

  </div>
</Story>

<!-- Sizes: the four icon sizes used across the app -->
<Story name="Sizes">
  <div class="flex flex-wrap items-end gap-10">

    <div class="flex flex-col items-center gap-3">
      <ArrowRight size={14} />
      <code class="text-xs opacity-70">14px</code>
      <span class="text-xs opacity-40">badge / chip icon</span>
    </div>

    <div class="flex flex-col items-center gap-3">
      <ArrowRight size={16} />
      <code class="text-xs opacity-70">16px</code>
      <span class="text-xs opacity-40">icon-only (btn-icon)</span>
    </div>

    <div class="flex flex-col items-center gap-3">
      <ArrowRight size={18} />
      <code class="text-xs opacity-70">18px</code>
      <span class="text-xs opacity-40">btn with label</span>
    </div>

    <div class="flex flex-col items-center gap-3">
      <ArrowRight size={20} />
      <code class="text-xs opacity-70">20px</code>
      <span class="text-xs opacity-40">reference / display</span>
    </div>

    <div class="flex flex-col items-center gap-3">
      <ArrowRight size={24} />
      <code class="text-xs opacity-70">24px</code>
      <span class="text-xs opacity-40">inline SVG (FilterBar)</span>
    </div>

  </div>
</Story>
