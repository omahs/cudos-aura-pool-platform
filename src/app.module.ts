import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NFTModule } from './nft/nft.module';
import { StatisticsModule } from './statistics/statistics.module';
import { CollectionModule } from './collection/collection.module';
import { FarmModule } from './farm/farm.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    FarmModule,
    CollectionModule,
    NFTModule,
    StatisticsModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'aura_pool',
      autoLoadModels: true,
      synchronize: true,
    }),
    GraphqlModule,
    ConfigModule.forRoot(),
  ],
  providers: [AppService],
})
export class AppModule {}
