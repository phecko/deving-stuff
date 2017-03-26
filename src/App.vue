<template>
  <div id="app">
    <lightbox album="mm" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A5-50.jpg" caption="wa hahahhahhah " indexTmpl="${d}/${total}">
      <img width="100px" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A5-50.jpg">
    </lightbox>
    <lightbox album="mm" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A6-51.jpg">
      <img width="100px" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A6-51.jpg">
      
    </lightbox>
    <lightbox album="mm" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A7.jpg">
      <img width="100px" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A7.jpg">
      
    </lightbox>
    <br>
    <lightbox album="bb" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A8.jpg">
      <img width="100px" src="http://img.mxmop.com/uploads/allimg/20150518/139-15041Z91A8.jpg">
      
    </lightbox>

<lightbox album="bb" src="http://img.mxmop.com/uploads/allimg/20150518/140-150213112218.jpg">
      <img width="100px" src="http://img.mxmop.com/uploads/allimg/20150518/140-150213112218.jpg">
      
    </lightbox>
    <br>
    <lightbox album="" src="http://img.mxmop.com/uploads/allimg/20150518/140-150213112216.jpg">
      <img width="100px" src="http://img.mxmop.com/uploads/allimg/20150518/140-150213112216.jpg">
      
    </lightbox>


  </div>
</template>

<script>
import Lightbox from './components/Lightbox.vue'

export default {
  name: 'app',
  components: {
    lightbox:Lightbox
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
