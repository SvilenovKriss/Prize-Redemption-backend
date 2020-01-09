import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
  if (data) {
    return req.user[data];
  }
  return req.user;
});
