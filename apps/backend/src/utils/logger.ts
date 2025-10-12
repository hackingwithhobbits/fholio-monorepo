// src/utils/logger.ts

export class Logger {
  constructor(private context: string) {}

  info(message: string, ...args: any[]) {
    console.log(
      `[${new Date().toISOString()}] [${this.context}] INFO: ${message}`,
      ...args
    );
  }

  warn(message: string, ...args: any[]) {
    console.warn(
      `[${new Date().toISOString()}] [${this.context}] WARN: ${message}`,
      ...args
    );
  }

  error(message: string, error?: any) {
    console.error(
      `[${new Date().toISOString()}] [${this.context}] ERROR: ${message}`,
      error
    );
  }
}
