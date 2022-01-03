import Card from "../card/Card";
import CardBody from "../card/CardBody";
import {Flex, Icon, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue} from "@chakra-ui/react";
import IconBox from "../icons/IconBox";
import {FC} from "react";
import {useAppSelector} from "../../redux/hooks";
import {BiReceipt} from "react-icons/bi";
import {BsFillPeopleFill, BsCalendarWeek} from "react-icons/bs";
import {MdPendingActions} from "react-icons/md";


const StatisticsBoxes: FC = () => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");

  const statistics = useAppSelector(state => state.dashboard.statistics);

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
                {statistics != null && statistics.patients_related_count}
              </StatNumber>
            </Stat>
            <IconBox
              // @ts-ignore
              as="box" h="45px" w="45px" bg={iconTeal}
            >
              <Icon h="24px" w="24px" color={iconBoxInside} as={BsFillPeopleFill}/>
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
                {statistics != null && statistics.examination_count}
              </StatNumber>
            </Stat>
            <IconBox
              // @ts-ignore
              as="box" h="45px" w="45px" bg={iconTeal}
            >
              <Icon h="24px" w="24px" color={iconBoxInside} as={BiReceipt}/>
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
                {statistics != null && statistics.examinations_scheduled_count}
              </StatNumber>
            </Stat>
            <IconBox
              // @ts-ignore
              as="box" h="45px" w="45px" bg={iconTeal}
            >
              <Icon h="24px" w="24px" color={iconBoxInside} as={MdPendingActions}/>
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
                {statistics != null && statistics.examinations_next_week_count}
              </StatNumber>
            </Stat>
            <IconBox
              // @ts-ignore
              as="box" h="45px" w="45px" bg={iconTeal}
            >
              <Icon h="22px" w="22px" color={iconBoxInside} as={BsCalendarWeek}/>
            </IconBox>
          </Flex>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};

export default StatisticsBoxes;
