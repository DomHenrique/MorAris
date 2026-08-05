// Admin Authentication Controller

async function initAdminAuth() {
  if (!supabaseClient) {
    console.warn('Supabase key missing or not initialized.');
    return null;
  }

  try {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (error || !session) {
      // Allow demo access if explicit setting or redirect to login
      const allowDemo = localStorage.getItem('kastelo_demo_mode') === 'true';
      if (!allowDemo && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
        return null;
      }
    }

    const emailEl = document.getElementById('navUserEmail');
    if (emailEl && session && session.user) {
      emailEl.textContent = session.user.email;
    }

    return session;
  } catch (e) {
    console.error('Auth error:', e);
    return null;
  }
}

async function logoutAdmin() {
  if (supabaseClient) {
    await supabaseClient.auth.signOut();
  }
  localStorage.removeItem('kastelo_demo_mode');
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutAdmin);
  }
});
