const cheerio = require("cheerio");
const request =  require('request')
const scanThisMatch = require("./match");

const URL = "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-schedule-fixtures-and-results?view=results"

request(URL, callback)

function callback(error, response, html) {
    scanAllMatches(html)
}


function scanAllMatches(html) {
    const $ = cheerio.load(html);

    const allScorecardDiv = $('.ds-p-0 .ds-no-tap-higlight');

    for(const matchCard of allScorecardDiv) {
        const link = $(matchCard).attr("href");
        const completeLink = "https://www.espncricinfo.com" + link;
        // console.log(completeLink)
        setTimeout(()=>{
            scanThisMatch(completeLink);
        }, 2000)
    }
}
