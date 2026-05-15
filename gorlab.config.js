/**
 * Gorlab configuration
 * The commented-out options show the default value. 
 * To override a setting: uncomment it, then change the value.
 */

export default {
  // ── Identity ──────────────────────────────────────────────────────────────
  // Required. The catalog title shown in the header and browser tab.
  title: "Girtablu's Gorlab",

  // description: shown in the header subtitle and page meta tags.
  description: "A Curious and unusual brick-a-brac, for curious and unusual folk.",

  // siteUrl: your deployed GitHub Pages URL. When set, the title links here.
  // Set this after your first deploy.
  siteUrl: "https://girtablu.github.io/gorlab",

  // basePath: uncomment only for GitHub Pages *project* sites
  // (username.github.io/my-catalog). Leave commented for root sites.
  basePath: '/gorlab',

  // ── Appearance ────────────────────────────────────────────────────────────
  // theme: one of the bundled presets below. Default: cerberus.
  // cerberus | wintry | vintage | crimson | pine | modern
  // theme: "cerberus",

  // customCss: path to an extra CSS file in static/ loaded after theme styles.
  // Use this to add custom fonts or override specific styles.
  // customCss: "/my-styles.css",

  // ── Content display ───────────────────────────────────────────────────────
  // postsPerPage: 24,

  // imageOrientation: controls how cover images are displayed across cards and
  // resource pages. Match this to the shape of your cover images.
  //   'landscape' (default) — wide images (e.g. A5/half-letter landscape).
  //                           Cards use a 3:2 box. Resource page: image above text.
  //   'portrait'            — tall images (e.g. A5/half-letter portrait, book covers).
  //                           Cards use a 2:3 box. Resource page: image left, text right.
  //   'none'                — no cover images; content fills full width everywhere.
  // Individual posts can override this with imageOrientation: in their frontmatter.
  imageOrientation: 'portrait',

  // showCost: set to false to hide price info everywhere (cards, filters, pages).
  // showCost: false,

  // ── Navigation & filters ──────────────────────────────────────────────────
  // showTagCloud: true,   // pill buttons for category filtering
  // showFilterBar: true,  // dropdown menus for category / author / genre / cost

  // filters: fine-grained control over where each dimension appears.
  // Omit this block entirely to use the defaults shown below.
  // filters: {
  //   category: { cloud: true,  menu: true  },
  //   author:   { cloud: false, menu: true  },
  //   genre:    { cloud: false, menu: true  },
  //   cost:     { cloud: false, menu: true  },
  //   tags:     { cloud: false, menu: false },
  // },

  // ── Community submissions ─────────────────────────────────────────────────
  // The /submit/ page lets visitors propose resources. Requires a backend
  // add-on package to receive submissions (not bundled with gorlab).
  // showSubmitForm: false,
  // submitUrl: "https://your-backend-endpoint/submit",

  // ── Custom fields ─────────────────────────────────────────────────────────
  // Add extra fields specific to your catalog. They appear on resource pages.
  // Fields not listed here are ignored by the app.
  //
  // key      — the frontmatter key in your markdown files
  // label    — human-readable label shown in the UI
  // type     — "text" | "date" | "url"  (url renders as a clickable link)
  // multiple — true allows an array of values
  //
  // customFields: [
  //   { key: "page_count", label: "Pages",       type: "text", multiple: false },
  //   { key: "publisher",  label: "Publisher",   type: "text", multiple: false },
  //   { key: "system",     label: "Game System", type: "text", multiple: true  },
  // ],

};
