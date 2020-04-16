import * as fs from 'fs';

import { FileSystemReader, Reader } from '@nestjs/cli/lib/readers';

import { FileSystemReaderHelper } from './file-system.reader';
import { utf8 } from 'utf8';

export class FilesHelper {
  splittCharacter = '\\';
  constructor() {}
  async findFrontendElement(frontenElementPath: string, testystem: string) {
    try {
      let fileReader = new FileSystemReader(frontenElementPath);

      return fileReader.read(frontenElementPath).then(
        async function(value) {
          return value.toString();
        },
        async function(value) {
          return value.toString();
        },
      );
    } catch (error) {}
  }
  findMatchingPart(frontenElementPath: string): string {
    try {
      var frontenElementPathArray;

      var tempelement: string;
      var frontenElementPathmatchingPart;

      var testystemPath: string;

      frontenElementPathArray = frontenElementPath.split('\\');
      console.log(
        '13 FilesHelper -> findMatchingPart -> frontenElementPathArray',
        frontenElementPathArray,
      );
      frontenElementPathArray.forEach(element => {
        if (!frontenElementPathmatchingPart) {
          tempelement = element;
          console.log(
            '14 FilesHelper -> findMatchingPart -> tempelement',
            tempelement,
          );

          frontenElementPathmatchingPart = tempelement.match(
            'entw.supream.local',
          );
          console.log(
            '15 FilesHelper -> findMatchingPart -> frontenElementPathmatchingPart',
            frontenElementPathmatchingPart,
          );
        }
      });

      return frontenElementPathmatchingPart;
    } catch (error) {
      console.log('FilesHelper -> findMatchingPart -> error', error);
    }
  }

  testSystemPart(
    frontenElementPath: string,
    testystem: string,

    testsystemMatchingFile: string,
  ) {
    try {
      var testFiles: string[];
      var testFile: string;
      var testPath: string;
      var testsystems = testystem.split(',');
      console.log(
        ' 20 FilesHelper -> findFrontendElement -> testsystems',
        testsystems,
      );
      console.log('FilesHelper -> findFrontendElement -> testystem', testystem);

      var frontendElementRootPath = frontenElementPath.split(
        testsystemMatchingFile + this.splittCharacter,
      );
      console.log(
        ' 21 FilesHelper -> findFrontendElement -> frontendElementRootPath',
        frontendElementRootPath[0],
      );

      testFiles = this.getFolders(frontendElementRootPath[0]);
      console.log(
        '22 FilesHelper -> findFrontendElement -> testFiles',
        testFiles,
      );
      testsystems.forEach(testSystem => {
        testFiles.forEach(element => {
          if (
            element.includes(
              '-' + testSystem.toLowerCase().replace(' ', '') + '.',
            )
          ) {
            testFile = element;
            console.log(
              '!!!!!!!!!!!!!!!FilesHelper -> findFrontendElement -> testFile',
              testFile,
            );
          }
        });
      });

      testPath = frontenElementPath.replace(testsystemMatchingFile, testFile);
      return testPath;
    } catch (error) {
      console.log(error);
    }
  }

  public getFolders(dir) {
    try {
      console.log('FilesHelper -> getFolders -> dir', dir);

      var list = fs.readdirSync(dir);
      console.log(' 24 FilesHelper -> getFolders -> list', list);
      return list;
    } catch (error) {
      console.log('25 FilesHelper -> getFolders -> error', error);
    }
  }
  public async readFile(directoryEntwicklung: string, directoryTest) {
    try {
      const fileSystemReaderEntwicklung = new FileSystemReaderHelper(
        directoryEntwicklung,
      );
      const fileSystemReaderTest = new FileSystemReaderHelper(directoryTest);
      var fileEntwicklung: string;
      var fileTest: string;
      var fileTestState: string;
      var fileEntwState: string;
      var promises: Promise<String>[] = [];
      var promise1 = fileSystemReaderTest.read(directoryTest);
      try {
        promise1.then(
          value => {
            fileEntwicklung = value;
            console.log(
              'FilesHelper -> readFile -> fileEntwicklung',
              fileEntwicklung,
            );
          },
          err => {
            // rejection
          },
        );
      } catch (error) {
        console.log('FilesHelper -> readFile ->promise1 --> error', error);
      }

      var promise2 = fileSystemReaderEntwicklung.read(directoryEntwicklung);
      try {
        promise2.then(
          value => {
            fileTest = value;

            // fulfillment
          },
          err => {
            // rejection
          },
        );
      } catch (error) {}

      var promise3 = fileSystemReaderEntwicklung.readState(
        directoryEntwicklung,
      );
      promise3.then(
        value => {
          fileTestState = value;
          // fulfillment
        },
        err => {
          // rejection
        },
      );

      var promise4 = fileSystemReaderEntwicklung.readState(directoryTest);
      promise4.then(
        value => {
          fileEntwState = value;
          // fulfillment
        },
        err => {
          // rejection
        },
      );

      promises.push(promise1, promise2, promise3, promise4);
      return Promise.all(promises).then(() => {
        return {
          FileEntwicklung: fileEntwicklung,
          FileEntwState: fileEntwState,
          FileTest: fileTest,
          FileTestState: fileTestState,
        };
      });
    } catch (error) {
      console.log('FilesHelper -> readFile -> error', error);
    }
  }

