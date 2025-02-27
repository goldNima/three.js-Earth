import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 

console.log("three >>>", THREE);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;  


const ambitionLight = new THREE.AmbientLight(0xffffff, 0.5);  
scene.add(ambitionLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);  
scene.add(directionalLight);


const gltfLoader = new GLTFLoader();
let model;
gltfLoader.load("./public/model/earth_cartoon.glb", (gltf) => {
    model = gltf.scene;
    scene.add(model);
});


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);  
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();  


function animate() {
    if (model) {
        model.rotation.y += 0.01;
    }

    controls.update();  

    renderer.render(scene, camera);  
}
