const stage = document.querySelector("#type-stage");
const rig = document.querySelector("#type-rig");
const textInput = document.querySelector("#text-input");
const modeLabel = document.querySelector("#mode-label");
const interactionLabel = document.querySelector("#interaction-label");
const hint = document.querySelector("#hint");
const sizeInput = document.querySelector("#type-size");
const widthInput = document.querySelector("#stretch-limit");
const bounceInput = document.querySelector("#bounce");
const sizeValue = document.querySelector("#size-value");
const widthValue = document.querySelector("#stretch-value");
const bounceValue = document.querySelector("#bounce-value");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const modeDetails = {
  word: {
    name: "Word width",
    label: "Narrow ← cursor → extended",
    hint: "Move across the canvas",
    background: "#6B0505",
    ink: "#FF9BDA",
  },
  letter: {
    name: "Letter hover",
    label: "One letter / full attention",
    hint: "Hover over a letter",
    background: "#4E5BFF",
    ink: "#F6F4EB",
  },
  centre: {
    name: "Centre pull",
    label: "Cursor as gravity",
    hint: "Move through the word",
    background: "#FF3215",
    ink: "#11110F",
  },
  drag: {
    name: "Corner drag",
    label: "Pull a corner / release to bounce",
    hint: "Grab a letter and pull",
    background: "#444444",
    ink: "#E2E2E2",
  },
};

const state = {
  mode: "word",
  pointerX: 0.5,
  pointerY: 0.5,
  pointerInside: false,
  hoverIndex: -1,
  wordScale: 1,
  wordVelocity: 0,
  dragging: false,
  dragIndex: -1,
  pointerId: null,
  startX: 0,
  startY: 0,
  startWarpX: 0,
  startWarpY: 0,
  glyphs: [],
};

function elements() {
  return Array.from(rig.querySelectorAll(".glyph-slot"));
}

function makeGlyph() {
  return {
    widthScale: 1,
    widthVelocity: 0,
    heightScale: 1,
    heightVelocity: 0,
    warpX: 0,
    warpY: 0,
    warpVelocityX: 0,
    warpVelocityY: 0,
    corner: 2,
  };
}

function renderText() {
  const value = (textInput.value.trim() || "A").toUpperCase();
  rig.replaceChildren();
  state.glyphs = [];
  state.dragging = false;
  state.dragIndex = -1;

  Array.from(value).forEach((character, index) => {
    const slot = document.createElement("button");
    slot.className = "glyph-slot";
    slot.type = "button";
    slot.dataset.index = String(index);
    slot.setAttribute("aria-label", `Interact with letter ${character === " " ? "space" : character}`);
    const surface = document.createElement("span");
    surface.className = "glyph-surface";
    surface.textContent = character === " " ? "\u00a0" : character;
    slot.append(surface);

    slot.addEventListener("pointerenter", () => {
      if (state.mode === "letter") state.hoverIndex = index;
    });
    slot.addEventListener("pointerleave", (event) => {
      if (state.hoverIndex === index) state.hoverIndex = -1;
      if (state.mode === "drag" && !state.dragging) event.currentTarget.style.cursor = "grab";
    });
    slot.addEventListener("pointerdown", startInteraction);
    slot.addEventListener("pointermove", moveInteraction);
    slot.addEventListener("pointerup", endInteraction);
    slot.addEventListener("pointercancel", endInteraction);

    rig.append(slot);
    state.glyphs.push(makeGlyph());
  });
}

function springValue(current, velocity, target) {
  if (reducedMotion) return [target, 0];
  const bounce = Number(bounceInput.value) / 80;
  const stiffness = 0.095 + bounce * 0.035;
  const damping = 0.68 + (1 - bounce) * 0.17;
  const nextVelocity = (velocity + (target - current) * stiffness) * damping;
  return [current + nextVelocity, nextVelocity];
}

function getWordTarget() {
  if (state.mode !== "word" || !state.pointerInside) return 1;
  const maximum = Number(widthInput.value) / 10;
  return 0.48 + state.pointerX * (maximum - 0.48);
}

