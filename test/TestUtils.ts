import {TestCleaner} from "./TestCleaner";

// inits chai-spies
import * as chai from "chai";
import spies from 'chai-spies';
chai.use(spies);

// inits chai-as-promised
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

export class TestUtils {
    public static shift = `/test-${Date.now()}`
    private static cleaner:TestCleaner

    public static async clean() {
        if(!TestUtils.cleaner) TestUtils.cleaner = new TestCleaner()
        await TestUtils.cleaner.clean()
    }
}