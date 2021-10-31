<template>
    <canvas style="background:transparent;"></canvas>
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
            const geometry = new tjs.SphereBufferGeometry(.56, 21, 21)
            const material = new tjs.PointsMaterial({
                size: 0.005,
                color: 0x62D6F4
            })
            this.innersphere = new tjs.Points(geometry, material)
            this.scene.add(this.innersphere)
        },
        SmallSphere() {
            const geometry = new tjs.TorusGeometry(0.45,0.01,6,18,2)
            const geometry2 = new tjs.TorusGeometry(0.4,0.01,6,18,2)
            const geometry3 = new tjs.TorusGeometry(0.35,0.01,6,18,2)
            const material = new tjs.MeshBasicMaterial( { color: 0x002e45 } );
            this.torus = new tjs.Mesh( geometry,material);
            this.torus2 = new tjs.Mesh(geometry2,material);
            this.torus3 = new tjs.Mesh (geometry3,material);
            this.scene.add(this.torus)
            this.scene.add(this.torus2)
            this.scene.add(this.torus3)
            
            this.torus.rotation.x= 1.7;
            this.torus3.rotation.y=1.7;
        },
        animate() {
            this.sphere.rotation.y += 0.003;
            this.innersphere.rotation.y += 0.008;
            
            this.torus.rotation.z += 0.01;
            this.torus2.rotation.z += 0.01;
            this.torus3.rotation.z += 0.01;

            requestAnimationFrame(this.animate);

            this.renderer.render(this.scene, this.camera);
        }
    },
    mounted() {
        this.tjsStart()
        this.InnerSphere()
        this.SmallSphere()
        this.animate()

    }
}
</script>
