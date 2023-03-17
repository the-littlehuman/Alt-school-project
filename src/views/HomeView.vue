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
      <h3 class="text-pink-500 text-lg">My Repositories</h3>
      <ul>
        <li
          v-for="repository in paginatedRepositories"
          :key="repository.id"
          class="mt-4 p-4 border-dashed border-2 border-pink-500"
        >
          <ListItemComponent :repository="repository" />
        </li>
      </ul>
      <div class="flex items-center justify-between py-4">
        <button
          v-if="showPrevButton"
          class="bg-pink-500 hover:bg-pink-600 tex-white font-bold py-2 px-4 rounded my-2"
          @click="prevPage"
        >
          Previous
        </button>
        <button
          v-if="showNextButton"
          class="bg-pink-500 hover:bg-pink-600 tex-white font-bold py-2 px-4 rounded my-2 ml-auto"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
    <router-view></router-view>
  </main>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import ListItemComponent from '../components/ListItemComponent.vue'
export default {
  components: {
    HeaderComponent,
    ListItemComponent
  },
  data() {
    return {
      loading: false,
      repositories: null,
      error: null,
      currentPage: 1,
      itemsPerPage: 5
    }
  },
  created() {
    this.getRepositories()
  },
  computed: {
    paginatedRepositories() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.repositories.slice(startIndex, endIndex) // Updated to use repositories instead of originalArray
    },
    totalPages() {
      return Math.ceil(this.repositories.length / this.itemsPerPage)
    },
    showPrevButton() {
      return this.currentPage > 1
    },
    showNextButton() {
      return this.currentPage < this.totalPages
    }
  },
  methods: {
    async getRepositories() {
      try {
        this.loading = true
        const response = await fetch('https://api.github.com/users/the-littlehuman/repos')
        const data = await response.json()
        this.repositories = data
      } catch (error) {
        console.log(error)
        this.error = error?.message || error
      } finally {
        this.loading = false
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      const totalPages = Math.ceil(this.repositories.length / this.itemsPerPage)
      if (this.currentPage < totalPages) {
        this.currentPage++
      }
    }
  }
}
</script>
