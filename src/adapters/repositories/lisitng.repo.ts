import { Model } from "mongoose"
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
}