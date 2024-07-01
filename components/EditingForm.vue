<script setup lang="ts">
const emit = defineEmits(['closeEditor'])
const { fetch: refreshSession } = useUserSession()
const route = useRoute()
const chosenFile = ref(route.params.slug[0])
const newImageName = ref('')
const newDescription = ref('')
const newStatus = ref('')
const loading = ref(false)

const toast = useToast()

async function login() {
  await $fetch('/api/update', {
    method: 'POST',
    body: { 
      file: chosenFile.value,
      newArgs: {
        name: newImageName.value,
        description: newDescription.value,
        status: newStatus.value
      }
     }
  })
    .then(async () => {
      await refreshSession()
      emit('closeEditor')
    })
    .catch((err) => {
      toast.add({
        title: `Error ${err.statusCode}`,
        description: `${err.data?.message || err.message}. Please try again`,
        color: 'red'
      })
    })
  loading.value = false
}
</script>

<template>
  <form
    class="flex flex-col gap-y-4 p-4 items-center"
    @submit.prevent="login"
  >
    <h1 class="text-lg text-gray-300">
      Editing filename {{ chosenFile }}
    </h1>
    <UInput
      v-model="newImageName"
      type="text"
      placeholder="Enter name"
      icon="i-heroicons-tag"
      class="!w-60"
    />
    <UInput
      v-model="newDescription"
      type="text"
      placeholder="Enter description"
      icon="i-heroicons-newspaper"
      class="!w-60"
    />
    <UInput
      v-model="newStatus"
      type="text"
      placeholder="Enter status ('sold' or $ price)"
      icon="i-heroicons-currency-dollar"
      class="!w-60"
    />

    <UButton
      :loading="loading"
      type="submit"
      label="Save"
      color="green"
      variant="ghost"
      class="px-4"
      size="lg"
    />
  </form>
</template>
