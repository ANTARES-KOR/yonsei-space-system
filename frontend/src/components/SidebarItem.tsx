import React, { useState } from 'react';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';
import classNames from 'classnames/bind';
import { useRecoilState } from 'recoil';
import { selectState } from '../atom';
import styles from './SidebarItem.module.scss';
import { LectureRoomInfo } from '../interfaces';

const cx = classNames.bind(styles);

interface Props {
  label: string;
  children?: LectureRoomInfo[];
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
      <button
        onClick={children ? openSubMenu : selectClassroom}
        type="button"
        className={cx('sidebar-item')}
      >
        {label}
        {children && (open ? <AiOutlineUp /> : <AiOutlineDown />)}
      </button>
      {children && open && (
        <ul>
          {children.map((item) => (
            <SidebarItem label={item.room_name} key={item.room_name} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default SidebarItem;
