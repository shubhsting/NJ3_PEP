const fs = require("fs");
const notesModel = require("../db/db");

async function createNote(req, res) {
  try {
    const { title, description } = req.body;

    // mongo db logioc to create and store in monodb
    const note = await notesModel.create({title, description});

    return res.status(200).json({
      message: "Note successfully created!!",
      note: note
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
    const note = await notesModel.findOneAndUpdate({title: title}, {description: description});
    return res.status(200).json({
        message: "Note updates successfully!!",
        note: {...note, description}
      });
    // write logic to update the node
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Some  error occurred while updating note ${e}` });
  }
}

async function deleteNote(req, res) {
  try {
    const { title } = req.query;
        // delete a note from mongodb

    await notesModel.findOneAndDelete({title});

    return res.status(200).json({
      message: "Successfully deleted the note",
    });
  } catch (e) {
    res.status(500).send({
      message: `Some error occurred while deleting ${e}`,
    });
  }
}

async function getNote(req, res) {
  try {
    const { title } = req.query;

    // get a note via title from mongodb
    const note = await notesModel.findOne({title})
    if(!note) {
        return res.status(400).json({
            message: "Note is not present in list",
          });
    }
    return res.status(200).send({
        message: "note foound successfully",
        note: note
    })

  } catch (e) {
    res.status(500).send({
      message: `Some error occurred while fetching note ${e}`,
    });
  }
}

module.exports = { createNote, updateNote, deleteNote, getNote };
