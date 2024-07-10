import React, {useContext} from 'react';
import {Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spinner} from "@chakra-ui/react";
import {SelectionContext} from "../../context/SelectionContext.tsx";

const Header = () => {
  const {directions, directionIdx, setDirectionIdx, statIdx, setStatIdx} = useContext(SelectionContext)

  return (
    directions ?
      <Box>
        <Flex pl={4} pt={4} alignItems="center">
          <Menu>
            <MenuButton as={Button}>
              {directions.length !== 0 ? directions[directionIdx].name : 'Нет направлений'}
            </MenuButton>
            <MenuList>
              {directions.map((direction, idx) =>
                <MenuItem key={idx} onClick={() => setDirectionIdx(idx)}>{direction.name}</MenuItem>)}
            </MenuList>
          </Menu>
        </Flex>
        <Flex pl={4} pt={4} alignItems="center">
          <Menu>
            <MenuButton as={Button}>
              {directions[directionIdx].stats.length !== 0 ? directions[directionIdx].stats[statIdx].time : 'Нет дат'}
            </MenuButton>
            <MenuList>
              {directions[directionIdx].stats.map((stat, idx) =>
                <MenuItem key={idx} onClick={() => setStatIdx(idx)}>{stat.time}</MenuItem>)}
            </MenuList>
          </Menu>
        </Flex>
      </Box> :
      <Spinner size='xl' m={4}/>
  );
};

export default Header;