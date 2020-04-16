import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { VorgaengeService } from './vorgaenge.service';
import { CreateVorgangDTO } from './dto/create-vorgnang.dto';
import { V_SI_JIRAIssues_SP } from 'src/shared/models/vorgaenge.entity';
import { FilesHelper } from 'src/shared/helper/comparefile';

@Controller('frontendElement')
export class FrontendElementController {
  private comparer = new FilesHelper();
  constructor(private vorgaengeService: VorgaengeService) {}

  @Get()
  // async frontendElement(@Body() frontenElementPath) {
  async frontendElement(@Query() query: any) {
    try {
      var promises: Promise<String>[] = [];

      const frontendElement = this.vorgaengeService.findOneFrontendElement(
        query.PathfrontendElement,
        query.testSystem,
      );

      console.log(
        '1 FrontendElementController -> frontendElement ->         query.testSystem,',
        query.testSystem,
      );
      console.log(
        '2 FrontendElementController -> frontendElement ->  query.PathfrontendElement',
        query.PathfrontendElement,
      );

      console.log(
        '3 FrontendElementController -> frontendElement -> frontendElement ',
        frontendElement,
      );

      return frontendElement;
    } catch (error) {
      console.log(
        'FrontendElementController -> frontendElement -> error',
        error,
      );
    }
  }
}
