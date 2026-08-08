const SOUND_STORAGE_KEY = "darshita-site-sound";
const SOUND_CHANGE_EVENT = "site:sound-change";
const CARD_HOVER_SOUND_SRC = "/audio/card-hover.mp3";
const SA_PLAYBACK_RATE = 0.72;

const audioCache = new Map<string, HTMLAudioElement>();
let memorySoundEnabled = false;
let hoverAudioContext: AudioContext | null = null;
let hoverSoundBufferPromise: Promise<AudioBuffer> | null = null;

export function getSiteSoundEnabled() {
  if (typeof window === "undefined") return false;
  try {
    const storedPreference = window.localStorage.getItem(SOUND_STORAGE_KEY);
    return storedPreference === null
      ? memorySoundEnabled
      : storedPreference === "on";
  } catch {
    return memorySoundEnabled;
  }
}

export function subscribeToSiteSound(listener: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === SOUND_STORAGE_KEY) listener();
  };
  window.addEventListener(SOUND_CHANGE_EVENT, listener);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(SOUND_CHANGE_EVENT, listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function setSiteSoundEnabled(enabled: boolean) {
  memorySoundEnabled = enabled;
  try {
    window.localStorage.setItem(SOUND_STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    // The toggle still works for this interaction when storage is unavailable.
  }

  if (!enabled) {
    audioCache.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    void hoverAudioContext?.suspend();
  }

  window.dispatchEvent(new Event(SOUND_CHANGE_EVENT));
}

export function playSiteSound(src: string, volume = 0.45) {
  if (!getSiteSoundEnabled()) return;
  let audio = audioCache.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.preload = "auto";
    audioCache.set(src, audio);
  }
  audio.volume = volume;
  audio.pause();
  audio.currentTime = 0;
  void audio.play().catch(() => {
    // Pointer-triggered audio can still be blocked by browser policy.
  });
}

export function playCardHoverSound() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (!getSiteSoundEnabled()) return;

  hoverAudioContext ??= new AudioContext();
  const context = hoverAudioContext;

  hoverSoundBufferPromise ??= fetch(CARD_HOVER_SOUND_SRC)
    .then((response) => {
      if (!response.ok) throw new Error("Could not load the card hover sound");
      return response.arrayBuffer();
    })
    .then((audioData) => context.decodeAudioData(audioData));

  const playNote = (buffer: AudioBuffer) => {
    if (!getSiteSoundEnabled()) return;

    const now = context.currentTime;
    const source = context.createBufferSource();
    const dryGain = context.createGain();
    const echoDelay = context.createDelay();
    const echoGain = context.createGain();

    source.buffer = buffer;
    source.playbackRate.setValueAtTime(SA_PLAYBACK_RATE, now);
    dryGain.gain.setValueAtTime(0.42, now);
    echoDelay.delayTime.setValueAtTime(0.13, now);
    echoGain.gain.setValueAtTime(0.055, now);

    source.connect(dryGain).connect(context.destination);
    source.connect(echoDelay).connect(echoGain).connect(context.destination);
    source.start(now);
  };

  const ready =
    context.state === "running" ? Promise.resolve() : context.resume();
  void Promise.all([ready, hoverSoundBufferPromise])
    .then(([, buffer]) => playNote(buffer))
    .catch(() => undefined);
}
