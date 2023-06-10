const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const URL = "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/england-vs-new-zealand-final-1144530/full-scorecard";

function scanThisMatch(matchURL) {
    request(matchURL, callback)
}

function callback(error, response, html) {
    if(error) {
        console.log("error came", error);
    } else {
        parseHTML(html)
    }
    
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

// for every new batsman scan/fectch data from scorecard file
// check whether an entry is already present for that batsman
// if entry is present, update the current runs into that value
// if entry is not present, add a new batsman value corresponding to the list.
// once we do that, sort the scorecard in descending order 
function createOrUpdateScorecard() {
    
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

    createOrUpdateFile(batsManfilePath, batsManDetails);
}

function createOrUpdateFile(path, batsManDetails) {
    let finalBatsmanEntries = []
    if(fs.existsSync(path)) {
        let batsmanEntries = fs.readFileSync(path, "utf-8");
        batsmanEntries = JSON.parse(batsmanEntries);
        finalBatsmanEntries = [...batsmanEntries]
    }
    finalBatsmanEntries = [...finalBatsmanEntries, batsManDetails]

    fs.writeFileSync(path, JSON.stringify(finalBatsmanEntries))
}

function createTeamFolderIfNotExists(teamName) {
    const isFolderPresent = fs.existsSync(teamName);
    if(!isFolderPresent) {
        fs.mkdirSync(teamName);
    }
}

module.exports = scanThisMatch;