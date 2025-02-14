import { AdminUsecase } from "../../usecase/admin.usecase";


export class AdminController{
    private readonly adminUsecase: AdminUsecase;
    constructor(adminusecase:AdminUsecase){
        this.adminUsecase = adminusecase
    }
    
}