import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrap = styled.header`
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
`;

const HeaderNavMenu = styled.ul`
  margin-left: 2rem;
  justify-self: stretch;
`;

const HeaderNavLi = styled.li`
  display: inline-block;
  margin-right: 1rem;
  padding: 1rem;
`;

const HeaderNavItem = styled(NavLink)`
  text-decoration: none;
  font-size: 2rem;
  color: ${props => props.theme.color.grayLight};
  &:hover {
    color: ${props => props.theme.color.hotPink} !important;
  }
  &.active {
    color: ${props => props.theme.color.deepPink};
  }
`;

function Header() {
  return (
    <HeaderWrap>
      <HeaderNavMenu>
        <HeaderNavLi>
          <HeaderNavItem exact={true} to="/ContactsPage">
            ContactsPage
          </HeaderNavItem>
        </HeaderNavLi>
        <HeaderNavLi>
          <HeaderNavItem exact={true} to="/PreviewComponentsPage">
            PreviewComponentsPage
          </HeaderNavItem>
        </HeaderNavLi>
      </HeaderNavMenu>
    </HeaderWrap>
  );
}

export default React.memo(Header);
