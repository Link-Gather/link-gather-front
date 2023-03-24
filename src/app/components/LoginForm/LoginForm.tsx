import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, FlexBox } from '@elements';
import palette from '@libs/theme/palettes';
import IconCheckGreen from '@assets/images/icons/icon-check-green.svg';
import IconPasswordShow from '@assets/images/icons/icon-password-show.svg';
import IconPasswordHide from '@assets/images/icons/icon-password-hide.svg';
import { VALIDATION_PATTERN } from '@libs/constants';
import { httpClient } from '@libs/http-client';

const schema = yup.object({
  email: yup
    .string()
    .matches(VALIDATION_PATTERN.email, '올바른 이메일 형식을 입력해주세요.')
    .required('이메일을 입력해주세요.'),
  password: yup
    .string()
    .matches(VALIDATION_PATTERN.password, '영문, 숫자, 특수문자 조합 8~16자리로 입력해주세요.')
    .required('비밀번호를 다시 확인해주세요.'),
});

function LoginForm() {
  // prop destruction
  // lib hooks
  // state, ref hooks
  const [isShowPassword, setIsShowPassword] = useState(false);

  // form hooks
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm<{ email: string; password: string }>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <FlexBox direction='column' css={{ marginBottom: '40px' }}>
      <Input
        type='email'
        placeholder='이메일'
        css={{ width: '100%', marginBottom: '16px' }}
        inputStatus={(errors.email && 'error') || (dirtyFields.email && 'active') || 'inActive'}
        message={errors.email && errors.email.message}
        {...register('email')}
      >
        {!errors.email && dirtyFields.email && <img src={IconCheckGreen} alt='checked email' />}
      </Input>
      <Input
        type={!isShowPassword ? 'password' : 'text'}
        placeholder='비밀번호'
        onClick={() => setIsShowPassword(!isShowPassword)}
        css={{ width: '100%', marginBottom: '16px' }}
        inputStatus={(errors.password && 'error') || (dirtyFields.password && 'active') || 'inActive'}
        message={errors.password && errors.password.message}
        {...register('password')}
      >
        {dirtyFields.password && (
          <img src={!isShowPassword ? IconPasswordHide : IconPasswordShow} alt='checked password' />
        )}
      </Input>
      <Button
        onClick={handleSubmit(async ({ email, password }) => {
          await httpClient.post('/users/sign-in', { email, password });
        })}
        css={{
          width: '100%',
          height: '48px',
          fontSize: '20px',
          borderRadius: '32px',
          color: palette.contrastText,
          backgroundColor: palette.primary.main,
          marginTop: '8px',
        }}
        disabled={!isValid}
      >
        로그인
      </Button>
    </FlexBox>
  );
}

export { LoginForm };
