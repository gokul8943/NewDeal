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
            return this.listingController.listing(req,res)
        });
        this.router.put("/user/editListing/:listId", (req: Request, res: Response) => {
            return this.listingController.editListing(req, res);
        });
        this.router.post("/user/accessListing/:listId", (req: Request, res: Response) => {
            return this.listingController.accessListing(req, res);  
        });
        
    }
}
export const listingRouter = new ListingRoute().router;