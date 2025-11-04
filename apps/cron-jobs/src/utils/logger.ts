import { SyncConfig } from "../config/sync.config";

type LogLevel = "debug" | "info" | "warn" | "error";

export class Logger {
  private context: string;
  private logLevel: LogLevel;

  constructor(context: string) {
    this.context = context;
    this.logLevel = SyncConfig.logging.level as LogLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ["debug", "info", "warn", "error"];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const emoji = {
      debug: "🔍",
      info: "ℹ️",
      warn: "⚠️",
      error: "❌",
    }[level];

    let formatted = `${emoji} [${timestamp}] [${
      this.context
    }] ${level.toUpperCase()}: ${message}`;

    if (data) {
      formatted += `\n${JSON.stringify(data, null, 2)}`;
    }

    return formatted;
  }

  debug(message: string, data?: any) {
    if (this.shouldLog("debug")) {
      console.debug(this.formatMessage("debug", message, data));
    }
  }

  info(message: string, data?: any) {
    if (this.shouldLog("info")) {
      console.info(this.formatMessage("info", message, data));
    }
  }

  warn(message: string, data?: any) {
    if (this.shouldLog("warn")) {
      console.warn(this.formatMessage("warn", message, data));
    }
  }

  error(message: string, error?: any) {
    if (this.shouldLog("error")) {
      const errorData =
        error instanceof Error
          ? { message: error.message, stack: error.stack }
          : error;
      console.error(this.formatMessage("error", message, errorData));
    }
  }

  success(message: string, data?: any) {
    if (this.shouldLog("info")) {
      const timestamp = new Date().toISOString();
      let formatted = `✅ [${timestamp}] [${this.context}] SUCCESS: ${message}`;
      if (data) {
        formatted += `\n${JSON.stringify(data, null, 2)}`;
      }
      console.log(formatted);
    }
  }

  progress(current: number, total: number, item?: string) {
    if (this.shouldLog("info")) {
      const percentage = ((current / total) * 100).toFixed(1);
      const progressBar = this.createProgressBar(current, total);
      const itemText = item ? ` - ${item}` : "";
      console.log(
        `📊 [${this.context}] Progress: ${progressBar} ${percentage}% (${current}/${total})${itemText}`
      );
    }
  }

  private createProgressBar(
    current: number,
    total: number,
    length: number = 20
  ): string {
    const filled = Math.floor((current / total) * length);
    const empty = length - filled;
    return `[${"█".repeat(filled)}${"░".repeat(empty)}]`;
  }
}
