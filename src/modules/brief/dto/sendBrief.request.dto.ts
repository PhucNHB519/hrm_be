import { ApiProperty } from "@nestjs/swagger";

export class SendBriefDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    doneDate: Date;

    @ApiProperty()
    content: string;
}