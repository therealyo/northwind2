import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class Categories {
    @PrimaryColumn()
    CategoryID: number

    @Column()
    CategoryName: string

    @Column()
    Description: string
}