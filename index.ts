import {RandomSequenceStream} from "./src/services/RandomSequenceStream.js";

const stream = new RandomSequenceStream(1, 1, 100);

stream.pipe(process.stdout);
stream.on("end", () => {
    process.stdout.write("\n");
    console.log("done");
});