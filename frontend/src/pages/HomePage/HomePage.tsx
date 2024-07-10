import React, {useContext, useEffect, useState} from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Skeleton,
  Spinner,
  Stack,
  StackDivider,
  Text
} from "@chakra-ui/react";
import getStatistic from "../../api/getStatistic.ts";
import {SelectionContext} from "../../context/SelectionContext.tsx";
import Stats from "../../components/Stats/Stats.tsx";

const HomePage = () => {
  const [content, setContent] = useState<any[] | undefined>(undefined)
  const {directionIdx, dateIdx} = useContext(SelectionContext)

  useEffect(() => {
    async function getData() {
      const rs = await getStatistic(directionIdx, dateIdx)
      if (rs.status !== 'success') {
        return
      }
      setContent(rs.content)
    }

    getData()
  }, []);

  return (
    !content ? <Stack m={4}>
        <Skeleton height='50px'/>
        <Skeleton height='50px'/>
        <Skeleton height='50px'/>
      </Stack> :
      content.map((block) => {
        if (block.type === 'stats') {
          return <Stats content={block}/>
        } else {
          return <Text>123333</Text>
        }
      })
  );
};

export default HomePage;