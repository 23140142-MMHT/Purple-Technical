/* ════════════════════════════════════════════════════════════════════════
   cad.js — visor 3D interactivo de un subsistema (three.js).
   Se monta en <div id="cad-mount" data-model="..."> que main.js coloca en la
   sección del subsistema que tenga `model3d` en data.js (ej. drivetrain).
   Arrastra para rotar · scroll para zoom · auto-rota hasta que lo tocas.
   ⚠️ Necesita servirse por http (Live Server / npx serve), no por file://.
   ════════════════════════════════════════════════════════════════════════ */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// Decoder para modelos comprimidos con meshopt (los que produce gltf-transform/gltfpack).
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const container = document.getElementById("cad-mount");

// Si esta página no tiene visor 3D (ningún subsistema con model3d), no hacemos nada.
if (container) {
  const modelPath =
    container.dataset.model ||
    (window.BINDER && window.BINDER.cadModelPath) ||
    "assets/cad/robot.glb";

  function showPlaceholder(msg) {
    const el = document.createElement("div");
    el.className = "hero-3d-placeholder";
    el.innerHTML = msg;
    container.appendChild(el);
  }

  // --- Escena ---
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 2000);
  camera.position.set(2.6, 1.8, 3);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // --- Luces (sin HDR externo, funciona offline) ---
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  scene.add(new THREE.HemisphereLight(0xffffff, 0xcccccc, 0.5));
  const dir = new THREE.DirectionalLight(0xffffff, 1.4);
  dir.position.set(5, 8, 5);
  scene.add(dir);
  const dir2 = new THREE.DirectionalLight(0xffffff, 0.6);
  dir2.position.set(-5, 3, -4);
  scene.add(dir2);

  // --- Controles: rotar / zoom / pan ---
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true; // gira solo hasta que el usuario interactúa
  controls.autoRotateSpeed = 1.2;
  controls.addEventListener("start", () => (controls.autoRotate = false));

  function fitCameraToObject(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center); // centra el modelo en el origen
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const dist = maxDim * 2.1;
    // Vista 3/4 (un poco de frente y desde arriba) para que se vea bien.
    camera.position.set(dist * 0.9, dist * 0.55, dist * 0.95);
    camera.near = dist / 100;
    camera.far = dist * 100;
    camera.updateProjectionMatrix();
    controls.target.set(0, 0, 0);
    controls.maxDistance = dist * 4;
    controls.update();
  }

  // --- Carga del modelo ---
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder); // soporta GLB comprimido con meshopt
  loader.load(
    modelPath,
    (gltf) => {
      scene.add(gltf.scene);
      fitCameraToObject(gltf.scene);
    },
    undefined,
    () => {
      showPlaceholder(
        'No se pudo cargar <code>' + modelPath + '</code>.<br>Sube tu modelo ahí (o borra <code>model3d</code> en data.js para usar imagen).'
      );
    }
  );

  // --- Tamaño responsivo ---
  function resize() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);
  resize();

  // --- Loop de animación ---
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}
