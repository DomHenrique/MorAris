// Configuration for Supabase Client
const SUPABASE_URL = 'https://mmjjnxoioczlvrwfttez.supabase.co';
// Default public anon key for Kastello project (overridable via localStorage)
let SUPABASE_ANON_KEY = localStorage.getItem('kastelo_supabase_key_v2') || 'sb_publishable_rhVWAivxLrkG3qMtdWoJug_O2jKDzO0';

let supabaseClient = null;

function initSupabase() {
    if (typeof supabase !== 'undefined' && SUPABASE_ANON_KEY) {
        try {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        } catch (e) {
            console.error('Erro ao inicializar Supabase Client:', e);
        }
    }
    return supabaseClient;
}

function setSupabaseKey(key) {
    SUPABASE_ANON_KEY = key;
    localStorage.setItem('kastelo_supabase_key_v2', key);
    return initSupabase();
}

function getPublicStorageUrl(path, bucket = 'kastello-media') {
    if (!path) return '';
    // If it's already a full HTTP/HTTPS URL, return as-is
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    
    // Clean path formatting
    let cleanPath = path.startsWith('/') ? path.substring(1) : path;
    if (cleanPath.startsWith(`${bucket}/`)) {
        cleanPath = cleanPath.replace(`${bucket}/`, '');
    }
    
    // Return Supabase public object storage URL for browser image display
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${cleanPath}`;
}

// Auto-initialize if library is loaded
if (typeof supabase !== 'undefined') {
    initSupabase();
}
