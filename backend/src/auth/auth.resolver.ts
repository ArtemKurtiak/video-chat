import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { extend } from '@nestjs/graphql/dist/utils';

import { Auth, User } from './entities';
import { AuthType, UserType } from './types';
import { AuthService } from './auth.service';
import { LoginArgs } from './dto/args';
import { RegisterInput } from './dto/input';
import { AuthUser } from './dto/mutation';

@Resolver(() => AuthUser)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthUser)
  async register(
    @Args('registerData') dto: RegisterInput,
  ): Promise<UserType & AuthType> {
    return this.authService.registerUser(dto);
  }

  @Query(() => AuthUser, { name: 'login', nullable: true })
  async login(@Args() args: LoginArgs): Promise<AuthType & UserType> {
    return this.authService.loginUser(args);
  }
}
