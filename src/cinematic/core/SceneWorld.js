import * as THREE from "three";
import { createGlowMaterial, createPortalMaterial } from "../shaders/glowMaterials";

const TAU = Math.PI * 2;
const INTRO_PARTICLES = 1800;
const PORTAL_DUST_PARTICLES = 560;
const FIGURE_PARTICLES = 2200;
const TUNNEL_TRAIL_PARTICLES = 320;
const TUNNEL_RING_COUNT = 56;

export class SceneWorld {
  constructor({ scene, cameraController }) {
    this.scene = scene;
    this.cameraController = cameraController;
    this.world = new THREE.Group();
    this.scene.add(this.world);

    this.state = {
      masterProgress: 0,
      portalTravel: 0,
      portalSwirl: 0,
      portalFade: 0,
      figurePresence: 0,
      humanMorph: 0,
      humanDissolve: 0,
      orbitReveal: 0,
      orbitTravel: 0,
      worldsReveal: 0,
      worldsDrift: 0,
      tunnelReveal: 0,
      tunnelTravel: 0,
      endingCalm: 0,
    };

    this.backgroundBase = new THREE.Color("#02040b");
    this.backgroundTunnel = new THREE.Color("#071627");
    this.backgroundEnd = new THREE.Color("#08111d");
    this.backgroundColor = this.backgroundBase.clone();

    this.tempObject = new THREE.Object3D();
    this.tempVector = new THREE.Vector3();
    this.tempTangent = new THREE.Vector3();
    this.forwardAxis = new THREE.Vector3(0, 0, 1);

    this.scene.background = this.backgroundColor;
    this.scene.fog = new THREE.FogExp2(this.backgroundColor, 0.0114);

    this.createLights();
    this.createIntro();
    this.createFigure();
    this.createOrbitSystem();
    this.createProjectWorlds();
    this.createTunnel();
    this.createEnding();
  }

  createLights() {
    this.ambientLight = new THREE.AmbientLight("#91a7ff", 0.62);
    this.directionalLight = new THREE.DirectionalLight("#ffffff", 1.55);
    this.directionalLight.position.set(10, 12, 18);
    this.hemisphereLight = new THREE.HemisphereLight("#91b6ff", "#06080f", 0.58);
    this.portalLight = new THREE.PointLight("#48d6ff", 42, 42, 2);
    this.portalLight.position.set(0, 0, 4);

    this.fillLight = new THREE.PointLight("#8d65ff", 18, 120, 2);
    this.fillLight.position.set(-8, 10, -66);

    this.endLight = new THREE.PointLight("#a3ecff", 14, 55, 2);
    this.endLight.position.set(0, 5, -198);

    this.world.add(
      this.ambientLight,
      this.directionalLight,
      this.hemisphereLight,
      this.portalLight,
      this.fillLight,
      this.endLight,
    );
  }

