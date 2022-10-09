export type Inputs = {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
}

export interface IInputManager {
  inputs: Inputs;
}

export class InputManager implements IInputManager {
  inputs = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
  }

  constructor() {
    window.addEventListener('keydown', e => {
      if (e.key in this.inputs) {
        this.inputs[e.key as keyof Inputs] = true
      }
    })

    window.addEventListener('keyup', e => {
      if (e.key in this.inputs) {
        this.inputs[e.key as keyof Inputs] = false
      }
    })
  }
}
