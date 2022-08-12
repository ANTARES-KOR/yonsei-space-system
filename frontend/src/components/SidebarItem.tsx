import React from 'react';

interface Props {
  label: string;
  children?: string[];
}

function SidebarItem({ label, children }: Props) {
  return (
    <li>
      {label}
      {children && (
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
