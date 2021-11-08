import Card from "../card/Card";
import CardBody from "../card/CardBody";
import {Flex, Icon, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue} from "@chakra-ui/react";
import IconBox from "../icons/IconBox";
import {FC, useState} from "react";

const StatisticsBoxes: FC = () => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");

  // to do data fetching or receiving it as props
  const [patientsCount, setPatientsCount] = useState<number>(3);
  const [totalExaminations, setTotalExaminations] = useState<number>(12);
  const [pendingExaminations, setPendingExaminations] = useState<number>(3);
  const [thisWeekExaminations, setThisWeekExaminations] = useState<number>(0);

  return (
    <SimpleGrid columns={{sm: 1, md: 2, xl: 4}} spacing="24px">
      <Card minH="83px">
        <CardBody>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat me="auto">
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                {"Patients Count"}
              </StatLabel>
              <StatNumber fontSize="lg" color={textColor}>
                {patientsCount}
              </StatNumber>
            </Stat>
            <IconBox
              // @ts-ignore
              as="box" h="45px" w="45px" bg={iconTeal}
            >
              <Icon h="24px" w="24px" color={iconBoxInside}/>
            </IconBox>
          </Flex>
        </CardBody>
      </Card>

      <Card minH="83px">
        <CardBody>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat me="auto">
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                {"Total Examinations"}
              </StatLabel>
              <StatNumber fontSize="lg" color={textColor}>
                {totalExaminations}
              </StatNumber>
            </Stat>
            <IconBox
              // @ts-ignore
              as="box" h="45px" w="45px" bg={iconTeal}
            >
              <Icon h="24px" w="24px" color={iconBoxInside}/>
            </IconBox>
          </Flex>
        </CardBody>
      </Card>

      <Card minH="83px">
        <CardBody>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat>
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                Pending Examinations
              </StatLabel>
              <StatNumber fontSize="lg" color={textColor}>
                {pendingExaminations}
              </StatNumber>
            </Stat>
            <IconBox
              // @ts-ignore
              as="box" h="45px" w="45px" bg={iconTeal}
            >
              <Icon h="24px" w="24px" color={iconBoxInside}/>
            </IconBox>
          </Flex>
        </CardBody>
      </Card>

      <Card minH="83px">
        <CardBody>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat me="auto">
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                Examinations This Week
              </StatLabel>
              <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                {thisWeekExaminations}
              </StatNumber>
            </Stat>
            <IconBox
              // @ts-ignore
              as="box" h="45px" w="45px" bg={iconTeal}
            >
              <Icon h="24px" w="24px" color={iconBoxInside}/>
            </IconBox>
          </Flex>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};

export default StatisticsBoxes;
