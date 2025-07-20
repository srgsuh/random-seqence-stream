import {RandomSequenceStream} from "./src/services/RandomSequenceStream.js";
import logger from "./src/logger.js";

const stream = new RandomSequenceStream(1, 1, 100);

// stream.pipe(process.stdout);
stream.on("data", (data) => {
    logger.info(data);
})
stream.on("end", () => {
    logger.debug("done");
});