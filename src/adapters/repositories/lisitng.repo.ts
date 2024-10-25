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
    async getListing(){
        try {
            const data = await listingModel.find()
            console.log('data',data);
            
             return data
        } catch (error) {
            console.log(error);
            throw error
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
    async accessListing(listId:string,access:boolean){
        try {
            const response = await this.listingModel.findByIdAndUpdate(listId,{ isActive: access })
            return response
        } catch (error) {
            console.log("Repository error:",error);
            throw error
        }
    }
    
}