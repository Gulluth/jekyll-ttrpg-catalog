<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Atoms/Divider',
    tags: ['autodocs'],
  });
</script>

<!-- Horizontal: default hr.hr -->
<Story name="Horizontal">
  <div class="w-full space-y-4 text-center">
    <p class="text-sm opacity-60">Above the divider</p>
    <hr class="hr" />
    <p class="text-sm opacity-60">Below the divider</p>
  </div>
</Story>

<!-- Sizes: border-t thickness -->
<Story name="Sizes">
  <div class="w-full space-y-6">
    <div class="space-y-2">
      <code class="code text-xs">default</code>
      <hr class="hr" />
    </div>
    <div class="space-y-2">
      <code class="code text-xs">border-t-2</code>
      <hr class="hr border-t-2" />
    </div>
    <div class="space-y-2">
      <code class="code text-xs">border-t-4</code>
      <hr class="hr border-t-4" />
    </div>
    <div class="space-y-2">
      <code class="code text-xs">border-t-8</code>
      <hr class="hr border-t-8" />
    </div>
  </div>
</Story>

<!-- Styles: solid / dashed / dotted / double -->
<Story name="Styles">
  <div class="w-full space-y-6">
    <div class="space-y-2">
      <code class="code text-xs">border-solid</code>
      <hr class="hr border-solid" />
    </div>
    <div class="space-y-2">
      <code class="code text-xs">border-dashed</code>
      <hr class="hr border-dashed" />
    </div>
    <div class="space-y-2">
      <code class="code text-xs">border-dotted</code>
      <hr class="hr border-dotted" />
    </div>
    <div class="space-y-2">
      <code class="code text-xs">border-t-4 border-double</code>
      <hr class="hr border-t-4 border-double" />
    </div>
  </div>
</Story>

<!-- Colors: semantic color borders -->
<Story name="Colors">
  <div class="w-full space-y-6">
    <div class="space-y-2">
      <code class="code text-xs">border-primary-500</code>
      <hr class="hr border-primary-500" />
    </div>
    <div class="space-y-2">
      <code class="code text-xs">border-secondary-500</code>
      <hr class="hr border-secondary-500" />
    </div>
    <div class="space-y-2">
      <code class="code text-xs">border-tertiary-500</code>
      <hr class="hr border-tertiary-500" />
    </div>
    <div class="space-y-2">
      <code class="code text-xs">border-success-500</code>
      <hr class="hr border-success-500" />
    </div>
    <div class="space-y-2">
      <code class="code text-xs">border-warning-500</code>
      <hr class="hr border-warning-500" />
    </div>
    <div class="space-y-2">
      <code class="code text-xs">border-error-500</code>
      <hr class="hr border-error-500" />
    </div>
    <div class="space-y-2">
      <code class="code text-xs">border-surface-950-50</code>
      <hr class="hr border-surface-950-50" />
    </div>
  </div>
</Story>

<!-- Vertical: vr element with varying thicknesses -->
<Story name="Vertical">
  <div class="flex h-20 items-center gap-8">
    <div class="flex items-center gap-4 h-full">
      <span class="text-xs opacity-60">default</span>
      <span class="vr h-full"></span>
    </div>
    <div class="flex items-center gap-4 h-full">
      <span class="text-xs opacity-60">border-l-2</span>
      <span class="vr border-l-2 h-full"></span>
    </div>
    <div class="flex items-center gap-4 h-full">
      <span class="text-xs opacity-60">border-l-4</span>
      <span class="vr border-l-4 h-full"></span>
    </div>
    <div class="flex items-center gap-4 h-full">
      <span class="text-xs opacity-60">border-primary-500</span>
      <span class="vr border-primary-500 h-full"></span>
    </div>
  </div>
</Story>
