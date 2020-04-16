import { FrontendElementController } from './FrontendElement.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { V_SI_JIRAIssues_SP } from '../shared/models/vorgaenge.entity';
import { VorgaengeController } from './vorgaenge.controller';
import { VorgaengeService } from './vorgaenge.service';

@Module({
  imports: [TypeOrmModule.forFeature([V_SI_JIRAIssues_SP])],
  controllers: [VorgaengeController, FrontendElementController],
  providers: [VorgaengeService],
})
export class VorgaengeModule {}
