import React, {useCallback, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import styled, {css} from 'styled-components';
import Button from '~/common/component/Button';
import Dialog from '~/common/component/Dialog';
import Icon from '~/common/component/Icon';

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  min-height: 40rem;
`;

const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`;

enum ButtonGroupWidth {
  Full,
  Half,
}
enum ButtonGroupDirection {
  Column,
  Row,
}
interface ButtonGroupType {
  groupWidth: ButtonGroupWidth;
  groupDirection: ButtonGroupDirection;
}
const ButtonGroup = styled.div<ButtonGroupType>`
  & + & {
    margin-top: 1rem;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: row;
  ${props =>
    props.groupWidth === ButtonGroupWidth.Half
      ? css`
          width: 50%;
        `
      : null}
  ${props =>
    props.groupDirection === ButtonGroupDirection.Column
      ? css`
          flex-direction: column;
          height: 10rem;
        `
      : null}
`;

type Props = RouteComponentProps;
function PreviewComponentsPage({}: Props) {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const onClick = useCallback(() => {
    setShowDialog(true);
  }, []);
  const onConfirm = useCallback(() => {
    setShowDialog(false);
  }, []);
  const onCancel = useCallback(() => {
    setShowDialog(false);
  }, []);

  return (
    <PageWrap>
      <AppBlock>
        <ButtonGroup groupWidth={ButtonGroupWidth.Half} groupDirection={ButtonGroupDirection.Row}>
          <Button size="large">BUTTON</Button>
          <Button>BUTTON</Button>
          <Button size="small">BUTTON</Button>
        </ButtonGroup>
        <ButtonGroup groupWidth={ButtonGroupWidth.Half} groupDirection={ButtonGroupDirection.Row}>
          <Button color="deepPink" size="large">
            BUTTON
          </Button>
          <Button color="deepPink">BUTTON</Button>
          <Button color="deepPink" size="small">
            BUTTON
          </Button>
        </ButtonGroup>
        <ButtonGroup groupWidth={ButtonGroupWidth.Half} groupDirection={ButtonGroupDirection.Row}>
          <Button color="grayBase" size="large">
            BUTTON
          </Button>
          <Button color="grayBase">BUTTON</Button>
          <Button color="grayBase" size="small">
            BUTTON
          </Button>
        </ButtonGroup>
        <ButtonGroup groupWidth={ButtonGroupWidth.Half} groupDirection={ButtonGroupDirection.Row}>
          <Button size="large" outline>
            BUTTON
          </Button>
          <Button color="deepPink" outline>
            BUTTON
          </Button>
          <Button color="grayBase" size="small" outline>
            BUTTON
          </Button>
        </ButtonGroup>
        <ButtonGroup
          groupWidth={ButtonGroupWidth.Full}
          groupDirection={ButtonGroupDirection.Column}
        >
          <Button size="large" fullWidth onClick={onClick}>
            OPEN DIALOG
          </Button>
          <Button size="large" color="grayBase" fullWidth>
            BUTTON
          </Button>
          <Button size="large" color="deepPink" fullWidth>
            BUTTON
          </Button>
        </ButtonGroup>
      </AppBlock>
      <AppBlock>
        <Icon icon={'heartFill'} />
        <Icon icon={'heartBlank'} />
      </AppBlock>
      <AppBlock></AppBlock>
      <Dialog
        title="정말로 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={onConfirm}
        onCancel={onCancel}
        visible={showDialog}
      >
        데이터를 정말로 삭제하시겠습니까?
      </Dialog>
    </PageWrap>
  );
}

export default PreviewComponentsPage;
