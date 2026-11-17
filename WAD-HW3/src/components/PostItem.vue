<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  postId: { type: Number, required: true },
})

const store = useStore()
const post = computed(() => store.getters.postById(props.postId))
const base = import.meta.env.BASE_URL

const formattedDate = computed(() =>
  new Date(post.value.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }),
)

function like() {
  store.dispatch('likePost', props.postId)
}
</script>

<template>
  <div class="post" v-if="post">
    <div class="post-header">
      <img :src="base + post.authorPic" :alt="post.author" class="author-pic" />
      <span class="post-author">{{ post.author }}</span>
      <span class="post-date">{{ formattedDate }}</span>
    </div>
    <div class="post-content">
      <img v-if="post.image" :src="base + post.image" alt="post image" class="post-image" />
      <p class="post-text">{{ post.text }}</p>
    </div>
    <div class="post-footer">
      <button class="like-btn" @click="like" title="Like">🩷</button>
      <span class="like-count">{{ post.likes }} likes</span>
    </div>
  </div>
</template>