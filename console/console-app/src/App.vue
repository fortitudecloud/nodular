<template>
  <!-- <div id="app">     -->
    <Console v-bind:title="title"/>    
  <!-- </div> -->
</template>

<script>
import Console from './components/Console'

export default {
  name: 'App',
  props: {
    title: {
        type: String,
        required: true
    }
  },
  data () {
    return {         
    }
  },
  components: {
    Console
  }
}
</script>

<style lang="scss" scoped>
    @import './assets/variables.scss';
    #app {
        display: flex;
        flex-direction: row;
        height: 50px; 
        background-color: $console-blue;        
    }
</style>
