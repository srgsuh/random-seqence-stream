import {RandomSequenceStream} from "./src/services/RandomSequenceStream.ts";
import {getParameters} from "./src/config_params.ts";
import {RandomSequenceError} from "./src/services/AbstractRandomSequence.ts";

try {
    const {count, min, max} = getParameters();

    const stream = new RandomSequenceStream(count, min, max, true);
    const randomArray: number[] = [];
    stream.on("data", (data) => {
        randomArray.push(+data);
    })
    stream.on("end", () => {
        console.log(`Generated ${randomArray.length} random numbers in the range [${min}, ${max}]: \n`
            , randomArray.join(", "));
    });
}
catch (error) {
    if (error instanceof RandomSequenceError) {
        console.error(`${error.message}. Check the "random_sequence" section of your configuration.`);
    }
    else {
        throw error;
    }
}