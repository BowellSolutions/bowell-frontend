/**
 * @license MIT
 * Copyright (c) 2022 Adam Lisichin, Hubert Decyusz, Wojciech Nowicki, Gustaw Daczkowski
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE
 *
 * @author: Adam Lisichin
 * @file: Exports ProbabilityPlot component - line chart built with Recharts, presenting probabilities of having
 * a bowel sound based on machine learning model response.
 **/
import CardHeader from "../card/CardHeader";
import {Button, Checkbox, Flex, Input, Select, Text} from "@chakra-ui/react";
import {CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import Card from "../card/Card";
import {FC, useCallback, useMemo, useState} from "react";
import {ProbabilityPlotData} from "../../api/types";
import {useCurrentPng} from "recharts-to-png";
import FileSaver from "file-saver";


interface ProbabilityPlotProps {
  data: ProbabilityPlotData[],
  initialStep: number,
  title: string,
  x_key: string,
  y_key: string,
  x_label: string,
  y_label: string,
}

export const ProbabilityPlot: FC<ProbabilityPlotProps> = (
  {data, initialStep, x_key, y_key, title, x_label, y_label}
) => {
  const [step, setStep] = useState<number>(initialStep);
  const [lineColor, setLineColor] = useState<string>("#319795");
  const [dotsEnabled, setDotsEnabled] = useState<boolean>(false);

  // return memoized data (calculate only if data or step has changed)
  const plot = useMemo(() => {
    // reduce number of points by filtering with step
    return data.filter(p => (Number(p.start) / step) % 1 === 0);
  }, [data, step]);

  const [getPng, {ref, isLoading}] = useCurrentPng();
  const handleDownload = useCallback(async () => {
    const png = await getPng();

    // Verify that png is not undefined
    if (png) {
      const filename = `bowell-chart-${new Date().toISOString()}.png`;
      // Download with FileSaver
      FileSaver.saveAs(png, filename);
    }
  }, [getPng]);

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
          data={plot}
          margin={{
            top: 0,
            right: 30,
            left: 20,
            bottom: 15,
          }}
          ref={ref}
        >
          <CartesianGrid strokeDasharray="2 2"/>
          <XAxis dataKey={x_key}>
            <Label value={x_label} offset={-10} position="insideBottom"/>
          </XAxis>
          <YAxis>
            <Label value={y_label} offset={5} position="left" angle={-90}/>
          </YAxis>
          <Tooltip/>
          <Line type="monotone" dataKey={y_key} stroke={lineColor} dot={dotsEnabled}/>
        </LineChart>
      </ResponsiveContainer>

      <Flex flexDirection="column">
        <Text fontSize="md" fontWeight="bold" mt="16px" userSelect="none">
          Options:
        </Text>

        <Flex alignItems="center">
          <Flex grow={1}>
            <Text fontSize="md" fontWeight="semibold" mt="16px" userSelect="none">
              X axis step: <Text ml="8px" as="span" fontSize="sm" fontWeight="normal" color="gray">{step} [s]</Text>
            </Text>
          </Flex>

          <Select
            w="auto"
            id="select-time-step"
            onChange={e => setStep(Number(e.target.value))}
          >
            <option value={10}>10s</option>
            <option value={5}>5s</option>
            <option value={2}>2s</option>
            <option value={1}>1s</option>
            <option value={0.1}>0.1s</option>
            <option value={0.5}>0.5s</option>
            <option value={0.05}>0.05s</option>
            <option value={0.01}>0.01s</option>
          </Select>
        </Flex>

        <Flex alignItems="center" mt="8px">
          <Flex grow={1}>
            <Text fontSize="md" fontWeight="semibold" mt="16px" userSelect="none">
              Line color: <Text ml="8px" as="span" fontSize="sm" fontWeight="normal" color="gray">{lineColor}</Text>
            </Text>
          </Flex>

          <Input
            size="sm"
            w="75px"
            id="line-color-picker"
            type="color"
            value={lineColor}
            onChange={e => setLineColor(e.target.value)}
          />
        </Flex>

        <Flex alignItems="center" mt="8px">
          <Flex grow={1}>
            <Text fontSize="md" fontWeight="semibold" mt="16px" userSelect="none">
              Dots
            </Text>
          </Flex>

          <Checkbox
            size="lg"
            id="dots-enabled-checkbox"
            defaultIsChecked={false}
            onChange={e => setDotsEnabled(e.target.checked)}
          />
        </Flex>

        <Flex justifyContent="flex-end" mt="16px">
          <Button
            id="btn-save-to-png"
            onClick={handleDownload}
            isLoading={isLoading}
            isDisabled={isLoading}
            colorScheme="blue"
          >
            Save as PNG
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProbabilityPlot;
