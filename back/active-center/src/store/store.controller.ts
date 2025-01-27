import { Controller, Get, HttpCode } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Get('allProducts')
    async getProducts() {
        console.log('Ruta /store/allProducts llamada');
        return await this.storeService.getProducts();
    }
}