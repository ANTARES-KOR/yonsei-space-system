import React from 'react';
import SidebarItem from './SidebarItem';
import { LectureRoomList } from '../constants';

function Sidebar() {
  return (
    <ul>
      {LectureRoomList.map((item) => (
        <SidebarItem label={item.building_name} key={item.building_name}>
          {item.rooms}
        </SidebarItem>
      ))}
    </ul>
  );
}

export default Sidebar;
