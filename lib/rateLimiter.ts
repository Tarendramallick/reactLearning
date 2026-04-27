type RateLimitEntry = {
  count: number;
  lastReset: number;
};

const RATE_LIMIT = 5; // max requests
const WINDOW_SIZE = 60 * 1000; // 1 minute

const store = new Map<string, RateLimitEntry>();

export function checkRateLimit(key: string) {
  const now = Date.now();

  const entry = store.get(key);

  if (!entry) {
    store.set(key, { count: 1, lastReset: now });
    return { allowed: true };
  }

  // Reset window
  if (now - entry.lastReset > WINDOW_SIZE) {
    store.set(key, { count: 1, lastReset: now });
    return { allowed: true };
  }

  // Limit exceeded
  if (entry.count >= RATE_LIMIT) {
    return {
      allowed: false,
      remainingTime: WINDOW_SIZE - (now - entry.lastReset),
    };
  }

  // Increment count
  entry.count++;
  store.set(key, entry);

  return { allowed: true };
}