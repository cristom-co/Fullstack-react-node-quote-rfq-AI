import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "products",
    modelName: "Product"
})
class Product extends Model{
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.STRING,
    })
    declare product: string


    @Column({
        type: DataType.SMALLINT,
    })
    declare quantity: number


    @Column({
        type: DataType.FLOAT,
    })
    declare price: number
}

export default Product; 