  public readContentFromFile(fileContent: string) {
    var re = /[sS]{1,1}[pP]{1,1}-[0-9]{1,10}/g;

    return fileContent.match(re).toString();
  }

  public async readSPelementsFromFile(
    file: string,

    testSystem: string,
    character: string,
  ) {
    try {
      let SPelements = [];
      var files: string[];
      var SPelementsForEntwicklung: string;
      var SPelementsForTest: string;

      var promises: Promise<String>[] = [];
      var promiseEntwicklungFile;
      var promiseTestFile;
      var fileEntwState;
      var promise5;

      files = file.split(character);

      //Read File State e.g File Size and Create Date
      try {
        files.forEach(file => {
          const fileSystemReaderEntwicklung = new FileSystemReaderHelper(file);
          var promise4 = fileSystemReaderEntwicklung.readState(file);
          promise4.then(
            value => {
              fileEntwState = value;
              SPelements.push({
                EntwicklungState: fileEntwState,
                EntwicklungfileState: file,
              });
              // fulfillment
            },
            err => {
              // rejection
            },
          );
        });
      } catch (error) {}
      files.forEach(async file => {
        var fileencoded = file;
        if (fileencoded.match(/%\\r$/)) {
          fileencoded = fileencoded.substring(0, fileencoded.length - 3);
        }
        if (fileencoded.match(/%\\n$/)) {
          fileencoded = fileencoded.substring(0, fileencoded.length - 3);
        }

        if (fileencoded.match(/%0D$/)) {
        }
        console.log('FilesHelper -> readFile -> fileencoded', fileencoded);

        const fileSystemReader = new FileSystemReaderHelper(fileencoded);

        promiseEntwicklungFile = fileSystemReader.read(fileencoded);
        promiseEntwicklungFile.then(
          async value => {
            SPelementsForEntwicklung = await this.readContentFromFile(value);
            SPelements.push({
              SPelementsForEntwicklung: SPelementsForEntwicklung,
              File: fileencoded,
              TestSystem: testSystemPart,
            });
            // fulfillment
          },
          err => {
            // rejection
          },
        );

        //Returns the part of the coreesponding Test path
        //For Example:
        //U:\supream\test-zbi.supream.local
        //where \test-zbi.supream.local is the matching part
        var matchingPart = this.findMatchingPart(file);

        var testSystemPart = this.testSystemPart(
          file,
          testSystem,
          matchingPart,
        );

        promiseTestFile = fileSystemReader.read(testSystemPart);

        try {
          promiseTestFile.then(
            async value => {
              //Read the content(e.g SP-101010) from the coresponding Test File
              SPelementsForTest = await this.readContentFromFile(value);
              SPelements.push({
                SPelementsForTest: SPelementsForTest,
                File: testSystemPart,
                EntwicklungMatchingParth: file,
              });

              // fulfillment
            },
            err => {},
          );
        } catch (error) {}
        try {
          const fileSystemReaderTest = new FileSystemReaderHelper(
            testSystemPart,
          );
          promise5 = fileSystemReaderTest.readState(testSystemPart);
          promise5.then(
            value => {
              fileEntwState = value;

              SPelements.push({
                TestState: fileEntwState,
                TestfileState: file,
              });
              // fulfillment
            },
            err => {
              // rejection
            },
          );
        } catch (error) {}
      });

      promises.push(promiseEntwicklungFile, promiseTestFile, promise5);
      return Promise.all(promises).then(() => {
        return {
          SPelements: SPelements,
        };
      });
    } catch (error) {}
  }
}
