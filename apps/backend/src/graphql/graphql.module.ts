import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GraphqlService } from './graphql.service';

@Module({
    imports: [HttpModule],
    providers: [GraphqlService],
})
export class GraphqlModule {}
