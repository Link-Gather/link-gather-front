import { mq } from '@libs/theme';
import { type ComponentStyle } from '@routes';

function Layout(props: { children: React.ReactNode; componentStyle: ComponentStyle }) {
  // prop destruction
  const { children, componentStyle } = props;

  // lib hooks
  // state, ref hooks
  // form hook
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <>
      {componentStyle === 'contents' && (
        <div
          css={{
            width: '100%',
            minHeight: '100vh',
            [mq[0]]: {
              backgroundColor: 'red',
            },
            [mq[1]]: {
              backgroundColor: 'blue',
            },
            [mq[2]]: {
              backgroundColor: 'green',
            },
            [mq[3]]: {
              backgroundColor: 'yellow',
            },
          }}
        >
          {children}
        </div>
      )}
      {componentStyle === 'full' && (
        <div
          css={{
            width: '100%',
            minHeight: '100vh',
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}

export { Layout };
