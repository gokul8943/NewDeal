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
    async getListing(page: any, search: any) {
        try {
            const limit = 10
            const searchQuery = search
                ? { title: { $regex: search, $options: 'i' } }
                : {};
            const query = {
                ...searchQuery
            };
            const total = await this.listingModel.countDocuments(query);
            const data = await listingModel.find(query).sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit).exec();
            return { data, total }
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    async getOneListing(lid: string) {
        try {
            const objectId = new mongoose.Types.ObjectId(lid)
            const data = await listingModel.findById(lid)
            return data
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getUserAddedListing(userId: string): Promise<any> {
        try {
            const data = await this.listingModel.aggregate([
                {
                    $match: {
                        userId:userId
                    }
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        type: 1,
                        status: 1,
                        price: 1,
                        isActive: 1,
                        image: { $slice: ["$image", 1] },
                        createdAt: 1,
                        updatedAt: 1
                    }
                },
                {
                    $sort: { createdAt: 1 }
                }
            ]);
            return data;
        } catch (error) {
            console.error('Error:', error);
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
    async accessListing(listId: string, access: boolean) {
        try {
            const response = await this.listingModel.findByIdAndUpdate(listId, { isActive: access })
            return response
        } catch (error) {
            console.log("Repository error:", error);
            throw error
        }
    }

}