<template>
  <div id="app">
    <img src="./assets/logo.png">
    <lightbox album="mm" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A5-50.jpg">
      <img width="100px" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A5-50.jpg">
    </lightbox>
    <lightbox album="mm" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A6-51.jpg">
      <img width="100px" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A6-51.jpg">
      
    </lightbox>
    <lightbox album="mm" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A7.jpg">
      <img width="100px" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A7.jpg">
      
    </lightbox>
    <lightbox album="bb" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A8.jpg">
      <img width="100px" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A8.jpg">
      
    </lightbox>

<lightbox album="bb" src="http://img.mxmop.com/uploads/allimg/20150518/140-150213112218.jpg">
      <img width="100px" src="http://img.mxmop.com/uploads/allimg/20150518/140-150213112218.jpg">
      
    </lightbox>

    <lightbox album="cc" src="http://img.mxmop.com/uploads/allimg/20150518/140-150213112216.jpg">
      <img width="100px" src="http://img.mxmop.com/uploads/allimg/20150518/140-150213112216.jpg">
      
    </lightbox>


  </div>
</template>

<script>
import Lightbox from './components/Lightbox'

export default {
  name: 'app',
  components: {
    Lightbox
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
