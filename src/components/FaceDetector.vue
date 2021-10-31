<template>
    <div class="column items-center">
        <video class="col" id="video" ref="video" width="720" height="560" autoplay></video>
    </div>
</template>

<style>
body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

canvas {
    position: absolute;
}
</style>
<script>
import * as faceapi from 'face-api.js';
import store from '../store';

export default {
    name: "FaceDetector",
    data() {
        return {
            video: {},
        }
    },
    methods: {
        startVideo() {
            this.video = this.$refs.video;
            // video: ElementRef;
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices
                    .getUserMedia({ video: true })
                    .then((stream) => {
                        // this.video.src = window.URL.createObjectURL(stream)
                        this.video.srcObject = stream;
                        // this.video.nativeElement.play();
                    })
                    .catch((err) => alert(`Bummer! ${err.name}.`));
            }
        }
    },
    mounted() {
        const video = this.$refs.video
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),
            faceapi.nets.ageGenderNet.loadFromUri('/models')

        ]).then(this.startVideo())
        video.addEventListener('play', () => {
            const canvas = faceapi.createCanvasFromMedia(video)
            document.body.append(canvas)
            const displaySize = { width: video.width, height: video.height }
            faceapi.matchDimensions(canvas, displaySize)
            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender()
                const resizedDetections = faceapi.resizeResults(detections, displaySize)
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                faceapi.draw.drawDetections(canvas, resizedDetections)

                // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections) // Draw face debug
                resizedDetections.forEach(detection => {
                    let gender = ''
                    if (detection.gender == 'male'){
                        gender = "Masculin"
                    }else{
                        gender = "Feminin"
                    }
                    store.commit({
                            type: "UPDATE_USER",
                            age:Math.round(detection.age),
                            gender:gender
                    })
                })
            }, 100)
        })
    }
}

</script>