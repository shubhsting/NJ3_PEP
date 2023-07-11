const db = require("../models");

async function createNote(req, res) {
  try {
    const { title, description, createdBy } = req.body;
    const createdNote = await db.Note.create({ title, description, createdBy });
    return res.status(200).send({
      message: "note created successfully",
      note: createdNote,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Error occurred while creating note!!",
    });
  }
}

async function getNotes(req, res) {
  try {
    const { count, rows } = await db.Note.findAndCountAll();
    return res.status(200).send({
      count,
      rows,
    });
  } catch (e) {
    return res.status(500).send({
      message: "error occurred",
    });
  }
}

async function updateNote(req, res) {
  try {
    const { title, description } = req.body;
    await db.Note.update({ description }, { where: { title } });
    return res.status(500).send({
      message: "note updated successfully",
    });
  } catch (e) {
    return res.status(500).send({
      message: "some error occured",
    });
  }
}

async function deleteNote(req, res) {
  try {
    const { title } = req.body;
    await db.Note.destroy({ where: { title } });
    return res.status(200).send({
      message: "note deleted successfully",
    });
  } catch (e) {
    return res.status(500).send({
      message: "error occurred while deleting note",
    });
  }
}
module.exports = { createNote, getNotes, updateNote, deleteNote };
