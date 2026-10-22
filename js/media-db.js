/**
 * GoshaTurboTech (GTT) - Client-side IndexedDB Media Engine
 * Stores user-selected videos and large media locally in the browser (Blobs).
 * Enables seamless playback on GitHub Pages, offline, and instant zero-latency loading.
 */
const GTTMediaDB = (function() {
  const DB_NAME = 'gtt_media_cache';
  const DB_VERSION = 1;
  const STORE_NAME = 'media_blobs';

  let dbPromise = null;

  function getDB() {
    if (!dbPromise) {
      dbPromise = new Promise((resolve) => {
        if (typeof window === 'undefined' || !('indexedDB' in window)) {
          resolve(null);
          return;
        }
        try {
          const req = indexedDB.open(DB_NAME, DB_VERSION);
          req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              db.createObjectStore(STORE_NAME);
            }
          };
          req.onsuccess = (e) => resolve(e.target.result);
          req.onerror = (e) => {
            console.warn('[GTT MediaDB] IndexedDB open error:', e);
            resolve(null);
          };
        } catch (err) {
          console.warn('[GTT MediaDB] Exception opening IndexedDB:', err);
          resolve(null);
        }
      });
    }
    return dbPromise;
  }

  async function saveBlob(key, blob) {
    if (!key || !blob) return false;
    try {
      const db = await getDB();
      if (!db) return false;
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(blob, key);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    } catch (e) {
      console.warn('[GTT MediaDB] saveBlob failed:', e);
      return false;
    }
  }

  async function getBlob(key) {
    if (!key) return null;
    try {
      const db = await getDB();
      if (!db) return null;
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } catch (e) {
      return null;
    }
  }

  async function deleteBlob(key) {
    if (!key) return;
    try {
      const db = await getDB();
      if (!db) return;
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(key);
    } catch (e) {}
  }

  const objectUrlCache = new Map();

  async function resolveMediaUrl(src) {
    if (!src) return '';
    const trimmed = String(src).trim();
    if (!trimmed) return '';

    if (trimmed.startsWith('blob:') || trimmed.startsWith('data:') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }

    const baseName = trimmed.split('/').pop().split('?')[0];
    const cleanKey = baseName.replace(/[^a-zA-Z0-9_\-\.]/g, '_');

    if (objectUrlCache.has(baseName)) {
      return objectUrlCache.get(baseName);
    }
    if (objectUrlCache.has(cleanKey)) {
      return objectUrlCache.get(cleanKey);
    }

    let blob = await getBlob(baseName);
    if (!blob && cleanKey !== baseName) blob = await getBlob(cleanKey);
    if (!blob) blob = await getBlob(trimmed);

    if (blob) {
      try {
        const url = URL.createObjectURL(blob);
        objectUrlCache.set(baseName, url);
        objectUrlCache.set(cleanKey, url);
        return url;
      } catch (err) {
        console.warn('[GTT MediaDB] Failed to createObjectURL:', err);
      }
    }

    return trimmed;
  }

  return {
    saveBlob,
    getBlob,
    deleteBlob,
    resolveMediaUrl
  };
})();

if (typeof window !== 'undefined') {
  window.GTTMediaDB = GTTMediaDB;
}
