import { Router } from "express";

export class AdminRouter {
    router = Router()
}
   

export const adminRouter = new AdminRouter().router;
