import './style.css'
import * as THREE from 'three'
import { GLTFLoader, OrbitControls, RGBELoader } from 'three/examples/jsm/Addons.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(44, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 5
camera.position.y = 0.1
camera.position.x = 0 // Centered the scene by setting x to 0

scene.add(camera)



const canvas = document.querySelector('canvas')
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
// renderer.setClearColor(0x6768ab, 1)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // to reduce porcessing based on our device pixels
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1

const pmremGenerator = new THREE.PMREMGenerator(renderer)
pmremGenerator.compileEquirectangularShader()


// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
// controls.dampingFactor = 0.1
// controls.enableZoom = true
// controls.enablePan = false



// const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 3)
// scene.add(hemiLight)

// const dirLight = new THREE.DirectionalLight(0x445B55, 2) // Added directional light
// dirLight.position.set(0, 5, 0) // Centered the directional light
// scene.add(dirLight)



let model;


// Load RGBE environment map
new RGBELoader().load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/parking_garage_1k.hdr', function (texture) {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture
  // scene.background = envMap
  scene.environment = envMap;
  texture.dispose()
  pmremGenerator.dispose()

  const loader = new GLTFLoader()
  loader.load('./robothead.glb', function (gltf) {
    model = gltf.scene
    scene.add(model)


  

    // model.position.set(2, 0, 0)
    // model.rotation.y = -0.3 // Centered the model
  }, undefined, function (error) {
    console.error('An error happened while loading the model:', error) // Error handling
  })
});




window.addEventListener('resize', function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight)
  camera.aspect = (this.window.innerWidth / this.window.innerHeight)
  camera.updateProjectionMatrix()

})


window.addEventListener('mousemove', (e) => {
  if (model) {
    const rotationX = (e.clientX / window.innerWidth - .5) * (Math.PI * .25)
    const rotationY = (e.clientY / window.innerHeight - .5) * (Math.PI * .2)

    model.rotation.x = rotationY
    model.rotation.y = rotationX

  }
})

const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()