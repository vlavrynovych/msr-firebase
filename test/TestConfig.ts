import {AppConfig} from "../src";
import {TestUtils} from "./TestUtils";

export class TestConfig extends AppConfig {

    constructor() {
        super()
        this.shift = TestUtils.shift
        this.folder = `${process.cwd()}/test/resources/migrations`
    }
}