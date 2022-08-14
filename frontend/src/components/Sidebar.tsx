import React from 'react';
import SidebarItem from './SidebarItem';

interface ItemContent {
  building: string;
  rooms: string[];
}
const items: ItemContent[] = [
  { building: '제 1공학관', rooms: ['공A546'] },
  { building: '제 4공학관', rooms: ['공D403', '공D404', '공D503'] },
];

function Sidebar() {
  return (
    <ul>
      {items.map((item) => (
        <SidebarItem label={item.building} key={item.building}>
          {item.rooms}
        </SidebarItem>
      ))}
    </ul>
  );
}

export default Sidebar;
