import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StoreService {
    private externalAPIUrl = "https://fakestoreapi.com/products"
    
    async getProducts(){
        
        try{
            const response = await axios.get(this.externalAPIUrl)
            return response.data;
        
        }catch(err){
            console.log(err)
            throw new Error ( `Ocrrió un error al obtener los productos ${err}`)
        }
    }
}
