import { parsePosts } from '$lib/posts.js'
import { config } from '$lib/catalog.js'

export const prerender = true

export function load() {
  const posts = parsePosts(process.env.POSTS_DIR ?? 'posts', config.customFields)
  return {
    totalPosts: posts.length,
    config,
  }
}
