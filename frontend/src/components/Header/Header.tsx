import React, {useContext} from 'react';
import {Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {SelectionContext} from "../../context/SelectionContext.tsx";

const Header = () => {
  const {directions, directionIdx, setDirectionIdx, dates, dateIdx, setDateIdx} = useContext(SelectionContext)

  return (
    <Box>
      <Flex pl={4} pt={4} alignItems="center">
        <Menu>
          <MenuButton as={Button}>
            {directions.length !== 0 ? directions[directionIdx] : 'Нет направлений'}
          </MenuButton>
          <MenuList>
            {directions.map((text, idx) => <MenuItem key={idx} onClick={() => setDirectionIdx(idx)}>{text}</MenuItem>)}
          </MenuList>
        </Menu>
      </Flex>
      <Flex pl={4} pt={4} alignItems="center">
        <Menu>
          <MenuButton as={Button}>
            {dates.length !== 0 ? dates[dateIdx] : 'Нет дат'}
          </MenuButton>
          <MenuList>
            {dates.map((text, idx) => <MenuItem key={idx} onClick={() => setDateIdx(idx)}>{text}</MenuItem>)}
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Header;