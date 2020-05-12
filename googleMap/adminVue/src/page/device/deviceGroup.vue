<template>
    <div class="fillcontain">
        <vue-googlemap :center='center'>
          <vue-googlemap-marker ref='marker' :position='center'></vue-googlemap-marker>
          <vue-googlemap-infoWindow :position='center'
                                    :content='content'
                                    :events="events"
                                    ref='window'>
          </vue-googlemap-infoWindow>
        </vue-googlemap>
    </div>
</template>

<script>
    export default {
        data(){
          return {
                center: [22.5460535462, 114.025973657],
                content: 'This is a infoWindow.',
            }
        },
        components: {

        }
    }
</script>

<style lang="less" scoped>
   .fillcontain {
       padding: 0px;
       width: 100%;
       height: 100%;
   }
</style>


