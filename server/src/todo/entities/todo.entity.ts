import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'todo',
})
export class Todo extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  title: string;

  @Column({ defaultValue: false })
  completed: boolean;
}
