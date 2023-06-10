// const points = [40, 100, 1, 5, 25, 10];
// points.sort(function(entry1, entry2){return entry2 - entry1});
// points.sort(function(entry1, entry2){return entry1 - entry2});
// console.log(points)


const scorecard = [{"batsmanName": "test1", "runs": 50, "balls": 30}, {"batsmanName": "test2", "runs": 50, "balls": 100}, {"batsmanName": "test3", "runs": 90, "balls": 300}]

scorecard.sort(function (entry1, entry2) {
    if(entry1.runs == entry2.runs) {
        return entry1.balls - entry2.balls
    }
    return entry2.runs - entry1.runs
})
console.log(scorecard)