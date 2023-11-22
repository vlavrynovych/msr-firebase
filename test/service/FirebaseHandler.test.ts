import {expect, spy} from "chai";
import {MigrationScriptExecutor} from "migration-script-runner";
import * as chai from "chai";
import spies from 'chai-spies';
chai.use(spies);
import {FirebaseHandler} from "../../src";
import {afterEach} from "mocha";

describe('FirebaseHandler', () => {

    afterEach(() => {
        spy.restore();
    })

    it('test', async () => {
        // having
        const handler = new FirebaseHandler()

        // when
        spy.on(handler, ['getName', 'isInitialized', 'createTable', 'validateTable', 'register', 'getAll']);
        new MigrationScriptExecutor(handler);

        // then
        expect(handler.getName).have.been.called.once
        expect(handler.isInitialized).have.not.been.called
        expect(handler.createTable).have.not.been.called
        expect(handler.validateTable).have.not.been.called
        expect(handler.register).have.not.been.called
        expect(handler.getAll).have.not.been.called
    })

})