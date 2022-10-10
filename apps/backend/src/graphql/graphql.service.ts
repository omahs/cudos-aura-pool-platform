import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { MarketplaceNftQuery, MarketplaceNftDocument } from './types';
import { print } from 'graphql';

@Injectable()
export class GraphqlService {
    constructor(private readonly httpService: HttpService) {}

    async fetchNft(): Promise<MarketplaceNftQuery> {
        const res = await this.httpService.axiosRef.post(process.env.GRAPHQL_URL, {
            query: print(MarketplaceNftDocument),
        });

        return res.data;
    }

    fetchCollection() {
        return [];
    }
}
