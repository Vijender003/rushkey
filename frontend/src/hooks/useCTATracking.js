import { useCallback } from 'react';

const STORAGE_KEY = 'pg_cta_tracking';

function getData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function useCTATracking(pgId) {
  const trackCall = useCallback(() => {
    const data = getData();
    data[pgId] = data[pgId] || { callClicks: 0, whatsappClicks: 0 };
    data[pgId].callClicks++;
    saveData(data);
  }, [pgId]);

  const trackWhatsApp = useCallback(() => {
    const data = getData();
    data[pgId] = data[pgId] || { callClicks: 0, whatsappClicks: 0 };
    data[pgId].whatsappClicks++;
    saveData(data);
  }, [pgId]);

  const getStats = useCallback(() => {
    const data = getData();
    return data[pgId] || { callClicks: 0, whatsappClicks: 0 };
  }, [pgId]);

  return { trackCall, trackWhatsApp, getStats };
}
