import { httpClient } from '@libs/http-client';
import { queryKeyMap } from '@libs/query';

export const authRepository = {
  /**
   * 이메일 인증
   * @param email
   * @param type
   */
  async verifyEmail({ email, type }: { email: string; type: 'signup' | 'password' }) {
    return httpClient.post<{ id: string }>('/auth/email-verification', { email, type });
  },

  /**
   * 이메일 인증 코드 확인 (코드 입력)
   * @param id
   * @param code
   */
  async verifyCode({ id, code }: { id: string; code: string }) {
    return httpClient.post(`/auth/email-verification/${id}`, { code });
  },

  /**
   * 이메일 인증 코드 확인 (화면 접근)
   * @param id
   */
  async verifyVerificationId({ id }: { id: string }) {
    return httpClient.get(`/auth/email-verification/${id}`);
  },

  /**
   * 비밀번호 변경
   * @param password
   * @param passwordConfirm
   * @param verificationId
   */
  async changePassword({
    password,
    passwordConfirm,
    verificationId,
  }: {
    password: string;
    passwordConfirm: string;
    verificationId: string;
  }) {
    return httpClient.patch(`/auth/password-change/${verificationId}`, { password, passwordConfirm });
  },
};

queryKeyMap.set(authRepository.verifyEmail, ['Auth']);
queryKeyMap.set(authRepository.changePassword, ['Auth']);
queryKeyMap.set(authRepository.verifyCode, ['Auth']);
queryKeyMap.set(authRepository.verifyVerificationId, ['Auth']);
