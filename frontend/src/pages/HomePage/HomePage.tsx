import React, {useContext, useEffect, useState} from 'react';
import {Alert, AlertDescription, AlertIcon, AlertTitle, Skeleton, Stack, Text} from "@chakra-ui/react";
import getStatistic from "../../api/getStatistic.ts";
import {SelectionContext} from "../../context/SelectionContext.tsx";
import Stats from "../../components/Stats/Stats.tsx";
import PushSwitch from "../../components/PushSwitch/PushSwitch.tsx";

const HomePage = () => {
  const [content, setContent] = useState<any[] | undefined>(undefined)
  const {directionIdx, statIdx, directions} = useContext(SelectionContext)

  useEffect(() => {
    setContent(undefined)

    async function getData() {
      if (directions) {
        if (directions[directionIdx].stats.length === 0) {
          return setContent([])
        }

        const rs = await getStatistic(directions[directionIdx].stats[statIdx].id)
        if (rs.status !== 'success') {
          return
        }
        setContent(rs.content)
      }
    }

    getData()
  }, [directions, directionIdx, statIdx]);

  return (
    <>
      <PushSwitch/>
      {!content ?
        <Stack m={4}>
          <Skeleton height='50px'/>
          <Skeleton height='50px'/>
          <Skeleton height='50px'/>
        </Stack> : content.length !== 0 ?
          content.map((block, idx) => {
            if (block.type === 'stats') {
              return <Stats key={idx} content={block}/>
            } else {
              return <Text>ERROR</Text>
            }
          }) :
          <Alert mt={10} p={4} status='warning'>
            <AlertIcon/>
            <AlertTitle>Информация отсутствует!</AlertTitle>
            <AlertDescription>Ждите обновления данных</AlertDescription>
          </Alert>}
    </>
  );
};

export default HomePage;