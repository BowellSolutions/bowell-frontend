import {FC} from "react";
import CardBody from "../../card/CardBody";
import {Flex, Grid, Text, useColorModeValue} from "@chakra-ui/react";
import CardHeader from "../../card/CardHeader";
import Card from "../../card/Card";
import ExaminationsRow from "../../tables/ExaminationsRow";
import {examinationsData} from "../../../mocks/doctorDashboard";

const Examinations: FC = () => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" pt={{base: "120px", md: "75px"}}>
      <Grid templateColumns={{sm: "1fr", lg: "1.6fr 1.2fr"}}>

      </Grid>
    </Flex>
  );
};

export default Examinations;
