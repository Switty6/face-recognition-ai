<template>
    <div>
        <FaceDetector v-if="show"/>
        <Astra class="standby"/>
    </div>

</template>
<script>
import FaceDetector from "./components/FaceDetector.vue";
import Astra from "./components/Astra.vue";


export default {
    components: { FaceDetector, Astra },
    data(){
        return {
            show:false
        }
    }
}
</script>

<style scoped>
.standby{
    margin: 0;
}
</style>