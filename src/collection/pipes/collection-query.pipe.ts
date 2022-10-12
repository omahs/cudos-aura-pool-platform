import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { CollectionFilters } from '../utils';

@Injectable()
export class ParseCollectionQueryPipe implements PipeTransform {
  transform(value: CollectionFilters, metadata: ArgumentMetadata) {
    const parsedQuery = {};

    Object.keys(value).map((key) => {
      if (key === 'creator_id') {
        parsedQuery[key] = Number(value[key]);
      } else {
        parsedQuery[key] = value[key];
      }
    });

    return parsedQuery;
  }
}
