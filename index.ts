import {RandomSequenceStream} from "./src/services/RandomSequenceStream.js";
import logger from "./src/logger.js";
import {getConfigParams} from "./src/config_params.js";

const streamOptions = getConfigParams();

const stream = new RandomSequenceStream(streamOptions);

stream.on("data", (data) => {
    logger.info(data);
})
stream.on("end", () => {
    logger.info("done");
});