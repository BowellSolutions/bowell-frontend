import {FC, useRef} from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  SimpleGrid,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Portal,
  useColorModeValue
} from "@chakra-ui/react";
import TimelineRow from "../../tables/TimelineRow";
import IconBox from "../../icons/IconBox";
import {BsArrowRight} from "react-icons/bs";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import DashboardTableRow from "../../tables/DashboardTableRow";
import {dashboardTableData, timelineData} from "../../../mocks";


const DoctorDashboard: FC = () => {
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");

  const overlayRef = useRef();

  return (
    <Flex flexDirection="column" pt={{base: "120px", md: "75px"}}>
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
                  Today&aposs Money
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor}>
                    $53,000
                  </StatNumber>
                </Flex>
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
                  Today&aposs Users
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor}>
                    2,300
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                // @ts-ignore
                as="box" h={"45px"} w={"45px"} bg={iconTeal}
              >
                <Icon h={"24px"} w={"24px"} color={iconBoxInside}/>
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
                  New Clients
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor}>
                    +3,020
                  </StatNumber>
                </Flex>
              </Stat>
              <Spacer/>
              <IconBox
                // @ts-ignore
                as="box" h={"45px"} w={"45px"} bg={iconTeal}
              >
                <Icon h={"24px"} w={"24px"} color={iconBoxInside}/>
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
                  Total Sales
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    $173,000
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                // @ts-ignore
                as="box" h={"45px"} w={"45px"} bg={iconTeal}
              >
                <Icon h={"24px"} w={"24px"} color={iconBoxInside}/>
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Projects */}
      <Grid
        templateColumns={{sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr"}}
        templateRows={{sm: "1fr auto", md: "1fr", lg: "1fr"}}
        gap="24px"
        mt="26px"
      >
        <Card p="16px" overflowX={{sm: "scroll", xl: "hidden"}}>
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                pb=".5rem"
              >
                Projects
              </Text>
            </Flex>
          </CardHeader>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" ps="0px">
                <Th ps="0px" color="gray.400">
                  Companies
                </Th>
                <Th color="gray.400">Members</Th>
                <Th color="gray.400">Budget</Th>
                <Th color="gray.400">Completion</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dashboardTableData.map((row) => {
                return (
                  <DashboardTableRow
                    name={row.name}
                    logo=""
                    members={row.members}
                    budget={row.budget}
                    progression={row.progression}
                    key={row.name + row.progression}
                  />
                );
              })}
            </Tbody>
          </Table>
        </Card>

        {/* Orders */}
        <Card maxH="100%">
          <CardHeader p="22px 0px 35px 14px">
            <Flex direction="column">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                pb=".5rem"
              >
                Orders overview
              </Text>
            </Flex>
          </CardHeader>
          <CardBody ps="20px" pe="0px" mb="31px" position="relative">
            <Flex direction="column">
              {timelineData.map((row, index, arr) => (
                <TimelineRow
                  logo={""}
                  title={row.title}
                  date={row.date}
                  color={row.color}
                  index={index}
                  arrLength={arr.length}
                  key={row.title + row.date}
                />
              ))
              }
            </Flex>
          </CardBody>
        </Card>
      </Grid>

      <Grid
        templateColumns={{md: "1fr", lg: "1.8fr 1.2fr"}}
        templateRows={{md: "1fr auto", lg: "1fr"}}
        my="26px"
        gap="24px"
      >
        <Card minHeight="290.5px" p="1.2rem">
          <CardBody w="100%">
            <Flex flexDirection={{sm: "column", lg: "row"}} w="100%">
              <Flex
                flexDirection="column"
                h="100%"
                lineHeight="1.6"
                width={{lg: "45%"}}
              >
                <Text fontSize="sm" color="gray.400" fontWeight="bold">
                  Built by developers
                </Text>
                <Text
                  fontSize="lg"
                  color={textColor}
                  fontWeight="bold"
                  pb=".5rem"
                >
                  Bowell Dashboard
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  From colors, cards, typography to complex elements, you will
                  find the full documentation.
                </Text>

                <Spacer/>

                <Flex align="center">
                  <Button
                    p="0px"
                    variant="no-hover"
                    bg="transparent"
                    my={{sm: "1.5rem", lg: "0px"}}
                  >
                    <Text
                      fontSize="sm"
                      color={textColor}
                      fontWeight="bold"
                      cursor="pointer"
                      transition="all .5s ease"
                      my={{sm: "1.5rem", lg: "0px"}}
                      _hover={{me: "4px"}}
                    >
                      Read more
                    </Text>

                    <Icon
                      as={BsArrowRight}
                      w="20px"
                      h="20px"
                      fontSize="2xl"
                      transition="all .5s ease"
                      mx=".3rem"
                      cursor="pointer"
                      pt="4px"
                      _hover={{transform: "translateX(20%)"}}
                    />
                  </Button>
                </Flex>
              </Flex>
              <Spacer/>
              <Flex
                bg="teal.300"
                align="center"
                justify="center"
                borderRadius="15px"
                width={{lg: "40%"}}
                minHeight={{sm: "250px"}}
              >
                <Image
                  src=""
                  alt="chakra image"
                  minWidth={{md: "300px", lg: "auto"}}
                />
              </Flex>
            </Flex>
          </CardBody>
        </Card>

        <Card maxHeight="290.5px" p="1rem">
          <CardBody
            p="0px"
            // backgroundImage={peopleImage}
            bgPosition="center"
            bgRepeat="no-repeat"
            w="100%"
            h={{sm: "200px", lg: "100%"}}
            bgSize="cover"
            position="relative"
            borderRadius="15px"
          >
            <Box
              bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
              w="100%"
              position="absolute"
              h="inherit"
              borderRadius="inherit"
              // @ts-ignore
              ref={overlayRef}
            />

            <Portal
              // @ts-ignore
              containerRef={overlayRef}
            >
              <Flex
                flexDirection="column"
                color="white"
                p="1.5rem 1.2rem 0.3rem 1.2rem"
                lineHeight="1.6"
              >
                <Text fontSize="xl" fontWeight="bold" pb=".3rem">
                  Work with the rockets
                </Text>
                <Text fontSize="sm" fontWeight="normal" w={{lg: "92%"}}>
                  Wealth creation is a revolutionary recent positive-sum game.
                  It is all about who takes the opportunity first.
                </Text>
                <Spacer/>
                <Flex
                  align="center"
                  mt={{sm: "20px", lg: "40px", xl: "90px"}}
                >
                  <Button p="0px" variant="no-hover" bg="transparent" mt="12px">
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      _hover={{me: "4px"}}
                      transition="all .5s ease"
                    >
                      Read more
                    </Text>
                    <Icon
                      as={BsArrowRight}
                      w="20px"
                      h="20px"
                      fontSize="xl"
                      transition="all .5s ease"
                      mx=".3rem"
                      cursor="pointer"
                      _hover={{transform: "translateX(20%)"}}
                      pt="4px"
                    />
                  </Button>
                </Flex>
              </Flex>
            </Portal>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
};

export default DoctorDashboard;
