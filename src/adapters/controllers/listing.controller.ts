import { ListingUsecase } from "../../usecase/lisiting.usecase";
import { Request, Response } from "express-serve-static-core";

export class ListingController {
    private readonly listingUsecase: ListingUsecase;
    constructor(listingusecase: ListingUsecase) {
        this.listingUsecase = listingusecase;
    }

    async listing(req: Request, res: Response) {
        try {
            const datas = req.body
            const images = Array.isArray(req.files) 
            ? (req.files as Express.Multer.File[]).map((file) => ({
                  url: file.path,
              }))
            : [];        
              const data = {
                ...datas,
                images, 
              };            
            const response = await this.listingUsecase.listing(data);
            if (response) {
                return res.status(200).json({ message: "success", data: response })
            } else {
                return res.status(400).json({ message: "Failed" })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "internal server errror" })
        }

    }
    async getListing(req:Request,res:Response){
        const { page = 1, search = '' } = req.query;
        try {
            const response = await this.listingUsecase.getListing(page,search)  
            if(response){
                return res.status(200).json({message:"Success",response})
            }else{
                return res.status(400).json({message:"failed"})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"Internal server error"})
        }
    } 

    async getOneListing(req:Request,res:Response):Promise<any>{
        try {
            const lid = req.body
            const data = await this.listingUsecase.getOneListing(lid)
            if(data){
                return res.status(200).json({message:"Success",data})
            }else{
                return res.status(400).json({message:"Failed to find"})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"Internal server error"})
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

    async accessListing(req: Request, res: Response): Promise<any> {
        try {
            const listId = req.params.listId
            const active = req.body.active
            const response = await this.listingUsecase.accessListing(listId,active)
            if (response) {
                return res.status(200).json({ message: "success" })
            } else {
                return res.status(400).json({ message: "failed" })
            }
        } catch (error) {
            console.log("Controller error:", error);
            return res.status(500).json({ message: "Internal server error" })
        }

    }
}