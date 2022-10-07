import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  MarketplaceNftQuery,
  MarketplaceNftDocument,
  MarketplaceCollectionQuery,
  MarketplaceCollectionDocument,
} from './types';
import { print } from 'graphql';
import { MarketplaceNftFilters } from 'src/nft/utils';

@Injectable()
export class GraphqlService {
  constructor(private readonly httpService: HttpService) {}

  async fetchNft(
    filters: Partial<MarketplaceNftFilters>,
  ): Promise<MarketplaceNftQuery> {
    const res = await this.httpService.axiosRef.post(process.env.GRAPHQL_URL, {
      query: print(MarketplaceNftDocument),
    });

    return res.data;
  }

  async fetchCollection(): Promise<MarketplaceCollectionQuery> {
    const res = await this.httpService.axiosRef.post(process.env.GRAPHQL_URL, {
      query: print(MarketplaceCollectionDocument),
    });

    return res.data;
  }
}
