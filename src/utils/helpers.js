export function isCanvasSupported() {
  return !!document.createElement('canvas').getContext;
}
