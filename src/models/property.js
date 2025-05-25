import { Schema, model } from 'mongoose';
import validator from 'validator';

import { isValueOrNull, nullify } from '#utils/helpers';

const propertySchema = new Schema(
  {
    hash: {
      type: String,
      unique: true,
      required: [true, 'A property must have a hash'],
    },

    sourceId: {
      type: String,
      required: [true, 'A property must have a source ID'],
    },

    agency: {
      type: String,
      required: [true, 'A property must have an agency'],
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
      validate: isValueOrNull('number', 'Price must be a number or null if unknown'),
      set: nullify('number'),
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
      validate: isValueOrNull('number', 'Surface must be a number or null if unknown'),
      set: nullify('number'),
      default: null,
    },

    bedrooms: {
      type: Number,
      validate: isValueOrNull('number', 'Bedrooms must be a number or null if unknown'),
      set: nullify('number'),
      default: null,
    },

    garden: {
      type: Boolean,
      validate: isValueOrNull('boolean', 'Garden must be true, false, or null if unknown'),
      set: nullify('boolean'),
      default: null,
    },

    terrace: {
      type: Boolean,
      validate: isValueOrNull('boolean', 'Terrace must be true, false, or null if unknown'),
      set: nullify('boolean'),
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
  }
);

const Property = model('Property', propertySchema);

export default Property;
