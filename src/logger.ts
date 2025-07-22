import {createLogger, format, transports} from "winston";
import {getConfigValue} from "./config_params.ts";

const logTransports = [];

if (getConfigValue<boolean>("logger.console", false)) {
    logTransports.push(new transports.Console());
}

const logger = createLogger({
    level: getConfigValue<string>("logger.level", "info"),
    transports: logTransports,
    format: format.combine(
        format.colorize(),
        format.json(),
        format.splat(),
        format.printf(({ level, message }) => {
            return `[${level}]: ${message}`;
        })
    )
})

export default logger;