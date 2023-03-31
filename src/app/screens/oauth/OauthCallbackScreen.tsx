import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { pathHome, pathSignUp } from '@routes';
import { useOauth } from '@libs/auth';

function OauthCallbackScreen() {
  // prop destruction
  // lib hooks
  const params = useParams();
  const [querystring] = useSearchParams();
  const navigate = useNavigate();
  const [handleOauth] = useOauth();

  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  useEffect(() => {
    const { provider } = params;
    const code = querystring.get('code');

    if (!code || !provider) {
      return;
    }

    handleOauth(code, provider as OauthProvider).then((result) => {
      if (result) {
        navigate(pathSignUp, { state: result });
      } else {
        navigate(pathHome);
      }
    });
  }, [handleOauth, navigate, params, querystring]);

  // handlers

  return null;
}

export { OauthCallbackScreen };
