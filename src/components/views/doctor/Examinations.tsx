import {FC, useEffect} from "react";
import CardBody from "../../card/CardBody";
import {Flex, Table, Tbody, Text, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import {useAppSelector} from "../../../redux/hooks";
import {useDispatch} from "react-redux";
import {loadExaminations} from "../../../redux/actions/dashboard";
import ExaminationsTableRow from "../../tables/ExaminationsTableRow";
import ExaminationModal from "../../dashboard/ExaminationModal";

const Examinations: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  const dispatch = useDispatch();
  const examinations = useAppSelector(state => state.dashboard.examinations);

  useEffect(() => {
    // try to get examinations on first load
    dispatch(loadExaminations());
  }, [dispatch]);

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Card overflowX={{sm: "scroll", xl: "hidden"}}>
        <CardHeader p="6px 0px 22px 0px">
          <Flex alignItems="center" grow={1}>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
              Examinations
            </Text>
          </Flex>
          <ExaminationModal/>
        </CardHeader>

        <CardBody>
          {examinations.length > 0 && examinations.map((examination) => {
            return (
              <ExaminationsTableRow
                examination={examination}
                key={`examination-row-${examination.id}`}
              />
            );
          })}
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Examinations;
