/* Hero globe: a dotted Earth (sampled from Natural Earth land data) with
   arcs from Mombasa to the other places I've worked. three.js via CDN. */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { feature } from 'https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/+esm';

const host = document.getElementById('globe');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const PLACES = [
  { id: 'msa', name: 'Mombasa', note: 'Home · A&F, EarthPulse, Fuel2Save', lat: -4.04, lon: 39.67, home: true },
  { id: 'nbo', name: 'Nairobi', note: 'A&F client work', lat: -1.29, lon: 36.82, quiet: true },
  { id: 'fih', name: 'Kinshasa', note: 'Chess academy · Aviny SARL', lat: -4.32, lon: 15.31, side: 'left' },
  { id: 'fru', name: 'Kyrgyzstan', note: 'GE Summer Programme', lat: 42.87, lon: 74.59 },
  { id: 'kbl', name: 'Afghanistan', note: 'AKAM internship · remote', lat: 34.53, lon: 69.17, side: 'left' },
];
const R = 1;
const DEG = Math.PI / 180;

function toVec(lat, lon, r = R) {
  const phi = (90 - lat) * DEG, theta = (lon + 180) * DEG;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

async function landMask() {
  const topo = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json').then((r) => r.json());
  const geo = feature(topo, topo.objects.land);
  const W = 1024, H = 512;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const g = cv.getContext('2d', { willReadFrequently: true });
  g.fillStyle = '#fff';
  const P = ([lon, lat]) => [((lon + 180) / 360) * W, ((90 - lat) / 180) * H];
  for (const f of geo.features) {
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const poly of polys) {
      g.beginPath();
      for (const ring of poly) {
        ring.forEach((pt, i) => { const [x, y] = P(pt); i ? g.lineTo(x, y) : g.moveTo(x, y); });
        g.closePath();
      }
      g.fill('evenodd');
    }
  }
  const data = g.getImageData(0, 0, W, H).data;
  return (lat, lon) => {
    const x = Math.min(W - 1, Math.max(0, Math.floor(((lon + 180) / 360) * W)));
    const y = Math.min(H - 1, Math.max(0, Math.floor(((90 - lat) / 180) * H)));
    return data[(y * W + x) * 4] > 128;
  };
}

