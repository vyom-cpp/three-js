Three.js Key Concepts
=====================

### Scene
The **scene** represents the world, which includes everything behind or ahead, like Earth in a 3D environment.

### Camera
The **camera** functions like human eyes, having an angle from which only certain things are visible. It determines what part of the scene can be seen.
*   **Field of View (FOV)**: The extent of the scene visible at any moment.
*   **60-90 is the average FOV for games.**
    
### Mesh
A **mesh** consists of **geometry** (the shape) and **material** (the appearance).

#### Rotation
*   Used to control the rotation of the mesh around the X, Y, and Z axes in radians.
*   mesh.rotation.y = Math.PI; rotates the mesh by **180 degrees**.
    
#### Position
*   Represents the coordinates of the mesh in **3D space**.
    
#### Scale
*   The standard way to **resize** the mesh.
*   mesh.scale.x = 3; increases the width **threefold**.
    
### Renderer
*   The **renderer** is responsible for displaying the scene through the camera.
*   renderer.render(scene, camera); continuously prints what the camera can see in the scene.

### Request Animation Frame
*   Ensures that animations update continuously for a smooth experience.