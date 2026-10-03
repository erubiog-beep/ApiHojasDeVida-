const mongoose = require('mongoose');

const PERSONAS = ['emuar', 'laura', 'fabian'];

const experienciaSchema = new mongoose.Schema(
  {
    // A qué hoja de vida pertenece la experiencia
    persona: {
      type: String,
      required: [true, 'La persona es obligatoria'],
      enum: { values: PERSONAS, message: 'persona debe ser una de: ' + PERSONAS.join(', ') },
      lowercase: true,
      trim: true,
      index: true
    },
    empresa: {
      type: String,
      required: [true, 'La empresa es obligatoria'],
      trim: true,
      minlength: [2, 'La empresa debe tener al menos 2 caracteres'],
      maxlength: 100
    },
    cargo: {
      type: String,
      required: [true, 'El cargo es obligatorio'],
      trim: true,
      minlength: [2, 'El cargo debe tener al menos 2 caracteres'],
      maxlength: 100
    },
    fechaInicio: {
      type: Date,
      required: [true, 'La fecha de inicio es obligatoria']
    },
    fechaFin: {
      type: Date,
      default: null
    },
    actual: {
      type: Boolean,
      default: false
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [600, 'La descripción no puede superar 600 caracteres'],
      default: ''
    }
  },
  { timestamps: true, versionKey: false }
);

// Reglas entre campos
experienciaSchema.pre('validate', function (next) {
  if (this.actual) this.fechaFin = null;
  if (!this.actual && !this.fechaFin) {
    this.invalidate('fechaFin', 'Indica la fecha de fin o marca la experiencia como actual');
  }
  if (this.fechaFin && this.fechaInicio && this.fechaFin < this.fechaInicio) {
    this.invalidate('fechaFin', 'La fecha de fin no puede ser anterior a la de inicio');
  }
  next();
});

module.exports = mongoose.model('Experiencia', experienciaSchema);
module.exports.PERSONAS = PERSONAS;
