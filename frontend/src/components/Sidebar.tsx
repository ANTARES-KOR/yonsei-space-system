import React from 'react';
import SidebarItem from './SidebarItem';
import { LectureRoomList } from '../constants';

function Sidebar() {
  return (
    <ul>
      {LectureRoomList.map((item) => (
        <SidebarItem data={item} key={item.building_name} isMainMenu>
          {item.rooms}
        </SidebarItem>
      ))}
    </ul>
  );
}

export default Sidebar;
