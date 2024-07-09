import React, {useContext} from 'react';
import {Button, Flex, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {DirectionContext} from "../../context/DirectionContext.tsx";

const Header = () => {
  const {directions, directionIdx, setDirectionIdx} = useContext(DirectionContext)

  return (
    <Flex padding="1rem" alignItems="center">
      <Menu>
        <MenuButton as={Button}>
          {directions.length !== 0 ? directions[directionIdx] : 'Нет направлений'}
        </MenuButton>
        <MenuList>
          {directions.map((text, idx) => <MenuItem key={idx} onClick={() => setDirectionIdx(idx)}>{text}</MenuItem>)}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;