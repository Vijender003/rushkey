const VIEWS_KEY = 'pg_urgency_views';
const CONTACTS_KEY = 'pg_urgency_contacts';

function getStored(key, pgId) {
  try {
    const raw = localStorage.getItem(key);
    const data = raw ? JSON.parse(raw) : {};
    return data[pgId];
  } catch {
    return null;
  }
}

function storeValue(key, pgId, value) {
  try {
    const raw = localStorage.getItem(key);
    const data = raw ? JSON.parse(raw) : {};
    data[pgId] = value;
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[rand(0, arr.length - 1)];
}

export function getUrgencyData(pg) {
  if (!pg) return [];
  const pgId = pg.id || pg._id;
  const isUrgent = pg.availability === 'Few Rooms Left';

  const urgency = isUrgent
    ? pick([
        '🔥 Only 2 rooms left in this area',
        '🔥 Few rooms left — filling fast',
        '🔥 Last 1 room available',
        '🔥 High demand in North Campus',
        '🔥 Moving in this week? Act fast — few seats remain',
      ])
    : pick([
        '📍 Near Delhi University — popular choice',
        '📍 Well-connected PG near North Campus',
        '📍 Students near DU are booking fast',
        '📍 Near DU — filling fast',
      ]);

  let views = getStored(VIEWS_KEY, pgId);
  if (views === null) {
    views = rand(18, 55);
    storeValue(VIEWS_KEY, pgId, views);
  }
  const viewsText = pick([
    `👀 ${views} students viewed today`,
    `👀 ${views} students checked this PG`,
  ]);

  let contacts = getStored(CONTACTS_KEY, pgId);
  if (contacts === null) {
    contacts = rand(3, 10);
    storeValue(CONTACTS_KEY, pgId, contacts);
  }
  const contactText = pick([
    `📞 ${contacts} students contacted owner today`,
    `📞 ${contacts} enquiries in last 24 hours`,
  ]);

  return { urgency, viewsText, contactText };
}
