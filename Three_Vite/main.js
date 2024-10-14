import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 100) //.1 er kacher jinish dekhbo na and 100 er durer jinish dekhbo na
camera.position.z = 5
scene.add(camera)

//directonal light : light that comes from a specific direction
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(2, 2, 2)
scene.add(directionalLight)
//helper to see where the light is coming from
const helper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(helper);

//ambient light : light that comes from all directions
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

//point light : light that comes from a specific point in all directions
const pointLight = new THREE.PointLight(0xffffff, 1, 10, 1);
pointLight.position.set(-2 , -2.78 , -4.7);
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);

let loader = new THREE.TextureLoader()
let color = loader.load('./textures/color.png')
let metalic = loader.load('/textures/metalness.png')
let normal = loader.load('./textures/normal.png')
let height = loader.load('./textures/height.png')
let roughness = loader.load('./textures/roughness.png')



let box = new THREE.CylinderGeometry(1, 1, 2, 100, 100)
//MeshBasicMaterail : Light doesnt affect it
// let material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: false, side: THREE.DoubleSide }) //wireframe:true basically dekhay how it is built
//MeshStandardMaterial : Light Effects it. acts like real world material
// let material = new THREE.MeshStandardMaterial({ color: 'red', side: THREE.DoubleSide, wireframe: false, roughness: 0.3, metalness: 0.3 })

//loading Textures
let material = new THREE.MeshStandardMaterial({ map: color, metalnessMap: metalic, normalMap: normal, roughnessMap: roughness, displacementMap: height, displacementScale: 0.001, wireframe: false })
let mesh = new THREE.Mesh(box, material)

// mesh.rotation.y = 2 //rotation bujhar jonno jake rotate korbo tar direction e ekta shikh(kebab er) dhukay dao.
// mesh.position.x = 2

mesh.rotation.y = Math.PI / 4
// mesh.rotation.x = Math.PI / 4 //isometric view of an object
scene.add(mesh)

let canvas = document.querySelector('canvas')
let renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)


//Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true
controls.enableDamping = true
controls.autoRotate = true // we can do the rotation through this also
controls.dampingFactor = 0.05



// Import GUI from lil-gui


// Create GUI
const gui = new GUI();

// Mesh folder
const meshFolder = gui.addFolder('Mesh');
meshFolder.add(mesh.rotation, 'x', 0, Math.PI * 2);
meshFolder.add(mesh.rotation, 'y', 0, Math.PI * 2);
meshFolder.add(mesh.rotation, 'z', 0, Math.PI * 2);
meshFolder.add(mesh.position, 'x', -5, 5);
meshFolder.add(mesh.position, 'y', -5, 5);
meshFolder.add(mesh.position, 'z', -5, 5);
meshFolder.add(mesh.scale, 'x', 0.1, 2);
meshFolder.add(mesh.scale, 'y', 0.1, 2);
meshFolder.add(mesh.scale, 'z', 0.1, 2);

// Material folder
const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'wireframe');
materialFolder.add(material, 'displacementScale', 0, 0.1, 0.001);
materialFolder.add(material.normalScale, 'x', 0, 1, 0.01).name('normalScale X');
materialFolder.add(material.normalScale, 'y', 0, 1, 0.01).name('normalScale Y');

// Light folder
const lightFolder = gui.addFolder('Directional Light');
lightFolder.add(directionalLight, 'intensity', 0, 10);
lightFolder.add(directionalLight.position, 'x', -10, 10);
lightFolder.add(directionalLight.position, 'y', -10, 10);
lightFolder.add(directionalLight.position, 'z', -10, 10);

// Point Light folder
const pointLightFolder = gui.addFolder('Point Light');
pointLightFolder.add(pointLight, 'intensity', 0, 10);
pointLightFolder.add(pointLight.position, 'x', -10, 10);
pointLightFolder.add(pointLight.position, 'y', -10, 10);
pointLightFolder.add(pointLight.position, 'z', -10, 10);
pointLightFolder.addColor(pointLight, 'color');
pointLightFolder.add(pointLight, 'distance', 0, 100);
pointLightFolder.add(pointLight, 'decay', 0, 2);

// Update function for point light helper
const updatePointLightHelper = () => {
  if (pointLightHelper) {
    pointLightHelper.update();
  }
};

// Add onChange event to point light position controls
pointLightFolder.controllers.forEach(controller => {
  if (['x', 'y', 'z'].includes(controller.property)) {
    controller.onChange(updatePointLightHelper);
  }
});


// Update function to refresh the helper when light position changes
const updateLightHelper = () => {
  helper.update();
};

// Add onChange event to light position controls
lightFolder.controllers.forEach(controller => {
  if (controller.property !== 'intensity') {
    controller.onChange(updateLightHelper);
  }
});

// Controls folder
const controlsFolder = gui.addFolder('Orbit Controls');
controlsFolder.add(controls, 'autoRotate');
controlsFolder.add(controls, 'autoRotateSpeed', 0.1, 10);



// let clock = new THREE.Clock()

//make responsive
window.addEventListener('resize', function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight)
  camera.aspect = this.window.innerWidth / this.window.innerHeight // when we set a custom value to camera like this we must use camera.updateProjectionMatrix()
  camera.updateProjectionMatrix()
})

function animate() {
  window.requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
  // mesh.rotation.x += 0.01 // we dont use this. because different pc te different pc te animate hobe




}
animate()
