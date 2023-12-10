import {expect, spy} from "chai";
import {MigrationScriptExecutor} from "migration-script-runner";
import sinon from 'sinon';
import {EntityService, FirebaseHandler} from "../../src";
import {afterEach, after} from "mocha";
import {TestConfig, TestUtils} from "../index";

let processExit = sinon.stub(process, 'exit')

describe('FirebaseHandler', () => {

    afterEach(async () => {
        spy.restore();
        await TestUtils.clean()
    })

    after(async () => {
        processExit.restore()
    });

    it('init', async () => {
        // having
        const handler = await FirebaseHandler.getInstance(new TestConfig())

        // when
        spy.on(handler, ['getName', 'isInitialized', 'createTable', 'validateTable', 'register', 'getAll'])
        new MigrationScriptExecutor(handler)

        // then
        expect(handler.getName).have.been.called.once
        expect(handler.isInitialized).have.not.been.called
        expect(handler.createTable).have.not.been.called
        expect(handler.validateTable).have.not.been.called
        expect(handler.register).have.not.been.called
        expect(handler.getAll).have.not.been.called
    })

    it('golden path', async () => {
        // having
        const handler = await FirebaseHandler.getInstance(new TestConfig())

        // when
        spy.on(handler, ['backup', 'getName', 'isInitialized', 'createTable', 'validateTable', 'register', 'getAll'])
        await new MigrationScriptExecutor(handler).migrate();

        // then
        expect(handler.getName).have.been.called.once
        expect(handler.backup).have.been.called.once
        expect(handler.isInitialized).have.been.called
        expect(handler.createTable).have.not.been.called
        expect(handler.validateTable).have.been.called
        expect(handler.register).have.not.been.called
        expect(handler.getAll).have.not.been.called

        // and
        const testService = new EntityService(handler.db, handler.cfg.buildPath("test-case-1"))
        const records = await testService.getAll();

        expect(records.length).eq(1, "Should be one records in test-case-1 table")

        const record = records[0];

        expect(record.hasOwnProperty('customField'), "Should have customField prop").is.true
        expect((record as any).customField).eq('test-case-1', "The customField prop should have test-case-1 as a value")

    })

})