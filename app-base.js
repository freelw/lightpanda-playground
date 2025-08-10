'use strict'

import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({

});

// The rest of your script remains the same.
const context = await browser.createBrowserContext();
const page = await context.newPage();

// Dump all the links from the page.
await page.goto('https://baidu.com/');

const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(row => {
        return row.getAttribute('href');
    });
});

console.log(links);

await page.close();
await context.close();
await browser.close();