import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  FindOneRequestDto,
  CreateJournalRequestDto,
  EditJournalRequestDto,
  DeleteJournalRequestDto,
} from './journal.dto';
import { JournalService } from './journal.service';
import {
  CreateJournalResponse,
  FindAllResponse,
  FindOneResponse,
  JOURNAL_SERVICE_NAME,
} from './journals.pb';

@Controller()
export class JournalController {
  @Inject(JournalService)
  private readonly service: JournalService;

  @GrpcMethod(JOURNAL_SERVICE_NAME, 'CreateJournal')
  private createJournal(
    payload: CreateJournalRequestDto,
  ): Promise<CreateJournalResponse> {
    return this.service.createJournal(payload);
  }

  @GrpcMethod(JOURNAL_SERVICE_NAME, 'EditJournal')
  private editJournal(
    payload: EditJournalRequestDto,
  ): Promise<CreateJournalResponse> {
    return this.service.updateJournal(payload);
  }

  @GrpcMethod(JOURNAL_SERVICE_NAME, 'DeleteJournal')
  private deleteJournal(payload: DeleteJournalRequestDto): Promise<void> {
    return this.service.deleteJournal(payload);
  }

  @GrpcMethod(JOURNAL_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindOneRequestDto): Promise<FindOneResponse> {
    return this.service.findOne(payload);
  }

  @GrpcMethod(JOURNAL_SERVICE_NAME, 'FindAll')
  private findAll(): Promise<FindAllResponse> {
    return this.service.findAll();
  }
}
