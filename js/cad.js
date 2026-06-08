/* ════════════════════════════════════════════════════════════════════════
   cad.js — visores 3D interactivos de subsistemas (three.js).
   Monta UN visor por cada <div class="cad-mount" data-model="..."> que main.js
   coloca en los subsistemas con `model3d` en data.js (drivetrain, intake,
   shooter, turret...).
   Arrastra para rotar · scroll para zoom · auto-rota hasta que lo tocas.
   Solo se renderizan los que están EN PANTALLA (ahorra batería/CPU).
   ⚠️ Necesita servirse por http (Live Server / npx serve), no por file://.
   ════════════════════════════════════════════════════════════════════════ */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// Decoder para modelos comprimidos con meshopt (los que produce gltf-transform).
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const deg2rad = (d) => ((Number(d) || 0) * Math.PI) / 180;

// Un loader compartido para todos los visores.
const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);

function createViewer(container) {
  const modelPath = container.dataset.model || "assets/cad/robot.glb";
  const rot = {
    x: deg2rad(container.dataset.rotx),
    y: deg2rad(container.dataset.roty),
    z: deg2rad(container.dataset.rotz),
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 2000);
  camera.position.set(2.6, 1.8, 3);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Luz "clave" que SIGUE a la cámara → el frente siempre iluminado, atrás en sombra.
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  scene.add(new THREE.HemisphereLight(0xffffff, 0x6a5a86, 0.35));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.7);
  scene.add(keyLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.2;
  controls.addEventListener("start", () => (controls.autoRotate = false));

  function fitCameraToObject(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    object.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const dist = maxDim * 2.1;
    camera.position.set(dist * 0.9, dist * 0.55, dist * 0.95);
    camera.near = dist / 100;
    camera.far = dist * 100;
    camera.updateProjectionMatrix();
    controls.target.set(0, 0, 0);
    controls.maxDistance = dist * 4;
    controls.update();
  }

  loader.load(
    modelPath,
    (gltf) => {
      const model = gltf.scene;
      model.rotation.set(rot.x, rot.y, rot.z);
      scene.add(model);
      model.updateMatrixWorld(true);
      fitCameraToObject(model);
    },
    undefined,
    () => {
      const el = document.createElement("div");
      el.className = "hero-3d-placeholder";
      el.innerHTML =
        "No se pudo cargar <code>" + modelPath + "</code>.<br>Revisa la ruta en data.js.";
      container.appendChild(el);
    }
  );

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

  return {
    container,
    visible: false,
    render() {
      keyLight.position.copy(camera.position);
      controls.update();
      renderer.render(scene, camera);
    },
  };
}

// Crea un visor por cada contenedor .cad-mount de la página.
const viewers = Array.from(document.querySelectorAll(".cad-mount")).map(createViewer);

if (viewers.length) {
  // Marca cuáles están en pantalla para renderizar solo esos.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const v = viewers.find((v) => v.container === e.target);
        if (v) v.visible = e.isIntersecting;
      });
    },
    { threshold: 0.05 }
  );
  viewers.forEach((v) => io.observe(v.container));

  function animate() {
    requestAnimationFrame(animate);
    for (const v of viewers) if (v.visible) v.render();
  }
  animate();
}
