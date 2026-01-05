Contact = require("../models/contactModel");
// Handle index actions

exports.index = async function (req, res) {
  try {
    const contacts = await Contact.find();
    res.json({
      status: "success",
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
// Handle create contact actions
exports.new = async function (req, res) {
  try {
    const contact = new Contact();
    contact.firstName = req.body.firstName
      ? req.body.firstName
      : contact.firstName;
    contact.lastName = req.body.lastName ? req.body.lastName : contact.lastName;
    contact.gender = req.body.gender || contact.gender;
    contact.email = req.body.email || contact.email;
    contact.phone = req.body.phone || contact.phone;
    contact.note = req.body.note || contact.note;
    contact.city = req.body.city || contact.city;
    contact.street = req.body.street || contact.street;
    contact.houseNumber = req.body.houseNumber || contact.houseNumber;
    contact.zipCode = req.body.zipCode || contact.zipCode;
    contact.birthDate = req.body.birthDate || contact.birthDate;

    // save the contact and check for errors
    await contact.save();

    res.json({
      message: "New contact created!",
      data: contact,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
// Handle view contact info
exports.view = async function (req, res) {
  try {
    const contact = await Contact.findById(req.params.contact_id);
    if (!contact) return res.status(404).send({ message: "Contact not found" });
    res.json({
      message: "Contact details loading..",
      data: contact,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
// Handle update contact info
exports.update = async function (req, res) {
  try {
    const contact = await Contact.findById(req.params.contact_id);
    if (!contact) return res.status(404).send({ message: "Contact not found" });

    contact.firstName = req.body.firstName
      ? req.body.firstName
      : contact.firstName;
    contact.lastName = req.body.lastName ? req.body.lastName : contact.lastName;
    contact.gender = req.body.gender || contact.gender;
    contact.email = req.body.email || contact.email;
    contact.phone = req.body.phone || contact.phone;
    contact.note = req.body.note || contact.note;
    contact.city = req.body.city || contact.city;
    contact.street = req.body.street || contact.street;
    contact.houseNumber = req.body.houseNumber || contact.houseNumber;
    contact.zipCode = req.body.zipCode || contact.zipCode;
    contact.birthDate = req.body.birthDate || contact.birthDate;

    // save the contact and check for errors
    await contact.save();

    res.json({
      message: "Contact Info updated",
      data: contact,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
// Handle delete contact
exports.delete = async function (req, res) {
  try {
    const result = await Contact.deleteOne({
      _id: req.params.contact_id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.json({
      status: "success",
      message: "Contact deleted",
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
