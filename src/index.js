import './styles/main.scss'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextureLoader } from 'three'

const siteWrapper = document.querySelector('#root')

//render
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.gammaFactor = 2.2;
renderer.gammaOutput = true;
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
siteWrapper.appendChild( renderer.domElement );


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement)


//helpers
//light
const light = new THREE.AmbientLight(0x404040,0.11 );
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// directionalLight.position.set(1,4,1)
// const targetObject = new THREE.Object3D()
// scene.add(targetObject)
// directionalLight.target = targetObject
// const lightHelp = new THREE.DirectionalLightHelper(directionalLight, 5)
scene.add(light)
// scene.add(directionalLight)
// scene.add(lightHelp)

//TODO: Fix Lightning and scale of elements (positioning camera)

const loader = new GLTFLoader();
loader.load( './assets/models/8000229.glb', function (gltf){
    gltf.scene.scale.set(12,12,12);
    scene.add(gltf.scene)
    
}, undefined, function (error){
    console.log(error);
});

loader.load( './assets/models/linustechtips-studio-kitchen.glb', function (gltf){
    gltf.scene.scale.set(12,12,12);
    scene.add(gltf.scene)
    
}, undefined, function (error){
    console.log(error);
});
//materials
const mapTexture = new THREE.TextureLoader().load('./assets/textures/hardwood2_diffuse.jpg')
const bumpTexture = new THREE.TextureLoader().load('./assets/textures/hardwood2_bump.jpg')
const normalTexture = new THREE.TextureLoader().load('./assets/textures/hardwood2_roughness.jpg')
const woodMaterial = new THREE.MeshLambertMaterial({
    // color: '#fa0045'
    map: mapTexture,
    bumpMap: bumpTexture,
    lightMap: normalTexture
})


//Table Geometry
// const tableSurfaceGeometry = new THREE.BoxGeometry(10,0.1,5);
// const tableSurface = new THREE.Mesh( tableSurfaceGeometry , woodMaterial);
// tableSurface.position.set(0,-0.02,0)
// scene.add(tableSurface)
//Table Legs Geometry


//camera
camera.position.set(0, 3.5, 2.5)


controls.update()

function animate(){
    requestAnimationFrame(animate);
    // tableSurface.rotation.x += 0.01;
    // tableSurface.rotation.y += 0.01;
    controls.update()
    renderer.render(scene, camera);
}
animate();
