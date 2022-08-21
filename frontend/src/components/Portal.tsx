import { ReactNode } from 'react';
import ReactDom from 'react-dom';

interface Props {
  portalNodeId: string;
  children: ReactNode;
}

function Portal({ portalNodeId, children }: Props) {
  const el = document.getElementById(portalNodeId);
  return ReactDom.createPortal(children, el!);
}

export default Portal;
