/* Three.js — exploding dodecahedron driven by scroll */

const canvas = document.getElementById("bg");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, IS_TOUCH ? 1.5 : 2));
renderer.setClearColor(0x040508, 1);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x040508, 0.075);
const camera = new THREE.PerspectiveCamera(
  50,
  innerWidth / innerHeight,
  0.1,
  200,
);
camera.position.set(0, 0, 7);

function sizeRenderer() {
  // CSS sets the canvas size, which stays fixed as a mobile address bar moves
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
sizeRenderer();

const group = new THREE.Group();
scene.add(group);

/* Split dodecahedron into triangular face shards */
const SRC = new THREE.DodecahedronGeometry(1.75, 0);
const pos = SRC.attributes.position.array;
const triCount = pos.length / 9;
const emberSet = new Set();
while (emberSet.size < 5) emberSet.add(Math.floor(Math.random() * triCount));

const shards = [];
let ti = 0;
for (let i = 0; i < pos.length; i += 9, ti++) {
  const ax = pos[i],
    ay = pos[i + 1],
    az = pos[i + 2];
  const bx = pos[i + 3],
    by = pos[i + 4],
    bz = pos[i + 5];
  const cx = pos[i + 6],
    cy = pos[i + 7],
    cz = pos[i + 8];
  const cen = new THREE.Vector3(
    (ax + bx + cx) / 3,
    (ay + by + cy) / 3,
    (az + bz + cz) / 3,
  );
  const local = new Float32Array([
    ax - cen.x,
    ay - cen.y,
    az - cen.z,
    bx - cen.x,
    by - cen.y,
    bz - cen.z,
    cx - cen.x,
    cy - cen.y,
    cz - cen.z,
  ]);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(local, 3));

  const isEmber = emberSet.has(ti);
  const fill = isEmber ? 0x2a1206 : Math.random() < 0.5 ? 0x0c1322 : 0x121b30;
  const mesh = new THREE.Mesh(
    g,
    new THREE.MeshBasicMaterial({ color: fill, transparent: true, opacity: 1 }),
  );
  mesh.position.copy(cen);

  const edgeMat = new THREE.LineBasicMaterial({
    color: isEmber ? 0xff7a2a : 0x3a4a6f,
    transparent: true,
    opacity: isEmber ? 0.9 : 0.55,
  });
  mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(g), edgeMat));

  const dir = cen
    .clone()
    .normalize()
    .add(
      new THREE.Vector3(rnd(-0.35, 0.35), rnd(-0.35, 0.35), rnd(-0.35, 0.35)),
    )
    .normalize();
  mesh.userData = {
    centroid: cen,
    dir,
    dist: rnd(1.8, 5.6),
    delay: Math.random() * 0.35,
    rotAxis: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)).normalize(),
    rotAmt: rnd(2, 7),
    ember: isEmber,
    edgeMat,
  };
  group.add(mesh);
  shards.push(mesh);
}

/* Cage outline over assembled solid */
const cageMat = new THREE.LineBasicMaterial({
  color: 0x4a5c85,
  transparent: true,
  opacity: 0.7,
});
const cage = new THREE.LineSegments(new THREE.EdgesGeometry(SRC), cageMat);
group.add(cage);

/* Ember glow sprite */
function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const x = c.getContext("2d");
  const grd = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(255,150,60,0.9)");
  grd.addColorStop(0.35, "rgba(220,80,20,0.4)");
  grd.addColorStop(1, "rgba(220,80,20,0)");
  x.fillStyle = grd;
  x.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}
const glow = new THREE.Sprite(
  new THREE.SpriteMaterial({
    map: glowTexture(),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }),
);
glow.scale.set(4, 4, 1);
group.add(glow);

/* Depth particles + drifting speed lines */
const starGeo = new THREE.BufferGeometry();
const sp = [];
for (let i = 0; i < 200; i++) sp.push(rnd(-18, 18), rnd(-12, 12), rnd(-9, 2));
starGeo.setAttribute(
  "position",
  new THREE.BufferAttribute(new Float32Array(sp), 3),
);
const stars = new THREE.Points(
  starGeo,
  new THREE.PointsMaterial({
    color: 0x33446a,
    size: 0.05,
    transparent: true,
    opacity: 0.7,
  }),
);
scene.add(stars);

