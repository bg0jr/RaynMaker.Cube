<template>
  <div id="app">
    <div class="container-fluid">
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <ul class="nav navbar-nav">
            <li>
              <router-link to="/Explore">Home</router-link>
            </li>
          </ul>
        </div>
      </nav>

      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

