import { httpClient } from '@libs/http-client';
import { queryKeyMap } from '@libs/query';

export const userRepository = {
  async signin({ email, password }: { email: string; password: string }) {
    return httpClient.post('/users/sign-in', { email, password });
  },
};

queryKeyMap.set(userRepository.signin, ['User']);