const lineG = new THREE.Group();
scene.add(lineG);
for (let i = 0; i < 16; i++) {
  const a = new THREE.Vector3(rnd(-16, 16), rnd(-10, 10), rnd(-6, 0));
  const b = a
    .clone()
    .add(new THREE.Vector3(rnd(-7, 7), rnd(-7, 7), rnd(-2, 2)));
  const lg = new THREE.BufferGeometry().setFromPoints([a, b]);
  lineG.add(
    new THREE.Line(
      lg,
      new THREE.LineBasicMaterial({
        color: 0x1c2435,
        transparent: true,
        opacity: rnd(0.12, 0.38),
      }),
    ),
  );
}

/* Camera / group keyframes across full scroll progress */
const KF = [
  { s: 0.0, gx: 1.6, gy: 0.0, cz: 7.0, cy: 0.0, rot: 0.0 },
  { s: 0.2, gx: 0.0, gy: 0.0, cz: 5.0, cy: -0.3, rot: 0.7 },
  { s: 0.36, gx: 2.1, gy: 0.2, cz: 6.4, cy: 0.2, rot: 1.2 },
  { s: 0.52, gx: 0.0, gy: 0.0, cz: 8.5, cy: 0.0, rot: 1.7 },
  { s: 0.68, gx: 2.3, gy: -0.2, cz: 6.8, cy: 0.1, rot: 2.2 },
  { s: 0.84, gx: -2.2, gy: 0.2, cz: 6.2, cy: 0.0, rot: 2.7 },
  { s: 1.0, gx: 0.0, gy: 0.0, cz: 5.2, cy: 0.0, rot: 3.2 },
];

function sampleKF(s) {
  let a = KF[0],
    b = KF[KF.length - 1];
  for (let i = 0; i < KF.length - 1; i++) {
    if (s >= KF[i].s && s <= KF[i + 1].s) {
      a = KF[i];
      b = KF[i + 1];
      break;
    }
  }
  const t = smooth((s - a.s) / (b.s - a.s || 1));
  const L = (k) => a[k] + (b[k] - a[k]) * t;
  return { gx: L("gx"), gy: L("gy"), cz: L("cz"), cy: L("cy"), rot: L("rot") };
}

let pointerX = 0,
  pointerY = 0,
  camX = 0,
  camY = 0;
window.addEventListener("mousemove", (e) => {
  pointerX = e.clientX / innerWidth - 0.5;
  pointerY = e.clientY / innerHeight - 0.5;
});

let fr = 0;
function render() {
  requestAnimationFrame(render);
  fr++;
  const t = REDUCE ? 0 : fr * 0.008;
  const s = scrollProg;

  const up = smooth(range(s, 0.1, 0.22));
  const down = smooth(range(s, 0.58, 0.92));
  const explode = clamp01(up - down);
  const ember = Math.sin(clamp01((s - 0.1) / 0.4) * Math.PI) * 0.9 * up;

  for (const m of shards) {
    const d = m.userData;
    const e = smooth(clamp01((explode - d.delay) / (1 - d.delay)));
    const wob = REDUCE ? 0 : Math.sin(t * 1.5 + d.dist) * 0.15 * e;
    m.position
      .copy(d.centroid)
      .add(d.dir.clone().multiplyScalar(e * d.dist + wob));
    m.rotation.x = d.rotAxis.x * e * d.rotAmt + t * 0.3 * e;
    m.rotation.y = d.rotAxis.y * e * d.rotAmt + t * 0.2 * e;
    m.rotation.z = d.rotAxis.z * e * d.rotAmt;
    if (d.ember) d.edgeMat.opacity = 0.4 + ember * 0.6;
  }
  cageMat.opacity = (0.7 - up * 0.6) * (1 - down * 0.4);
  glow.material.opacity = ember * 0.85;
  glow.scale.setScalar(2.5 + explode * 4);

  const k = sampleKF(s);
  group.position.x += (k.gx - group.position.x) * 0.08;
  group.position.y += (k.gy - group.position.y) * 0.08;
  group.rotation.y = t * 0.12 + k.rot;
  group.rotation.x = t * 0.06 + 0.1;
  group.scale.setScalar(1 - explode * 0.15);

  camera.position.z += (k.cz - camera.position.z) * 0.06;
  camera.position.y += (k.cy - camera.position.y) * 0.06;
  camX += (pointerX * 1.2 - camX) * 0.04;
  camY += (-pointerY * 0.8 - camY) * 0.04;
  camera.position.x = camX;
  camera.lookAt(group.position.x * 0.3, group.position.y * 0.3 + camY * 0.4, 0);

  lineG.rotation.z = t * 0.02;
  lineG.children.forEach((l, i) => {
    l.material.opacity = (0.1 + Math.sin(t + i) * 0.07) * (1 - up * 0.7);
  });
  stars.rotation.y = t * 0.01;

  renderer.render(scene, camera);
}
render();
