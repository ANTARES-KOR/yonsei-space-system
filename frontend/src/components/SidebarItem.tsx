/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';
import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';
import { lectureRoomChoiceState } from '../atom';
import { LectureRoomsPerBuilding, LectureRoomInfo } from '../interfaces';

const cx = classNames.bind(styles);

interface SidebarLectureRoomInfo extends LectureRoomInfo {
  building_uid: number;
}

interface Props {
  data: LectureRoomsPerBuilding | SidebarLectureRoomInfo;
  children?: LectureRoomInfo[];
}

function SidebarItem({ data, children }: Props) {
  const [open, setOpen] = useState(false);
  const [lectureRoomChoice, setLectureRoomChoice] = useRecoilState(
    lectureRoomChoiceState,
  );

  const toggleSubMenu = () => {
    setOpen(!open);
  };

  const updateLectureRoomChoice = () => {
    if ('room_name' in data) {
      setLectureRoomChoice({
        building_uid: data.building_uid,
        room_uid: data.room_uid,
      });
    }
  };

  const isThisBuildingSelected = () => {
    if ('building_name' in data) {
      if (lectureRoomChoice?.building_uid === data.building_uid) {
        return true;
      }
    }
    return false;
  };

  const itemLabel = () => {
    if ('building_name' in data) {
      return data.building_name;
    }
    return data.room_name;
  };

  return (
    <li
      className={cx(
        { Building: children },
        { Room: !children },
        { selected: isThisBuildingSelected() },
      )}
    >
      <button
        onClick={children ? toggleSubMenu : updateLectureRoomChoice}
        type="button"
        className={cx('sidebar-item')}
      >
        {itemLabel()}
        {children && (open ? <AiOutlineUp /> : <AiOutlineDown />)}
      </button>
      {children && open && (
        <ul>
          {children.map((item) => {
            const { building_uid } = data;
            return (
              <SidebarItem
                data={{ ...item, building_uid }}
                key={item.room_name}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default SidebarItem;
