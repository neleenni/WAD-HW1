<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import PostItem from '../components/PostItem.vue'

const store = useStore()
const posts = computed(() => store.getters.allPosts)

onMounted(() => store.dispatch('loadPosts'))
</script>

<template>
  <div class="indexbody">
    <aside></aside>
    <main>
      <PostItem v-for="p in posts" :key="p.id" :post-id="p.id" />
      <button class="reset-btn" @click="store.dispatch('resetAllLikes')">Reset likes</button>
    </main>
    <aside></aside>
  </div>
</template>