function getCentreHeightTarget(index, glyphElements) {
  if (state.mode !== "centre" || !state.pointerInside) return 1;
  const stageRect = stage.getBoundingClientRect();
  const rigRect = rig.getBoundingClientRect();
  const element = glyphElements[index];
  const baseX = rigRect.left + element.offsetLeft + element.offsetWidth / 2;
  const pointerX = stageRect.left + state.pointerX * stageRect.width;
  const distance = Math.abs(pointerX - baseX);
  const influence = Math.max(0, 1 - distance / (stageRect.width * 0.42));
  return 0.56 + influence * 3.2;
}

function solveLinearSystem(matrix, values) {
  const size = values.length;
  const augmented = matrix.map((row, index) => [...row, values[index]]);
  for (let column = 0; column < size; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < size; row += 1) {
      if (Math.abs(augmented[row][column]) > Math.abs(augmented[pivot][column])) pivot = row;
    }
    [augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]];
    const divisor = augmented[column][column] || 1e-8;
    for (let cell = column; cell <= size; cell += 1) augmented[column][cell] /= divisor;
    for (let row = 0; row < size; row += 1) {
      if (row === column) continue;
      const factor = augmented[row][column];
      for (let cell = column; cell <= size; cell += 1) augmented[row][cell] -= factor * augmented[column][cell];
    }
  }
  return augmented.map((row) => row[size]);
}

function homography(width, height, destination) {
  const source = [[0, 0], [width, 0], [width, height], [0, height]];
  const matrix = [];
  const values = [];
  source.forEach(([x, y], index) => {
    const [u, v] = destination[index];
    matrix.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    values.push(u);
    matrix.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    values.push(v);
  });
  const [a, b, c, d, e, f, g, h] = solveLinearSystem(matrix, values);
  return `matrix3d(${a},${d},0,${g},${b},${e},0,${h},0,0,1,0,${c},${f},0,1)`;
}

function glyphQuad(glyph, width, height) {
  const points = [[0, 0], [width, 0], [width, height], [0, height]];
  points[glyph.corner] = [points[glyph.corner][0] + glyph.warpX, points[glyph.corner][1] + glyph.warpY];
  return points;
}

