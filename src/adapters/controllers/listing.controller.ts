import { ListingUsecase } from "../../usecase/lisiting.usecase";
import { Request,Response } from "express-serve-static-core";

export class ListingController{
    private readonly listingUsecase: ListingUsecase;
    constructor(listingusecase: ListingUsecase) {
        this.listingUsecase = listingusecase;
    }

    async listing(req:Request,res:Response){
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
    async editListing(req: Request, res: Response): Promise<any> {
        try {
            const data = req.body;
            const listId = req.params.listId;
    
            if (!listId || !data) {
                return res.status(400).json({ message: "Invalid request: listId or data missing" });
            }
    
            const response = await this.listingUsecase.editListing(data, listId);
            
            if (response) {
                return res.status(200).json({ message: "success", data: response });
            } else {
                return res.status(404).json({ message: "Listing not found" });
            }
        } catch (error) {
            console.error("Controller error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }    
}