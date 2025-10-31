import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Get entire authenticated user object from request
 * @example 
 * ```ts
 * @Get('profile')
 * getProfile(@AuthUser() user: IAuthUser) {
 *   return user;
 * }
 * ```
 */
export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return {
    id: request.id,
    email: request.email,
  };
},
);

/**
 * Get specific property from authenticated user
 * @example
 * ```ts
 * @Get('profile')
 * getProfile(
 *   @AuthData('id') userId: string,
 *   @AuthData('role') userRole: string
 * ) {
 *   return { userId, userRole };
 * }
 * ```
 */
export const AuthData = createParamDecorator((data: 'id' | 'email', ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return data ? request[data] : null;
},
);