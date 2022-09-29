"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";
import db from ".";

export interface ProductAdd {
  code: string;
  name: string;
  category: string;
  brand: string;
  type: string;
  description: string;
}

export const productAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  },
  code: {
    type: new DataTypes.STRING(9),
    allowNull: false,
    unique: true,
    field: "code",
  },
  name: {
    type: new DataTypes.STRING(90),
    allowNull: false,
    field: "name",
  },
  category: {
    type: new DataTypes.STRING(28),
    allowNull: false,
    field: "category",
  },
  brand: {
    type: new DataTypes.STRING(28),
    allowNull: true,
    field: "brand",
  },
  type: {
    type: new DataTypes.STRING(21),
    allowNull: true,
    field: "type",
  },
  description: {
    type: new DataTypes.STRING(180),
    allowNull: true,
    field: "description",
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    field: "created_at",
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    field: "updated_at",
  },
};

export class Product extends Model {
  id?: number;
  code!: string;
  name!: string;
  category!: string;
  brand?: string;
  type?: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

Product.init(productAttributes, {
  sequelize: db.sequelize,
  modelName: "Product",
  timestamps: false,
});
