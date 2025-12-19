/**
 * Rate Limiting pour les endpoints critiques
 * Implémentation simple en mémoire (suffisante pour un déploiement single-instance)
 * Pour multi-instance, utiliser Vercel KV ou Redis
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// Store en mémoire (reset au redéploiement)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Nettoyage périodique des entrées expirées (toutes les 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitConfig {
  /** Nombre maximum de requêtes autorisées dans la fenêtre */
  maxRequests: number;
  /** Durée de la fenêtre en millisecondes */
  windowMs: number;
}

interface RateLimitResult {
  /** Si la requête est autorisée */
  allowed: boolean;
  /** Requêtes restantes dans la fenêtre */
  remaining: number;
  /** Timestamp de reset de la fenêtre */
  resetAt: number;
  /** Temps d'attente recommandé en secondes (si bloqué) */
  retryAfter?: number;
}

/**
 * Vérifie et incrémente le compteur de rate limit
 * @param identifier - Identifiant unique (IP, userId, etc.)
 * @param endpoint - Nom de l'endpoint pour différencier les limites
 * @param config - Configuration du rate limit
 */
export function checkRateLimit(
  identifier: string,
  endpoint: string,
  config: RateLimitConfig
): RateLimitResult {
  const key = `${endpoint}:${identifier}`;
  const now = Date.now();

  let entry = rateLimitStore.get(key);

  // Si pas d'entrée ou fenêtre expirée, créer une nouvelle
  if (!entry || entry.resetAt < now) {
    entry = {
      count: 1,
      resetAt: now + config.windowMs,
    };
    rateLimitStore.set(key, entry);

    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt: entry.resetAt,
    };
  }

  // Incrémenter le compteur
  entry.count++;

  // Vérifier si limite atteinte
  if (entry.count > config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfter,
    };
  }

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Configurations pré-définies pour différents types d'endpoints
 */
export const RATE_LIMIT_CONFIGS = {
  // Login: 5 tentatives par IP par 15 minutes (protection brute force)
  login: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },

  // Signup: 3 comptes par IP par heure (anti-spam)
  signup: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 heure
  },

  // Contact form: 5 messages par IP par heure (anti-spam)
  contact: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 heure
  },

  // Checkout: 10 sessions par IP par heure (limite raisonnable)
  checkout: {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000, // 1 heure
  },

  // Password reset: 3 demandes par email par heure
  passwordReset: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 heure
  },
} as const;

/**
 * Extrait l'IP du client depuis les headers de la requête
 */
export function getClientIP(request: Request): string {
  // Vercel/Cloudflare headers
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // Autres proxies
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback
  return 'unknown';
}
