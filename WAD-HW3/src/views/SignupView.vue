<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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

const emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))
const emailTouched = ref(false)
const showEmailError = computed(
  () => (submitted.value || emailTouched.value) && !emailValid.value,
)

const failed = computed(() => rules.filter((r) => !r.test(password.value)))
const showErrors = computed(
  () => (submitted.value || password.value.length > 0) && failed.value.length > 0,
)

function onSubmit() {
  submitted.value = true
  if (emailValid.value && failed.value.length === 0) {
    router.push('/')
  }
}
</script>

<template>
  <div class="login-container signup-container">
    <form @submit.prevent="onSubmit" novalidate>
      <div class="form-row">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" placeholder="Email" :class="{ invalid: showEmailError }" @blur="emailTouched = true" />
      </div>
      <div v-if="showEmailError" class="error-box">
        <p>Error: invalid email - it must look like name@example.com</p>
      </div>
      <div class="form-row">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" placeholder="Password" />
      </div>
      <button type="submit">Signup</button>

      <div v-if="showErrors" class="error-box">
        <p>The password is not valid -</p>
        <ul>
          <li v-for="rule in failed" :key="rule.text">{{ rule.text }}</li>
        </ul>
      </div>
    </form>
  </div>
</template>

<style>
.login-container input.invalid { border: 2px solid #b00020; }
</style>