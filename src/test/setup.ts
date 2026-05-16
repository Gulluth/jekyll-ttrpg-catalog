import '@testing-library/jest-dom'

// jsdom does not implement ResizeObserver; stub it for component tests.
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
