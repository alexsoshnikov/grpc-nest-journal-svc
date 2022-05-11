import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  FindOneRequest,
  JournalRequest,
  EditJournalRequest,
  DeleteJournalRequest,
} from './journals.pb';

export class FindOneRequestDto implements FindOneRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;
}

export class CreateJournalRequestDto implements JournalRequest {
  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsNotEmpty()
  public readonly author: number;

  @IsString()
  public readonly image: string;

  @IsString()
  @IsNotEmpty()
  public readonly body: string;

  @IsDate()
  @IsNotEmpty()
  public readonly datetime: string;
}

export class EditJournalRequestDto implements EditJournalRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;

  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsNotEmpty()
  public readonly author: number;

  @IsString()
  public readonly image: string;

  @IsString()
  @IsNotEmpty()
  public readonly body: string;

  @IsDate()
  @IsNotEmpty()
  public readonly datetime: string;
}

export class DeleteJournalRequestDto implements DeleteJournalRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  public readonly id: number;
}
