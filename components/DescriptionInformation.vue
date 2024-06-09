<script setup lang="ts">

const route = useRoute()
const imageInfoObject = await $fetch('/api/getImageInfo', {
    method: 'POST',
    body: { text: route.params.slug[0] }
  }) || {"name":undefined,"description":undefined}
const imageTitle = ref(imageInfoObject.name)
const imageDescription = ref(imageInfoObject.description)
</script>

<template>
    <div
    class="flex flex-col gap-y-4 p-4 items-center"
  >
    <h1 class="text-lg text-gray-300">
      {{ imageTitle }}
    </h1>
    <h1 class="text-sm text-gray-300">
      {{ imageDescription }}
    </h1>
</div>
</template>
