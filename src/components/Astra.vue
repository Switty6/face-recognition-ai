<template>
    <transition name="fade">
        <canvas style="background:transparent;"></canvas>
    </transition>
</template>

<script>
import * as tjs from 'three'

export default {
    name: 'Astra',
    data() {
        return {
            amplify: 1,
            processing: 15,
            normalProcessing:6.8,
            sphereAmplify: 1
        }
    },
    methods: {
        tjsStart() {
            this.scene = new tjs.Scene();
            this.scene.background = null

            this.camera = new tjs.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
            this.camera.position.x = 0
            this.camera.position.y = 0
            this.camera.position.z = 2


            this.renderer = new tjs.WebGLRenderer({ alpha: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            this.renderer.setClearColor(0x000000, 0);


            document.body.appendChild(this.renderer.domElement);

            this.light = new tjs.PointLight(0xffffff, 1)
            this.light.position.x = 2
            this.light.position.y = 3
            this.light.position.z = 4

            const geometry = new tjs.SphereBufferGeometry(.65, 20, 20)

            const material = new tjs.PointsMaterial({
                size: 0.005,
                color: 0x62D6F4
            })

            this.sphere = new tjs.Points(geometry, material);

            this.scene.add(this.sphere);
            this.scene.add(this.camera)
            this.scene.add(this.light)
        },
        InnerSphere() {
            const geometry = new tjs.SphereBufferGeometry(.56, 1, 1)
            const material = new tjs.LineBasicMaterial({
                color: 0x62D6F4
            })
            this.innersphere = new tjs.Line(geometry, material)
            this.scene.add(this.innersphere)
        },
        SmallSphere() {
            const geometry = new tjs.TorusGeometry(0.25, 0.01, 6, 18, 2)
            const geometry2 = new tjs.TorusGeometry(0.2, 0.01, 6, 18, 2)
            const geometry3 = new tjs.TorusGeometry(0.15, 0.01, 6, 18, 2)
            const material = new tjs.MeshBasicMaterial({ color: 0x0788be });
            this.torus = new tjs.Mesh(geometry, material);
            this.torus2 = new tjs.Mesh(geometry2, material);
            this.torus3 = new tjs.Mesh(geometry3, material);

            this.scene.add(this.torus)
            this.scene.add(this.torus2)
            this.scene.add(this.torus3)


            this.torus.rotation.x = 1.8;
            this.torus3.rotation.y = 1.8;

        },
        Cricle() {
            const geometry = new tjs.SphereBufferGeometry(0.09, 8, 8)
            const material = new tjs.MeshBasicMaterial({ color: 0x2c64e1, wireframe: true })
            this.circle = new tjs.Mesh(geometry, material)
            this.scene.add(this.circle)


        },
        animate() {
            this.sphere.rotation.y += 0.003 * this.sphereAmplify;
            this.innersphere.rotation.y += 0.008 * this.sphereAmplify * 2;

            this.torus.rotation.z += 0.02 * this.amplify;
            this.torus2.rotation.z += 0.02 * this.amplify;
            this.torus3.rotation.z += 0.02 * this.amplify;

            this.circle.rotation.y += 0.01 * this.amplify;

            requestAnimationFrame(this.animate);



            this.renderer.render(this.scene, this.camera);
        },
        Decomputing(old_amplify) {
            const deprocess = setInterval(() => {
                this.amplify -= 0.2
                if (this.amplify < 5) {
                    this.torus.material.color = new tjs.Color(0x0788be)
                }
                if (this.amplify > 7.0){
                    this.camera.position.y += 0.005
                }
                if (this.amplify <= 8.0) {
                    this.sphereAmplify -= 0.1
                    this.circle.material.color = new tjs.Color(0x2c64e1)
                }
                if (this.amplify <= old_amplify) {
                    this.camera.position.y = 0
                    this.sphereAmplify =
                        this.amplify = old_amplify
                    clearInterval(deprocess)
                }
            }, 100)
        },
        ComputingPower(processing) {
            const old_amplify = this.amplify
            const new_processing = this.amplify * processing


            const interval = setInterval(() => {
                this.amplify += 0.1
                if (this.amplify < 10.0 && this.amplify >= 7.0) {
                    this.torus.material.color = new tjs.Color(0xb8a804)
                    this.sphereAmplify += 0.18
                    this.camera.position.y -= 0.007

                    console.log(this.sphereAmplify)
                } else if (this.amplify >= 10.0) {
                    this.circle.material.color = new tjs.Color(0xbb0202)

                    if (this.sphereAmplify > 6) {
                        this.sphereAmplify = 6
                    }
                }
                if (this.amplify >= new_processing) {
                    setTimeout(() => {
                        this.Decomputing(old_amplify)
                    }, 3000)
                    clearInterval(interval)
                }
            }, 100)
        },
        
    },
    mounted() {
        this.tjsStart()
        this.InnerSphere()
        this.SmallSphere()
        this.Cricle()
        this.animate()
        this.ComputingPower(this.processing)


    }
}
</script>
