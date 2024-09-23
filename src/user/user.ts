import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users'})
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { nullable: false, unique: true})
    email: string

    @Column('varchar', { nullable: false, unique: true})
    username: string

    @Exclude()
    @Column('varchar', { nullable: false})
    password: string

    @Column('varchar', {nullable: false})
    fullName: string

    @Column('date', { nullable: false })
    birthDate: string
}

