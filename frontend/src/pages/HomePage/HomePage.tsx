import React from 'react';
import {Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber} from "@chakra-ui/react";

const HomePage = () => {
  return (
    <StatGroup justifyContent="center">
      {[43, 45, 46, 48, 54].map((val, idx) =>
        <Stat key={idx} padding="1rem">
          <StatLabel>Проходной балл на бюджет</StatLabel>
          <StatNumber>{val}</StatNumber>
          <StatHelpText>
            <StatArrow type='increase'/>
            3
          </StatHelpText>
        </Stat>
      )}
    </StatGroup>
  );
};

export default HomePage;