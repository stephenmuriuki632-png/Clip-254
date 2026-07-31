/**
 * ClipForge Enterprise Security & Audit Logging Library
 */

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userRole: string;
  action: string;
  category: 'AUTH' | 'WALLET' | 'BOUNTY' | 'ADMIN' | 'ESCROW' | 'SECURITY';
  ipAddress: string;
  details: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}

const AUDIT_LOGS_KEY = 'clipforge_audit_logs';

export const SecurityAudit = {
  // Sanitize user inputs against XSS and HTML injection
  sanitizeInput: (input: string): string => {
    if (!input) return '';
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  // Validate Kenyan Phone Number (+254 format)
  validateKenyanPhone: (phone: string): boolean => {
    const regex = /^(?:\+254|0)?(7\d{8}|1\d{8})$/;
    return regex.test(phone.trim());
  },

  // Log audit event to storage and console
  logEvent: (
    userId: string,
    userRole: string,
    action: string,
    category: AuditLogEntry['category'],
    details: string,
    status: AuditLogEntry['status'] = 'SUCCESS'
  ) => {
    const entry: AuditLogEntry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      userId,
      userRole,
      action,
      category,
      ipAddress: '197.232.0.1 (Kenya Safaricom IP)',
      details,
      status
    };

    try {
      const existingLogsRaw = localStorage.getItem(AUDIT_LOGS_KEY);
      const existingLogs: AuditLogEntry[] = existingLogsRaw ? JSON.parse(existingLogsRaw) : [];
      // Keep last 100 entries
      const updated = [entry, ...existingLogs].slice(0, 100);
      localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('[Audit Log Storage Error]', e);
    }

    console.log(`[AUDIT - ${category}][${status}] ${action} by ${userId} (${userRole}): ${details}`);
  },

  // Retrieve audit logs
  getLogs: (): AuditLogEntry[] => {
    try {
      const existingLogsRaw = localStorage.getItem(AUDIT_LOGS_KEY);
      return existingLogsRaw ? JSON.parse(existingLogsRaw) : [];
    } catch (e) {
      return [];
    }
  },

  // Generate CSRF Token for sensitive transactions
  generateCSRFToken: (): string => {
    const token = Array.from(crypto.getRandomValues(new Uint8Array(24)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    sessionStorage.setItem('clipforge_csrf_token', token);
    return token;
  },

  // Validate CSRF Token
  validateCSRFToken: (providedToken: string): boolean => {
    const storedToken = sessionStorage.getItem('clipforge_csrf_token');
    return Boolean(storedToken && storedToken === providedToken);
  }
};
