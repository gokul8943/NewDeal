import mongoose, { Model } from "mongoose"
import { IPropertySchema } from "../interfaces/IPropertySchema"
import listingModel from '../../framework/models/property.model'


export class ListingRepository {
    private readonly listingModel: Model<IPropertySchema>
    constructor(listingModel: Model<IPropertySchema>) {
        this.listingModel = listingModel
    }

    async listing(data: any): Promise<any> {
        try {
            const property = await listingModel.insertMany(data)
            return property
        } catch (error) {
            console.log(error);
        }
    }
    async editListing(data: any, listId: string): Promise<any> {
        try {
            const updatedListing = await this.listingModel.findByIdAndUpdate(
                listId,
                { $set: data },
                { new: true } 
            );
    
            if (!updatedListing) {
                console.log("Failed to find listing with ID:", listId);
                return null;
            }
    
            return updatedListing;
        } catch (error) {
            console.error("Repository error:", error);
            throw error;  
        }
    }
    
}