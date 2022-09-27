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
  isMainMenu: boolean;
}

function SidebarItem({ data, children, isMainMenu }: Props) {
  const [open, setOpen] = useState(false);
  const [lectureRoomChoice, setLectureRoomChoice] = useRecoilState(
    lectureRoomChoiceState,
  );

  const toggleSubMenu = () => {
    setOpen(!open);
  };

  const updateLectureRoomChoice = () => {
    if ('room_name' in data) {
      const clickedLectureRoomInfo = {
        building_uid: data.building_uid,
        room_uid: data.room_uid,
      };
      if (clickedLectureRoomInfo.room_uid !== lectureRoomChoice?.room_uid) {
        setLectureRoomChoice({
          building_uid: data.building_uid,
          room_uid: data.room_uid,
        });
      }
    }
  };

  const isThisBuildingSelected = () => {
    if ('building_name' in data) {
      return lectureRoomChoice?.building_uid === data.building_uid;
    }
    if ('room_name' in data) {
      return lectureRoomChoice?.room_uid === data.room_uid;
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
        { 'main-menu': isMainMenu },
        { 'sub-menu': !isMainMenu },
        { selected: isThisBuildingSelected() },
      )}
    >
      <button
        onClick={isMainMenu ? toggleSubMenu : updateLectureRoomChoice}
        type="button"
        className={cx('sidebar-item')}
      >
        {itemLabel()}
        {isMainMenu && (open ? <AiOutlineUp /> : <AiOutlineDown />)}
      </button>
      {children && open && (
        <ul>
          {children.map((item) => {
            const { building_uid } = data;
            return (
              <SidebarItem
                data={{ ...item, building_uid }}
                key={item.room_name}
                isMainMenu={false}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default SidebarItem;
