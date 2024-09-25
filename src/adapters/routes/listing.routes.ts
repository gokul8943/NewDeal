import { Router,Request,Response } from "express";
import userModel from "../../framework/models/user.model";
import Property from "../../framework/models/property.model";
import { ListingUsecase } from "../../usecase/lisiting.usecase";
import { ListingController } from "../controllers/listing.controller";
import { ListingRepository } from "../repositories/lisitng.repo";

export class ListingRoute{
    router = Router()
    listingRepository = new ListingRepository(Property);
    listingUsecase = new ListingUsecase(this.listingRepository);
    listingController = new ListingController(this.listingUsecase);

    constructor(){
        this.router.post("/user/listing",(req:Request,res:Response)=>{
            return this.listingController.lisitng(req,res)
        })
    }
}
export const listingRouter = new ListingRoute().router;