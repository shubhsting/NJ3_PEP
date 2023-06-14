const fs = require("fs");

async function createNote(req, res) {
  try {
    const { title, description } = req.body;

    let alreadyPresentNotes = fs.readFileSync("notes.txt", "utf-8");
    alreadyPresentNotes = JSON.parse(alreadyPresentNotes);

    //enhanced for loop
    for (const element of alreadyPresentNotes) {
      if (element.title == title) {
        return res.status(400).json({
          message: "This note title is already taken!! Kindly select a new one",
        });
      }
    }

    console.log("new note have been added!!");
    const newListOfNotes = [
      { title: title, description: description },
      ...alreadyPresentNotes,
    ];
    fs.writeFileSync("notes.txt", JSON.stringify(newListOfNotes));

    return res.status(200).json({
      message: "Note successfully created!!",
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Some client error occurred while creating note ${e}` });
  }
}

async function updateNote(req, res) {
  // const json =  {"name": "Shubham", "phone": "12345"}
  // json.name   json.phone

  // const {name, phone} = json
  try {
    const { title, description } = req.body;

    let alreadyPresentNotes = fs.readFileSync("notes.txt", "utf-8");
    alreadyPresentNotes = JSON.parse(alreadyPresentNotes);
    let isNotePresent = false;
    let newNotesList = [];
    for (const element of alreadyPresentNotes) {
      if (element.title == title) {
        isNotePresent = true;
      } else {
        newNotesList.push(element);
      }
    }
    if (!isNotePresent) {
      return res.status(400).json({
        message: "Cannot update note as it is not present in our database",
      });
    }
    newNotesList.push({ title: title, description: description });

    fs.writeFileSync("notes.txt", JSON.stringify(newNotesList));
    return res.status(200).json({
      message: "note have been updated successfully",
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Some client error occurred while updating note ${e}` });
  }
}

module.exports = { createNote, updateNote };
