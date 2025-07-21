import {RandomSequenceStream} from "./src/services/RandomSequenceStream.js";
import logger from "./src/logger.js";

const stream = new RandomSequenceStream(
    {count: 10, min: 1, max: 100, isUnique: true}
);

// stream.pipe(process.stdout);
stream.on("data", (data) => {
    logger.info(data);
})
stream.on("end", () => {
    logger.info("done");
});