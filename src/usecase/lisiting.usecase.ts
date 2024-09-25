import { ListingRepository } from "../adapters/repositories/lisitng.repo";


export class ListingUsecase{
    constructor(private ListingRepository: ListingRepository) { }

    async listing(data:any):Promise<any>{
        return this.ListingRepository.listing(data)
    }
}