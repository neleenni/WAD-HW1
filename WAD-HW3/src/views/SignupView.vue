<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const password = ref('')
const submitted = ref(false)

const rules = [
  { text: 'Length is at least 8 and less than 15 characters', test: (p) => p.length >= 8 && p.length < 15 },
  { text: 'Includes at least one uppercase alphabet character', test: (p) => /[A-Z]/.test(p) },
  { text: 'Includes at least two lowercase alphabet characters', test: (p) => (p.match(/[a-z]/g) || []).length >= 2 },
  { text: 'Includes at least one numeric value', test: (p) => /[0-9]/.test(p) },
  { text: 'Starts with an uppercase letter', test: (p) => /^[A-Z]/.test(p) },
  { text: 'Includes the character "_"', test: (p) => p.includes('_') },
]

const failed = computed(() => rules.filter((r) => !r.test(password.value)))
const showErrors = computed(
  () => (submitted.value || password.value.length > 0) && failed.value.length > 0,
)

function onSubmit() {
  submitted.value = true
}
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="onSubmit">
      <div class="signup-row">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" placeholder="Email" required />
      </div>
      <div class="signup-row">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" placeholder="Password" required />
      </div>
      <button type="submit">Signup</button>

      <div v-if="showErrors" class="error">
        <p>The password is not valid -</p>
        <ul>
          <li v-for="rule in failed" :key="rule.text">{{ rule.text }}</li>
        </ul>
      </div>
    </form>
  </div>
</template>