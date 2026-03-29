type LogContext = Record<string, unknown>;

function formatContext(context?: LogContext) {
  return context ? context : {};
}

export function logInfo(event: string, context?: LogContext) {
  console.info(`[${new Date().toISOString()}] [info] ${event}`, formatContext(context));
}

export function logWarn(event: string, context?: LogContext) {
  console.warn(`[${new Date().toISOString()}] [warn] ${event}`, formatContext(context));
}

export function logError(event: string, context?: LogContext) {
  console.error(`[${new Date().toISOString()}] [error] ${event}`, formatContext(context));
}
