
<template>
  <div>
    <UPageHero
      headline="Quality by Design"
      title="Writing great articles should be effortless"
      description="MarkdownStudio removes the friction between your ideas and the page. A distraction-free Markdown editor built for writers who care about craft."
      orientation="vertical"
      :links="heroLinks"
    />

    <UPageSection
      id="features"
      title="Built for writers, not for tools"
      description="Every detail is designed to keep you focused on what matters — your words."
      :features="features"
    />

    <UPageSection>
      <UPageCTA
        title="Ready to write something great?"
        description="Open the editor and start crafting your next article — no setup, no sign-up."
        variant="subtle"
        :links="ctaLinks"
      />
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
const heroLinks = [
  {
    label: "Open Editor",
    to: "/editor",
    trailingIcon: "i-lucide-arrow-right",
    size: "xl" as const,
  },
  {
    label: "Learn More",
    to: "#features",
    size: "xl" as const,
    color: "neutral" as const,
    variant: "outline" as const,
  },
];

const features = [
  {
    icon: "i-lucide-pen-line",
    title: "Distraction-Free Writing",
    description:
      "A clean, minimal interface that lets you focus entirely on your content. No clutter, no noise — just you and your words.",
  },
  {
    icon: "i-lucide-code",
    title: "Markdown-Native",
    description:
      "Write in Markdown, the universal language for structured content. Export to HTML, PDF, or any format you need.",
  },
  {
    icon: "i-lucide-sparkles",
    title: "Quality First",
    description:
      "Crafted with attention to detail. From typography to spacing, every element is designed to produce polished, professional output.",
  },
];

const ctaLinks = [
  {
    label: "Get Started",
    to: "/editor",
    trailingIcon: "i-lucide-arrow-right",
    color: "neutral" as const,
  },
];
</script>
