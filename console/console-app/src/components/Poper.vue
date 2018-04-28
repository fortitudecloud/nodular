<template>
    <div class="poper" flex="column" center>
        <div v-on:click="active = !active">
            <slot name="handle"></slot>
        </div>
        <div class="none" v-bind:class="{ open: active }">
            <slot name="content"></slot>
        </div>
    </div>    
</template>
  
<script>
export default {
  name: 'Poper',
  data () {
    return { 
        active: false        
    }
  },
  methods: {
      toggle: () => {
          this.active = !this.active;
      }
  }
}
</script>

<style lang="scss" scoped>
    .poper {
        position: relative;
        opacity: .5;
        transition: all .3s ease-in;
        cursor: pointer;

        &:hover {
            opacity: 1;
        }
    }

    .none {
        display: none;    
        position: absolute;
        top: 40px;
        right: 0;
    }

    .open {
        display: flex;        
    }
</style>