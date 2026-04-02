import * as THREE from "three";

const portalVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const portalFragmentShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform float opacity;
  uniform vec3 uInnerColor;
  uniform vec3 uOuterColor;

  varying vec2 vUv;

  float hash(vec2 point) {
    return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 centered = vUv - 0.5;
    float dist = length(centered) * 2.0;
    float angle = atan(centered.y, centered.x);

    float ring = smoothstep(1.04, 0.18, dist);
    float core = smoothstep(0.7, 0.0, dist);
    float swirl = sin(angle * 8.0 - uTime * 1.6 + uProgress * 3.5) * 0.5 + 0.5;
    float pulse = sin(uTime * 2.1 + dist * 12.0 - uProgress * 2.5) * 0.5 + 0.5;
    float spark = hash(vUv * 18.0 + uTime * 0.05) * 0.18;

    vec3 color = mix(uOuterColor, uInnerColor, core + swirl * 0.25);
    float alpha = (ring * 0.6 + core * 0.45 + pulse * 0.14 + spark) * opacity;

    if (alpha < 0.01) discard;

    gl_FragColor = vec4(color, alpha);
  }
`;

const glowVertexShader = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const glowFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uPower;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(viewDirection, normalize(vNormal)), 0.0), uPower);
    gl_FragColor = vec4(uColor, fresnel * uOpacity);
  }
`;

export function createPortalMaterial({ innerColor, outerColor }) {
  // Radial portal shader used for the intro gateway and its animated pulse.
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      opacity: { value: 1 },
      uInnerColor: { value: new THREE.Color(innerColor) },
      uOuterColor: { value: new THREE.Color(outerColor) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    vertexShader: portalVertexShader,
    fragmentShader: portalFragmentShader,
  });
}

export function createGlowMaterial({ color, opacity = 0.32, power = 2.2 }) {
  // Fresnel-style glow shell used on the portal, orbit core, worlds, and ending orb.
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
      uPower: { value: power },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    vertexShader: glowVertexShader,
    fragmentShader: glowFragmentShader,
  });
}
