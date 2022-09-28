import React from 'react';
import { useRecoilValue } from 'recoil';
import SidebarItem from './SidebarItem';
import { lectureRoomsListState } from '../atom';

function Sidebar() {
  const lectureRoomsList = useRecoilValue(lectureRoomsListState);
  return (
    <ul>
      {lectureRoomsList.map((item) => (
        <SidebarItem data={item} key={item.building_name} isMainMenu>
          {item.rooms}
        </SidebarItem>
      ))}
    </ul>
  );
}

export default Sidebar;
