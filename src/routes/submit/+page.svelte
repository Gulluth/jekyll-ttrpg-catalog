<script lang="ts">
  import { config } from '$lib/catalog.js'
</script>

<div class="px-4 py-12 max-w-2xl mx-auto">
  {#if config.showSubmitForm}
    <h1 class="text-2xl font-bold mb-2">Submit a Resource</h1>
    <p class="opacity-60 mb-8">Suggest a resource to add to the catalog. Submissions are reviewed before publishing.</p>
    <!-- Staticman form: wired in a future step -->
    <p class="text-sm opacity-40 italic">Submission form coming soon.</p>
  {:else}
    <h1 class="text-2xl font-bold mb-2">Submissions Closed</h1>
    <p class="opacity-60">This catalog is not currently accepting community submissions.</p>
  {/if}
</div>
