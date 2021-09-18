import "./style.css";
import * as THREE from "three";
//load 3D object
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

//SET UP ENVIROMENT
const nearDist = 0.1;
const farDist = 10000;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  nearDist,
  farDist
);
camera.position.x = farDist * -2;
//Change z position base on windows width
if (sizes.width > 1600) {
  camera.position.z = 500;
} else if (sizes.width > 1200) {
  camera.position.z = 600;
} else if (sizes.width > 800) {
  camera.position.z = 800;
} else if (sizes.width > 600) {
  camera.position.z = 1000;
} else if (sizes.width > 400) {
  camera.position.z = 1400;
} else {
  camera.position.z = 1600;
}

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(-5, 5, 0);
scene.add(directionalLight);

//Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setClearColor(0x000000, 0); // Background Color (now transparent)
renderer.setPixelRatio(window.devicePixelRatio); // For HiDPI devices to prevent bluring output canvas
renderer.setSize(sizes.width, sizes.height);
document.querySelector("#canvas-wrapper").appendChild(renderer.domElement);

//On resize
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio));
});

//SET UP POSITION FOR MODELS
const dist = farDist / 3;
const distDouble = dist * 2;
const tau = 2 * Math.PI;

//CREATE THE ASTRONAUTS :>
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath("/draco/");

const customLoader = new GLTFLoader();
// customLoader.setDRACOLoader(dracoLoader);

const customGroup = new THREE.Group();
//ASTRONAUT CENTER
const astroGroup = new THREE.Group();

customLoader.load("/models/Astronaut/scene.gltf", (gltf) => {
  const customMesh = gltf.scene;

  //Astronaut random
  for (let i = 0; i < 30; i++) {
    let copy = customMesh.clone();
    copy.position.x = Math.random() * distDouble - dist;
    copy.position.y = Math.random() * distDouble - dist;
    copy.position.z = Math.random() * distDouble - dist;
    copy.rotation.x = Math.random() * tau;
    copy.rotation.y = Math.random() * tau;
    copy.rotation.z = Math.random() * tau;
    copy.scale.set(100, 100, 100);

    copy.matrixAutoUpdate = false;
    copy.updateMatrix();

    customGroup.add(copy);
  }
  //Astronaut center
  let copyCenter = customMesh.clone();
  copyCenter.position.x = cubeSize * 0;
  copyCenter.position.y = cubeSize * -3;
  copyCenter.position.z = cubeSize * -0.5;
  copyCenter.scale.set(100, 100, 100);
  // copyCenter.rotation.y = cubeSize;

  astroGroup.add(copyCenter);
});
scene.add(customGroup);
scene.add(astroGroup);

//ASTRONAUT CENTER
// const astroGroup = new THREE.Group();
// customLoader.load("/models/Astronaut/scene.gltf", (gltf) => {
//   const customMesh = gltf.scene;
//   customMesh.position.x = cubeSize * 0;
//   customMesh.position.y = cubeSize * -3;
//   customMesh.position.z = cubeSize * -0.5;
//   customMesh.scale.set(100, 100, 100);
//   // customMesh.rotation.y = cubeSize;

//   astroGroup.add(customMesh);
// });
// scene.add(astroGroup);

// CREATE CUBE
const cubeSize = 100;
const cubeGeometry = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
const cubeMaterial = new THREE.MeshNormalMaterial();
const cubeGroup = new THREE.Group();
for (let i = 0; i < 100; i++) {
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cubeMesh.position.x = Math.random() * distDouble - dist;
  cubeMesh.position.y = Math.random() * distDouble - dist;
  cubeMesh.position.z = Math.random() * distDouble - dist;
  cubeMesh.rotation.x = Math.random() * tau;
  cubeMesh.rotation.y = Math.random() * tau;
  cubeMesh.rotation.z = Math.random() * tau;

  // Manually control when 3D transformations recalculation occurs for better performance
  cubeMesh.matrixAutoUpdate = false;
  cubeMesh.updateMatrix();

  cubeGroup.add(cubeMesh);
}
scene.add(cubeGroup);

//CREATE DONUT

const donutGeometry = new THREE.TorusBufferGeometry(50, 30, 20, 45);
const donutMaterial = new THREE.MeshNormalMaterial();
const donutGroup = new THREE.Group();
for (let i = 0; i < 100; i++) {
  const donutMesh = new THREE.Mesh(donutGeometry, donutMaterial);
  donutMesh.position.x = Math.random() * distDouble - dist;
  donutMesh.position.y = Math.random() * distDouble - dist;
  donutMesh.position.z = Math.random() * distDouble - dist;
  donutMesh.rotation.x = Math.random() * tau;
  donutMesh.rotation.y = Math.random() * tau;
  donutMesh.rotation.z = Math.random() * tau;

  // Manually control when 3D transformations recalculation occurs for better performance
  donutMesh.matrixAutoUpdate = false;
  donutMesh.updateMatrix();

  donutGroup.add(donutMesh);
}
scene.add(donutGroup);

