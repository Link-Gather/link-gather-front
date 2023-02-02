import React from 'react';
import IconGithub from '@assets/images/icons/icon-github.svg';
import type { Theme } from '@libs/theme';

const href = ``;

function GithubLoginButton() {
  // prop destruction
  // lib hooks
  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers

  return (
    <a href={href}>
      <button
        css={(theme: Theme) => {
          return [
            {
              width: '60px',
              height: '60px',
              border: `2px solid ${theme.palette.black.main}`,
              borderRadius: '50%',
              background: `no-repeat center url(${IconGithub}) ${theme.palette.paper}`,
              cursor: 'pointer',
            },
          ];
        }}
      />
      <span
        css={{
          display: 'block',
          width: '60px',
          fontSize: '12px',
          fontWeight: '600',
          textAlign: 'center',
          marginTop: '8px',
        }}
      >
        깃허브
      </span>
    </a>
  );
}

export { GithubLoginButton };
