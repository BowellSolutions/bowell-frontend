import {FC} from "react";
import {Avatar, Box, Button, Flex, Grid, Switch, useColorModeValue, Text} from "@chakra-ui/react";
import CardBody from "../../card/CardBody";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";

const Profile: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );
  const emailColor = useColorModeValue("gray.400", "gray.300");

  return (
    <Flex direction="column">
      <Box
        mb={{sm: "205px", md: "75px", xl: "70px"}}
        borderRadius="15px"
        px="0px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        align="center"
      >
        <Box
          // bgImage={ProfileBgImage}
          w="100%"
          h="300px"
          borderRadius="25px"
          bgPosition="50%"
          bgRepeat="no-repeat"
          position="relative"
          display="flex"
          justifyContent="center"
        >
          <Flex
            direction={{sm: "column", md: "row"}}
            mx="1.5rem"
            maxH="330px"
            w={{sm: "90%", xl: "95%"}}
            justifyContent={{sm: "center", md: "space-between"}}
            align="center"
            backdropFilter="saturate(200%) blur(50px)"
            position="absolute"
            boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
            border="2px solid"
            borderColor={borderProfileColor}
            bg={bgProfile}
            p="24px"
            borderRadius="20px"
            transform={{
              sm: "translateY(45%)",
              md: "translateY(110%)",
              lg: "translateY(160%)",
            }}
          >
            <Flex
              align="center"
              mb={{sm: "10px", md: "0px"}}
              direction={{sm: "column", md: "row"}}
              w={{sm: "100%"}}
              textAlign={{sm: "center", md: "start"}}
            >
              <Avatar
                me={{md: "22px"}}
                src=""
                w="80px"
                h="80px"
                borderRadius="15px"
              />
              <Flex direction="column" maxWidth="100%" my={{sm: "14px"}}>
                <Text
                  fontSize={{sm: "lg", lg: "xl"}}
                  color={textColor}
                  fontWeight="bold"
                  ms={{sm: "8px", md: "0px"}}
                >
                  Firstname Lastname
                </Text>
                <Text
                  fontSize={{sm: "sm", md: "md"}}
                  color={emailColor}
                  fontWeight="semibold"
                >
                  admin@admin.com
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Grid templateColumns={{sm: "1fr", xl: "repeat(3, 1fr)"}} gap="22px">
        <Card p="16px" my={{sm: "24px", xl: "0px"}}>
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Profile Information
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Text fontSize="md" color="gray.500" fontWeight="400" mb="30px">
                Hi, I’m Esthera Jackson, Decisions: If you can’t decide, the
                answer is no. If two equally difficult paths, choose the one
                more painful in the short term (pain avoidance is creating an
                illusion of equality).
              </Text>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Full Name:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  Firstname Lastname
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Mobile:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  (44) 123 1234 123
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Email:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  admin@admin.com
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Location:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  United States
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>

        <Card p="16px">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Platform Settings
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Text fontSize="sm" color="gray.500" fontWeight="600" mb="20px">
                ACCOUNT
              </Text>
              <Flex align="center" mb="20px">
                <Switch colorScheme="teal" me="10px"/>
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.500"
                  fontWeight="400"
                >
                  Email me when someone follows me
                </Text>
              </Flex>
              <Flex align="center" mb="20px">
                <Switch colorScheme="teal" me="10px"/>
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.500"
                  fontWeight="400"
                >
                  Email me when someone answers on my post
                </Text>
              </Flex>
              <Flex align="center" mb="20px">
                <Switch colorScheme="teal" me="10px"/>
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.500"
                  fontWeight="400"
                >
                  Email me when someone mentions me
                </Text>
              </Flex>
              <Text
                fontSize="sm"
                color="gray.500"
                fontWeight="600"
                m="6px 0px 20px 0px"
              >
                APPLICATION
              </Text>
              <Flex align="center" mb="20px">
                <Switch colorScheme="teal" me="10px"/>
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.500"
                  fontWeight="400"
                >
                  New launches and projects
                </Text>
              </Flex>
              <Flex align="center" mb="20px">
                <Switch colorScheme="teal" me="10px"/>
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.500"
                  fontWeight="400"
                >
                  Monthly product changes
                </Text>
              </Flex>
              <Flex align="center" mb="20px">
                <Switch colorScheme="teal" me="10px"/>
                <Text
                  noOfLines={1}
                  fontSize="md"
                  color="gray.500"
                  fontWeight="400"
                >
                  Subscribe to newsletter
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>

        {/* List of conversations */}
        <Card p="16px">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Conversations
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column" w="100%">
              <Flex justifyContent="space-between" mb="21px">
                <Flex align="center">
                  <Avatar
                    src=""
                    w="50px"
                    h="50px"
                    borderRadius="15px"
                    me="10px"
                  />
                  <Flex direction="column">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize="xs" color="gray.500" fontWeight="400">
                      Hi! I need more information...
                    </Text>
                  </Flex>
                </Flex>
                <Button p="0px" bg="transparent" variant="no-hover">
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="teal.300"
                    alignSelf="center"
                  >
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent="space-between" mb="21px">
                <Flex align="center">
                  <Avatar
                    src=""
                    w="50px"
                    h="50px"
                    borderRadius="15px"
                    me="10px"
                  />
                  <Flex direction="column">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize="xs" color="gray.500" fontWeight="400">
                      Awesome work, can you change...
                    </Text>
                  </Flex>
                </Flex>
                <Button p="0px" bg="transparent" variant="no-hover">
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="teal.300"
                    alignSelf="center"
                  >
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent="space-between" mb="21px">
                <Flex align="center">
                  <Avatar
                    src=""
                    w="50px"
                    h="50px"
                    borderRadius="15px"
                    me="10px"
                  />
                  <Flex direction="column">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize="xs" color="gray.500" fontWeight="400">
                      Have a great afternoon...
                    </Text>
                  </Flex>
                </Flex>
                <Button p="0px" bg="transparent" variant="no-hover">
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="teal.300"
                    alignSelf="center"
                  >
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent="space-between" mb="21px">
                <Flex align="center">
                  <Avatar
                    src=""
                    w="50px"
                    h="50px"
                    borderRadius="15px"
                    me="10px"
                  />
                  <Flex direction="column">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize="xs" color="gray.500" fontWeight="400">
                      About files I can...
                    </Text>
                  </Flex>
                </Flex>
                <Button p="0px" bg="transparent" variant="no-hover">
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="teal.300"
                    alignSelf="center"
                  >
                    REPLY
                  </Text>
                </Button>
              </Flex>
              <Flex justifyContent="space-between" mb="21px">
                <Flex align="center">
                  <Avatar
                    src=""
                    w="50px"
                    h="50px"
                    borderRadius="15px"
                    me="10px"
                  />
                  <Flex direction="column">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">
                      Sophie B.{" "}
                    </Text>
                    <Text fontSize="xs" color="gray.500" fontWeight="400">
                      About files I can...
                    </Text>
                  </Flex>
                </Flex>
                <Button p="0px" bg="transparent" variant="no-hover">
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="teal.300"
                    alignSelf="center"
                  >
                    REPLY
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
};

export default Profile;
