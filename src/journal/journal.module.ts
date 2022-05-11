import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { Journal } from './entity/journal.entity';
import { JOURNAL_SERVICE_NAME, JOURNALS_PACKAGE_NAME } from './journals.pb';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: JOURNAL_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: JOURNALS_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/journals.proto',
        },
      },
    ]),
    TypeOrmModule.forFeature([Journal]),
  ],
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule {}
