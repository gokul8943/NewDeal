import { ListingUsecase } from "../../usecase/lisiting.usecase";
import { Request,Response } from "express-serve-static-core";

export class ListingController{
    private readonly listingUsecase: ListingUsecase;
    constructor(listingusecase: ListingUsecase) {
        this.listingUsecase = listingusecase;
    }

    async lisitng(req:Request,res:Response){
        try {
            const data = req.body
            const response = await this.listingUsecase.listing(data);
            if(response){
              return res.status(200).json({message:"success",data:response})
            }else{
                return res.status(400).json({message:"Failed"})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"internal server errror"})
        }
      
    }
}