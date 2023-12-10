import {IEntity} from "../src";

export class TestEntity implements IEntity {
    key: string | undefined;
    test!: string

    constructor(test: string) {
        this.test = test;
    }
}