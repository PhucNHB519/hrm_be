import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserBriefEntity } from './userBrief.entity';

@Entity('Brief')
export class BriefEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('nvarchar')
  briefCode: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  sentDate: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  endDate: Date;

  @Column('nvarchar')
  content: string;

  @Column('nvarchar')
  phase: string;

  @Column('nvarchar')
  processingStep: string;

  @Column('nvarchar')
  product: string;

  @Column('nvarchar')
  progress: string;

  @Column()
  status: string;

  @OneToMany(() => UserBriefEntity, userBrief => userBrief.user)
  userBriefs: UserBriefEntity[];
}
