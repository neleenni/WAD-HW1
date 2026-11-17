import { createStore } from 'vuex'

export default createStore({
  state: {
    posts: [],
  },

  getters: {
    allPosts: (state) => state.posts,
    postById: (state) => (id) => state.posts.find((p) => p.id === id),
  },

  mutations: {
    setPosts(state, posts) {
      state.posts = posts.map((p) => ({ ...p, likes: p.likes ?? 0 }))
    },
    incrementLikes(state, id) {
      const post = state.posts.find((p) => p.id === id)
      if (post) post.likes++
    },
    resetLikes(state) {
      state.posts.forEach((p) => {
        p.likes = 0
      })
    },
  },

  actions: {
    async loadPosts({ commit, state }) {
      if (state.posts.length > 0) return
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}jasonderulo.json`)
        commit('setPosts', await res.json())
      } catch (err) {
        console.error('Fetch failed:', err)
      }
    },
    likePost({ commit }, id) {
      commit('incrementLikes', id)
    },
    resetAllLikes({ commit }) {
      commit('resetLikes')
    },
  },
})