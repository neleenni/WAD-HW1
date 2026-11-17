<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import PostItem from '../components/PostItem.vue'

const store = useStore()
const posts = computed(() => store.state.posts)

onMounted(() => store.dispatch('loadPosts'))

const resetLikes = () => store.commit('RESET_LIKES')
</script>

<template>
  <div class="layout">
    <aside></aside>
    <main>
      <PostItem v-for="p in posts" :key="p.id" :id="p.id" />
      <button class="reset-btn" @click="resetLikes">Reset likes</button>
    </main>
    <aside></aside>
  </div>
</template>
