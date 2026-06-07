/* ════════════════════════════════════════════════════════════════════════
   cad.js — modelo 3D del hero con three.js.
   Auto-rota; al hacer click hace scroll a la sección de subsistemas.
   El modelo se carga desde BINDER.cadModelPath (assets/cad/robot.glb).
   ⚠️ Necesita servirse por http (Live Server / npx serve), no por file://.
   ════════════════════════════════════════════════════════════════════════ */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const container = document.getElementById("hero-3d");
const modelPath = (window.BINDER && window.BINDER.cadModelPath) || "assets/cad/robot.glb";

// Click en el hero → scroll a los subsistemas.
container.addEventListener("click", () => {
  document.getElementById("contents").scrollIntoView({ behavior: "smooth" });
});

function showPlaceholder(msg) {
  const el = document.createElement("div");
  el.className = "hero-3d-placeholder";
  el.innerHTML = msg;
  container.appendChild(el);
}

// --- Escena ---
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
camera.position.set(2.6, 1.8, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// El canvas no captura el mouse para que el click llegue al botón (scroll).
renderer.domElement.style.pointerEvents = "none";
container.appendChild(renderer.domElement);

// --- Luces (sin HDR externo, funciona offline) ---
scene.add(new THREE.AmbientLight(0xffffff, 0.7));
scene.add(new THREE.HemisphereLight(0xffffff, 0xcccccc, 0.5));
const dir = new THREE.DirectionalLight(0xffffff, 1.3);
dir.position.set(5, 8, 5);
scene.add(dir);

// Grupo contenedor del modelo (lo rotamos a él).
const pivot = new THREE.Group();
scene.add(pivot);

function fitCameraToObject(object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  // Centra el modelo en el origen.
  object.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const dist = maxDim * 2.2;
  camera.position.set(dist * 0.7, dist * 0.5, dist * 0.8);
  camera.near = dist / 100;
  camera.far = dist * 100;
  camera.updateProjectionMatrix();
  camera.lookAt(0, 0, 0);
}

// --- Carga del modelo ---
new GLTFLoader().load(
  modelPath,
  (gltf) => {
    pivot.add(gltf.scene);
    fitCameraToObject(gltf.scene);
  },
  undefined,
  () => {
    showPlaceholder(
      'Sube tu modelo a <code>assets/cad/robot.glb</code><br>para verlo girar aquí.'
    );
  }
);

// --- Tamaño responsivo ---
function resize() {
  const w = container.clientWidth || 1;
  const h = container.clientHeight || 1;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(container);
resize();

// --- Loop de animación (auto-rotación) ---
function animate() {
  requestAnimationFrame(animate);
  pivot.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();
