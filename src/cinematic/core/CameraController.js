import * as THREE from "three";

export class CameraController {
  constructor(camera) {
    this.camera = camera;
    this.pathCurve = null;
    this.pathLookAhead = 0.018;

    this.state = {
      x: 0,
      y: 0.45,
      z: 36,
      targetX: 0,
      targetY: 0,
      targetZ: 0,
      fov: 48,
      pathBlend: 0,
      pathProgress: 0,
      calm: 0,
    };

    this.basePosition = new THREE.Vector3();
    this.baseTarget = new THREE.Vector3();
    this.pathPosition = new THREE.Vector3();
    this.pathTarget = new THREE.Vector3();
    this.finalPosition = new THREE.Vector3();
    this.finalTarget = new THREE.Vector3();

    this.camera.position.set(this.state.x, this.state.y, this.state.z);
    this.camera.lookAt(0, 0, 0);
  }

  setPath(curve) {
    this.pathCurve = curve;
  }

  resize(aspect) {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  update(elapsed) {
    const idleStrength = 1 - this.state.calm;

    this.basePosition.set(this.state.x, this.state.y, this.state.z);
    this.baseTarget.set(this.state.targetX, this.state.targetY, this.state.targetZ);

    this.basePosition.x += Math.sin(elapsed * 0.31) * 0.18 * idleStrength;
    this.basePosition.y += Math.cos(elapsed * 0.43) * 0.22 * idleStrength;
    this.baseTarget.x += Math.sin(elapsed * 0.18) * 0.12 * idleStrength;
    this.baseTarget.y += Math.cos(elapsed * 0.14) * 0.08 * idleStrength;

    this.finalPosition.copy(this.basePosition);
    this.finalTarget.copy(this.baseTarget);

    if (this.pathCurve && this.state.pathBlend > 0.001) {
      const progress = THREE.MathUtils.clamp(this.state.pathProgress, 0, 1);
      this.pathCurve.getPointAt(progress, this.pathPosition);
      this.pathCurve.getPointAt(Math.min(1, progress + this.pathLookAhead), this.pathTarget);

      this.finalPosition.lerp(this.pathPosition, this.state.pathBlend);
      this.finalTarget.lerp(this.pathTarget, this.state.pathBlend);
    }

    this.camera.position.copy(this.finalPosition);
    this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, this.state.fov, 0.1);
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(this.finalTarget);
  }
}
