import mixpanel from 'mixpanel-browser';
import React, { useState } from 'react';
import DropdownIcon from '../../../../icons/DropdownIcon';
import { IBenefitGroup } from '../../../../interfaces/contentful.types.generated';
import {
  DropDown,
  Menu as StyledMenu,
  MenuItem,
  MobileMenu,
  MobMenButton,
} from '../BenefitGroupsSection.styled';

interface MenuProps {
  activeFilter: number | undefined;
  setActiveFilter: React.Dispatch<React.SetStateAction<number | undefined>>;
  groups: Array<IBenefitGroup>;
  postPurchase: boolean;
}

const Menu: React.FC<MenuProps> = ({ activeFilter, setActiveFilter, groups, postPurchase }) => {
  const [mobileShown, setMobileShown] = useState(false);
  return (
    <>
      <StyledMenu postPurchase={postPurchase}>
        <MenuItem
          className={activeFilter === undefined ? 'active' : ''}
          onClick={() => {
            mixpanel.track('benefits.groups.filter', {
              show: 'all',
            });
            setActiveFilter(undefined);
          }}
        >
          All
        </MenuItem>

        {groups.map((group, index) => (
          <MenuItem
            className={activeFilter === index ? 'active' : ''}
            key={index}
            onClick={() => {
              mixpanel.track('benefits.groups.filter', {
                show: group.fields.title,
              });

              setActiveFilter(index);
            }}
          >
            {group.fields.title}
          </MenuItem>
        ))}
      </StyledMenu>
      <MobileMenu>
        <MobMenButton onClick={() => setMobileShown(!mobileShown)}>
          <span>{activeFilter === undefined ? 'View all' : groups[activeFilter].fields.title}</span>
          <DropdownIcon />
        </MobMenButton>

        <DropDown visible={mobileShown}>
          <MenuItem
            className={activeFilter === undefined ? 'active' : ''}
            onClick={() => {
              mixpanel.track('benefits.groups.filter', {
                show: 'all',
              });
              setActiveFilter(undefined);
              setMobileShown(false);
            }}
          >
            All
          </MenuItem>
          {groups.map((group, index) => (
            <MenuItem
              className={activeFilter === index ? 'active' : ''}
              key={index}
              onClick={() => {
                mixpanel.track('benefits.groups.filter', {
                  show: group.fields.title,
                });
                setActiveFilter(index);
                setMobileShown(false);
              }}
            >
              {group.fields.title}
            </MenuItem>
          ))}
        </DropDown>
      </MobileMenu>
    </>
  );
};

export default Menu;
