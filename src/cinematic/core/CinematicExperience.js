import * as THREE from "three";
import { CameraController } from "./CameraController";
import { SceneWorld } from "./SceneWorld";
import { ScrollController } from "./ScrollController";

export class CinematicExperience {
  constructor({ mountNode, scrollTrack }) {
    // Central runtime that owns the renderer, camera, scene graph, and RAF loop.
    this.mountNode = mountNode;
    this.scrollTrack = scrollTrack;
    this.elapsed = 0;
    this.frameId = 0;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 320);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.domElement.className = "cinema-canvas";
    this.renderer.domElement.dataset.cinematicCanvas = "true";
    this.renderer.domElement.setAttribute("aria-hidden", "true");
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.02;
    this.renderer.setClearColor("#02040b", 1);

    this.mountCanvas();

    this.clock = new THREE.Clock();

    this.cameraController = new CameraController(this.camera);
    this.sceneWorld = new SceneWorld({
      scene: this.scene,
      cameraController: this.cameraController,
    });
    this.scrollController = new ScrollController({
      scrollTrack: this.scrollTrack,
      cameraController: this.cameraController,
      sceneWorld: this.sceneWorld,
    });

    this.handleResize = this.handleResize.bind(this);
    this.tick = this.tick.bind(this);

    window.addEventListener("resize", this.handleResize);

    this.handleResize();
    this.cameraController.update(0);
    this.renderer.render(this.scene, this.camera);
    this.tick();
  }

  mountCanvas() {
    if (!this.mountNode) {
      return;
    }

    const existingCanvas = this.mountNode.querySelector(
      "canvas[data-cinematic-canvas='true']",
    );

    if (existingCanvas && existingCanvas !== this.renderer.domElement) {
      existingCanvas.remove();
    }

    this.mountNode.appendChild(this.renderer.domElement);
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.cameraController.resize(width / Math.max(height, 1));
  }

  tick() {
    this.frameId = window.requestAnimationFrame(this.tick);

    const delta = this.clock.getDelta();
    this.elapsed += delta;

    this.sceneWorld.update(this.elapsed, delta);
    this.cameraController.update(this.elapsed);
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    window.cancelAnimationFrame(this.frameId);
    window.removeEventListener("resize", this.handleResize);

    this.scrollController.destroy();
    this.sceneWorld.destroy();
    this.renderer.forceContextLoss();
    this.renderer.dispose();

    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
