import { describe, it, expect } from "vitest";
import {
  applyFilters,
  sortPosts,
  paginate,
  getAuthors,
  getGenres,
  getCosts,
} from "./filters.js";
import type { Post } from "./posts.js";
import type { ImageOrientation } from "./config.js";

function makePost(overrides: Partial<Post> & { slug: string }): Post {
  return {
    date: "2024-01-01",
    name: "Test Post",
    category: ["systems"],
    summary: "A test resource.",
    author: "Test Author",
    source: "itch.io",
    "source-url": "https://example.com",
    genre: "fantasy",
    cost: "free",
    license: null,
    "cover-image": null,
    tags: ["osr"],
    stats: null,
    subtexts: [],
    body: "",
    featured: false,
    sort_priority: null,
    imageOrientation: null,
    meta: {},
    ...overrides,
  };
}

const POSTS: Post[] = [
  makePost({
    slug: "alpha",
    name: "Alpha Game",
    date: "2024-03-01",
    category: ["systems"],
    author: "Alice",
    genre: "horror",
    cost: "free",
    tags: ["osr", "solo"],
  }),
  makePost({
    slug: "beta",
    name: "Beta Monster",
    date: "2024-01-15",
    category: ["monsters"],
    author: "Bob",
    genre: "fantasy",
    cost: "$5",
    tags: ["dungeon"],
  }),
  makePost({
    slug: "gamma",
    name: "Gamma NPC",
    date: "2024-02-10",
    category: ["npcs"],
    author: "Alice",
    genre: "fantasy",
    cost: "free",
    tags: ["npc"],
  }),
  makePost({
    slug: "delta",
    name: "Delta Misc",
    date: "2023-11-05",
    category: ["miscellany"],
    author: "Carol",
    genre: "sci-fi",
    cost: "PWYW",
    tags: [],
  }),
  makePost({
    slug: "featured-hi",
    name: "Featured High",
    date: "2024-01-01",
    featured: true,
    sort_priority: 1,
    category: ["systems"],
    genre: "fantasy",
    cost: "free",
    author: "Dave",
  }),
  makePost({
    slug: "featured-lo",
    name: "Featured Low",
    date: "2024-01-01",
    featured: true,
    sort_priority: 2,
    category: ["systems"],
    genre: "horror",
    cost: "$5",
    author: "Eve",
  }),
];

// ─── applyFilters ─────────────────────────────────────────────────────────────

describe("applyFilters", () => {
  it('"all" values return all posts', () => {
    const result = applyFilters(POSTS, {
      category: "all",
      author: "all",
      genre: "all",
      cost: "all",
    });
    expect(result.length).toBe(POSTS.length);
  });

  it("filters by category", () => {
    const result = applyFilters(POSTS, {
      category: "monsters",
      author: "all",
      genre: "all",
      cost: "all",
    });
    expect(result.map((p) => p.slug)).toEqual(["beta"]);
  });

  it("filters by author (case-insensitive)", () => {
    const result = applyFilters(POSTS, {
      category: "all",
      author: "Alice",
      genre: "all",
      cost: "all",
    });
    expect(result.map((p) => p.slug)).toContain("alpha");
    expect(result.map((p) => p.slug)).toContain("gamma");
    expect(result.length).toBe(2);
  });

  it("filters by genre", () => {
    const result = applyFilters(POSTS, {
      category: "all",
      author: "all",
      genre: "horror",
      cost: "all",
    });
    expect(result.map((p) => p.slug)).toContain("alpha");
    expect(result.map((p) => p.slug)).not.toContain("beta");
  });

  it("filters by cost", () => {
    const result = applyFilters(POSTS, {
      category: "all",
      author: "all",
      genre: "all",
      cost: "free",
    });
    expect(result.every((p) => p.cost === "free")).toBe(true);
  });

  it("multiple filters are ANDed together", () => {
    const result = applyFilters(POSTS, {
      category: "systems",
      author: "Alice",
      genre: "all",
      cost: "all",
    });
    expect(result.map((p) => p.slug)).toEqual(["alpha"]);
  });

  it("returns empty when no posts match combined filters", () => {
    const result = applyFilters(POSTS, {
      category: "monsters",
      author: "Alice",
      genre: "all",
      cost: "all",
    });
    expect(result).toHaveLength(0);
  });

  it("featured cards are hidden when filter excludes them", () => {
    // featured-hi and featured-lo are in systems; filtering by monsters hides them
    const result = applyFilters(POSTS, {
      category: "monsters",
      author: "all",
      genre: "all",
      cost: "all",
    });
    expect(result.map((p) => p.slug)).not.toContain("featured-hi");
    expect(result.map((p) => p.slug)).not.toContain("featured-lo");
  });
});

