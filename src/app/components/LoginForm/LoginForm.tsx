import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input } from '@elements';
import { SCHEMA_EMAIL, SCHEMA_PASSWORD } from '@libs/schema';
import palette from '@libs/theme/palettes';
import { userRepository } from '@repositories';
import { useMutation } from '@libs/query';
import IconCheckGreen from '@assets/images/icons/icon-check-green.svg';
import IconPasswordShow from '@assets/images/icons/icon-password-show.svg';
import IconPasswordHide from '@assets/images/icons/icon-password-hide.svg';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  email: SCHEMA_EMAIL.required('이메일을 입력해주세요.'),
  password: SCHEMA_PASSWORD.required('비밀번호를 다시 확인해주세요.'),
});

function LoginForm() {
  // prop destruction
  // lib hooks
  const navigate = useNavigate();

  // state, ref hooks
  const [isShowPassword, setIsShowPassword] = useState(false);

  // form hooks
  const {
    register,
    handleSubmit,
    getValues,
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
  const { mutateAsync, isLoading } = useMutation(userRepository.signIn);

  // calculated values
  // effects
  // handlers
  return (
    <Stack direction='column' css={{ marginBottom: '40px' }} spacing={4}>
      <Input
        type='email'
        placeholder='이메일'
        defaultValue={getValues('email')}
        error={errors.email}
        helperText={errors.email?.message}
        IconProps={{
          EndIcon:
            (!errors.email && dirtyFields.email && <IconCheckGreen css={{ width: '24px', height: '24px' }} />) ||
            undefined,
        }}
        {...register('email')}
      />
      <Input
        type='password'
        placeholder='비밀번호'
        defaultValue={getValues('password')}
        error={errors.password}
        helperText={errors.password?.message}
        IconProps={{
          onClick: () => setIsShowPassword(!isShowPassword),
          EndIcon:
            dirtyFields.password && !isShowPassword ? (
              <IconPasswordHide css={{ width: '24px', height: '24px' }} />
            ) : (
              <IconPasswordShow css={{ width: '24px', height: '24px' }} />
            ),
        }}
        {...register('password')}
      />
      <Button
        onClick={handleSubmit(async ({ email, password }) => {
          await mutateAsync(
            { email, password },
            {
              onSuccess: () => navigate(-1),
            }
          );
        })}
        color={palette.contrastText}
        css={{
          width: '100%',
          height: '48px',
          fontSize: '20px',
          borderRadius: '32px',
          backgroundColor: palette.primary.main,
          marginTop: '8px',
          fontWeight: 800,
        }}
        loading={isLoading}
        disabled={!isValid}
      >
        로그인
      </Button>
    </Stack>
  );
}

export { LoginForm };
