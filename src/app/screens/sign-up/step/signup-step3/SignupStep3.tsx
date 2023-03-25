import { FlexBox, CategoryTitle, Button, ImageBox } from '@elements';
import IconSearch from '@assets/images/icons/icon-search.svg';
import { DropDown } from '@components';
import palette from '@libs/theme/palettes';

const SignupStep3 = ({ moveNextStep }: { moveNextStep: () => void }) => {
  // prop destruction
  // lib hooks
  // state, ref, querystring hooks
  // form hooks
  // query hooks
  // calculated values
  const firstData = ['프론트엔드', '백엔드', '디자이너', '기획자'];
  const secondData = ['학생/취준생', '1~3년차', '3~5년차', '5~10년차', '10년차이상'];
  // effects
  // handlers

  return (
    <FlexBox width='100%' direction='column' alignItems='center' css={{ gap: '25px' }}>
      <FlexBox width='100%' justifyContent='space-between' css={{ marginTop: '25px' }}>
        <FlexBox width='212px' direction='column'>
          <CategoryTitle label='직무*' />
          <DropDown value='기획자' data={firstData}></DropDown>
        </FlexBox>
        <FlexBox width='168px' direction='column'>
          <CategoryTitle label='경력*' />
          <DropDown value='1~3년차' data={secondData}></DropDown>
        </FlexBox>
      </FlexBox>
      <FlexBox width='100%' direction='column'>
        <CategoryTitle label='보유기술*' />
        <input
          css={{
            border: 'none',
            borderBottom: `2px solid ${palette.secondary.n60}`,
            marginTop: '20px',
            '&:focus': {
              outline: 'none',
            },
          }}
        ></input>
        <ImageBox alt={'search'} imageSrc={IconSearch}></ImageBox>
      </FlexBox>
      <Button
        onClick={moveNextStep}
        color={palette.contrastText}
        css={{
          color: palette.contrastText,
          position: 'absolute',
          bottom: '40px',
          borderRadius: '32px',
          backgroundColor: palette.primary.main,
          width: '320px',
          height: '48px',
          fontSize: '20px',
          fontWeight: '600',
          letterSpacing: '0.6px',
        }}
      >
        회원가입
      </Button>
    </FlexBox>
  );
};

export { SignupStep3 };
