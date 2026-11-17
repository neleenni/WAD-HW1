<template>
  <div class="login-container signup-container">
    <form @submit.prevent="onSubmit">
      <div class="form-row">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" placeholder="Email" required />
      </div>
      <div class="form-row">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" placeholder="Password" required />
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