//CREATE PARTICLE
const particlesGeometry = new THREE.BufferGeometry();
const count = 3000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = Math.random() * distDouble - dist;
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 5;
particlesMaterial.sizeAttenuation = true;

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// MATERIAL FOR ALL TYPO
const material = new THREE.MeshNormalMaterial();
// CREATE TYPOGRAPHY
const loader = new THREE.FontLoader();
const textMesh = new THREE.Mesh();
const createTypo = (font) => {
  const word = "creative";
  const typoProperties = {
    font: font,
    size: cubeSize * 1.2,
    height: cubeSize / 2,
    curveSegments: 15,
    bevelEnabled: true,
    bevelThickness: 15,
    bevelSize: 6,
    bevelOffset: 1,
    bevelSegments: 10,
  };

  const text = new THREE.TextGeometry(word, typoProperties);
  textMesh.geometry = text;
  textMesh.material = material;
  textMesh.position.x = cubeSize * -3;
  textMesh.position.y = cubeSize * 1.5;
  textMesh.position.z = cubeSize * -1;
  scene.add(textMesh);
};

loader.load("/fonts/Atures.json", createTypo);

// CREATE TYPOGRAPHY2
const loader2 = new THREE.FontLoader();
const textMesh2 = new THREE.Mesh();
const createTypo2 = (font) => {
  const word2 = "front-end dev";
  const typoProperties2 = {
    font: font,
    size: cubeSize * 1.2,
    height: cubeSize / 2,
    curveSegments: 15,
    bevelEnabled: true,
    bevelThickness: 15,
    bevelSize: 6,
    bevelOffset: 1,
    bevelSegments: 10,
  };

  const text2 = new THREE.TextGeometry(word2, typoProperties2);
  textMesh2.geometry = text2;
  textMesh2.material = material;
  textMesh2.position.x = cubeSize * -5.5;
  textMesh2.position.z = cubeSize * -1;
  scene.add(textMesh2);
};

loader2.load("/fonts/Atures.json", createTypo2);

// MOUSE EFFECT
let mouseX = 0;
let mouseY = 0;
const mouseFX = {
  windowHalfX: window.innerWidth / 2,
  windowHalfY: window.innerHeight / 2,
  coordinates: function (coordX, coordY) {
    mouseX = (coordX - mouseFX.windowHalfX) * 5;
    mouseY = (coordY - mouseFX.windowHalfY) * 5;
  },
  onMouseMove: function (e) {
    mouseFX.coordinates(e.clientX, e.clientY);
  },
  onTouchMove: function (e) {
    mouseFX.coordinates(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    );
  },
};
document.addEventListener("mousemove", mouseFX.onMouseMove, false);
document.addEventListener("touchmove", mouseFX.onTouchMove, false);

// RENDER 3D GRAPHIC
const render = () => {
  requestAnimationFrame(render);

  // Camera animation
  // Works with onMouseMove and onTouchMove functions
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (mouseY * -1 - camera.position.y) * 0.05;
  camera.lookAt(scene.position); // Rotates the object to face a point in world space

  const t = Date.now() * 0.001;
  const rx = Math.sin(t * 0.7) * 0.5;
  const ry = Math.sin(t * 0.3) * 0.5;
  const rz = Math.sin(t * 0.2) * 0.5;

  //BOX GROUP
  cubeGroup.rotation.x = rx;
  cubeGroup.rotation.y = ry;
  cubeGroup.rotation.z = rz;

  //DONUT GROUP
  donutGroup.rotation.x = rx;
  donutGroup.rotation.y = ry;
  donutGroup.rotation.z = rz;

  //CUSTOM GROUP
  customGroup.rotation.x = rx;
  customGroup.rotation.y = ry;
  customGroup.rotation.z = rz;

  //TEXT
  textMesh.rotation.x = rx;
  textMesh2.rotation.x = rx;

  astroGroup.rotation.x = rx;
  astroGroup.rotation.y = ry;
  // astroGroup.rotation.z = rz;
  // astroGroup.position.x = rx;
  // astroGroup.position.y = rx;
  // astroGroup.position.z = rz;
  renderer.render(scene, camera);
};
render();
