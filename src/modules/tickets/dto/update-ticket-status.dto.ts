import { IsEnum } from 'class-validator';

import { TicketStatus } from '../../../common/enums/ticket-status.enum';

export class UpdateTicketStatusDto {
    @IsEnum(TicketStatus, {
        message: 'Status must be OPEN, IN_PROGRESS, RESOLVED or CLOSED...',
    })
    status: TicketStatus;
}
