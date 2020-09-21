<template>
  <div id="app">
    <div id="sketch"></div>
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
import P5 from "p5";
import '../public/sketch.js'

export default {
  name: 'App',
  components: {
    Grid,
  },
  created(){
    const p = new P5();
  }
};
</script>

<style>

@font-face{
    font-family: 'JetBrains Mono';
    src: url('https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/web/eot/JetBrainsMono-Regular.eot') format('embedded-opentype'),
         url('https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/web/woff2/JetBrainsMono-Regular.woff2') format('woff2'),
         url('https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/web/woff/JetBrainsMono-Regular.woff') format('woff'),
         url('https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/ttf/JetBrainsMono-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

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
  font-family: 'JetBrains Mono', 'Monospace';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 10% 5%;
  text-rendering:optimizeLegibility;
}
</style>
