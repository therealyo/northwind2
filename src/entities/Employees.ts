import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity()
export class Employees {
    @PrimaryColumn()
    EmployeeID: number
    @Column()
    LastName: string
    @Column()
    FirstName: string
    @Column()
    Title: string
    @Column()
    TitleOfCourtesy: string
    @Column()
    BirthDate: string
    @Column()
    HireDate: string
    @Column()
    Address: string
    @Column()
    City: string
    @Column()
    Region: string
    @Column()
    PostalCode: string
    @Column()
    Country: string
    @Column()
    HomePhone: string
    @Column()
    Extension: number
    @Column()
    Notes: string

    @Column()
    ReportsTo: number
    
    @OneToOne(type => Employees, reports => reports.EmployeeID,{ 
        cascade: true, 
        onDelete: "CASCADE" 
    })
    @JoinColumn({ name: 'EmployeeID' })
    Reports: Employees
}
