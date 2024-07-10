import React, {FC} from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading, Link,
  Skeleton,
  Spinner,
  Stack,
  StackDivider,
  Text
} from "@chakra-ui/react";

interface StatsProps {
  content: any
}

const Stats: FC<StatsProps> = ({content}) => {
  return (
    <Card m={4}>
      <CardHeader>
        <Heading size='md'>{content.head}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider/>} spacing='4'>
          {content.values.map((oneStat, idx) => {
              const diffType = oneStat.diff !== 0 ? oneStat.diff > 0 ? "+" : "-" : ""
              const diffColor = diffType !== "" ? diffType === '+' ? "green.300" : "red.300" : "gray.500"

              return <Box key={idx}>
                <Heading size='large' textTransform='uppercase'>
                  {oneStat.text}
                </Heading>
                <Flex>
                  {oneStat.value.startsWith('https')
                    ?
                    <Link href={oneStat.value} wordBreak='break-word' pt='2'
                          fontSize={isNaN(oneStat.value) ? 'large' : 'xx-large'}>
                      {oneStat.value}
                    </Link>
                    :
                    <Text wordBreak='break-word' pt='2' fontSize={isNaN(oneStat.value) ? 'large' : 'xx-large'}>
                      {oneStat.value}
                    </Text>
                  }

                  {diffType !== "" ?
                    <Text pt='2' pl='3' fontSize='xx-large' color={diffColor}>
                      {diffType === "+" ? "+" : ""}{oneStat.diff}
                    </Text>
                    : <></>}
                </Flex>
              </Box>
            }
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Stats;