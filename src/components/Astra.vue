<template>
    <canvas></canvas>
</template>

<script>
import * as tjs from 'three'

export default {
    name: 'Astra',
    data() {
        return {

        }
    },
    methods: {
        tjsStart() {
            this.scene = new tjs.Scene();
            this.camera = new tjs.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
            this.camera.position.x = 0
            this.camera.position.y = 0
            this.camera.position.z = 2


            this.renderer = new tjs.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


            document.body.appendChild(this.renderer.domElement);
            const geometry = new tjs.SphereBufferGeometry(.65, 64, 64)

            const material = new tjs.PointsMaterial({
                size:0.005
            })

            this.light = new tjs.PointLight(0xffffff, 1)
            this.light.position.x = 2
            this.light.position.y = 3
            this.light.position.z = 4

            this.sphere = new tjs.Points(geometry, material);

            this.scene.add(this.sphere);
            this.scene.add(this.camera)
            this.scene.add(this.light)



            this.animate()
        },

        animate() {
            this.sphere.rotation.y += 0.001;
            requestAnimationFrame(this.animate);

            this.renderer.render(this.scene, this.camera);
        }
    },
    mounted() {
        this.tjsStart()
    }
}
</script>
