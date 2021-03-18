/**
 * @jest-environment node
 */

const browsers = ['chromium', 'firefox'];

const axios = require('axios')

const playwright = require('playwright');

const URL = "http://127.0.0.1:3000";

const TEST_CREDENTIALS = {
    httpCredentials: {
        username: 'admin',
        password: 'admin',
    }
}

async function reset() {
    await axios.post(URL + "/api/todo/reset", {}, {auth: {
        username: 'test',
        password: 'test'
      }}
    )
}


beforeEach(async() => {
    await reset();
});

jest.setTimeout(100000)
test('screenshots of home page', async() => {
    for (const browserType of browsers) {
        const browser = await playwright[browserType].launch();
        const context = await browser.newContext(TEST_CREDENTIALS);
        const page = await context.newPage();
        await page.goto(URL);
        await page.screenshot({ path: `home-${browserType}.png` });
        await browser.close();
    }
})

test('screenshots of home page', async() => {
    for (const browserType of browsers) {
        const browser = await playwright[browserType].launch();
        const context = await browser.newContext(TEST_CREDENTIALS);
        const page = await context.newPage();
        await page.goto(URL);
        await page.fill('input', 'test_list' + browserType);
        await page.click('[type="submit"]');
        await page.waitForSelector("text=" + browserType)
        await browser.close();
    }
})

test('open list', async() => {
    for (const browserType of browsers) {
        const browser = await playwright[browserType].launch();
        const context = await browser.newContext(TEST_CREDENTIALS);
        const page = await context.newPage();
        await page.goto(URL);
        await page.click('a');
        await page.waitForSelector("text=todo3")
        await browser.close();
    }
})

test('delete list', async() => {
    for (const browserType of browsers) {
        await reset();
        const browser = await playwright[browserType].launch();
        const context = await browser.newContext(TEST_CREDENTIALS);
        const page = await context.newPage();
        await page.goto(URL);
        await page.waitForSelector("svg")
        expect((await page.$$("svg")).length).toBe(3);
        await page.click('path');
        await page.reload();
        await page.waitForSelector("svg")
        expect((await page.$$("svg")).length).toBe(2);
        await browser.close();
    }
})

test('mark todo', async () => {
        for (const browserType of browsers) {
            await reset();
            const browser = await playwright[browserType].launch();
            const context = await browser.newContext(TEST_CREDENTIALS);
            const page = await context.newPage();
            await page.goto(URL);
            await page.waitForSelector("a")
            await page.click('a');
            await page.waitForSelector(".done")
            await page.click(':nth-child(2) > span > .link-button');
            await page.reload();
            await page.waitForSelector(".done")
            expect((await page.$$(".done")).length).toBe(2);
            await browser.close();
        }
    }
)