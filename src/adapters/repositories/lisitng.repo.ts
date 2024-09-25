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
    async editListing(data:any,listId:string):Promise <any>{
        try {
            console.log('id',listId);
            console.log('data---',data);
            
            
            const property = await this.listingModel.findByIdAndUpdate(
                listId, 
                { 
                    $set: data 
                },
                { new: true } 
            );
            if (!property) {
                console.log("Failed to find property with ID:", listId);
                return null;
            }
            return property; 
                
        } catch (error) {
            console.log(error);
            
        }
    }
}