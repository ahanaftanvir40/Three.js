let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, .1, 100) //.1 er kacher jinish dekhbo na and 100 er durer jinish dekhbo na
camera.position.z = 5
scene.add(camera)

let box = new THREE.BoxGeometry(1, 1, 1)
let material = new THREE.MeshBasicMaterial({ color: 'red' })
let mesh = new THREE.Mesh(box, material)

// mesh.rotation.y = 2 //rotation bujhar jonno jake rotate korbo tar direction e ekta shikh(kebab er) dhukay dao.
// mesh.position.x = 2

mesh.rotation.y = Math.PI / 4
mesh.rotation.x = Math.PI / 4 //isometric view of an object
scene.add(mesh)

let canvas = document.querySelector('canvas')
let renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)


const controls = new OrbitControls(camera, renderer.domElement);



let clock = new THREE.Clock()

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



    mesh.rotation.y = clock.getElapsedTime() //basically time er upor animation kortesi karon shob pc te second constant thakbe so karo pc te 1 second er value beshi kom hobe na.
    mesh.rotation.x = clock.getElapsedTime() * 3
}
animate()
