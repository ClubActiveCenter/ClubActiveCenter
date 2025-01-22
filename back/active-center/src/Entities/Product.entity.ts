import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category.entity";

@Entity({
    name:"products"
})

export class Product {

   @PrimaryGeneratedColumn("uuid")
     id:string

    @Column({
        length:50,
        nullable:false
    })
       name:string;

    @Column({
        type:"text",
        nullable:false
    })
     description:string

     @Column({
        type: "decimal",
        precision:10,
        scale:2,
        nullable:false
     })
     price:number;

     @Column({
        nullable:false
     })
     stock:number;

     @Column({
        default:"aca va una url por defecto"
     })

     imgUrl:string;

     @ManyToOne(() => Category, (category) => category.products)
     category: Category

       
}