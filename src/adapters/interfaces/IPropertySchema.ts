import mongoose ,{Document} from "mongoose";

// Define the main interface for the Property document
interface ILocation {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  }
  
  interface IFeatures {
    bedrooms: number;
    bathrooms: number;
    area: number;
    yearBuilt?: number;
  }
  
  interface IImage {
    url: string;
    caption?: string;
  }
  // Define interfaces for nested objects
interface IAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
  
export interface IPropertySchema extends Document {
    title: string;
    description: string;
    type: 'House' | 'Apartment' | 'Condo' | 'Land';
    status: 'For Sale' | 'For Rent' | 'Sold' | 'Rented';
    price: number;
    address: IAddress;
    location: ILocation;
    features: IFeatures;
    amenities: string[];
    images: IImage[];
    owner: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }