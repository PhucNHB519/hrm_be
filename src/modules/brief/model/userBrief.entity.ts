import { UserEntity } from "src/modules/user/model/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BriefEntity } from "./brief.entity";

@Entity('UserBrief')
export class UserBriefEntity {
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column()
    interactionType: string;

    @ManyToOne(() => UserEntity, user => user.userBriefs)
    user: UserEntity;

    @ManyToOne(() => BriefEntity, brief => brief.userBriefs)
    brief: BriefEntity;
}

//user_brief:
//- Người tạo
//- Người đảm nhận
//- Báo cáo lại
//- Phê duyệt