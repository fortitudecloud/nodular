<template>
    <div class="console">
        <div></div>
        <div class="center">
            <label>{{ title }}</label>
        </div>
        <div></div>        
    </div>        
</template>

<script>
export default {
  name: 'Console',
  props: {
    title: {
        type: String,
        required: true
    }
  },
  data () {
    return {         
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '../../variables.scss';

    .console {
        display: flex;
        flex-direction: row;
        flex-grow: 1;        
        height: 50px; 
        background-color: $console-blue;

        div {
            flex: 1;

            &.center {
                display: flex;
                flex-direction: column;
                justify-content: center;

                label {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }
            }

            label {
                color: #eee;
            }
        }        
    }
</style>