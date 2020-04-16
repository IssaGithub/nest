import { Controller, Get, Param } from '@nestjs/common';
import { VorgaengeService } from './vorgaenge.service';
import { FilesHelper } from 'src/shared/helper/comparefile';
import { ErrorHandler } from '@nestjs/common/interfaces';
import { V_SI_JIRAIssues_SP } from 'src/shared/models/vorgaenge.entity';
import { FileSystemReaderHelper } from 'src/shared/helper/file-system.reader';

@Controller('vorgaenge')
export class VorgaengeController {
  filesHelper = new FilesHelper();
  retunElement = [];
  vorgaenge: any;
  constructor(private vorgaengeService: VorgaengeService) {}

  @Get()
  async getVorgaenge() {
    try {
      console.log('getVorgaenge');
      const books = await this.vorgaengeService.findAll();
      console.log('VorgaengeController -> getVorgaenge -> books', books);

      return books;
    } catch (error) {}
  }

  @Get(':vorgaengeID')
  async getVorgang(@Param('vorgaengeID') vorgaengeID) {
    try {
      this.vorgaenge = await this.vorgaengeService.findOne(vorgaengeID);
     

      this.retunElement.push({ Vorgaenge: this.vorgaenge });
      const Spelements = await this.filesHelper.readSPelementsFromFile(
        this.vorgaenge.Frontend_Elemente,
        this.vorgaenge.Testsysteme,
        '\r\n',
      );
      this.retunElement.push({ SPelements: Spelements });


      return { Vorgaenge: this.vorgaenge, SPelements: Spelements };
    } catch (error) {
      return {
        Vorgaenge: this.vorgaenge,
        SPelements: '',
      };
    }
  }
}
