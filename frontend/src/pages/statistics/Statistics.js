import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "8:00 AM",
    uv: 40,
    pv: 23,
    amt: 25,
    ad: 27,
  },
  {
    name: "9:00 AM",
    uv: 40,
    pv: 13,
    ad: 27,
    ad: 27,
  },
  {
    name: "10:00 AM",
    uv: 40,
    pv: 13,
    ad: 27,
    ad: 27,
  },
  {
    name: "11:00 AM",
    uv: 40,
    pv: 13,
    ad: 27,
    ad: 27,
  },
  {
    name: "11:00 AM",
    uv: 40,
    pv: 13,
    ad: 27,
    ad: 27,
  },
  {
    name: "11:00 AM",
    uv: 40,
    pv: 13,
    ad: 27,
    ad: 27,
  },
  {
    name: "11:00 AM",
    uv: 40,
    pv: 13,
    ad: 27,
    ad: 27,
  },
  {
    name: "11:00 AM",
    uv: 40,
    pv: 13,
    ad: 27,
    ad: 27,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/90v76x08/";

  render() {
    return (
      <BarChart
        width={800}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 40,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          label={{ value: "Time", angle: 0, position: "right" }}
        />
        <YAxis
          label={{
            value: "Number of visitors",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" name="business1" stackId="a" fill="#8884d8" />
        <Bar dataKey="uv" name="Business2" stackId="a" fill="#82ca9d" />
        <Bar dataKey="ad" name="Business3" stackId="a" fill="#827a9d" />
      </BarChart>
    );
  }
}
