const WORK_RETURN_Y_KEY = "darshita:work-return-y";
const WORK_RETURN_PENDING_KEY = "darshita:work-return-pending";

export function rememberWorkReturnPosition() {
  window.sessionStorage.setItem(WORK_RETURN_Y_KEY, String(window.scrollY));
}

export function requestWorkReturn(): boolean {
  const storedY = window.sessionStorage.getItem(WORK_RETURN_Y_KEY);
  const returnY = storedY === null ? Number.NaN : Number(storedY);

  if (!Number.isFinite(returnY) || returnY < 0) return false;

  window.sessionStorage.setItem(WORK_RETURN_PENDING_KEY, "true");
  return true;
}

export function consumeWorkReturnPosition(): number | null {
  if (window.sessionStorage.getItem(WORK_RETURN_PENDING_KEY) !== "true") {
    return null;
  }

  window.sessionStorage.removeItem(WORK_RETURN_PENDING_KEY);

  const storedY = window.sessionStorage.getItem(WORK_RETURN_Y_KEY);
  const returnY = storedY === null ? Number.NaN : Number(storedY);
  return Number.isFinite(returnY) && returnY >= 0 ? returnY : null;
}
