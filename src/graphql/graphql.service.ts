import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { NftsQuery, NftsDocument } from './types';
import { print } from 'graphql';

@Injectable()
export class GraphqlService {
  constructor(private readonly httpService: HttpService) {}

  async fetchNft(): Promise<NftsQuery> {
    const res = await this.httpService.axiosRef.post(process.env.GRAPHQL_URL, {
      query: print(NftsDocument),
    });

    return res.data.data;
  }

  fetchCollection() {
    return [];
  }
}
