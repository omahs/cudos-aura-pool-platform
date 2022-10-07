import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { NftFilters } from '../utils';

@Injectable()
export class ParseNftQueryPipe implements PipeTransform {
  transform(value: NftFilters, metadata: ArgumentMetadata) {
    const parsedQuery = {};

    Object.keys(value).map((key) => {
      if (key !== 'status') {
        parsedQuery[key] = Number(value[key]);
      } else {
        parsedQuery[key] = value[key];
      }
    });

    return parsedQuery;
  }
}
