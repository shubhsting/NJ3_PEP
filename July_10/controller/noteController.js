const db = require("../models");


async function createNote(req, res) {
  try {
    const { title, description } = req.body;
    const createdNote = await db.Note.create({ title, description });
    return res.status(200).send({
      message: "note created successfully",
      note:createdNote,
    });
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: "Error occurred while creating note!!",
    });
  }
}

async function getNotes(req, res) {}

module.exports = { createNote, getNotes };
