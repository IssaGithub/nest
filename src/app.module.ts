import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { DefaultAdminModule } from 'nestjs-admin';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VorgaengeModule } from './vorgaenge/vorgaenge.module';

@Module({
  imports: [
    VorgaengeModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'SI-DB-JIRA',

      username: 'JIRA_SI_Prod_API_DBUser',
      password: 'P9Rm3X+8VwA4ZuX',
      database: 'JIRA_SI_Prod',
      entities: ['dist/shared/models/vorgaenge.entity.js'],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
