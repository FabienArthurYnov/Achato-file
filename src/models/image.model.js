import { DataTypes } from 'sequelize';
            import { sequelize } from '../config/db.js';

            export const Image = sequelize.define(
                'Image',
                {
                    Image_Id: {
                        type: DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true
                    },
                    Image_Name: {
                        type: DataTypes.STRING(80),
                        allowNull: false
                    },
                    Image_Link: {
                        type: DataTypes.STRING(255),
                        allowNull: false
                    },
                    Image_Alt: {
                        type: DataTypes.STRING(80),
                        allowNull: false
                    },
                },
                {
                    tableName: 'images',
                    timestamps: false,
                }
            );