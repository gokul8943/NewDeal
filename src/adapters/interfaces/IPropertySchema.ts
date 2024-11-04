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
  
  interface Image {
    uid: string;
    name: string;
    size: number;
    type: string;
    thumbUrl: string;
  }
  // Define interfaces for nested objects
interface IAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }

  interface IAvailability {
    status: 'available' | 'booked' | 'unavailable';
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
    availability:IAvailability;
    amenities: string[];
    isActive:boolean;
    isAvailable:boolean;
    image: Image[];
    owner: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }