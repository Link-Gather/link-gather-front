import { useEffect, useState } from 'react';

import { Button, DialogAction, DialogContent, DialogTitle, Dimmer } from '@elements';
import { Carousel, Dialog } from '@components';
import { useDialog } from '@hooks';
import images from 'app/screens/data.mock';

function HomeScreen() {
  // prop destruction
  // lib hooks
  const { isOpenDialog, openDialog, closeDialog } = useDialog();

  // state, ref hooks
  const [loading, setLoading] = useState(true);

  // form hook
  // query hooks
  // calculated values
  // effects
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  // handlers

  return (
    <div>
      <span>홈페이지</span>

      {loading ? <Dimmer /> : <Carousel images={images} css={{ width: '500px', height: '350px' }} />}

      <Button onClick={openDialog}>Dialog</Button>
      {isOpenDialog && (
        <Dialog width='300px' height='200px'>
          <DialogTitle>제목</DialogTitle>
          <DialogContent>컨텐츠</DialogContent>
          <DialogAction>
            <Button onClick={closeDialog}>닫기</Button>
            <Button onClick={closeDialog}>확인</Button>
          </DialogAction>
        </Dialog>
      )}
    </div>
  );
}

export { HomeScreen };
