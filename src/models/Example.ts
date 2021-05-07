import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Example extends Model {
    @Column
    example: string;
}
