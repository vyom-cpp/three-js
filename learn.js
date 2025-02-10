// scene (means the world, whatever is behind or ahead of me, let's say Earth)
// camera (means say eyes have an angle from which we can see certain things only, so that is called as the camera)
// mesh -> geometry & material
// renderer
// request animation frame

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, .1, 100);
// Anything which is far than 100 or closer than .1 won't be visible, second argument is setting the aspect ratio, 65 is the FOV - Field of View, which is also called the extent of scene that is visible on the display at any given moment
// 60-90 is average FOV for games

camera.position.z = 5;
scene.add(camera);

let box = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: 'red' });
let mesh = new THREE.Mesh(box, material);

// ROTATION
// These are used to control the rotation of mesh around X, Y, and Z axes (specific in radians)
// mesh.rotation.x = 1;
mesh.rotation.y = Math.PI; // It means 180 degrees
// mesh.rotation.z = 4;


// POSITION:- Represents the coordinates of mesh's position in 3D space
// mesh.position.x = 2;

// SCALE:- Standard way to resize the mesh
mesh.scale.x = 3;
scene.add(mesh);

const canvas = document.querySelector( 'canvas' );
let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true }); // AntiAlias is used to turn off the jagged lines:- means lines with rough, uneven edges or shapes (for smoother output)
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera); // Renderer.render is used for Keep printing whatever in our scene the camera can see 

let clock = new THREE.Clock(); // Gives you clock


function animate(){
    window.requestAnimationFrame(animate); // It shows that whatever is the speed of computer (fps), run this function animate() that many times
    renderer.render(scene, camera);
    mesh.rotation.x = clock.getElapsedTime() * 3; // This getElapsedTime will make sure that on each and every device, the rotation speed remains same
    // mesh.rotation.y += 0.02;
    // mesh.rotation.z += 0.03;
    // mesh.scale.x += .01;
}

animate();