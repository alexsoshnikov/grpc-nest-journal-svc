import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Journal extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public title!: string;

  @Column({ type: 'integer' })
  public author!: number;

  @Column({ type: 'varchar' })
  public image: string;

  @Column({ type: 'varchar' })
  public body!: string;

  @Column({ type: 'datetime' })
  public datetime!: string;
}
