import {createLogger, format, transports} from "winston";
import config from "config";

const loggerConfig = config.get<any>("logger");

const logTransports = [];

if (loggerConfig.console?.enabled) {
    logTransports.push(new transports.Console({
        level: loggerConfig.console.level,
        format: format.combine(
            format.colorize(),
            format.json(),
            format.splat(),
            format.printf(({ level, message }) => {
                return `[${level}]: ${message}`;
            })
        )
    }));
}

const logger = createLogger({
    transports: logTransports,
    level: loggerConfig.level
})

export default logger;