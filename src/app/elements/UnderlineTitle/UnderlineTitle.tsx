import type { Theme } from '@libs/theme';

function UnderlineTitle(props: { title: string; className?: string }) {
  // prop destruction
  const { title, className } = props;

  // lib hooks
  // state, ref hooks
  // form hook
  // query hooks
  // calculated values
  // effects
  // handlers

  return (
    <h3
      className={className}
      css={{
        height: '32px',
        fontWeight: 700,
        fontSize: '32px',
        textAlign: 'center',
        lineHeight: '32px',
      }}
    >
      {title}
      <span
        css={(theme: Theme) => ({
          display: 'inline-block',
          width: '16px',
          height: '4px',
          backgroundColor: theme.palette.primary.main,
        })}
      />
    </h3>
  );
}

export { UnderlineTitle };
