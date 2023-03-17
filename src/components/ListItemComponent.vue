<script>
export default {
  props: ['repository'],
  methods: {
    openLink(url) {
      this.$router.push(url)
    }
  }
}
</script>

<template>
  <button class="text-left w-full" @click="openLink(`/${repository.full_name}/`)">
    <h3 class="text-lg text-pink-500 font-bold">{{ repository.name }}</h3>
    <p class="text-md text-white">{{ repository.description }}</p>
    <div class="flex items-center mt-2">
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
  </button>
</template>
