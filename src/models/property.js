import { Schema, model } from 'mongoose';
import validator from 'validator';

const propertySchema = new Schema(
  {
    hash: {
      type: String,
      unique: true,
      required: [true, 'A property must have a hash'],
    },

    agency: {
      type: String,
      required: [true, 'A property must have an agency'],
      enum: {
        values: ['Era', 'Century 21', 'Immoweb', 'Latour & Petit', 'Realo'],
      },
    },

    type: {
      type: String,
      required: [true, 'A property must have a type'],
      enum: {
        values: ['apartment', 'house'],
      },
    },

    image: {
      type: String,
      required: [true, 'A property must have an image'],
      validate: {
        validator: validator.isURL,
        message: 'Must provide a valid URL',
      },
    },

    price: {
      type: Number,
      default: null,
    },

    zip: {
      type: Number,
      required: [true, 'A property must have a postal code'],
    },

    city: {
      type: String,
      required: [true, 'A property must have a city'],
    },

    surface: {
      type: Number,
      required: [true, 'A property must have a surface'],
    },

    bedrooms: {
      type: Number,
      required: [true, 'A property must have bedrooms'],
      default: null,
    },

    url: {
      type: String,
      required: [true, 'A property must have a URL'],
      validate: {
        validator: validator.isURL,
        message: 'Must provide a valid URL',
      },
    },
  },

  // Schema Options
  {
    versionKey: false,
    timestamps: { createdAt: 'scrapedAt', updatedAt: false },
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
      },
    },
  },
);

const Property = model('Property', propertySchema);

export default Property;