function glyphBounds(glyph, width, height) {
  const points = glyphQuad(glyph, width, height);
  const xs = points.map((point) => point[0]);
  const ys = points.map((point) => point[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return { points, minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY, centerX: (minX + maxX) / 2 };
}

function positionGlyphs(glyphElements) {
  if (!glyphElements.length) return;
  const widths = glyphElements.map((element) => element.offsetWidth);
  const heights = glyphElements.map((element) => element.offsetHeight);
  const naturalCenters = glyphElements.map((element) => element.offsetLeft + element.offsetWidth / 2 - rig.offsetWidth / 2);
  const bounds = glyphElements.map((_, index) => glyphBounds(state.glyphs[index], widths[index], heights[index]));
  const visualWidths = widths.map((width, index) => state.mode === "drag" ? bounds[index].width : width * state.glyphs[index].widthScale);
  const gap = state.mode === "drag" ? 8 : 0;
  const totalWidth = visualWidths.reduce((sum, width) => sum + width, 0) + gap * Math.max(0, visualWidths.length - 1);
  let cursor = -totalWidth / 2;

  glyphElements.forEach((element, index) => {
    const glyph = state.glyphs[index];
    const desiredCenter = cursor + visualWidths[index] / 2;
    const warpedCenterCorrection = state.mode === "drag" ? bounds[index].centerX - widths[index] / 2 : 0;
    const offset = desiredCenter - naturalCenters[index] - warpedCenterCorrection;
    element.style.transformOrigin = "center";

    if (state.mode === "drag") {
      element.style.transform = `translate3d(${offset}px, 0, 0)`;
      const surface = element.querySelector(".glyph-surface");
      surface.style.transformOrigin = "0 0";
      surface.style.transform = homography(widths[index], heights[index], bounds[index].points);
    } else {
      element.style.transform = `translate3d(${offset}px, 0, 0) scale(${glyph.widthScale}, ${glyph.heightScale})`;
      const surface = element.querySelector(".glyph-surface");
      surface.style.transformOrigin = "center";
      surface.style.transform = "none";
    }
    cursor += visualWidths[index] + gap;
  });
}

function animate() {
  const glyphElements = elements();
  const maximum = Number(widthInput.value) / 10;
  [state.wordScale, state.wordVelocity] = springValue(state.wordScale, state.wordVelocity, getWordTarget());

  state.glyphs.forEach((glyph, index) => {
    const widthTarget = state.mode === "letter" && index === state.hoverIndex ? maximum : 1;
    const heightTarget = getCentreHeightTarget(index, glyphElements);
    [glyph.widthScale, glyph.widthVelocity] = springValue(glyph.widthScale, glyph.widthVelocity, widthTarget);
    [glyph.heightScale, glyph.heightVelocity] = springValue(glyph.heightScale, glyph.heightVelocity, heightTarget);
    if (!state.dragging || index !== state.dragIndex) {
      [glyph.warpX, glyph.warpVelocityX] = springValue(glyph.warpX, glyph.warpVelocityX, 0);
      [glyph.warpY, glyph.warpVelocityY] = springValue(glyph.warpY, glyph.warpVelocityY, 0);
    }
  });

  if (state.mode === "word") {
    rig.style.transform = `translate(-50%, -50%) scaleX(${state.wordScale})`;
    glyphElements.forEach((element) => {
      element.style.transform = "translate3d(0, 0, 0) scale(1)";
      element.querySelector(".glyph-surface").style.transform = "none";
    });
  } else {
    rig.style.transform = "translate(-50%, -50%)";
    positionGlyphs(glyphElements);
  }
  requestAnimationFrame(animate);
}

function nearestCorner(event, element) {
  const rect = element.getBoundingClientRect();
  const right = event.clientX >= rect.left + rect.width / 2;
  const bottom = event.clientY >= rect.top + rect.height / 2;
  if (!right && !bottom) return 0;
  if (right && !bottom) return 1;
  if (right && bottom) return 2;
  return 3;
}

function cornerCursor(corner) {
  return corner === 0 || corner === 2 ? "nwse-resize" : "nesw-resize";
}

function startInteraction(event) {
  const index = Number(event.currentTarget.dataset.index);
  if (state.mode === "letter") {
    state.hoverIndex = index;
    return;
  }
  if (state.mode !== "drag" || state.dragging) return;
  event.preventDefault();
  const glyph = state.glyphs[index];
  const nextCorner = nearestCorner(event, event.currentTarget);
  if (glyph.corner !== nextCorner && (Math.abs(glyph.warpX) > 0.5 || Math.abs(glyph.warpY) > 0.5)) {
    glyph.warpX = 0;
    glyph.warpY = 0;
    glyph.warpVelocityX = 0;
    glyph.warpVelocityY = 0;
  }
  glyph.corner = nextCorner;
  state.dragging = true;
  state.dragIndex = index;
  state.pointerId = event.pointerId;
  state.startX = event.clientX;
  state.startY = event.clientY;
  state.startWarpX = glyph.warpX;
  state.startWarpY = glyph.warpY;
  glyph.warpVelocityX = 0;
  glyph.warpVelocityY = 0;
  event.currentTarget.setPointerCapture(event.pointerId);
  event.currentTarget.style.cursor = cornerCursor(glyph.corner);
  hint.style.opacity = "0";
}

function damp(value, limit) {
  const magnitude = Math.abs(value);
  if (magnitude <= limit) return value;
  return Math.sign(value) * (limit + Math.sqrt(magnitude - limit) * 4);
}

function moveInteraction(event) {
  const index = Number(event.currentTarget.dataset.index);
  if (state.mode === "drag" && !state.dragging) {
    event.currentTarget.style.cursor = cornerCursor(nearestCorner(event, event.currentTarget));
    return;
  }
  if (!state.dragging || index !== state.dragIndex || event.pointerId !== state.pointerId) return;
  const glyph = state.glyphs[index];
  const limit = Number(sizeInput.value) * (Number(widthInput.value) / 10);
  const rect = event.currentTarget.getBoundingClientRect();
  let nextX = damp(state.startWarpX + event.clientX - state.startX, limit);
  let nextY = damp(state.startWarpY + event.clientY - state.startY, limit);
  if (glyph.corner === 0 || glyph.corner === 3) nextX = Math.min(nextX, rect.width * 0.88);
  else nextX = Math.max(nextX, -rect.width * 0.88);
  if (glyph.corner === 0 || glyph.corner === 1) nextY = Math.min(nextY, rect.height * 0.88);
  else nextY = Math.max(nextY, -rect.height * 0.88);
  glyph.warpVelocityX = nextX - glyph.warpX;
  glyph.warpVelocityY = nextY - glyph.warpY;
  glyph.warpX = nextX;
  glyph.warpY = nextY;
}

function endInteraction(event) {
  if (state.mode === "letter" && matchMedia("(hover: none)").matches) state.hoverIndex = -1;
  if (!state.dragging || event.pointerId !== state.pointerId) return;
  state.dragging = false;
  state.pointerId = null;
  hint.style.opacity = "1";
}

function setPalette(background, ink) {
  document.documentElement.style.setProperty("--stage", background);
  document.documentElement.style.setProperty("--type-color", ink);
  document.querySelector("#background-color").value = background;
  document.querySelector("#ink-color").value = ink;
  document.querySelectorAll("#background-swatches .swatch").forEach((item) => item.classList.toggle("is-active", item.dataset.color?.toLowerCase() === background.toLowerCase()));
  document.querySelectorAll("#ink-swatches .swatch").forEach((item) => item.classList.toggle("is-active", item.dataset.color?.toLowerCase() === ink.toLowerCase()));
}

function setMode(mode) {
  state.mode = mode;
  state.hoverIndex = -1;
  state.dragging = false;
  state.dragIndex = -1;
  stage.dataset.mode = mode;
  const detail = modeDetails[mode];
  modeLabel.textContent = detail.name;
  interactionLabel.textContent = detail.label;
  hint.textContent = detail.hint;
  rig.style.cursor = mode === "word" ? "ew-resize" : "default";
  setPalette(detail.background, detail.ink);
  document.querySelectorAll(".mode-button").forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function bindPalette(containerId, customInputId, property) {
  const container = document.querySelector(containerId);
  const customInput = document.querySelector(customInputId);
  container.querySelectorAll(".swatch").forEach((swatch) => {
    swatch.addEventListener("click", () => {
      document.documentElement.style.setProperty(property, swatch.dataset.color);
      customInput.value = swatch.dataset.color;
      container.querySelectorAll(".swatch").forEach((item) => item.classList.toggle("is-active", item === swatch));
    });
  });
  customInput.addEventListener("input", () => {
    document.documentElement.style.setProperty(property, customInput.value);
    container.querySelectorAll(".swatch").forEach((item) => item.classList.remove("is-active"));
  });
}

stage.addEventListener("pointermove", (event) => {
  if (state.dragging) return;
  const rect = stage.getBoundingClientRect();
  state.pointerX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  state.pointerY = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
  state.pointerInside = true;
});
stage.addEventListener("pointerleave", () => {
  if (state.dragging) return;
  state.pointerInside = false;
  state.hoverIndex = -1;
});

textInput.addEventListener("input", renderText);
sizeInput.addEventListener("input", () => {
  document.documentElement.style.setProperty("--type-size", `${sizeInput.value}px`);
  sizeValue.value = sizeInput.value;
});
widthInput.addEventListener("input", () => { widthValue.value = `${(widthInput.value / 10).toFixed(1)}×`; });
bounceInput.addEventListener("input", () => { bounceValue.value = bounceInput.value; });
document.querySelectorAll(".mode-button").forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));

document.querySelector("#reset").addEventListener("click", () => {
  textInput.value = "STRETCH";
  sizeInput.value = "180";
  widthInput.value = "24";
  bounceInput.value = "42";
  sizeValue.value = "180";
  widthValue.value = "2.4×";
  bounceValue.value = "42";
  document.documentElement.style.setProperty("--type-size", "180px");
  setMode("word");
  renderText();
});

bindPalette("#background-swatches", "#background-color", "--stage");
bindPalette("#ink-swatches", "#ink-color", "--type-color");
document.documentElement.style.setProperty("--type-size", `${sizeInput.value}px`);
stage.dataset.mode = "word";
renderText();
document.fonts?.ready.then(renderText);
requestAnimationFrame(animate);
