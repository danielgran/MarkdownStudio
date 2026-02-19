<template>
  <div class="flex-1 flex flex-col">
    <MarkdownStudioToolbar />
    <div class="flex-1 flex gap-4">
      <div class="flex-1 flex justify-center py-12 px-4">
        <MarkdownEditor
          v-model="content"
          class="w-full max-w-3xl border border-default rounded-lg shadow-sm"
        />
      </div>
      <div class="py-6 pr-6">
        <MarkdownStudioSidebar />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

const content = ref(`# Example Markdown with an Image and Caption
text
# Example Markdown with an Image and Caption with a **bold** caption

Here’s an example of how to include an image along with a caption below it.

"""MarkdownModuleImage
src: https://annimi.de/wp-content/uploads/2017/03/8_20170226_Quatschmachen.jpg
alt: Hamburg skyline
"""

Some more text continues here after the image.
`);

</script>
