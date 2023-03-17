<template>
  <main class="bg-slate-900 min-h-screen">
    <HeaderComponent />
    <div v-if="loading" class="text-xl text-white flex justify-center items-center h-screen">
      Loading data...
    </div>
    <div
      v-if="!loading && error"
      class="text-xl text-white flex justify-center items-center h-screen"
    >
      {{ error }}
    </div>
    <div v-if="!loading" class="container mx-auto py-4">
      <div class="flex justify-between items-center">
        <h3 class="text-pink-500 text-lg">{{ repository.name }}</h3>
        <div class="flex items-center">
          <div>
            <v-icon fill="#E91E63" name="bi-star" title="stars" />
            <span class="text-white ml-1 mr-2 text-sm">{{ repository.stargazers_count }}</span>
          </div>
          <div>
            <v-icon fill="#E91E63" name="oi-repo-forked" title="forks" />
            <span class="text-white ml-1 mr-2 text-sm">{{ repository.forks_count }}</span>
          </div>
          <div>
            <v-icon fill="#E91E63" name="bi-eye-fill" title="watcher" />
            <span class="text-white ml-1 mr-2 text-sm">{{ repository.watchers_count }}</span>
          </div>
        </div>
      </div>
      <p class="text-white text-base">{{ repository.description || '' }}</p>
      <ul>
        <li
          class="mt-4 p-4 border-dashed border-2 border-pink-500 flex justify-between items-center"
        >
          <p class="text-pink-500 font-bold">URL:</p>
          <a
            class="text-white hover:text-pink-500 hover:underline"
            href="{{repository.html_url}}"
            target="_blank"
            rel="noopener norefferer"
          >
            {{ repository.html_url }}</a
          >
        </li>

        <li
          class="mt-4 p-4 border-dashed border-2 border-pink-500 flex justify-between items-center"
        >
          <p class="text-pink-500 font-bold">Created at:</p>
          <p class="text-white">{{ formattedDate(new Date(repository?.created_at)) }}</p>
        </li>

        <li
          class="mt-4 p-4 border-dashed border-2 border-pink-500 flex justify-between items-center"
        >
          <p class="text-pink-500 font-bold">Updated at:</p>
          <p class="text-white">{{ formattedDate(new Date(repository?.created_at)) }}</p>
        </li>

        <li
          class="mt-4 p-4 border-dashed border-2 border-pink-500 flex justify-between items-center"
        >
          <p class="text-pink-500 font-bold">Repository size:</p>
          <p class="text-white">{{ (repository?.size / 1024).toFixed(2) || 0 }}MB</p>
        </li>

        <li
          v-if="repository?.language"
          class="mt-4 p-4 border-dashed border-2 border-pink-500 flex justify-between items-center"
        >
          <p class="text-pink-500 font-bold">Language:</p>
          <p class="text-white">{{ repository.language }}</p>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import { format } from 'date-fns'
export default {
  components: {
    HeaderComponent
  },
  data() {
    return {
      loading: false,
      repository: {},
      error: ''
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getRepository()
      },
      { immediate: true }
    )
  },
  methods: {
    async getRepository() {
      try {
        this.loading = true
        const { user, repoId } = this.$route.params
        const response = await fetch(`https://api.github.com/repos/${user}/${repoId}`)
        const data = await response.json()
        this.repository = data
      } catch (error) {
        console.log(error)
        this.error = error?.message || error
      } finally {
        this.loading = false
      }
    },
    formattedDate(date) {
      return format(date, 'MMMM dd, yyyy')
    }
  }
}
</script>
