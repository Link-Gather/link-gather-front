import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, FlexBox } from '@elements';
import IconCheckGreen from '@assets/images/icons/icon-check-green.svg';
import IconPasswordShow from '@assets/images/icons/icon-password-show.svg';
import IconPasswordHide from '@assets/images/icons/icon-password-hide.svg';
import { SCHEMA_EMAIL, SCHEMA_PASSWORD } from '@libs/schema';
import palette from '@libs/theme/palettes';
import { userRepository } from '@repositories';
import { useMutation } from '@libs/query';

const schema = yup.object({
  email: SCHEMA_EMAIL.required('이메일을 입력해주세요.'),
  password: SCHEMA_PASSWORD.required('비밀번호를 다시 확인해주세요.'),
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
  } = useForm<yup.InferType<typeof schema>>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // query hooks
  const { mutateAsync, isLoading } = useMutation(userRepository.signin);

  // calculated values
  // effects
  // handlers

  return (
    <FlexBox direction='column' css={{ marginBottom: '40px' }}>
      <Input
        type='email'
        placeholder='이메일'
        css={{ width: '100%', marginBottom: '16px' }}
        error={errors.email}
        message={errors.email?.message}
        iconProps={{
          iconImage: (!errors.email && dirtyFields.email && IconCheckGreen) || undefined,
          alt: (!errors.email && dirtyFields.email && 'valid email') || undefined,
        }}
        {...register('email')}
      />
      <Input
        type={!isShowPassword ? 'password' : 'text'}
        placeholder='비밀번호'
        css={{ width: '100%', marginBottom: '16px' }}
        error={errors.password}
        message={errors.password?.message}
        iconProps={{
          onClick: () => setIsShowPassword(!isShowPassword),
          iconImage: dirtyFields.password && !isShowPassword ? IconPasswordHide : IconPasswordShow,
          alt: dirtyFields.password && !isShowPassword ? 'hide password' : 'show password',
        }}
        {...register('password')}
      />
      <Button
        onClick={handleSubmit(async ({ email, password }) => await mutateAsync({ email, password }))}
        color={palette.contrastText}
        css={{
          width: '100%',
          height: '48px',
          fontSize: '20px',
          borderRadius: '32px',
          backgroundColor: palette.primary.main,
          marginTop: '8px',
        }}
        isLoading={isLoading}
        disabled={!isValid}
      >
        로그인
      </Button>
    </FlexBox>
  );
}

export { LoginForm };
