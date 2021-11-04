<template>
    <div class="lol">
        <div class="text-h6 text-white monospace">Gen: {{gen}} </div>
        <div class="text-h6 text-white monospace">Expresie faciala: {{mood}}</div>
        <div class="text-h6 text-white monospace">Varsta aproximativa: {{age}}</div>

        <div class="row justify-center items-center full-height" >
            <FaceDetector v-if="detector" class="justify-center items-center"/>
        </div>
        <transition name="fade">
            <div v-if="astra">
                <div class="text-h4 text-center q-pt-xl text-white monospace">Astra A.I</div>
                <Astra class="astra" />
            </div>
        </transition>

        <div
            v-if="texter"
            class="row justify-center items-center text-center full-height full-width"
        >
            <transition name="fadeshort">
                <div
                    v-if="bootList.boot"
                    class="text-h2 text-white monospace"
                >Booting sequence initiated...</div>
            </transition>
            <transition name="fadeshort">
                <div
                    v-if="bootList.bootStart"
                    class="text-h2 text-white monospace"
                >Waking up the A.I</div>
            </transition>
            <transition name="fadeshort">
                <div
                    v-if="bootList.bootInit"
                    class="text-h2 text-white monospace"
                >A.I is up and ready at your service</div>
            </transition>
            <transition name="fadeshort">
                <div
                    v-if="bootList.bootCredits"
                    class="text-h2 text-white monospace"
                >SwitHub presents</div>
            </transition>
        </div>
    </div>
</template>
<script>
import FaceDetector from "./components/FaceDetector.vue";
import Astra from "./components/Astra.vue";
import store from './store';

export default {
    components: { FaceDetector, Astra },
    data() {
        return {
            detector: true,
            astra: false,
            texter: false,
            bootList: {
                boot: false,
                bootStart: false,
                bootInit: false,
                bootCredits: false,
            },
            gen:'',
            mood:'',
            age:''

        }
    },
    methods: {
        BootUp() {
            this.bootList.boot = true
            setTimeout(() => {
                this.bootList.boot = false
                setTimeout(() => {
                    this.bootList.bootStart = true
                    setTimeout(() => {
                        this.bootList.bootStart = false
                        setTimeout(() => {
                            this.bootList.bootInit = true
                            setTimeout(() => {
                                this.bootList.bootInit = false
                                setTimeout(() => {
                                    this.bootList.bootCredits = true
                                    setTimeout(() => {
                                        this.bootList.bootCredits = false
                                        setTimeout(() => {
                                            this.astra = true
                                        }, 2500)
                                    }, 3000)
                                }, 1500)
                            }, 2500)
                        }, 1500)
                    }, 3000)
                }, 3000)
            }, 3000)
        }
    },
    mounted() {
        setInterval(()=>{
           this.gen = store.state.user.gender
           this.mood = store.state.user.mood
           this.age = store.state.user.age
        },500)
        // setTimeout(() => { this.BootUp() }, 1000)
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
    z-index: -1;
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