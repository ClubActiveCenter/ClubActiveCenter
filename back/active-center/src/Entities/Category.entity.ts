import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";



@Entity({
    name:"categories"
})

export class Category {
    
    @PrimaryGeneratedColumn("uuid")
    id: string 
 

    @Column({
        nullable:false,
        length:50
    })
    name:string

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

}