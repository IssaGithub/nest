import * as fs from 'fs';

import { Reader } from '@nestjs/cli/lib/readers';

export class FileSystemReaderHelper implements Reader {
  directory2: string = 'S:/';
  constructor(private readonly directory: string) {}

  public async list(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      fs.readdir(
        this.directory,
        this.directory2,
        (error: NodeJS.ErrnoException | null, filenames: string[]) => {
          if (error) {
            reject(error);
          } else {
            resolve(filenames);
          }
        },
      );
    });
  }

  public async read(path: string): Promise<string> {
    try {
      console.log('FileSystemReaderHelper -> constructor -> path', path);
      let fileencoded = path;

      let pahtSplitted = fileencoded.split('\n');
      return new Promise<string>((resolve, reject) => {
        pahtSplitted.forEach(pathsplitted => {
          let pathsplittedEncoded = pathsplitted;
          console.log(
            '1727002042020 FileSystemReaderHelper -> constructor -> splitted',
            pathsplittedEncoded,
          );
          console.log(
            '1924 FilesHelper -> readFile -> fileencoded match 1',
            pathsplittedEncoded,
          );

          pathsplittedEncoded = pathsplittedEncoded.replace('\r', '');

          fs.readFile(
            `${pathsplittedEncoded}`,
            (error: NodeJS.ErrnoException | null, data: Buffer) => {
              if (error) {
                console.log('error', error);
                reject(error);
              } else {
                resolve(data.toString());
              }
            },
          );
        });
      });
    } catch (error) {
      console.log('FileSystemReaderHelper -> constructor -> error', error);
    }
  }

  public async readState(filename: string): Promise<any> {
    try {
      return new Promise<any>((resolve, reject) => {
        fs.stat(
          `${filename}`,
          (error: NodeJS.ErrnoException | null, stat: fs.Stats) => {
            if (error) {
              console.log('error', error);
              reject(error);
            } else {
              resolve(stat);
            }
          },
        );
      });
    } catch (error) {
      console.log('FileSystemReaderHelper -> constructor -> error', error);
    }
  }

  readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {
      if (err) {
        onError(err);
        return;
      }
      filenames.forEach(function(filename) {
        fs.readFile(dirname + filename, 'utf-8', function(err, content) {
          if (err) {
            onError(err);
            return;
          }
          return onFileContent(filename, content);
        });
      });
    });
  }

  public async readAnyOf(filenames: string[]): Promise<string | undefined> {
    try {
      for (const file of filenames) {
        return await this.read(file);
      }
    } catch (err) {
      return filenames.length > 0
        ? await this.readAnyOf(filenames.slice(1, filenames.length))
        : undefined;
    }
  }
}
