/* Animated line-wave WebGL background (used on the splash/index page). */
(function () {
  "use strict";
  var container = document.getElementById("bg-canvas");
  if (!container || typeof THREE === "undefined") return;

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  var vertexShader = "precision highp float;\n" +
    "void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }";

  var fragmentShader = [
    "precision highp float;",
    "uniform float iTime;",
    "uniform vec3 iResolution;",
    "uniform vec2 iMouse;",
    "uniform vec2 parallaxOffset;",
    "uniform float bendInfluence;",
    "uniform vec3 lineGradient[8];",
    "mat2 rotate(float r){ return mat2(cos(r), sin(r), -sin(r), cos(r)); }",
    "vec3 getLineColor(float t){",
    "  float scaled = clamp(t, 0.0, 0.9999) * 5.0;",
    "  int idx = int(floor(scaled));",
    "  float f = fract(scaled);",
    "  vec3 c1 = lineGradient[idx];",
    "  vec3 c2 = lineGradient[idx + 1];",
    "  return mix(c1, c2, f) * 0.5;",
    "}",
    "float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv){",
    "  float t = iTime * 1.0;",
    "  float y = sin(uv.x + offset + t * 0.1) * (sin(offset + t * 0.2) * 0.3);",
    "  vec2 d = screenUv - mouseUv;",
    "  float influence = exp(-dot(d, d) * 5.0);",
    "  y += (mouseUv.y - screenUv.y) * influence * -0.5 * bendInfluence;",
    "  return 0.0175 / max(abs(uv.y - y) + 0.01, 1e-3) + 0.01;",
    "}",
    "void main(){",
    "  vec2 baseUv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;",
    "  baseUv.y *= -1.0;",
    "  baseUv += parallaxOffset;",
    "  vec3 col = vec3(0.0);",
    "  vec2 mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;",
    "  mouseUv.y *= -1.0;",
    "  for (int i = 0; i < 6; i++) {",
    "    float t = float(i) / 5.0;",
    "    vec3 lineCol = getLineColor(t);",
    "    float angle = 0.2 * log(length(baseUv) + 1.0);",
    "    vec2 ruv = baseUv * rotate(angle);",
    "    col += lineCol * wave(ruv + vec2(0.05 * float(i), 0.0), 2.0 + 0.15 * float(i), baseUv, mouseUv);",
    "  }",
    "  gl_FragColor = vec4(col, 1.0);",
    "}"
  ].join("\n");

  var uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3() },
    iMouse: { value: new THREE.Vector2(-1000, -1000) },
    parallaxOffset: { value: new THREE.Vector2(0, 0) },
    bendInfluence: { value: 0 },
    lineGradient: {
      value: [
        new THREE.Vector3(124 / 255, 92 / 255, 255 / 255),
        new THREE.Vector3(51 / 255, 214 / 255, 255 / 255),
        new THREE.Vector3(255 / 255, 95 / 255, 162 / 255),
        new THREE.Vector3(124 / 255, 92 / 255, 255 / 255),
        new THREE.Vector3(51 / 255, 214 / 255, 255 / 255),
        new THREE.Vector3(255 / 255, 95 / 255, 162 / 255)
      ]
    }
  };

  var material = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vertexShader, fragmentShader: fragmentShader });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

  var targetMouse = new THREE.Vector2();
  var currentMouse = new THREE.Vector2();
  var targetInfluence = 0;
  var currentInfluence = 0;

  function moveHandler(e) {
    var x = e.touches ? e.touches[0].clientX : e.clientX;
    var y = e.touches ? e.touches[0].clientY : e.clientY;
    targetMouse.set(x, window.innerHeight - y);
    targetInfluence = 1.0;
    uniforms.parallaxOffset.value.set(
      ((x - window.innerWidth / 2) / window.innerWidth) * 0.1,
      -((y - window.innerHeight / 2) / window.innerHeight) * 0.1
    );
  }
  window.addEventListener("pointermove", moveHandler);
  window.addEventListener("touchmove", moveHandler);
  window.addEventListener("pointerleave", function () { targetInfluence = 0; });

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1);
  }
  window.addEventListener("resize", resize);
  resize();

  var clock = new THREE.Clock();
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animate() {
    uniforms.iTime.value = clock.getElapsedTime();
    currentMouse.lerp(targetMouse, 0.05);
    uniforms.iMouse.value.copy(currentMouse);
    currentInfluence += (targetInfluence - currentInfluence) * 0.05;
    uniforms.bendInfluence.value = currentInfluence;
    renderer.render(scene, camera);
    if (!reduceMotion) requestAnimationFrame(animate);
  }
  animate();
})();
