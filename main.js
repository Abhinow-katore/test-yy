import './style.css'

import * as THREE from 'three'; //import js library

//Control the orbit
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader } from 'three';







const scene = new THREE.Scene(); //like container

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //camera
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio); //for pixel
renderer.setSize(window.innerWidth, window.innerHeight); //postion of camera
camera.position.setZ(30);
renderer.render(scene, camera); // render==Draw

const geometry = new THREE.TorusBufferGeometry( 10, 3, 16, 100) // new material added geometry
const material = new THREE.MeshStandardMaterial({ color:0xFF6347}); 
const torus = new THREE.Mesh (geometry,material);


scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)//light
pointLight.position.set(5,10,5) //postion of light
const ambientlight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientlight) //equal light dispersion



const lightHelper = new THREE.PointLightHelper(pointLight)//shading of light
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper) <<== uncomment for  grid show
/*grid helper his for showing allignent i.e. grid
and lighthelper shows the positon of light */
scene.add(pointLight)


const controls  = new OrbitControls(camera, renderer.domElement)
//update the posiotn according to mouse *1 Mouse camera controller
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);//new material: sphere of radius= 0.25
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); //star object position
  star.position.set(x,y,z); //position distrubuted of star
  scene.add(star)


}

Array(200).fill().forEach(addStar) //add star function

///* Uncomment for Backgroung Image
//  Not looking good so I commented it out


const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;
//*/


///ANIMATION :Rotaion
function animate(){ // animation
  requestAnimationFrame(animate); //for animation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  
  
  controls.update();//*2 mouse camera
 

  renderer.render(scene, camera);
  

}
animate()


//Avatar my photo
const AbhiNOWTexture = new THREE. TextureLoader().load('myself.jpg')

const AbhiNOW = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: AbhiNOWTexture})
)
scene.add(AbhiNOW);

//Moon////////////////
const moonTexture = new THREE.TextureLoader().load('test.jpg'); //texture image
const normalTexture  = new THREE.TextureLoader().load('normal_bump.jpg'); //normal bump




const moon =  new THREE.Mesh(
  new THREE.BoxGeometry(3,2,2),
  new THREE.MeshStandardMaterial({
  map: moonTexture, //texture
  normalMap: normalTexture //normal bump
} )
  
  );
  scene.add(moon)
////FOR MOON POSITION
moon.position.z = 5;
moon.position.setX(-10);
  //////////////////////////Moon Animation
 

///CAMERA SCROLL
function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  //ROTAION OF MOON
  moon.rotation.x +=0.05;
  moon.rotation.y +=0.075;
  moon.rotation.z += 0.05;
  //ROTATION OF BOX()
  AbhiNOW.rotation.y += 0.01;
  AbhiNOW.rotation.z += 0.01;
  //Camera postion SCROLL
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.002;
  camera.position.y = t *  -0.002;

}
document.body.onscroll = moveCamera