  createIntro() {
    // Scene 1: deep-space particles and a glowing portal that pulls the camera inward.
    this.introGroup = new THREE.Group();
    this.world.add(this.introGroup);

    const portalGroup = new THREE.Group();
    const portalRing = new THREE.Mesh(
      new THREE.TorusGeometry(4.65, 0.24, 16, 96),
      new THREE.MeshStandardMaterial({
        color: "#88f4ff",
        emissive: "#3ae1ff",
        emissiveIntensity: 1.9,
        roughness: 0.18,
        metalness: 0.12,
      }),
    );
    const portalHaloRing = new THREE.Mesh(
      new THREE.TorusGeometry(5.2, 0.06, 8, 96),
      new THREE.MeshBasicMaterial({
        color: "#8b63ff",
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    portalHaloRing.rotation.x = Math.PI * 0.15;

    const portalCore = new THREE.Mesh(
      new THREE.CircleGeometry(4.08, 96),
      createPortalMaterial({
        innerColor: "#9ffeff",
        outerColor: "#4968ff",
      }),
    );
    portalCore.position.z = -0.02;

    const portalAura = new THREE.Mesh(
      new THREE.SphereGeometry(5.4, 32, 32),
      createGlowMaterial({
        color: "#6adfff",
        opacity: 0.32,
        power: 2.1,
      }),
    );

    portalGroup.add(portalRing, portalHaloRing, portalCore, portalAura);
    this.introGroup.add(portalGroup);

    this.portal = {
      group: portalGroup,
      ring: portalRing,
      halo: portalHaloRing,
      core: portalCore,
      aura: portalAura,
    };

    const introPositions = new Float32Array(INTRO_PARTICLES * 3);
    const introBase = new Float32Array(INTRO_PARTICLES * 3);
    const introColors = new Float32Array(INTRO_PARTICLES * 3);
    const introSeeds = new Float32Array(INTRO_PARTICLES);

    for (let index = 0; index < INTRO_PARTICLES; index += 1) {
      const stride = index * 3;
      const angle = Math.random() * TAU;
      const radius = 7 + Math.pow(Math.random(), 0.6) * 22;
      const height = (Math.random() - 0.5) * (8 + Math.random() * 18);
      const depth = 36 - Math.random() * 258;
      const wave = Math.sin(depth * 0.06 + angle * 2.2) * 1.4;

      introBase[stride] = Math.cos(angle) * radius + wave;
      introBase[stride + 1] = Math.sin(angle) * radius * 0.65 + height;
      introBase[stride + 2] = depth;

      introPositions[stride] = introBase[stride];
      introPositions[stride + 1] = introBase[stride + 1];
      introPositions[stride + 2] = introBase[stride + 2];

      const tint = Math.random();
      const color = new THREE.Color().setRGB(
        0.48 + tint * 0.26,
        0.7 + tint * 0.2,
        1,
      );
      introColors[stride] = color.r;
      introColors[stride + 1] = color.g;
      introColors[stride + 2] = color.b;
      introSeeds[index] = Math.random();
    }

    const introGeometry = new THREE.BufferGeometry();
    introGeometry.setAttribute("position", new THREE.BufferAttribute(introPositions, 3));
    introGeometry.setAttribute("color", new THREE.BufferAttribute(introColors, 3));

    this.introParticles = new THREE.Points(
      introGeometry,
      new THREE.PointsMaterial({
        size: 0.12,
        transparent: true,
        opacity: 0.58,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    );
    this.introParticles.frustumCulled = false;
    this.introGroup.add(this.introParticles);

    this.introParticleData = {
      positions: introPositions,
      base: introBase,
      seeds: introSeeds,
    };

    const dustPositions = new Float32Array(PORTAL_DUST_PARTICLES * 3);
    const dustBase = new Float32Array(PORTAL_DUST_PARTICLES * 3);
    const dustSeeds = new Float32Array(PORTAL_DUST_PARTICLES);
    const dustRadii = new Float32Array(PORTAL_DUST_PARTICLES);

    for (let index = 0; index < PORTAL_DUST_PARTICLES; index += 1) {
      const stride = index * 3;
      const angle = Math.random() * TAU;
      const radius = 4.8 + Math.random() * 6.5;
      const depth = (Math.random() - 0.5) * 9;

      dustBase[stride] = Math.cos(angle) * radius;
      dustBase[stride + 1] = Math.sin(angle) * radius * 0.85;
      dustBase[stride + 2] = depth;

      dustPositions[stride] = dustBase[stride];
      dustPositions[stride + 1] = dustBase[stride + 1];
      dustPositions[stride + 2] = dustBase[stride + 2];
      dustSeeds[index] = Math.random();
      dustRadii[index] = radius;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    this.portalDust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({
        color: "#a4f8ff",
        size: 0.18,
        transparent: true,
        opacity: 0.62,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    );
    this.portalDust.frustumCulled = false;
    this.introGroup.add(this.portalDust);

    this.portalDustData = {
      positions: dustPositions,
      base: dustBase,
      seeds: dustSeeds,
      radii: dustRadii,
    };
  }

  createFigure() {
    // Scene 2: particles assemble into an abstract human silhouette, then later dissolve.
    this.figureGroup = new THREE.Group();
    this.figureGroup.position.set(0, -2, -28);
    this.world.add(this.figureGroup);

    const positions = new Float32Array(FIGURE_PARTICLES * 3);
    const scatter = new Float32Array(FIGURE_PARTICLES * 3);
    const form = new Float32Array(FIGURE_PARTICLES * 3);
    const dissolve = new Float32Array(FIGURE_PARTICLES * 3);
    const colors = new Float32Array(FIGURE_PARTICLES * 3);
    const seeds = new Float32Array(FIGURE_PARTICLES);

    for (let index = 0; index < FIGURE_PARTICLES; index += 1) {
      const stride = index * 3;

      const scatterPosition = randomSpherePoint(8.8);
      const formPosition = createHumanFormPoint();
      const dissolvePosition = randomSpherePoint(11 + Math.random() * 4);
      dissolvePosition.y *= 0.85;
      dissolvePosition.x += formPosition.x * 0.3;

      scatter[stride] = scatterPosition.x;
      scatter[stride + 1] = scatterPosition.y;
      scatter[stride + 2] = scatterPosition.z;

      form[stride] = formPosition.x;
      form[stride + 1] = formPosition.y;
      form[stride + 2] = formPosition.z;

      dissolve[stride] = dissolvePosition.x;
      dissolve[stride + 1] = dissolvePosition.y;
      dissolve[stride + 2] = dissolvePosition.z;

      positions[stride] = scatterPosition.x;
      positions[stride + 1] = scatterPosition.y;
      positions[stride + 2] = scatterPosition.z;

      const bodyBlend = THREE.MathUtils.clamp((formPosition.y + 6) / 14, 0, 1);
      const color = new THREE.Color().lerpColors(
        new THREE.Color("#5be0ff"),
        new THREE.Color("#d2b0ff"),
        bodyBlend,
      );
      color.offsetHSL((Math.random() - 0.5) * 0.03, 0.1, 0.04);
      colors[stride] = color.r;
      colors[stride + 1] = color.g;
      colors[stride + 2] = color.b;
      seeds[index] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    this.figurePoints = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 0.15,
        transparent: true,
        opacity: 0.72,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    );
    this.figurePoints.frustumCulled = false;
    this.figureGroup.add(this.figurePoints);

    this.figureAura = new THREE.Mesh(
      new THREE.SphereGeometry(5.8, 32, 32),
      createGlowMaterial({
        color: "#7beaff",
        opacity: 0.16,
        power: 2.35,
      }),
    );
    this.figureAura.position.set(0, 2.1, 0);
    this.figureGroup.add(this.figureAura);

    this.figureData = {
      positions,
      scatter,
      form,
      dissolve,
      seeds,
    };
  }

  createOrbitSystem() {
    // Scene 3: a central orb with layered orbital bands and instanced satellites.
    this.orbitGroup = new THREE.Group();
    this.orbitGroup.position.set(0, 0, -72);
    this.world.add(this.orbitGroup);

    this.orbitCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(3.8, 1),
      new THREE.MeshStandardMaterial({
        color: "#14243e",
        emissive: "#46d7ff",
        emissiveIntensity: 0.9,
        roughness: 0.28,
        metalness: 0.14,
      }),
    );
    this.orbitGlow = new THREE.Mesh(
      new THREE.SphereGeometry(5.2, 28, 28),
      createGlowMaterial({
        color: "#5ad6ff",
        opacity: 0.22,
        power: 2.2,
      }),
    );
    this.orbitGroup.add(this.orbitCore, this.orbitGlow);

    this.orbitBands = [];
    const orbitBandConfigs = [
      { radius: 6.5, tiltX: 0.3, tiltZ: 0.15, color: "#7de4ff" },
      { radius: 8.9, tiltX: -0.6, tiltZ: 0.35, color: "#8b66ff" },
      { radius: 11.1, tiltX: 0.9, tiltZ: -0.2, color: "#b4f3ff" },
    ];

    orbitBandConfigs.forEach((config) => {
      const band = new THREE.Mesh(
        new THREE.RingGeometry(config.radius - 0.045, config.radius + 0.045, 160),
        new THREE.MeshBasicMaterial({
          color: config.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.14,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      band.rotation.set(config.tiltX, 0, config.tiltZ);
      this.orbitBands.push(band);
      this.orbitGroup.add(band);
    });

    this.orbiterMesh = new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(0.62, 0),
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        emissive: "#8cf3ff",
        emissiveIntensity: 1.05,
        roughness: 0.3,
        metalness: 0.2,
      }),
      12,
    );
    this.orbiterMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    this.orbiterData = Array.from({ length: 12 }, (_, index) => {
      const radius = 6 + (index % 4) * 1.8 + Math.random() * 0.6;
      const speed = 0.25 + Math.random() * 0.45;
      const scale = 0.55 + Math.random() * 0.7;
      const vertical = 0.8 + Math.random() * 1.6;
      const tiltX = -0.9 + Math.random() * 1.8;
      const tiltZ = -0.7 + Math.random() * 1.4;
      const phase = Math.random() * TAU;
      const color = new THREE.Color().setHSL(0.53 + Math.random() * 0.14, 0.85, 0.72);
      this.orbiterMesh.setColorAt(index, color);

      return {
        radius,
        speed,
        scale,
        vertical,
        tiltX,
        tiltZ,
        phase,
      };
    });
    this.orbitGroup.add(this.orbiterMesh);
  }

  createProjectWorlds() {
    // Scene 4: floating "project worlds" built from compact planets, rings, and satellites.
    this.projectWorldGroup = new THREE.Group();
    this.projectWorldGroup.position.set(0, 0, -118);
    this.world.add(this.projectWorldGroup);

    this.projectWorlds = [];

    [
      { position: [-8.4, 4.2, 0], radius: 2.4, color: "#63ebff", glow: "#56ccff" },
      { position: [7.4, 1.9, -5.5], radius: 2.1, color: "#8f71ff", glow: "#a791ff" },
      { position: [-6.2, -3.5, -10.8], radius: 1.8, color: "#c5f6ff", glow: "#9fe9ff" },
      { position: [8.8, -4.4, -16.2], radius: 2.7, color: "#ffab72", glow: "#ff8d53" },
      { position: [-0.6, 5.4, -21.8], radius: 2.2, color: "#67ffd8", glow: "#56f3ff" },
    ].forEach((config, index) => {
      const group = new THREE.Group();
      group.position.set(...config.position);

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(config.radius, 1),
        new THREE.MeshStandardMaterial({
          color: config.color,
          emissive: config.color,
          emissiveIntensity: 0.38,
          roughness: 0.52,
          metalness: 0.1,
        }),
      );

      const shell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(config.radius * 1.1, 0),
        new THREE.MeshBasicMaterial({
          color: "#d9f8ff",
          wireframe: true,
          transparent: true,
          opacity: 0.08,
          depthWrite: false,
        }),
      );

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(config.radius * 1.42, 0.055, 8, 72),
        new THREE.MeshBasicMaterial({
          color: config.glow,
          transparent: true,
          opacity: 0.28,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      ring.rotation.set(Math.random() * 1.6, Math.random() * 0.8, Math.random() * 1.6);

      const aura = new THREE.Mesh(
        new THREE.SphereGeometry(config.radius * 1.55, 24, 24),
        createGlowMaterial({
          color: config.glow,
          opacity: 0.18,
          power: 2.45,
        }),
      );

      const satellitePivot = new THREE.Group();
      const satellite = new THREE.Mesh(
        new THREE.SphereGeometry(config.radius * 0.18, 10, 10),
        new THREE.MeshBasicMaterial({
          color: "#f4ffff",
          transparent: true,
          opacity: 0.68,
          blending: THREE.AdditiveBlending,
        }),
      );
      satellite.position.set(config.radius * 2.1, 0, 0);
      satellitePivot.rotation.x = Math.random() * 1.6;
      satellitePivot.rotation.y = Math.random() * 1.2;
      satellitePivot.add(satellite);

      group.add(core, shell, ring, aura, satellitePivot);
      this.projectWorldGroup.add(group);

      this.projectWorlds.push({
        group,
        core,
        shell,
        ring,
        aura,
        satellitePivot,
        basePosition: new THREE.Vector3(...config.position),
        floatOffset: index * 1.7 + Math.random() * 0.6,
        rotationSpeed: 0.2 + Math.random() * 0.35,
      });
    });
  }

  createTunnel() {
    // Scene 5: a glowing path and tunnel structure that the camera can blend onto.
    this.tunnelCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, -138),
      new THREE.Vector3(3.4, 2.2, -146),
      new THREE.Vector3(-2.4, 3.1, -154),
      new THREE.Vector3(-5.1, -1.8, -163),
      new THREE.Vector3(0.8, -4.4, -173),
      new THREE.Vector3(0, -1.2, -184),
    ]);
    this.cameraController.setPath(this.tunnelCurve);

    this.tunnelGroup = new THREE.Group();
    this.world.add(this.tunnelGroup);

    this.tunnelTube = new THREE.Mesh(
      new THREE.TubeGeometry(this.tunnelCurve, 180, 1.55, 10, false),
      new THREE.MeshBasicMaterial({
        color: "#59dbff",
        wireframe: true,
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    this.tunnelGroup.add(this.tunnelTube);

    this.tunnelLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(this.tunnelCurve.getPoints(240)),
      new THREE.LineBasicMaterial({
        color: "#b6fbff",
        transparent: true,
        opacity: 0.34,
      }),
    );
    this.tunnelGroup.add(this.tunnelLine);

    this.tunnelRings = new THREE.InstancedMesh(
      new THREE.TorusGeometry(2.2, 0.055, 8, 48),
      new THREE.MeshBasicMaterial({
        color: "#8deeff",
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
      TUNNEL_RING_COUNT,
    );
    this.tunnelRings.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.tunnelGroup.add(this.tunnelRings);

    this.tunnelRingOffsets = Array.from({ length: TUNNEL_RING_COUNT }, (_, index) => index / TUNNEL_RING_COUNT);

    const trailPositions = new Float32Array(TUNNEL_TRAIL_PARTICLES * 3);
    const trailSeeds = new Float32Array(TUNNEL_TRAIL_PARTICLES);
    const trailOffsets = new Float32Array(TUNNEL_TRAIL_PARTICLES);

    for (let index = 0; index < TUNNEL_TRAIL_PARTICLES; index += 1) {
      trailSeeds[index] = Math.random() * TAU;
      trailOffsets[index] = Math.random();
    }

    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));

    this.tunnelTrails = new THREE.Points(
      trailGeometry,
      new THREE.PointsMaterial({
        color: "#e6ffff",
        size: 0.1,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    this.tunnelTrails.frustumCulled = false;
    this.tunnelGroup.add(this.tunnelTrails);

    this.tunnelTrailData = {
      positions: trailPositions,
      seeds: trailSeeds,
      offsets: trailOffsets,
    };
  }

  createEnding() {
    // Scene 6: a calmer endpoint with softer light and slowly fading particles.
    this.endingGroup = new THREE.Group();
    this.endingGroup.position.set(0, -0.4, -202);
    this.world.add(this.endingGroup);

    this.endingCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(4.6, 1),
      new THREE.MeshStandardMaterial({
        color: "#12212d",
        emissive: "#9eeeff",
        emissiveIntensity: 0.28,
        roughness: 0.72,
        metalness: 0.08,
      }),
    );
    this.endingAura = new THREE.Mesh(
      new THREE.SphereGeometry(7.2, 28, 28),
      createGlowMaterial({
        color: "#b7f8ff",
        opacity: 0.16,
        power: 2,
      }),
    );
    this.endingGroup.add(this.endingCore, this.endingAura);

    const endParticleCount = 520;
    const endPositions = new Float32Array(endParticleCount * 3);
    const endBase = new Float32Array(endParticleCount * 3);

    for (let index = 0; index < endParticleCount; index += 1) {
      const stride = index * 3;
      const point = randomSpherePoint(14 + Math.random() * 7);
      point.y *= 0.65;

      endBase[stride] = point.x;
      endBase[stride + 1] = point.y;
      endBase[stride + 2] = point.z;

      endPositions[stride] = point.x;
      endPositions[stride + 1] = point.y;
      endPositions[stride + 2] = point.z;
    }

    const endGeometry = new THREE.BufferGeometry();
    endGeometry.setAttribute("position", new THREE.BufferAttribute(endPositions, 3));

    this.endParticles = new THREE.Points(
      endGeometry,
      new THREE.PointsMaterial({
        color: "#d9feff",
        size: 0.16,
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    this.endParticles.frustumCulled = false;
    this.endingGroup.add(this.endParticles);

    this.endParticleData = {
      positions: endPositions,
      base: endBase,
    };
  }

  update(elapsed) {
    // Update visual state for every scene, then render from the shared camera rig.
    this.updateAtmosphere();
    this.updateIntro(elapsed);
    this.updateFigure(elapsed);
    this.updateOrbitSystem(elapsed);
    this.updateProjectWorlds(elapsed);
    this.updateTunnel(elapsed);
    this.updateEnding(elapsed);
  }

  updateAtmosphere() {
    const tunnelMix = this.state.tunnelReveal * 0.45;
    const endMix = this.state.endingCalm * 0.78;

    this.backgroundColor.copy(this.backgroundBase);
    this.backgroundColor.lerp(this.backgroundTunnel, tunnelMix);
    this.backgroundColor.lerp(this.backgroundEnd, endMix);

    this.scene.background.copy(this.backgroundColor);
    this.scene.fog.color.copy(this.backgroundColor);
    this.scene.fog.density = 0.0114 + this.state.tunnelReveal * 0.0032 - this.state.endingCalm * 0.0028;

    this.portalLight.intensity = 42 * (1 - this.state.portalFade) + 6;
    this.endLight.intensity = 14 + this.state.endingCalm * 18;
    this.fillLight.intensity = 16 + this.state.orbitReveal * 6 + this.state.tunnelReveal * 4;
    this.directionalLight.intensity = 1.1 + (1 - this.state.portalFade) * 0.42 + this.state.orbitReveal * 0.24;
  }

  updateIntro(elapsed) {
    this.portal.core.material.uniforms.uTime.value = elapsed;
    this.portal.core.material.uniforms.uProgress.value = this.state.portalTravel;

    const introOpacity = 1 - this.state.portalFade;
    this.portal.ring.material.emissiveIntensity = 1.1 + this.state.portalSwirl * 1.6;
    this.portal.halo.material.opacity = 0.24 + this.state.portalSwirl * 0.12;
    this.portal.core.material.uniforms.opacity.value = 0.85 * introOpacity;
    this.portal.aura.material.uniforms.uOpacity.value = 0.2 + this.state.portalSwirl * 0.1;

    this.portal.group.rotation.z = elapsed * 0.14;
    this.portal.ring.rotation.y = elapsed * 0.12;
    this.portal.halo.rotation.z = -elapsed * 0.16;

    const portalScale = 1 + this.state.portalSwirl * 0.12 + Math.sin(elapsed * 1.6) * 0.02;
    this.portal.group.scale.setScalar(portalScale);

    const introPositions = this.introParticleData.positions;
    const introBase = this.introParticleData.base;
    const introSeeds = this.introParticleData.seeds;

    for (let index = 0; index < INTRO_PARTICLES; index += 1) {
      const stride = index * 3;
      const baseX = introBase[stride];
      const baseY = introBase[stride + 1];
      const baseZ = introBase[stride + 2];
      const swirlRadius = Math.hypot(baseX, baseY);
      const portalInfluence = THREE.MathUtils.clamp(1 - Math.abs(baseZ) / 26, 0, 1);
      const swirlAngle = elapsed * (0.18 + introSeeds[index] * 0.65) + swirlRadius * 0.08;
      const swirlForce = this.state.portalSwirl * portalInfluence;

      introPositions[stride] =
        baseX * (1 - swirlForce * 0.5) +
        Math.cos(swirlAngle) * swirlRadius * swirlForce * 0.55;
      introPositions[stride + 1] =
        baseY * (1 - swirlForce * 0.38) +
        Math.sin(swirlAngle) * swirlRadius * swirlForce * 0.42;
      introPositions[stride + 2] =
        baseZ +
        Math.sin(elapsed + introSeeds[index] * 12) * 0.6 +
        this.state.portalTravel * portalInfluence * -9;
    }
    this.introParticles.geometry.attributes.position.needsUpdate = true;
    this.introParticles.material.opacity = 0.48 * introOpacity + 0.06;

    const dustPositions = this.portalDustData.positions;
    const dustBase = this.portalDustData.base;
    const dustSeeds = this.portalDustData.seeds;
    const dustRadii = this.portalDustData.radii;

    for (let index = 0; index < PORTAL_DUST_PARTICLES; index += 1) {
      const stride = index * 3;
      const angle = elapsed * (0.8 + dustSeeds[index] * 1.5) + dustSeeds[index] * TAU * 2;
      const radius = dustRadii[index] * (1 - this.state.portalTravel * 0.22);

      dustPositions[stride] = Math.cos(angle) * radius;
      dustPositions[stride + 1] =
        Math.sin(angle * 1.2) * radius * 0.8 + Math.sin(elapsed * 1.4 + index) * 0.12;
      dustPositions[stride + 2] = dustBase[stride + 2] - this.state.portalTravel * 7;
    }
    this.portalDust.geometry.attributes.position.needsUpdate = true;
    this.portalDust.material.opacity = 0.54 * introOpacity;
  }

  updateFigure(elapsed) {
    const morph = this.state.humanMorph;
    const dissolve = this.state.humanDissolve;
    const visibility = THREE.MathUtils.clamp(this.state.figurePresence + morph - dissolve * 0.35, 0, 1);
    const { positions, scatter, form, dissolve: dissolveTargets, seeds } = this.figureData;

    for (let index = 0; index < FIGURE_PARTICLES; index += 1) {
      const stride = index * 3;

      let x = THREE.MathUtils.lerp(scatter[stride], form[stride], morph);
      let y = THREE.MathUtils.lerp(scatter[stride + 1], form[stride + 1], morph);
      let z = THREE.MathUtils.lerp(scatter[stride + 2], form[stride + 2], morph);

      x = THREE.MathUtils.lerp(x, dissolveTargets[stride], dissolve);
      y = THREE.MathUtils.lerp(y, dissolveTargets[stride + 1], dissolve);
      z = THREE.MathUtils.lerp(z, dissolveTargets[stride + 2], dissolve);

      const shimmer = Math.sin(elapsed * 1.8 + seeds[index] * 12);
      positions[stride] = x + shimmer * 0.08 * visibility;
      positions[stride + 1] = y + Math.cos(elapsed * 1.5 + seeds[index] * 8) * 0.11 * visibility;
      positions[stride + 2] = z + shimmer * 0.06 * visibility;
    }

    this.figurePoints.geometry.attributes.position.needsUpdate = true;
    this.figurePoints.material.opacity = 0.06 + visibility * 0.62;

    this.figureGroup.rotation.y = elapsed * 0.2 * visibility;
    this.figureGroup.rotation.z = Math.sin(elapsed * 0.22) * 0.04 * visibility;
    this.figureGroup.position.y = -2 + Math.sin(elapsed * 0.72) * 0.32 * visibility;

    const auraOpacity = 0.05 + morph * 0.14 - dissolve * 0.08;
    this.figureAura.material.uniforms.uOpacity.value = Math.max(auraOpacity, 0);
    this.figureAura.scale.setScalar(0.9 + morph * 0.12 + Math.sin(elapsed * 1.1) * 0.015);
  }

  updateOrbitSystem(elapsed) {
    const reveal = this.state.orbitReveal;

    this.orbitGroup.scale.setScalar(0.74 + reveal * 0.26);
    this.orbitGroup.rotation.y = elapsed * 0.09 + this.state.orbitTravel * 0.38;
    this.orbitCore.rotation.x = elapsed * 0.22;
    this.orbitCore.rotation.y = elapsed * 0.34;
    this.orbitGlow.material.uniforms.uOpacity.value = 0.06 + reveal * 0.18;

    this.orbitBands.forEach((band, index) => {
      band.material.opacity = 0.04 + reveal * (0.08 + index * 0.04);
      band.rotation.y += 0.0007 + index * 0.00025;
    });

    this.orbiterData.forEach((orbiter, index) => {
      const angle = elapsed * orbiter.speed + orbiter.phase + this.state.orbitTravel * 1.6;
      const x = Math.cos(angle) * orbiter.radius;
      const y = Math.sin(angle * 1.35 + orbiter.phase) * orbiter.vertical;
      const z = Math.sin(angle) * orbiter.radius * 0.7;

      this.tempObject.position.set(x, y, z);
      this.tempObject.position.applyEuler(new THREE.Euler(orbiter.tiltX, 0, orbiter.tiltZ));
      this.tempObject.rotation.set(angle * 0.7, angle * 0.9, angle * 0.6);
      this.tempObject.scale.setScalar((0.5 + reveal * 0.5) * orbiter.scale);
      this.tempObject.updateMatrix();
      this.orbiterMesh.setMatrixAt(index, this.tempObject.matrix);
    });
    this.orbiterMesh.instanceMatrix.needsUpdate = true;
  }

  updateProjectWorlds(elapsed) {
    const reveal = this.state.worldsReveal;
    const drift = this.state.worldsDrift;

    this.projectWorlds.forEach((world, index) => {
      world.group.position.copy(world.basePosition);
      world.group.position.x += Math.sin(elapsed * 0.28 + world.floatOffset) * 0.34 * drift;
      world.group.position.y += Math.cos(elapsed * 0.42 + world.floatOffset) * 0.38 * reveal;
      world.group.position.z += Math.sin(elapsed * 0.18 + index) * 0.28 * drift;

      world.group.rotation.y = elapsed * world.rotationSpeed;
      world.group.rotation.z = Math.sin(elapsed * 0.24 + world.floatOffset) * 0.05;
      world.group.scale.setScalar(0.7 + reveal * 0.3);

      world.core.rotation.x += 0.004 * world.rotationSpeed;
      world.core.rotation.y += 0.006 * world.rotationSpeed;
      world.shell.rotation.y -= 0.0025;
      world.ring.rotation.z += 0.004;
      world.ring.material.opacity = 0.04 + reveal * 0.24;
      world.aura.material.uniforms.uOpacity.value = 0.05 + reveal * 0.12;

      world.satellitePivot.rotation.y = elapsed * (0.48 + index * 0.05);
      world.satellitePivot.rotation.z = elapsed * 0.14;
    });
  }

  updateTunnel(elapsed) {
    const reveal = this.state.tunnelReveal;
    const travel = this.state.tunnelTravel;

    this.tunnelTube.material.opacity = 0.03 + reveal * 0.12;
    this.tunnelLine.material.opacity = 0.06 + reveal * 0.34;
    this.tunnelRings.material.opacity = 0.05 + reveal * 0.16;
    this.tunnelTrails.material.opacity = 0.08 + reveal * 0.48;

    this.tunnelRingOffsets.forEach((offset, index) => {
      const progress = (offset + travel * 0.82 + elapsed * 0.015) % 1;
      this.tunnelCurve.getPointAt(progress, this.tempVector);
      this.tunnelCurve.getTangentAt(progress, this.tempTangent);

      this.tempObject.position.copy(this.tempVector);
      this.tempObject.quaternion.setFromUnitVectors(this.forwardAxis, this.tempTangent.normalize());
      this.tempObject.scale.setScalar(0.78 + reveal * 0.24 + Math.sin(elapsed * 1.6 + index) * 0.025);
      this.tempObject.updateMatrix();
      this.tunnelRings.setMatrixAt(index, this.tempObject.matrix);
    });
    this.tunnelRings.instanceMatrix.needsUpdate = true;

    const trailPositions = this.tunnelTrailData.positions;
    const trailSeeds = this.tunnelTrailData.seeds;
    const trailOffsets = this.tunnelTrailData.offsets;

    for (let index = 0; index < TUNNEL_TRAIL_PARTICLES; index += 1) {
      const stride = index * 3;
      const progress = (trailOffsets[index] + travel * 0.9 + elapsed * 0.03) % 1;
      const radius = 0.6 + ((index % 6) / 5) * 1.6;

      this.tunnelCurve.getPointAt(progress, this.tempVector);

      trailPositions[stride] =
        this.tempVector.x + Math.cos(trailSeeds[index] + elapsed * 0.8) * radius;
      trailPositions[stride + 1] =
        this.tempVector.y + Math.sin(trailSeeds[index] * 1.2 + elapsed * 0.8) * radius;
      trailPositions[stride + 2] = this.tempVector.z;
    }
    this.tunnelTrails.geometry.attributes.position.needsUpdate = true;
  }

  updateEnding(elapsed) {
    const calm = this.state.endingCalm;

    this.endingGroup.position.y = -0.4 + Math.sin(elapsed * 0.2) * 0.55 * (1 - calm * 0.7);
    this.endingCore.rotation.y = elapsed * 0.08 * (1 - calm * 0.55);
    this.endingAura.material.uniforms.uOpacity.value = 0.06 + calm * 0.12;
    this.endingAura.scale.setScalar(0.96 + calm * 0.16 + Math.sin(elapsed * 0.5) * 0.015);

    const endPositions = this.endParticleData.positions;
    const endBase = this.endParticleData.base;
    for (let index = 0; index < endBase.length; index += 3) {
      endPositions[index] = endBase[index] + Math.sin(elapsed * 0.35 + index) * 0.06;
      endPositions[index + 1] = endBase[index + 1] + Math.cos(elapsed * 0.28 + index) * 0.05;
      endPositions[index + 2] = endBase[index + 2];
    }

    this.endParticles.geometry.attributes.position.needsUpdate = true;
    this.endParticles.material.opacity = 0.28 - calm * 0.14;
  }

  destroy() {
    this.scene.remove(this.world);

    this.world.traverse((child) => {
      if (child.geometry) {
        child.geometry.dispose();
      }

      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }
}

function randomSpherePoint(radius) {
  const u = Math.random();
  const v = Math.random();
  const theta = TAU * u;
  const phi = Math.acos(2 * v - 1);
  const r = radius * Math.cbrt(Math.random());

  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function createHumanFormPoint() {
  const pick = Math.random();

  if (pick < 0.14) {
    const point = randomSpherePoint(1.05);
    point.y += 6.3;
    point.z *= 0.8;
    return point;
  }

  if (pick < 0.44) {
    const angle = Math.random() * TAU;
    const radius = Math.pow(Math.random(), 0.6) * 1.6;
    return new THREE.Vector3(
      Math.cos(angle) * radius * 0.85,
      1.6 + Math.random() * 4.4,
      Math.sin(angle) * radius * 0.55,
    );
  }

  if (pick < 0.59) {
    const angle = Math.random() * TAU;
    const radius = Math.random() * 1.45;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      0.2 + Math.random() * 1.3,
      Math.sin(angle) * radius * 0.65,
    );
  }

  if (pick < 0.78) {
    const side = Math.random() < 0.5 ? -1 : 1;
    const travel = Math.random();
    return new THREE.Vector3(
      side * (1.25 + travel * 2.5),
      4.9 - travel * 3.2 + (Math.random() - 0.5) * 0.25,
      (Math.random() - 0.5) * 0.9,
    );
  }

  const side = Math.random() < 0.5 ? -1 : 1;
  const travel = Math.random();
  return new THREE.Vector3(
    side * (0.55 + travel * 0.95),
    0.4 - travel * 5.6 + (Math.random() - 0.5) * 0.25,
    (Math.random() - 0.5) * 0.85,
  );
}
