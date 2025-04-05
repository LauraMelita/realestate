import { Schema, model } from 'mongoose';
import validator from 'validator';

const apartmentSchema = new Schema(
  {
    hash: {
      type: String,
      unique: true,
      required: [true, 'An apartment must have a hash'],
    },

    price: {
      type: Number,
      required: [true, 'An apartment must have a price'],
    },

    surface: {
      type: Number,
      required: [true, 'An apartment must a surface'],
    },

    postalCode: {
      type: Number,
      required: [true, 'An apartment must have a postal code'],
    },

    city: {
      type: String,
      required: [true, 'An apartment must have a city'],
    },

    agency: {
      type: String,
      required: [true, 'An apartment must have an agency'],
      enum: {
        values: ['immoweb'],
      },
    },

    url: {
      type: String,
      required: [true, 'An apartment must have a URL'],
      validate: {
        validator: validator.isURL,
        message: 'Must provide a valid URL',
      },
    },
  },

  // Schema Options
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
  },
);

const Apartment = model('Apartment', apartmentSchema);

export default Apartment;
