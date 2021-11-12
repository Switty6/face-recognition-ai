<template>
    <div class="lol">
        <div id="typewriter" class="text-h4 text-white">Text</div>
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
            <Astra class="astra" />
        </div>
    </div>
</template>
<!-- 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 token -->
<script>
import FaceDetector from "./components/FaceDetector.vue";
import Astra from "./components/Astra.vue";
import store from './store';
import Typewriter from 'typewriter-effect/dist/core.js'

export default {
    components: { FaceDetector, Astra },
    data() {
        return {
            detector: false,
            astra: true,
            gen: '',
            mood: '',
            age: ''

        }
    },
    methods: {

    },
    mounted() {
        setInterval(() => {
            this.gen = store.state.user.gender
            this.mood = store.state.user.mood
            this.age = store.state.user.age
        }, 500)
        let app = document.getElementById('typewriter');

        let typewriter = new Typewriter(app, {
            loop: true,
            delay: 75,
        });

        typewriter
            .pauseFor(2500)
            .typeString('A simple yet powerful native javascript')
            .pauseFor(300)
            .deleteChars(10)
            .typeString('<strong>JS</strong> plugin for a cool typewriter effect and ')
            .typeString('<strong>only <span style="color: #27ae60;">5kb</span> Gzipped!</strong>')
            .pauseFor(1000)
            .start();

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