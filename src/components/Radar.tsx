import ReactApexChart from "react-apexcharts";
import React from "react";
import {ApexOptions} from "apexcharts";

interface IRadarProps {
  series: ApexOptions['series'],
  categories: string[],
  height?: number
}

export const Radar = ({series, categories, height = 500}: IRadarProps) => {
  return <ReactApexChart
    className={'Radar'}
    type={'radar'}
    series={series}
    height={height}
    options={{
      theme: {
        mode: 'dark',
        palette: '#7851a9',
        monochrome: {
          enabled: true,
          shadeTo: 'dark',
          shadeIntensity: 1
        }
      },
      chart: {
        toolbar: {
          show: false,
        },
        type: 'radar',
        background: 'transparent',
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        },
      },

      plotOptions: {
        radar: {
          polygons: {
            strokeColors: '#e8e8e8',
            fill: {
              colors: ['#7851a9', '#8b62c7']
            }
          }
        }
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          borderRadius: 2,
        }
      },
      yaxis: {
        show: false
      },
      xaxis: {
        categories: categories
      }
    }}/>
}
