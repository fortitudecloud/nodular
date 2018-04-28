<template>
    <div class="console" flex="row">
        <div size="1" class="pad-5"></div>
        <div flex="column" center size="1" class="pad-5">
            <div flex="row" center>
                <label flex="column" center>{{ title }}</label>
            </div>            
        </div>
        <div flex="row" end size="1" class="pad-5">
            <Poper>
                <img src="../assets/ic_account_circle_white_24px.svg" slot="handle">
                <ul slot="content">
                    <li>One</li>
                    <li>Two</li>
                </ul>
            </Poper>            
        </div>        
    </div>        
</template>

<script>
import Poper from './Poper';

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
  },
  components: {
    Poper
  }
}
</script>

<style lang="scss" scoped>
    @import '../assets/variables.scss';

    .console {
        flex-grow: 1;        
        height: 50px; 
        background-color: $console-purple;

        div {
            label {
                color: #eee;
                font-size: 13px;
                font-weight: 600;
                text-transform: uppercase;
                text-shadow: 1px 1px rgba(19, 20, 21, 0.25);
            }
        }     
        
        .pad-5 {
            padding: 5px;
        }
    }
</style>