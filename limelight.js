const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

async function limelight(query) {
    const data = []
    await puppeteer.launch({args: ['--no-sandbox']}).then(async browser => {
        const page = await browser.newPage();
        await page.goto('https://www.limelight.co.id/');
        await page.focus('#song-search')
        await page.keyboard.type(query)
        await page.evaluate(() => { document.querySelector('#search-btn').click() })
        await page.waitFor('#lists > tr',{timeout:3000})
        const result = await page.content()
        console.log(cheerio('tbody#lists > tr', result).length)
        cheerio('tbody#lists > tr', result).each(function (index) {
            if (index != 5) {
                data.push({
                    singer: cheerio(this).children().first().text(),
                    song: cheerio(this).children().last().text()
                })
            }
        })
        await browser.close();
    })
        .catch(function () {
            return {
                success: false
            }
        })
    return data
}
module.exports = limelight