// ─── sortPosts ────────────────────────────────────────────────────────────────

describe("sortPosts", () => {
  it("featured posts appear before non-featured", () => {
    const result = sortPosts(POSTS);
    const firstNonFeatured = result.findIndex((p) => !p.featured);
    const lastFeatured = result.map((p) => p.featured).lastIndexOf(true);
    expect(lastFeatured).toBeLessThan(firstNonFeatured);
  });

  it("featured group ordered by sort_priority ascending", () => {
    const result = sortPosts(POSTS);
    const featured = result.filter((p) => p.featured);
    expect(featured[0].slug).toBe("featured-hi");
    expect(featured[1].slug).toBe("featured-lo");
  });

  it("sort_priority has no effect on non-featured items", () => {
    const noFeatured = POSTS.filter((p) => !p.featured);
    const result = sortPosts(noFeatured);
    result.forEach((p) => expect(p.featured).toBe(false));
  });

  it("non-featured posts sorted by date descending", () => {
    const result = sortPosts(POSTS).filter((p) => !p.featured);
    const dates = result.map((p) => p.date);
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)));
  });

  it("posts without date prefix fall back to 1970-01-01 and sort last", () => {
    const undated = makePost({ slug: "undated", date: "1970-01-01" });
    const dated = makePost({ slug: "dated", date: "2024-06-01" });
    const result = sortPosts([undated, dated]);
    expect(result[0].slug).toBe("dated");
    expect(result[1].slug).toBe("undated");
  });
});

// ─── paginate ─────────────────────────────────────────────────────────────────

describe("paginate", () => {
  const posts = Array.from({ length: 10 }, (_, i) =>
    makePost({ slug: `post-${i}`, date: "2024-01-01" }),
  );

  it("returns first page slice", () => {
    const { items } = paginate(posts, 1, 3);
    expect(items.map((p) => p.slug)).toEqual(["post-0", "post-1", "post-2"]);
  });

  it("returns last page with remaining items", () => {
    const { items } = paginate(posts, 4, 3);
    expect(items.map((p) => p.slug)).toEqual(["post-9"]);
  });

  it("calculates totalPages correctly", () => {
    expect(paginate(posts, 1, 3).totalPages).toBe(4);
    expect(paginate(posts, 1, 5).totalPages).toBe(2);
    expect(paginate(posts, 1, 10).totalPages).toBe(1);
    expect(paginate(posts, 1, 11).totalPages).toBe(1);
  });

  it("totalPages is at least 1 for empty list", () => {
    expect(paginate([], 1, 24).totalPages).toBe(1);
    expect(paginate([], 1, 24).items).toHaveLength(0);
  });

  it("clamps page to valid range", () => {
    expect(paginate(posts, 0, 3).items[0].slug).toBe("post-0");
    expect(paginate(posts, 99, 3).items[0].slug).toBe("post-9");
  });
});

// ─── option helpers ───────────────────────────────────────────────────────────

describe("getAuthors / getGenres / getCosts", () => {
  it("getAuthors returns sorted unique authors", () => {
    expect(getAuthors(POSTS)).toEqual(["Alice", "Bob", "Carol", "Dave", "Eve"]);
  });

  it("getGenres returns sorted unique genres", () => {
    expect(getGenres(POSTS)).toEqual(["fantasy", "horror", "sci-fi"]);
  });

  it("getCosts returns sorted unique costs", () => {
    expect(getCosts(POSTS)).toEqual(["$5", "PWYW", "free"]);
  });

  it("null values are excluded from option lists", () => {
    const withNulls = [
      makePost({ slug: "x", author: null, genre: null, cost: null }),
    ];
    expect(getAuthors(withNulls)).toHaveLength(0);
    expect(getGenres(withNulls)).toHaveLength(0);
    expect(getCosts(withNulls)).toHaveLength(0);
  });
});
