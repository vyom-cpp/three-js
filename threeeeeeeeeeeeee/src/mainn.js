import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

// Create the scene
const scene = new THREE.Scene();

// Create a camera, which determines what we'll see when we render the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer and attach it to our document
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Directional light with high intensity
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(0, 0, 1);
// scene.add(directionalLight);

// // Adding studio lighting as we are using MeshStandardMaterial
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(0, 0, 1);
// scene.add(light);

// // HighIntensityLight
// const highIntensityLight = new THREE.DirectionalLight(0xffffff, 10);
// scene.add(highIntensityLight);

// // Adding ambient light to the scene
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// // Making a point to stimulate the light bulb
// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);

// // Light helper to show the position of the light
// const lightHelper = new THREE.PointLightHelper(pointLight, 5);
// lightHelper.position.set(5, 5, 5);
// scene.add(lightHelper);

// const highIntensityLightHelper = new THREE.PointLight(highIntensityLight, 5);
// highIntensityLightHelper.position.set(5, 5, 5);
// scene.add(highIntensityLightHelper);

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(directionalLightHelper);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 5);
// scene.add(pointLightHelper);



// LIGHTS

// 1. Ambient Light:- It globally illuminates all objects in the scene equally. It cannot be used to cast shadows.

// 2. Directional Light:- A light that gets emitted in the specific direction. It is way far from the object, the common use case is to stimulate daylight.

// 3. Point Light:- A light that get emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb.


let light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);


// TEXTURES
let loader = new THREE.TextureLoader();
let color = loader.load('../public/paper_0025_color_2k.jpg');
let roughness = loader.load('../public/paper_0025_roughness_2k.jpg');
let normal = loader.load('../public/paper_0025_normal_opengl_2k.png');
let height = loader.load('../public/paper_0025_height_2k.png');



// Create a box geometry and a basic material and combine them into a mesh
const geometry = new THREE.BoxGeometry(3, 1.8, 2, 100, 100);
const material = new THREE.MeshStandardMaterial({ map: color, roughnessMap: roughness, normalMap: normal, displacementMap: height, displacementScale: .1 }); // Side is used to show the double side of the geometry `side: THREE.DoubleSide`

// Roughness and Metalness shows the shiny part and how much is the shape is metallic part
// roughness: .8, metalness: .3

const cube = new THREE.Mesh(geometry, material);

// Add the cube to the scene
scene.add(cube);

// Responsiveness
window.addEventListener('resize', onWindowResize, false);



// LIL GUI
const gui = new GUI();

// Material settings
const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'roughness', 0, 1, 0.01);
materialFolder.add(material, 'metalness', 0, 1, 0.01);
materialFolder.add(material, 'displacementScale', 0, 1, 0.01);
materialFolder.open();

// Mesh settings
const meshFolder = gui.addFolder('Mesh');
meshFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
meshFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
meshFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');
meshFolder.add(cube.scale, 'x', 0, Math.PI * 2, 0.01).name('Scale X');
meshFolder.add(cube.scale, 'y', 0, Math.PI * 2, 0.01).name('Scale Y');
meshFolder.add(cube.scale, 'z', 0, Math.PI * 2, 0.01).name('Scale Z');
meshFolder.add(cube.position, 'x', 0, Math.PI * 2, 0.01).name('Position X');
meshFolder.add(cube.position, 'y', 0, Math.PI * 2, 0.01).name('Position Y');
meshFolder.add(cube.position, 'z', 0, Math.PI * 2, 0.01).name('Position Z');
meshFolder.open();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Orbit Controls
// Orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // Enables smooth movement of the camera
// controls.autoRotate = true; // Automatically rotates the camera
// controls.autoRotateSpeed = 2.5; // Speed of the rotation
// controls.enableZoom = false; // Disables zooming
controls.dampingFactor = 0.01; // Lesser the damping factor, the slower the camera stops

// Create a function to animate our scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube for some basic animation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update();

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// Run the animation function for the first time to kick things off
animate();


// LIL GUI - 1:24:37