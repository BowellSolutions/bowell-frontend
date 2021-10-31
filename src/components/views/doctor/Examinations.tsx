import {FC} from "react";
import InvoicesRow from "../../tables/InvoicesRow";
import {billingData, invoicesData, newestTransactions, olderTransactions} from "../../../mocks";
import CardBody from "../../card/CardBody";
import {Button, Flex, Grid, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import {FaRegCalendarAlt} from "react-icons/fa";
import BillingRow from "../../tables/BillingRow";
import TransactionRow from "../../tables/TransactionRow";

const Examinations: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Grid templateColumns={{sm: "1fr", lg: "1.6fr 1.2fr"}}>
        <Card my={{lg: "24px"}} me={{lg: "24px"}}>
          <Flex direction="column">
            <CardHeader py="12px">
              <Text color={textColor} fontSize="lg" fontWeight="bold">
                Recent Medical Examinations
              </Text>
            </CardHeader>
            <CardBody>
              <Flex direction="column" w="100%">
                {billingData.map((row) => (
                  <BillingRow
                    name={row.name}
                    company={row.company}
                    email={row.email}
                    number={row.number}
                    key={row.name + row.company + row.number}
                  />
                ))}
              </Flex>
            </CardBody>
          </Flex>
        </Card>

        <Card my="24px" ms={{lg: "24px"}}>
          <CardHeader mb="12px">
            <Flex direction="column" w="100%">
              <Flex
                direction={{sm: "column", lg: "row"}}
                justify={{sm: "center", lg: "space-between"}}
                align={{sm: "center"}}
                w="100%"
                my={{md: "12px"}}
              >
                <Text
                  color={textColor}
                  fontSize={{sm: "lg", md: "xl", lg: "lg"}}
                  fontWeight="bold"
                >
                  Your Transactions
                </Text>
                <Flex align="center">
                  <Icon
                    as={FaRegCalendarAlt}
                    color="gray.400"
                    fontSize="md"
                    me="6px"
                  />
                  <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                    23 - 30 March 2021
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>

          <CardBody>
            <Flex direction="column" w="100%">
              <Text
                color="gray.400"
                fontSize={{sm: "sm", md: "md"}}
                fontWeight="semibold"
                my="12px"
              >
                NEWEST
              </Text>
              {newestTransactions.map((row) => (
                <TransactionRow
                  name={row.name}
                  date={row.date}
                  price={row.price}
                  key={row.name + row.date}
                />
              ))
              }
              <Text
                color="gray.400"
                fontSize={{sm: "sm", md: "md"}}
                fontWeight="semibold"
                my="12px"
              >
                OLDER
              </Text>
              {olderTransactions.map((row) => (
                <TransactionRow
                  name={row.name}
                  logo={row.logo}
                  date={row.date}
                  price={row.price}
                  key={row.name + row.date}
                />
              ))
              }
            </Flex>
          </CardBody>
        </Card>
      </Grid>

      <Grid templateColumns={{sm: "1fr", lg: "2fr 1.2fr"}} templateRows="1fr">
        <Card
          p="22px"
          my={{sm: "24px", lg: "0px"}}
          ms={{sm: "0px", lg: "24px"}}
        >
          <CardHeader>
            <Flex justify="space-between" align="center" mb="1rem" w="100%">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Invoices
              </Text>
              <Button
                colorScheme="teal"
                borderColor="teal.300"
                color="teal.300"
                variant="outline"
                fontSize="xs"
                p="8px 32px"
              >
                VIEW ALL
              </Button>
            </Flex>
          </CardHeader>

          <CardBody>
            <Flex direction="column" w="100%">
              {invoicesData.map((row) => (
                <InvoicesRow
                  date={row.date}
                  code={row.code}
                  price={row.price}
                  // logo={row.logo}
                  format={row.format}
                  key={row.date + row.code}
                />
              ))
              }
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
};

export default Examinations;
