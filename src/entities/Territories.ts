import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class Territories {
    @PrimaryColumn()
    TerritoryID: string
    @Column()
    TerritoryDescription: string
    @Column()
    RegionID: number
}