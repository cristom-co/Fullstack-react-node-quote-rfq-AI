import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "qoutes",
    modelName: "Quote"
})
class Quote extends Model{
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.STRING,
    })
    declare client: string


    @Column({
        type: DataType.STRING,
    })
    declare email: string


    @Column({
        type: DataType.STRING,
    })
    declare phoneNumber: string


    @Column({
        type: DataType.STRING
    })
    declare deliveryLocation: string


    @Column({
        type: DataType.STRING
    })
    declare deliveryDate: string


    @Column({
        type: DataType.TEXT
    })
    declare products: string

    
    @Column({
        type: DataType.FLOAT
    })
    declare total: number
}

export default Quote; 