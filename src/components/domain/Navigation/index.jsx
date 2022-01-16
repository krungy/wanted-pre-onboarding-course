import React from 'react';
import styled from '@emotion/styled';
import color from '@assets/colors';
import { Icon, Image, TextButton, Button, Avatar } from '@components/base';
import { Logo } from '@assets/Image';

const NavigationContainer = styled.header`
  display: flex;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0 32px 0 32px;
  background-color: ${color.white};
  box-sizing: border-box;
  border-bottom: 1px solid ${color.grey};
`;

const NavigationContent = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  margin: 0;
  justify-content: ${({ align }) => align};
  align-items: center;
`;

const Divider = styled.hr`
  border: none;
  margin: 0 24px;
  background-color: ${color.grey};
  position: relative;
  top: -1;
  display: inline-block;
  width: 1px;
  height: 13px;
  vertical-align: middle;
`;

const DefaultNavigation = ({
  leftComponent,
  centerComponent,
  rightComponent,
  ...props
}) => {
  return (
    <NavigationContainer {...props}>
      <NavigationContent align="left">{leftComponent}</NavigationContent>
      <NavigationContent align="center">{centerComponent}</NavigationContent>
      <NavigationContent align="flex-end">{rightComponent}</NavigationContent>
    </NavigationContainer>
  );
};

export default DefaultNavigation;

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const GlobalNavigationBar = () => {
  const menuList = [
    {
      title: '채용',
      status: 'Default',
    },
    {
      title: '이벤트',
      status: 'Default',
    },
    {
      title: '직군별 연봉',
      status: 'Default',
    },
    {
      title: '이력서',
      status: 'Default',
    },
    {
      title: '커뮤니티',
      status: 'New',
    },
    {
      title: '프리랜서',
      status: 'Default',
    },
    {
      title: 'AI 합격예측',
      status: 'Beta',
    },
  ];

  const sideMenuList = [
    {
      name: 'mi:search',
      type: 'Icon',
      status: 'Default',
    },
    {
      name: 'mi:notification',
      type: 'Icon',
      status: 'New',
    },
    {
      name: 'avatar',
      type: 'Avatar',
      status: 'New',
    },
  ];

  const handleMenuList = (list) =>
    list.map(({ title, status }, index) => (
      <TextButton
        border={false}
        color={color.black}
        status={status}
        key={index}
      >
        {title}
      </TextButton>
    ));

  const handleSideMenuList = (list) =>
    list.map(({ name, type, status }, index) =>
      type === 'Icon' ? (
        <Button status={status} key={index} style={{ height: 32 }}>
          <Icon name={name} color={color.black} height="18px" />
        </Button>
      ) : (
        <Button status={status} key={index} style={{ height: 32 }}>
          <Avatar src="default"></Avatar>
        </Button>
      ),
    );
  return (
    <DefaultNavigation
      leftComponent={
        <MenuContainer>
          <Button>
            <Icon name="mi:menu" color="#000" height="22px" />
          </Button>
          <Button>
            <Image src={Logo} alt="Logo" width="74.38px" height="17px" />
          </Button>
        </MenuContainer>
      }
      centerComponent={handleMenuList(menuList)}
      rightComponent={
        <>
          <MenuContainer style={{ gap: 14 }}>
            {handleSideMenuList(sideMenuList)}
          </MenuContainer>
          <Divider />
          <TextButton border={true} color={color.black_70}>
            기업 서비스
          </TextButton>
        </>
      }
    />
  );
};