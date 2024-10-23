const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      min:0,
      max: 100000000,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('product', productSchema);
