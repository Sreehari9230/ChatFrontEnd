import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGraphStore } from "../store/useGraphStore";

const GraphPage = () => {
  const { GraphData, GetGraphData } = useGraphStore();

  useEffect(() => {
    GetGraphData();
  }, []);

  return (
    <>
      <div></div>
    </>
  );
};

export default GraphPage;
