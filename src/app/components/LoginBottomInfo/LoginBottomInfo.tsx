import { Link } from 'react-router-dom';
import { FlexBox } from '@elements';
import { ROUTE_PATHS } from '@routes';
import type { Theme } from '@libs/theme';

function LoginBottomInfo() {
  // prop destruction
  // lib hooks
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers

  return (
    <FlexBox direction='column' alignItems='center'>
      <p
        css={(theme: Theme) => [
          {
            fontSize: 16,
            fontWeight: 500,
            color: theme.palette.secondary.n300,
            lineHeight: '24px',
            marginBottom: 8,
          },
        ]}
        className='notoSans'
      >
        계정이 없으신가요?
        <Link
          to={ROUTE_PATHS.signUp}
          css={(theme: Theme) => [
            {
              fontSize: 16,
              fontWeight: 500,
              color: theme.palette.primary.main,
            },
          ]}
          className='notoSans'
        >
          회원가입
        </Link>
      </p>
      <Link
        to={`${ROUTE_PATHS.forgotPassword}?step=1`}
        css={(theme: Theme) => [
          {
            fontSize: 14,
            fontWeight: 500,
            color: theme.palette.secondary.n300,
            lineHeight: '24px',
          },
        ]}
        className='notoSans'
      >
        비밀번호 찾기
      </Link>
    </FlexBox>
  );
}

export { LoginBottomInfo };
