import config from "config";
import {RandomSequenceStreamOptions} from "./services/RandomSequenceStream.js";
import logger from "./logger.js";

interface ConfigParams {
    count?: number;
    min?: number;
    max?: number;
    unique?: boolean;
}

const DEFAULT_COUNT = 7;
const DEFAULT_MIN = 1;
const DEFAULT_MAX = 49;
const DEFAULT_UNIQUE = true;


export function getConfigParams(): RandomSequenceStreamOptions {
    let configParams: ConfigParams = {};
    if (config.has("random_sequence")) {
        configParams = config.get<ConfigParams>("random_sequence");
        logger.debug(`Config params: ${JSON.stringify(configParams)}`);
    }
    const {
        count = DEFAULT_COUNT,
        min = DEFAULT_MIN,
        max = DEFAULT_MAX,
        unique = DEFAULT_UNIQUE,
    } = configParams;

    const streamOptions:RandomSequenceStreamOptions =  {count, min, max, isUnique: unique};
    logger.debug(`Stream options: ${JSON.stringify(streamOptions)}`);
    return streamOptions;
}