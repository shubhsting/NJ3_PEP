const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const URL = "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/england-vs-new-zealand-final-1144530/full-scorecard";

function scanThisMatch(matchURL) {
    request(matchURL, callback)
}

function callback(error, response, html) {
    parseHTML(html)
}

// classes are always selected by .
// ids are always selected by #

function parseHTML(html) {
    const $ = cheerio.load(html);
    const bothInnings = $(".ds-rounded-lg.ds-mt-2");

    for(const inning of bothInnings) {
        const teamName = $(inning).find(".ds-text-title-xs.ds-font-bold.ds-capitalize").text();

        // get all the rows for that score card table
        const batsmanTableRows = $(inning).find(".ci-scorecard-table tbody tr");

        // iterating over each row
        for(const batsmanRow of batsmanTableRows){
            // get data for each row
            const batsManRowData = $(batsmanRow).find("td");
            
            if(batsManRowData.length > 6) { // this is genuine batsman data
               const batsmanName = $(batsManRowData[0]).find("a").text().trim();

               const batsmanRuns = $(batsManRowData[2]).text().trim();
               const batsManBalls = $(batsManRowData[3]).text().trim();
               const batsManFours = $(batsManRowData[5]).text().trim();
               const batsManSixes = $(batsManRowData[6]).text().trim();
               processBatsmanDetails(teamName, batsmanName, batsmanRuns, batsManBalls, batsManFours, batsManSixes)
            }
        }        
    }
}

function processBatsmanDetails(teamName, batsmanName, batsmanRuns, batsManBalls, batsManFours, batsManSixes) {
    createTeamFolderIfNotExists(teamName);

    let batsManfilePath = teamName + "/" + batsmanName + ".json";
    const batsManDetails = {
        name: batsmanName,
        runs: batsmanRuns, 
        balls: batsManBalls, 
        fours: batsManFours, 
        sixes: batsManSixes
    }

    fs.writeFileSync(batsManfilePath, JSON.stringify(batsManDetails))
}


function createTeamFolderIfNotExists(teamName) {
    const isFolderPresent = fs.existsSync(teamName);
    if(!isFolderPresent) {
        fs.mkdirSync(teamName);
    }
}
scanThisMatch(URL);