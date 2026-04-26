<script lang="ts">
  import { onMount } from 'svelte'
  import App from './App.svelte'

  const THEMES = ['cerberus', 'wintry', 'vintage', 'crimson', 'pine', 'modern']

  let currentTheme = $state('cerberus')
  let dark = $state(false)

  onMount(() => {
    const storedMode = localStorage.getItem('jtc-mode')
    dark = storedMode === 'dark' || (!storedMode && matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', dark)

    const storedTheme = localStorage.getItem('jtc-preview-theme')
    if (storedTheme && THEMES.includes(storedTheme)) currentTheme = storedTheme
    document.documentElement.dataset.theme = currentTheme
  })

  function toggleDark() {
    dark = !dark
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('jtc-mode', dark ? 'dark' : 'light')
  }

  function setTheme(e: Event) {
    currentTheme = (e.currentTarget as HTMLSelectElement).value
    document.documentElement.dataset.theme = currentTheme
    localStorage.setItem('jtc-preview-theme', currentTheme)
  }
</script>

<header class="border-b px-4 py-3">
  <div class="max-w-7xl mx-auto flex justify-between items-center gap-4">
    <span class="font-bold text-lg tracking-tight">
      Jekyll TTRPG Catalog
      <span class="opacity-40 text-xs font-normal ml-1">[preview]</span>
    </span>
    <nav class="flex items-center gap-2 text-sm">
      <select class="select text-xs w-auto" value={currentTheme} onchange={setTheme}>
        {#each THEMES as t}
          <option value={t}>{t}</option>
        {/each}
      </select>
      <button onclick={toggleDark} class="btn preset-outlined text-xs">
        {dark ? 'Light' : 'Dark'}
      </button>
    </nav>
  </div>
</header>

<main>
  <App baseurl="" postsPerPage={24} />
</main>

<footer class="border-t mt-16 px-4 py-8">
  <div class="max-w-7xl mx-auto text-sm opacity-60">
    Powered by <a href="https://github.com/Gulluth/jekyll-ttrpg-catalog" class="underline hover:opacity-100" target="_blank" rel="noopener">jekyll-ttrpg-catalog</a>
  </div>
</footer>
