<template>
    <div class="lol">
        <div v-if="boot" class="row items-center full-height">
            <div  id="typewriter" class="text-h5 col-12 text-white text-center"></div>
        </div>
        <div v-if="detector" class="row items-center full-height">
            <FaceDetector class="col-12" />
            <div style="position:absolute;">
                <div class="q-ml-xl text-h6 text-white text-center monospace">Gen: {{ gen }}</div>
                <div
                    class="q-ml-xl text-h6 text-white text-center monospace"
                >Expresie faciala: {{ mood }}</div>
                <div
                    class="q-ml-xl text-h6 text-white text-center monospace"
                >Varsta aproximativa: {{ age }}</div>
            </div>
        </div>
        <!-- https://www.npmjs.com/package/typewriter-effect -->
        <div v-if="astra">
            <div class="text-h3">Astra A.I</div>
            <Astra class="astra" />
        </div>
    </div>
</template>
<script>
import FaceDetector from "./components/FaceDetector.vue";
import Astra from "./components/Astra.vue";
import store from './store';
import Typewriter from 'typewriter-effect/dist/core.js'

export default {
    components: { FaceDetector, Astra },
    data() {
        return {
            detector: true,
            astra: false,
            boot: false,
            gen: '',
            mood: '',
            age: '',
            started: true

        }
    },
    methods: {
        CheckStart() {
            if (!this.started) {
                setTimeout(() => {
                    this.boot = false
                    this.astra = true
                }, 38000);
                let app = document.getElementById('typewriter');

                let typewriter = new Typewriter(app, {
                    loop: true,
                    delay: 40,
                });

                typewriter
                    .pauseFor(1000)
                    .typeString('Initializing booting sequence...')
                    .pauseFor(4500)
                    .deleteChars(40)
                    .typeString('Waking up the Astra Artificial Intelligence.')
                    .pauseFor(4500)
                    .deleteChars(100)
                    .typeString('<strong>Boot-up complete!</strong>')
                    .pauseFor(4500)
                    .start()
            } else {
                this.boot = false
                this.astra = true
            }
        },
        DetectorCheck(){
            setInterval(()=>{
                if(this.detector){
                    this.astra = false
                    this.UpdateStore()
                }
            },1000)
        },
        UpdateStore() {
            if (this.detector) {
                setInterval(() => {
                    console.log("DETECTOR")
                    this.gen = store.state.user.gender
                    this.mood = store.state.user.mood
                    this.age = store.state.user.age
                }, 500)
            }
        }
    },
    mounted() {
        // this.CheckStart()
        this.DetectorCheck()


    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap");

body {
    overflow: hidden; /* Hide scrollbars */
}

.monospace {
    font-family: "Cutive Mono", monospace;
}

.lol {
    background: linear-gradient(45deg, #000414, #00132c, #00132c);
    height: 100vh;
    width: 100vw;
}
.astra {
    margin: 0;
    z-index: 1;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fadeshort-enter-active,
.fadeshort-leave-active {
    transition: opacity 1s ease;
}

.fadeshort-enter-from,
.fadeshort-leave-to {
    opacity: 0;
}
</style>