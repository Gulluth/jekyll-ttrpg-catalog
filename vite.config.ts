import { defineConfig, type Plugin } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { readdirSync, readFileSync } from 'node:fs'
import { join, basename } from 'node:path'
import matter from 'gray-matter'

function getMarkdownFiles(dir: string): string[] {
  try {
    return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) return getMarkdownFiles(full)
      if (entry.isFile() && entry.name.endsWith('.md')) return [full]
      return []
    })
  } catch {
    return []
  }
}

function parsePosts() {
  return getMarkdownFiles('_posts').flatMap(filepath => {
    try {
      const { data } = matter(readFileSync(filepath, 'utf-8'))
      const slug = basename(filepath, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '')
      return [{
      slug,
      url: `/${slug}/`,
      name: data.name ?? null,
      category: data.category ?? [],
      author: data.author ?? null,
      source: data.source ?? null,
      'source-url': data['source-url'] ?? null,
      genre: data.genre ?? null,
      summary: data.summary ?? null,
      cost: data.cost ?? null,
      license: data.license ?? null,
      'cover-image': data['cover-image'] ?? null,
      tags: data.tags ?? [],
      stats: data.stats ?? null,
      subtext1: data.subtext1 ?? null,
      subtext2: data.subtext2 ?? null,
      subtext3: data.subtext3 ?? null,
      subtext4: data.subtext4 ?? null,
      inspiration: data.inspiration ?? null,
      'inspiration-url': data['inspiration-url'] ?? null,
    }]
  } catch (e) {
    console.warn(`[jtc-posts] skipping ${filepath}:`, e)
    return []
  }
  })
}

function postsDevPlugin(): Plugin {
  return {
    name: 'jtc-posts',
    configureServer(server) {
      let posts = parsePosts()

      server.middlewares.use('/output.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(posts))
      })

      server.watcher.add('_posts')
      const regen = (path: string) => {
        if (path.endsWith('.md')) {
          posts = parsePosts()
          server.ws.send({ type: 'full-reload' })
        }
      }
      server.watcher.on('add', regen)
      server.watcher.on('change', regen)
      server.watcher.on('unlink', regen)
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), svelte(), postsDevPlugin()],
  build: {
    outDir: 'assets',
    emptyOutDir: false,
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        entryFileNames: 'app.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((n) => n.endsWith('.css'))) return 'app.css'
          return '[name][extname]'
        },
      },
    },
  },
})
