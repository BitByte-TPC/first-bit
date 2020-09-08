<template>
  <div id="app">
    <div class="title"> &lt;First Bit/&gt; </div>
    <div class="about">
      It's hard. It's always hard the first time you do something.
      Especially when you are collaborating, making mistakes isn't a comfortable thing.
      We at <a class="link" href="https://github.com/BitByte-TPC">BitByte - The Programming Club</a> wanted to simplify the way new open-source contributors learn & contribute for the first time.
      <br/>
      <br/>
      If you are a beginner and wants to get your hands dirty with Open Source contributions, you've hopped on to the right place. 
      This project is made just for you. Visit <a class="link" href="https://github.com/BitByte-TPC/first-bit#readme">README.md</a> to get started.
    </div>
    <Grid />
  </div>
</template>

<script>
import Grid from './components/Grid.vue';

export default {
  name: 'App',
  components: {
    Grid,
  },
};
</script>

<style>
body {
  background: #0e163b;
  color: rgb(209, 209, 209);
}

.title {
  font-size: 56px;
  text-align: center;
  color: #47cdd6;
  font-weight: 500;
}

.about {
  font-size: 22px;
  text-align: center;
  color: #ed5371;
}

a {
  color: inherit;
  transition: all .2s ease;
}

a:hover{
  color: #fff;
}

#app {
  font-family: 'Inconsolata', 'JetBrains Mono', 'Monospace';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 10% 5%;
  text-rendering:optimizeLegibility;
}
</style>
