import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journal } from './entity/journal.entity';
import {
  CreateJournalRequestDto,
  DeleteJournalRequestDto,
  EditJournalRequestDto,
  FindOneRequestDto,
} from './journal.dto';
import {
  CreateJournalResponse,
  EditJournalResponse,
  FindAllResponse,
  FindOneResponse,
} from './journals.pb';

@Injectable()
export class JournalService {
  @InjectRepository(Journal)
  private readonly repository: Repository<Journal>;

  public async findOne({ id }: FindOneRequestDto): Promise<FindOneResponse> {
    const journal: Journal = await this.repository.findOne({ where: { id } });

    if (!journal) {
      return {
        id: id,
        data: null,
        error: ['Product not found'],
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      id: id,
      data: journal,
      error: null,
      status: HttpStatus.OK,
    };
  }

  public async createJournal(
    payload: CreateJournalRequestDto,
  ): Promise<CreateJournalResponse> {
    const product: Journal = new Journal();

    product.title = payload.title;
    product.body = payload.body;
    product.author = payload.author;
    product.datetime = payload.datetime;

    await this.repository.save(product);

    return {
      id: product.id,
      data: product,
      error: null,
      status: HttpStatus.OK,
    };
  }

  public async updateJournal(
    payload: EditJournalRequestDto,
  ): Promise<EditJournalResponse> {
    const journal: Journal = await this.repository.findOne({
      where: { id: payload.id },
    });

    journal.title = payload.title;
    journal.body = payload.body;
    journal.author = payload.author;
    journal.datetime = payload.datetime;

    await this.repository.save(journal);

    return {
      id: journal.id,
      data: journal,
      error: null,
      status: HttpStatus.OK,
    };
  }

  public async deleteJournal(payload: DeleteJournalRequestDto): Promise<void> {
    await this.repository.delete({ id: payload.id });
  }

  public async findAll(): Promise<FindAllResponse> {
    const journals: Journal[] = await this.repository.find();

    return {
      data: journals,
      error: null,
      status: HttpStatus.OK,
    };
  }
}
