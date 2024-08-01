import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  username: string;

  @Column('nvarchar')
  fullname: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column('nvarchar')
  unit: string;

  @Column('nvarchar')
  position: string;

  @Column('nvarchar')
  department: string;

  @Column()
  division: string;

  @Column()
  avatarImage: string;

  @Column()
  status: string;
}
