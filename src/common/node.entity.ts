import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class Node extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string
    @CreateDateColumn({type:"timestamp"})
    createdAt:Date
    @UpdateDateColumn({type:"timestamp"})
    updatedAt:Date
    
}