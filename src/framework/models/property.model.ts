import mongoose, { Document, Schema, Model } from 'mongoose';
import { IPropertySchema } from '../../adapters/interfaces/IPropertySchema';

interface IImage {
  uid: string;
  name: string;
  size: number;
  type: string;
  thumbUrl: string;
}
// Create the Mongoose schema
const ImageSchema: Schema<IImage> = new Schema<IImage>({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
  thumbUrl: { type: String, required: true },
});

const PropertySchema: Schema<IPropertySchema> = new Schema({
  userId:{type:String},
  title: { type: String, },
  description: { type: String, },
  type: { type: String, enum: ['House', 'Apartment', 'Condo', 'Land'], },
  status: { type: String, enum: ['For Sale', 'For Rent', 'Sold', 'Rented'], },
  price: { type: Number, },
  address: {
    street: { type: String, },
    city: { type: String, },
    state: { type: String, },
    zipCode: { type: String, },
    country: { type: String, }
  },
  location: {
    type: { type: String, enum: ['Point'] },
    coordinates: { type: [Number] }
  },
  features: {
    bedrooms: { type: Number, },
    bathrooms: { type: Number, },
    area: { type: Number, },
    yearBuilt: { type: Number }
  },
  availability: [{
    status: { type: String, enum: ['available', 'booked', 'unavailable'] }
  }],
  isActive: { type: Boolean, default: true },
  image: [ImageSchema],
  owner: { type: Schema.Types.ObjectId, ref: 'User', },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for geospatial queries
PropertySchema.index({ location: '2dsphere' });

// Create and export the model
const Property: Model<IPropertySchema> = mongoose.model<IPropertySchema>('Property', PropertySchema);

export default Property;
