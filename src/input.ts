export const InputsKeys: KeyboardEvent['code'][] = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'KeyW',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyX',
  'Space',
]

export type Inputs = { [key in KeyboardEvent['code']]: boolean }

export interface IInputManager {
  inputs: Inputs;
}

export class InputManager implements IInputManager {
  inputs: Inputs

  constructor() {
    this.initState()

    window.addEventListener('keydown', e => {
      if (InputsKeys.includes(e.code)) {
        e.preventDefault()
        this.inputs[e.code as keyof Inputs] = true
      }
    })

    window.addEventListener('keyup', e => {
      if (InputsKeys.includes(e.code)) {
        e.preventDefault()
        this.inputs[e.code as keyof Inputs] = false
      }
    })
  }

  initState() {
    this.inputs = InputsKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {} as Inputs)
  }
}
