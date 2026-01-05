var mongoose = require("mongoose");
// Setup schema
var contactSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: String,
  phone: String,
  note: String,
  city: String,
  street: String,
  houseNumber: String,
  zipCode: Number,
  birthDate: Date,
  create_date: {
    type: Date,
    default: Date.now,
  },
});
// Export Contact model
var Contact = (module.exports = mongoose.model("contact", contactSchema));
