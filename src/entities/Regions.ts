import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class Regions {
    @PrimaryColumn()
    RegionID: number
    @Column()
    RegionDescription: string
}