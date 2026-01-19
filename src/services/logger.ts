export type LogLevel= "debug" | "info" | "warn" | "error";

const isProd = import.meta.env.MODE=== "production";

type LogPayload={
    message:string;
    context?:Record<string,unknown>
};

class Logger{
    private log(level:LogLevel, payload:LogPayload){
 if(isProd && level==="debug") return;

 const timestamp = new Date().toISOString();

 const logData={
    level,
      message: payload.message,
      context: payload.context,
      timestamp,
};
switch(level){
    case "debug":
        console.debug(logData);
        break;
    case "info":
        console.info(logData);
        break;
    case "warn":
        console.warn(logData);
        break;
    case "error":
        console.error(logData);
        break;

}
}

debug(message: string, context?: Record<string, unknown>) {
    this.log("debug", { message, context });
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log("info", { message, context });
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log("warn", { message, context });
  }

  error(message: string, context?: Record<string, unknown>) {
    this.log("error", { message, context });
  }
}

export const logger = new Logger();