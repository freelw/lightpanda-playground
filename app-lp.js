'use strict'

import puppeteer from 'puppeteer-core';

// use browserWSEndpoint to pass the Lightpanda's CDP server address.
const browser = await puppeteer.connect({
    //browserWSEndpoint: "ws://127.0.0.1:9222",
    browserWSEndpoint: "ws://127.0.0.1:9222/devtools/browser/ac278667-ca1d-494b-8c40-7ca000ccc078", // 这里首先要打一个隧道 从mac上到ubuntu ssh -R  9223:127.0.0.1:9222 wangli@192.168.1.14
});

// The rest of your script remains the same.
const context = await browser.createBrowserContext();
const page = await context.newPage();

// Dump all the links from the page.
const url = 'https://apply.jtw.beijing.gov.cn/apply/app/common/person/register';
await page.goto(url);

const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(row => {
        return row.getAttribute('href');
    });
});

console.log(links);

await page.close();
await context.close();
await browser.disconnect();