function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  g.beginPath(); g.arc(32, 32, 28, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

async function init() {
  if (!host) return;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (e) {
    host.innerHTML = '<div class="globe-fallback"></div>';
    return;
  }
  const isLand = await landMask().catch(() => null);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 5.4);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  host.appendChild(renderer.domElement);

  const tilt = new THREE.Group();
  const spin = new THREE.Group();
  tilt.add(spin);
  scene.add(tilt);
  tilt.rotation.x = 14 * DEG;
  tilt.rotation.z = -8 * DEG;

  // occluding core so back-facing dots fade out
  spin.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 64, 64), new THREE.MeshBasicMaterial({ color: 0x131614 })));

  // thin rim
  const rim = new THREE.Mesh(
    new THREE.SphereGeometry(R * 1.06, 64, 64),
    new THREE.ShaderMaterial({
      transparent: true, side: THREE.BackSide, depthWrite: false,
      uniforms: { c: { value: new THREE.Color(0xff5a1f) } },
      vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: 'uniform vec3 c; varying vec3 vN; void main(){ float i = pow(max(0., .55 - dot(vN, vec3(0.,0.,-1.))), 4.0); gl_FragColor = vec4(c, i*.35); }',
    }),
  );
  tilt.add(rim);

  // land dots on a Fibonacci sphere
  const N = innerWidth < 700 ? 9000 : 16000;
  const pos = [], col = [];
  const cLand = new THREE.Color(0xf3f0e8), cAfrica = new THREE.Color(0xffb08a);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i;
    const x = Math.cos(th) * r, z = Math.sin(th) * r;
    const lat = Math.asin(y) / DEG;
    const lon = Math.atan2(-z, x) / DEG; // inverse of toVec
    const lonN = ((lon + 540) % 360) - 180;
    if (isLand && !isLand(lat, lonN)) continue;
    if (!isLand && Math.random() > 0.3) continue;
    const v = toVec(lat, lonN, R * 1.002);
    pos.push(v.x, v.y, v.z);
    const africa = lat < 37 && lat > -35 && lonN > -18 && lonN < 52;
    const c = africa ? cAfrica : cLand;
    col.push(c.r, c.g, c.b);
  }
  const dg = new THREE.BufferGeometry();
  dg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  dg.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  const dots = new THREE.Points(dg, new THREE.PointsMaterial({ size: 0.03, map: dotTexture(), vertexColors: true, transparent: true, opacity: 1, alphaTest: 0.3, sizeAttenuation: true }));
  spin.add(dots);

  // markers + arcs
  const home = PLACES.find((p) => p.home);
  const hv = toVec(home.lat, home.lon);
  const markers = [];
  const arcs = [];
  for (const p of PLACES) {
    const v = toVec(p.lat, p.lon, R * 1.004);
    const m = new THREE.Mesh(new THREE.SphereGeometry(p.home ? 0.022 : 0.016, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff5a1f }));
    m.position.copy(v);
    spin.add(m);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.02, 0.024, 40), new THREE.MeshBasicMaterial({ color: 0xff5a1f, transparent: true, side: THREE.DoubleSide }));
    ring.position.copy(v.clone().multiplyScalar(1.001));
    ring.lookAt(v.clone().multiplyScalar(2));
    spin.add(ring);
    const label = document.createElement('div');
    label.className = 'pin' + (p.side === 'left' ? ' left' : '');
    label.innerHTML = '<b></b><span></span>';
    label.querySelector('b').textContent = p.name;
    label.querySelector('span').textContent = p.note;
    host.appendChild(label);
    markers.push({ p, v, ring, label, phase: Math.random() * 3 });

    if (!p.home) {
      const b = toVec(p.lat, p.lon);
      const mid = hv.clone().add(b).multiplyScalar(0.5);
      const lift = 1 + hv.distanceTo(b) * 0.55;
      mid.normalize().multiplyScalar(lift);
      const curve = new THREE.QuadraticBezierCurve3(hv.clone().multiplyScalar(1.004), mid, b.clone().multiplyScalar(1.004));
      const pts = curve.getPoints(90);
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0xff5a1f, transparent: true, opacity: 0.9 }));
      spin.add(line);
      arcs.push({ g, n: pts.length, off: arcs.length * 0.22 });
    }
  }

  // face the Indian Ocean side: Africa and Central Asia both visible
  const faceLon = 44;
  let rotY = -Math.PI / 2 - faceLon * DEG;
  let vel = 0, dragging = false, lastX = 0;
  spin.rotation.y = rotY;

  host.addEventListener('pointerdown', (e) => { dragging = true; lastX = e.clientX; vel = 0; host.setPointerCapture(e.pointerId); });
  host.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX;
    vel = dx * 0.005; rotY += vel;
  });
  const end = () => { dragging = false; };
  host.addEventListener('pointerup', end);
  host.addEventListener('pointercancel', end);

  // gentle parallax with the pointer
  let tx = 0, ty = 0;
  addEventListener('pointermove', (e) => { tx = (e.clientY / innerHeight - 0.5) * 0.12; ty = (e.clientX / innerWidth - 0.5) * 0.12; }, { passive: true });

  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(host);
  resize();

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(host);

  let last = performance.now(), t = 0;
  const tmp = new THREE.Vector3(), camDir = new THREE.Vector3();
  const idle = -0.0009;
  let intro = 0;

  function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) { last = performance.now(); return; }
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;
    intro = Math.min(1, intro + dt * 0.7);
    const ease = 1 - Math.pow(1 - intro, 3);

    if (!dragging) {
      vel *= 0.94;
      rotY += vel + (reduce ? 0 : idle);
    }
    spin.rotation.y = rotY + (1 - ease) * 1.4;
    tilt.rotation.x += (14 * DEG + tx - tilt.rotation.x) * 0.05;
    tilt.rotation.z += (-8 * DEG + ty * 0.3 - tilt.rotation.z) * 0.05;
    tilt.scale.setScalar(0.86 + ease * 0.14);

    // arcs draw on, hold, redraw
    for (const a of arcs) {
      const cyc = ((t * 0.28 + a.off) % 1.6) / 1.6;
      const grow = Math.min(1, cyc * 2.2);
      a.g.setDrawRange(0, Math.floor(a.n * grow));
    }

    camera.getWorldDirection(camDir);
    const w = host.clientWidth, h = host.clientHeight;
    for (const m of markers) {
      const s = 1 + ((t * 0.9 + m.phase) % 1) * 1.6;
      m.ring.scale.setScalar(s);
      m.ring.material.opacity = 1 - (s - 1) / 1.6;
      tmp.copy(m.v).applyMatrix4(spin.matrixWorld);
      const facing = tmp.clone().normalize().dot(camDir.clone().negate());
      tmp.project(camera);
      const x = (tmp.x * 0.5 + 0.5) * w, y = (-tmp.y * 0.5 + 0.5) * h;
      m.label.style.transform = m.p.side === 'left'
        ? 'translate(calc(' + (x - 16).toFixed(1) + 'px - 100%),' + (y - 12).toFixed(1) + 'px)'
        : 'translate(' + (x + 16).toFixed(1) + 'px,' + (y - 12).toFixed(1) + 'px)';
      m.label.style.opacity = !m.p.quiet && facing > 0.25 && ease > 0.9 ? Math.min(1, (facing - 0.25) * 4) : 0;
    }
    renderer.render(scene, camera);
  }
  frame();
}

init();
