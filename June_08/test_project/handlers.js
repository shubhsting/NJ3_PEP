const fs = require("fs");

function  createNote(argv) {
    let alreadyPresentNotes = fs.readFileSync("notes.txt", "utf-8"); 
    alreadyPresentNotes = JSON.parse(alreadyPresentNotes);
    let isNotePresent = false
    //enhanced for loop
    for(const element of alreadyPresentNotes) {
        if(element.title == argv.title) {
            isNotePresent = true
        }
    }

    // conventional for loop
    // for(let i=0;i<alreadyPresentNotes.length;i++) {
    //     if(alreadyPresentNotes[i].title == argv.title) {
    //         isNotePresent = true
    //     }
    // }

    if(!isNotePresent){
        console.log("new note have been added!!")
        const newListOfNotes = [{"title":argv.title, "description": argv.description}, ...alreadyPresentNotes]
        fs.writeFileSync("notes.txt", JSON.stringify(newListOfNotes));
    }
}

function updateNote(argv) {
    let alreadyPresentNotes = fs.readFileSync("notes.txt", "utf-8");
    alreadyPresentNotes = JSON.parse(alreadyPresentNotes);
    let newListOfNotes = []

    for(const element of alreadyPresentNotes) {
        if(element.title == argv.title) {
            newListOfNotes.push({"title": argv.title, "description": argv.description})
        } else {
            newListOfNotes.push(element);
        }
    }
    fs.writeFileSync("notes.txt", JSON.stringify(newListOfNotes))
}

function deleteNote(argv) {
    let alreadyPresentNotes = fs.readFileSync("notes.txt", "utf-8");
    alreadyPresentNotes = JSON.parse(alreadyPresentNotes);

    let newListOfNotes = [];

    for(const element of alreadyPresentNotes) {
        if(element.title != argv.title) {
            newListOfNotes.push(element);
        }
    }
    fs.writeFileSync("notes.txt", JSON.stringify(newListOfNotes))
}

module.exports = {
    createNote, 
    updateNote,
    deleteNote
}