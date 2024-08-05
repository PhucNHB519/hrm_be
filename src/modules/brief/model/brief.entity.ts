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

  @Column({ type: 'datetime', nullable: true })
  doneDate: Date;

  @Column({ type: 'datetime', nullable: true })
  sentDate: Date;

  @Column({ type: 'datetime', nullable: true })
  endDate: Date;

  @Column({ type: 'nvarchar', nullable: true })
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

  @OneToMany(() => UserBriefEntity, (userBrief) => userBrief.user)
  userBriefs: UserBriefEntity[];
}
