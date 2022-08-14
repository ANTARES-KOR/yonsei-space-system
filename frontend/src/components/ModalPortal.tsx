import { ReactNode } from 'react';
import ReactDom from 'react-dom';

interface Props {
  children?: ReactNode;
}
function ModalPortal({ children }: Props) {
  const el = document.getElementById('modal');
  return ReactDom.createPortal(children, el!);
}

export default ModalPortal;
