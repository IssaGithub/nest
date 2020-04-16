import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { V_SI_JIRAIssues_SP } from '../shared/models/vorgaenge.entity';
import { FileSystemReaderHelper } from 'src/shared/helper/file-system.reader';
import { FilesHelper } from 'src/shared/helper/comparefile';

@Injectable()
export class VorgaengeService {
  private fileHelper = new FilesHelper();

  constructor(
    @InjectRepository(V_SI_JIRAIssues_SP)
    private readonly usersRepository: Repository<V_SI_JIRAIssues_SP>,
  ) {}
  findOneFrontendElement(frontenElementPath: any, testystem: any) {
    try {
      console.log(
        '5 VorgaengeService -> findOneFrontendElement -> testystem',
        testystem,
      );
      console.log(
        ' 5 VorgaengeService -> findOneFrontendElement -> frontenElementPath',
        frontenElementPath,
      );

      return this.getfiles(frontenElementPath, testystem);
    } catch (error) {
      console.log(
        ' 4 VorgaengeService -> findOneFrontendElement -> error',
        error,
      );
    }
  }
  findAllFrontendElemente() {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<V_SI_JIRAIssues_SP[]> {
    try {
      console.log('this.usersRepository.find();', this.usersRepository.find());
      return this.usersRepository.find();
    } catch (error) {}
  }

  //*returns the Path for U:\supream\test* //
  getfiles(frontenElementPath: string, testystem: string) {
    console.log('VorgaengeService -> getfiles -> testystem', testystem);

    console.log(
      '5 VorgaengeService -> getfiles -> frontenElementPath',
      frontenElementPath,
    );
    try {
      var matchingPart: string;
      var testSystemPart: string;
      matchingPart = this.fileHelper.findMatchingPart(frontenElementPath);
      console.log(
        '6 VorgaengeService -> getfiles -> matchingPart',
        matchingPart,
      );

      testSystemPart = this.fileHelper.testSystemPart(
        frontenElementPath,
        testystem,
        matchingPart,
      );
      console.log(
        ' 7 VorgaengeService -> getfiles -> testSystemPart',
        testSystemPart,
      );

      return this.fileHelper.readFile(frontenElementPath, testSystemPart);
    } catch (error) {
      console.log('8', error);
    }
  }

  findOne(Nummer: string): Promise<V_SI_JIRAIssues_SP> {
    try {
      console.log('id', Nummer);
      let condition = {
        where: [
          {
            Nummer: Like(Nummer),
          },
        ],
      };

      return this.usersRepository.findOne(condition);
    } catch (error) {}
  }
}
