<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { config } from '$lib/catalog.js';
  import AppShell from '$lib/AppShell.svelte';

  const { children } = $props();
</script>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" title={config.title} href="{base}/feed.xml" />
  {#if config.customCss}
    <link rel="stylesheet" href="{base}{config.customCss}" />
  {/if}
</svelte:head>

<AppShell>
  {@render children()}
</AppShell>
