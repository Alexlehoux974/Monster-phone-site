/**
 * Logger utilitaire pour environnement de développement et production
 *
 * En production, seules les erreurs et warnings critiques sont loggés.
 * En développement, tous les logs sont affichés avec des préfixes colorés.
 */

const isDev = process.env.NODE_ENV === 'development';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogConfig {
  prefix?: string;
  level: LogLevel;
}

/**
 * Logger conditionnel qui respecte l'environnement
 */
class Logger {
  private static shouldLog(level: LogLevel): boolean {
    if (isDev) return true;
    // En production, uniquement erreurs et warnings
    return level === 'error' || level === 'warn';
  }

  /**
   * Log de débogage (développement uniquement)
   */
  static debug(message: string, ...args: any[]) {
    if (this.shouldLog('debug')) {
      console.log(`🔍 ${message}`, ...args);
    }
  }

  /**
   * Log d'information (développement uniquement)
   */
  static info(message: string, ...args: any[]) {
    if (this.shouldLog('info')) {
      console.log(`ℹ️  ${message}`, ...args);
    }
  }

  /**
   * Log de warning (toujours loggé)
   */
  static warn(message: string, ...args: any[]) {
    if (this.shouldLog('warn')) {
      console.warn(`⚠️  ${message}`, ...args);
    }
  }

  /**
   * Log d'erreur (toujours loggé)
   */
  static error(message: string, error?: any) {
    if (this.shouldLog('error')) {
      console.error(`❌ ${message}`, error);
    }
  }

  /**
   * Logger pour un contexte spécifique (Auth, Payment, etc.)
   */
  static context(context: string) {
    return {
      debug: (message: string, ...args: any[]) =>
        Logger.debug(`[${context}] ${message}`, ...args),
      info: (message: string, ...args: any[]) =>
        Logger.info(`[${context}] ${message}`, ...args),
      warn: (message: string, ...args: any[]) =>
        Logger.warn(`[${context}] ${message}`, ...args),
      error: (message: string, error?: any) =>
        Logger.error(`[${context}] ${message}`, error),
    };
  }
}

export default Logger;

// Contextes pré-configurés pour faciliter l'utilisation
export const AuthLogger = Logger.context('Auth');
export const PaymentLogger = Logger.context('Payment');
export const OrderLogger = Logger.context('Order');
export const StockLogger = Logger.context('Stock');
export const AdminLogger = Logger.context('Admin');
