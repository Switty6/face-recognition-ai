<template>
    <canvas></canvas>
</template>

<script>
import * as tjs from 'three'

export default {
    name: 'ThreeTest',
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
            const loader = new tjs.TextureLoader()

            const material = new tjs.MeshPhongMaterial({
                map: loader.load('./earth-texture.jpg'),
                bumpMap: loader.load('/earth-geometry.jpg'),
                bumpScale: 0.3,
                specularMap: loader.load('/earth-specular.jpg'),
            })

            this.light = new tjs.PointLight(0xffffff, 1)
            this.light.position.x = 2
            this.light.position.y = 3
            this.light.position.z = 4

            this.sphere = new tjs.Mesh(geometry, material);


            const skygeo = new tjs.SphereGeometry(0.66, 32, 32)
            const skymat = new tjs.MeshPhongMaterial({
                map: loader.load('/skyyy.png'),
                transparent: true,
            });
            this.sky = new tjs.Mesh(skygeo, skymat)

            this.scene.add(this.sky)
            this.scene.add(this.sphere);
            this.scene.add(this.camera)
            this.scene.add(this.light)



            this.animate()
        },

        animate() {
            this.sphere.rotation.y += 0.001;
            this.sky.rotation.y += 0.002;
            requestAnimationFrame(this.animate);

            this.renderer.render(this.scene, this.camera);
        }
    },
    mounted() {
        this.tjsStart()
    }
}
</script>
