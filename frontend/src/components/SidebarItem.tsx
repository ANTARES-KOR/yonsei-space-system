import React, { useState } from 'react';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';
import classNames from 'classnames/bind';
import { useRecoilState } from 'recoil';
import { selectState } from '../atom';
import styles from './SidebarItem.module.scss';

const cx = classNames.bind(styles);

interface Props {
  label: string;
  children?: string[];
}

function SidebarItem({ label, children }: Props) {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useRecoilState(selectState);

  const openSubMenu = () => {
    setOpen(!open);
  };

  const selectClassroom = () => {
    setSelect(label);
  };

  const isSelected = () => {
    if (children) {
      return children.find((item) => item === select);
    }
    return select === label;
  };

  return (
    <li
      className={cx(
        { Building: children },
        { Room: !children },
        { selected: isSelected() },
      )}
    >
      <button onClick={children ? openSubMenu : selectClassroom} type="button">
        {label}
        {children && (open ? <AiOutlineUp /> : <AiOutlineDown />)}
      </button>
      {children && open && (
        <ul>
          {children.map((item) => (
            <SidebarItem label={item} key={item} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default SidebarItem;

SidebarItem.defaultProps = {
  children: null,
};
