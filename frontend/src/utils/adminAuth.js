const ADMIN_CREDENTIALS = {
  email: 'admin@pgfinder.com',
  password: 'admin123',
  name: 'Rushkey Admin',
};

export function adminLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        email.toLowerCase() === ADMIN_CREDENTIALS.email &&
        password === ADMIN_CREDENTIALS.password
      ) {
        const session = {
          email: ADMIN_CREDENTIALS.email,
          name: ADMIN_CREDENTIALS.name,
          loggedInAt: new Date().toISOString(),
        };
        localStorage.setItem('admin_session', JSON.stringify(session));
        resolve({ success: true, user: session });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800);
  });
}

export function adminLogout() {
  localStorage.removeItem('admin_session');
}

export function isAdminAuthenticated() {
  const session = localStorage.getItem('admin_session');
  return !!session;
}

export function getAdminSession() {
  const raw = localStorage.getItem('admin_session');
  return raw ? JSON.parse(raw) : null;
}
