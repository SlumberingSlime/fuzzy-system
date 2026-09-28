/**
 * 将 .test-meta 中的期望结果绘制到 canvas，供人工判读。
 * data-expected 保留给 batch judge；文本不进入 AX 树，避免 Agent 从 meta 区读取答案。
 */
(function () {
  const FONT = '14px system-ui, -apple-system, "Segoe UI", sans-serif';
  const PADDING_X = 8;
  const MIN_WIDTH = 320;
  const MAX_WIDTH = 920;
  const CSS_HEIGHT = 40;

  function renderExpectedCanvas(canvas) {
    const expected = canvas.getAttribute('data-expected') ?? '';
    const display = canvas.getAttribute('data-expected-display') ?? expected;
    if (!display) {
      return;
    }

    const measure = document.createElement('canvas').getContext('2d');
    if (!measure) {
      return;
    }
    measure.font = FONT;
    const textWidth = measure.measureText(display).width;
    const cssWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.ceil(textWidth) + PADDING_X * 2));

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(CSS_HEIGHT * dpr);
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${CSS_HEIGHT}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#1a1a1a';
    ctx.font = FONT;
    ctx.textBaseline = 'middle';
    ctx.fillText(display, PADDING_X, CSS_HEIGHT / 2);
  }

  document.querySelectorAll('canvas.expected-canvas[data-expected]').forEach(renderExpectedCanvas);
})();
