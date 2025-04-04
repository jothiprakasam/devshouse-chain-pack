declare module "vanta/dist/vanta.net.min" {
  import * as THREE from "three";

  interface VantaOptions {
    el: string | HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundColor?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
  }

  export default function NET(options: VantaOptions): {
    destroy: () => void;
  };
}

declare module "vanta/dist/vanta.rings.min" {
  import * as THREE from "three";

  interface VantaOptions {
    el: string | HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundColor?: number;
    ringCount?: number;
    ringRadius?: number;
    waveHeight?: number;
  }

  export default function RINGS(options: VantaOptions): {
    destroy: () => void;
  };
}
