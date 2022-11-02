import type { FilePaginationConfig } from '@/types/FilePagination.types';

export function getItemIndexInFile(config: FilePaginationConfig, itemIndex: number): number {
  return itemIndex % config.itemsPerFile;
}

export function getTotalFileNumber(config: FilePaginationConfig): number {
  return Math.ceil(config.totalItemNumber / config.itemsPerFile);
}

export function getCurrentFileIndex(config: FilePaginationConfig, itemIndex: number): number {
  return Math.floor(itemIndex / config.itemsPerFile);
}

export function getFileNameByItemIndex(config: FilePaginationConfig, itemIndex: number): string {
  console.log(getCurrentFileIndex(config, itemIndex));
  return getFileNameByFileIndex(config, getCurrentFileIndex(config, itemIndex));
}

export function getFileNameByFileIndex(config: FilePaginationConfig, fileIndex: number): string {
  const padLeft = (str: string, length: number, paddingChar: string) => {
    let result = str;
    while (result.length < length) {
      result += paddingChar;
    }
    return result;
  };

  const fileNamePrefix = config.fileNamePrefix;
  const fileNameIndex = padLeft(fileIndex.toString(), config.fileNameIndexDigits, '0');
  const fileNameSuffix = config.fileNameExtension;

  return `${fileNamePrefix}${fileNameIndex}${fileNameSuffix}`;
}
