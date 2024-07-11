import React, {useContext} from 'react';
import {Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spinner, Text} from "@chakra-ui/react";
import {SelectionContext} from "../../context/SelectionContext.tsx";

const Header = () => {
  const {directions, directionIdx, setDirectionIdx, statIdx, setStatIdx} = useContext(SelectionContext)

  return (
    directions ?
      directions.length !== 0 ?
        <Box>
          <Flex pl={4} pt={4} alignItems="center">
            <Menu>
              <MenuButton as={Button}>
                {directions[directionIdx].name}
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
                {directions[directionIdx].stats.length !== 0 ? directions[directionIdx].stats[statIdx].time : 'Нет данных'}
              </MenuButton>
              <MenuList>
                {directions[directionIdx].stats.map((stat, idx) =>
                  <MenuItem key={idx} onClick={() => setStatIdx(idx)}>{stat.time}</MenuItem>)}
              </MenuList>
            </Menu>
          </Flex>
        </Box> :
        <Text m={5} fontSize="x-large">Нет направлений!</Text> :
      <Spinner size='xl' m={4}/>
  );
};

export default Header;