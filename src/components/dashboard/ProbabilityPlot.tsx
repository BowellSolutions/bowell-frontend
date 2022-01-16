/**
 * @author: Adam Lisichin
 * @file: Exports ProbabilityPlot component - line chart built with Recharts, presenting probabilities of having
 * a bowel sound based on machine learning model response.
 **/
import CardHeader from "../card/CardHeader";
import {Text} from "@chakra-ui/react";
import {CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import Card from "../card/Card";
import {FC} from "react";
import {ProbabilityPlotData} from "../../api/types";


interface ProbabilityPlotProps {
  data: ProbabilityPlotData[],
  title: string,
  x_key: string,
  y_key: string,
  x_label: string,
  y_label: string,
}

export const ProbabilityPlot: FC<ProbabilityPlotProps> = (
  {data, x_key, y_key, title, x_label, y_label}
) => {
  return (
    <Card w="100%" m={{base: "8px 0", md: "8px"}}>
      <CardHeader mb="16px">
        <Text fontSize="lg" fontWeight="bold" mb="10px" userSelect="none">
          {title}
        </Text>
      </CardHeader>

      <ResponsiveContainer width="100%" height="100%" minHeight={550} maxHeight={600}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: 20,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="2 2"/>
          <XAxis dataKey={x_key}>
            <Label value={x_label} offset={-10} position="insideBottom"/>
          </XAxis>
          <YAxis>
            <Label value={y_label} offset={5} position="left" angle={-90}/>
          </YAxis>
          <Tooltip/>
          <Line type="monotone" dataKey={y_key} stroke="#319795" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ProbabilityPlot;
