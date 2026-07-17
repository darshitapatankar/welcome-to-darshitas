export type CardHoverConfig = {
  glowOpacity: number;
  glowRadius: number;
  saturationBoost: number;
};

export const CARD_HOVER_CONFIG: CardHoverConfig = {
  glowOpacity: 0.2,
  glowRadius: 45,
  saturationBoost: 1.4,
};

const SAMPLE_SIZE = 16;
const colorCache = new Map<string, string>();
let samplingCanvas: HTMLCanvasElement | null = null;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function boostSaturation(
  red: number,
  green: number,
  blue: number,
  boost: number,
) {
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const sourceLightness = (max + min) / 2;
  const outputLightness = Math.min(sourceLightness, 0.68);
  const delta = max - min;
  if (delta === 0) return [red, green, blue];

  const saturation = clamp(
    (delta / (1 - Math.abs(2 * sourceLightness - 1))) * boost,
  );
  let hue = 0;
  if (max === red) hue = ((green - blue) / delta) % 6;
  else if (max === green) hue = (blue - red) / delta + 2;
  else hue = (red - green) / delta + 4;
  hue = ((hue * 60 + 360) % 360) / 60;

  const chroma = (1 - Math.abs(2 * outputLightness - 1)) * saturation;
  const second = chroma * (1 - Math.abs((hue % 2) - 1));
  const offset = outputLightness - chroma / 2;
  let boosted: [number, number, number];
  if (hue < 1) boosted = [chroma, second, 0];
  else if (hue < 2) boosted = [second, chroma, 0];
  else if (hue < 3) boosted = [0, chroma, second];
  else if (hue < 4) boosted = [0, second, chroma];
  else if (hue < 5) boosted = [second, 0, chroma];
  else boosted = [chroma, 0, second];
  return boosted.map((channel) => clamp(channel + offset));
}

function sampleColor(image: HTMLImageElement, saturationBoost: number) {
  const cacheKey = image.currentSrc || image.src;
  const cached = colorCache.get(cacheKey);
  if (cached) return cached;

  samplingCanvas ??= document.createElement("canvas");
  samplingCanvas.width = SAMPLE_SIZE;
  samplingCanvas.height = SAMPLE_SIZE;
  const context = samplingCanvas.getContext("2d", {
    willReadFrequently: true,
  });
  if (!context) return null;

  try {
    context.clearRect(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
    context.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
    const pixels = context.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;
    let redTotal = 0;
    let greenTotal = 0;
    let blueTotal = 0;
    let weightTotal = 0;
    let fallbackRedTotal = 0;
    let fallbackGreenTotal = 0;
    let fallbackBlueTotal = 0;
    let fallbackWeightTotal = 0;

    for (let index = 0; index < pixels.length; index += 4) {
      const alpha = pixels[index + 3] / 255;
      if (alpha < 0.05) continue;
      const red = pixels[index] / 255;
      const green = pixels[index + 1] / 255;
      const blue = pixels[index + 2] / 255;
      const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
      const chroma = Math.max(red, green, blue) - Math.min(red, green, blue);
      const luminanceWeight = alpha * Math.pow(Math.max(luminance, 0.02), 1.35);
      const weight = luminanceWeight * chroma * chroma;
      redTotal += red * weight;
      greenTotal += green * weight;
      blueTotal += blue * weight;
      weightTotal += weight;
      fallbackRedTotal += red * luminanceWeight;
      fallbackGreenTotal += green * luminanceWeight;
      fallbackBlueTotal += blue * luminanceWeight;
      fallbackWeightTotal += luminanceWeight;
    }

    const useChromaticAverage = weightTotal > 0.0001;
    const divisor = useChromaticAverage ? weightTotal : fallbackWeightTotal;
    if (divisor === 0) return null;
    const boosted = boostSaturation(
      (useChromaticAverage ? redTotal : fallbackRedTotal) / divisor,
      (useChromaticAverage ? greenTotal : fallbackGreenTotal) / divisor,
      (useChromaticAverage ? blueTotal : fallbackBlueTotal) / divisor,
      saturationBoost,
    );
    const color = `rgb(${boosted
      .map((channel) => Math.round(channel * 255))
      .join(", ")})`;
    colorCache.set(cacheKey, color);
    return color;
  } catch {
    return null;
  }
}

export function applySampledCardGlow(
  card: HTMLElement,
  image: HTMLImageElement,
) {
  const color = sampleColor(image, CARD_HOVER_CONFIG.saturationBoost);
  if (!color) return;
  card.style.setProperty("--card-glow-color", color);
  card.dataset.cardGlowColor = color;
}
