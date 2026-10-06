/**
 * IndexedDB & Server storage engine for Sheikh Al-Tayeb Melait Akood lecture video
 */

const DB_NAME = 'SheikhAkoodMediaDB';
const STORE_NAME = 'videos';
const VIDEO_KEY = 'sheikh_tayeb_uploaded_video';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveVideoToIndexedDB(file: File): Promise<string> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const putRequest = store.put(file, VIDEO_KEY);
    putRequest.onsuccess = () => {
      const blobUrl = URL.createObjectURL(file);
      resolve(blobUrl);
    };
    putRequest.onerror = () => reject(putRequest.error);
  });
}

export async function getVideoFromIndexedDB(): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getRequest = store.get(VIDEO_KEY);
      getRequest.onsuccess = () => {
        const file = getRequest.result as Blob | undefined;
        if (file) {
          const blobUrl = URL.createObjectURL(file);
          resolve(blobUrl);
        } else {
          resolve(null);
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  } catch (err) {
    console.warn('IndexedDB not accessible, falling back to server', err);
    return null;
  }
}

export async function checkServerVideo(): Promise<{ exists: boolean; url: string | null; filename: string | null }> {
  try {
    const res = await fetch('/api/video-status');
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    // If running in pure client build
    console.log('Server video check skipped', err);
  }
  return { exists: false, url: null, filename: null };
}

export async function uploadVideoToServer(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('video', file);

  const res = await fetch('/api/upload-video', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('فشل رفع الفيديو على الخادم');
  }

  const data = await res.json();
  return data.url;
}
