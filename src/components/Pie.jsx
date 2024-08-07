import React from "react";
import ApexCharts from "apexcharts";

function Pie({ data }) {
  React.useEffect(() => {
    const options = {
      chart: {
        type: "pie",
      },
      labels: Object.keys(data),
      series: Object.values(data),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 20,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(document.getElementById("pie-chart"), options);
    chart.render();

    return () => chart.destroy();
  }, [data]);

  return <div id="pie-chart" className="w-96 items-center h-24"></div>;
}

export default Pie;
