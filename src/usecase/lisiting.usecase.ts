import { ListingRepository } from "../adapters/repositories/lisitng.repo";


export class ListingUsecase{
    constructor(private ListingRepository: ListingRepository) { }

    async listing(data:any):Promise<any>{
        return this.ListingRepository.listing(data)
    }
    async editListing(data:any,listId:string):Promise<any>{
        return this.ListingRepository.editListing(data,listId)
    }
    async getListing(page:any,search:any){
        return this.ListingRepository.getListing(page,search)
    }
    async getOneListing(lid:string){
        return this.ListingRepository.getOneListing(lid)
    }
    async accessListing(listId:string,active:boolean):Promise<any>{
        return this.ListingRepository.accessListing(listId,active)
    }
}