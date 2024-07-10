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
  const {directionIdx, statIdx} = useContext(SelectionContext)

  useEffect(() => {
    setContent(undefined)
    async function getData() {
      const rs = await getStatistic(directionIdx, statIdx)
      if (rs.status !== 'success') {
        return
      }
      setContent(rs.content)
    }

    getData()
  }, [directionIdx, statIdx]);

  return (
    !content ? <Stack m={4}>
        <Skeleton height='50px'/>
        <Skeleton height='50px'/>
        <Skeleton height='50px'/>
      </Stack> :
      content.map((block, idx) => {
        if (block.type === 'stats') {
          return <Stats key={idx} content={block}/>
        } else {
          return <Text>123333</Text>
        }
      })
  );
};

export default HomePage;