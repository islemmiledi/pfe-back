import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Node } from 'src/common/node.entity';

@Entity('aboutus')
export class Aboutus extends Node {
  @Column({ length: 100 })
  Title: string;

  @Column({ length: 255 })
  Image: string;

  @Column('text')
  Description: string;
}
