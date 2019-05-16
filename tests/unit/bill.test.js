'use strict';

const Promise = require('bluebird');
const test = require('ava');
const sinon = require('sinon');
const method = require('../../methods/bill');
const repository = require('../../repositories/bill');

sinon.createSandbox().usingPromise(Promise.Promise);

test.serial('[SUCCESS] Find All Data', async (t) => {
    t.context.sandbox.stub(repository, 'getBill').resolves([
        {
            "id": 1,
            "name": "Pizza",
            "tax_code": "1",
            "price": 12000,
            "code": 1,
            "type": "Food & Beverage",
            "refundable": "1"
        },
        {
            "id": 2,
            "name": "Burger",
            "tax_code": "2",
            "price": 10000,
            "code": 2,
            "type": "Tobacco",
            "refundable": "0"
        },
        {
            "id": 3,
            "name": "Cola",
            "tax_code": "3",
            "price": 8000,
            "code": 3,
            "type": "Entertainment",
            "refundable": "0"
        },
        {
            "id": 4,
            "name": "Coke",
            "tax_code": "3",
            "price": 80,
            "code": 3,
            "type": "Entertainment",
            "refundable": "0"
        }
    ]);

    try {
        const response = await method.getBill();

        t.deepEqual(response, {
            meta: { price_subtotal: 30080, tax_subtotal: 2479, grand_total: 32559 },
            data:
                [{
                    id: 1,
                    name: 'Pizza',
                    tax_code: '1',
                    price: 12000,
                    code: 1,
                    type: 'Food & Beverage',
                    refundable: 'Yes',
                    tax: 1200,
                    amount: 13200
                },
                {
                    id: 2,
                    name: 'Burger',
                    tax_code: '2',
                    price: 10000,
                    code: 2,
                    type: 'Tobacco',
                    refundable: 'No',
                    tax: 1200,
                    amount: 11200
                },
                {
                    id: 3,
                    name: 'Cola',
                    tax_code: '3',
                    price: 8000,
                    code: 3,
                    type: 'Entertainment',
                    refundable: 'No',
                    tax: 79,
                    amount: 8079
                },
                {
                    id: 4,
                    name: 'Coke',
                    tax_code: '3',
                    price: 80,
                    code: 3,
                    type: 'Entertainment',
                    refundable: 'No',
                    tax: 0,
                    amount: 80
                }]
        });
    } catch (err) {
        t.fail(err.message);
    }
});

test.serial('[SUCCESS] Return empty data', async (t) => {
    t.context.sandbox.stub(repository, 'getBill').resolves([]);

    try {
        const response = await method.getBill();

        t.deepEqual(response, {
            meta: { price_subtotal: 0, tax_subtotal: 0, grand_total: 0 },
            data: []
        });
    } catch (err) {
        t.fail(err.message);
    }
});

test.beforeEach('Initialize New Sandbox Before Each Test', async (t) => {
    t.context.sandbox = sinon.createSandbox().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', async (t) => {
    t.context.sandbox.restore();
});
