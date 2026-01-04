type LogLevel = "LOG" | "WARN" | "ERROR";

function formatTime() {
  return new Date().toLocaleString();
}

function log(
  level: LogLevel,
  context: string,
  message: string,
) {
  if (import.meta.env.MODE === "production") return;

  console.log(
    `[FE] ${formatTime()} ${level} [${context}] ${message}`,
  );
}

export const Logger = {
  log: (context: string, message: string) =>
    log("LOG", context, message),

  warn: (context: string, message: string) =>
    log("WARN", context, message),

  error: (context: string, message: string) =>
    log("ERROR", context, message),
};
