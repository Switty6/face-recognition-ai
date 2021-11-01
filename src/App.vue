<template>
    <div class="lol">
        <FaceDetector v-if="show"/>
        <Astra class="astra"/>
        <div class="text-h6 text-center q-pt-xl text-white monospacerr">Astra A.I</div>

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

<style>
@import url('https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap');

.monospacerr{
    font-family: 'Cutive Mono', monospace;
}

.standby{
    margin: 0;
}
.lol{
    background: linear-gradient(45deg,#000414,#00132c,#00132c);
    height: 100vh;
    width: 100vw;
}
.astra{
    z-index:-1
}
</style>