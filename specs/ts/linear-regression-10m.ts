import { Spec } from '@uwdata/mosaic-spec';

export const spec : Spec = {
  "meta": {
    "title": "Linear Regression 10M",
    "description": "A linear regression plot predicting flight arrival delay based on the time of departure, over 10 million flight records. Regression computation is performed in the database, with optimized selection updates using pre-aggregated materialized views. The area around a regression line shows a 95% confidence interval. Select a region to view regression results for a data subset.\n"
  },
  "data": {
    "flights10m": "SELECT GREATEST(-60, LEAST(ARR_DELAY, 180))::DOUBLE AS delay, DISTANCE AS distance, DEP_TIME AS time FROM 'https://idl.uw.edu/mosaic-datasets/data/flights-10m.parquet'",
    "flights10p": "SELECT * FROM flights10m USING SAMPLE 10%",
    "flights5p": "SELECT * FROM flights10m USING SAMPLE 5%",
    "flights1p": "SELECT * FROM flights10m USING SAMPLE 1%"
  },
  "params": {
    "data": "flights10m"
  },
  "vconcat": [
    {
      "input": "menu",
      "label": "Sample",
      "as": "$data",
      "options": [
        {
          "value": "flights10m",
          "label": "Full Data"
        },
        {
          "value": "flights10p",
          "label": "10% Sample"
        },
        {
          "value": "flights5p",
          "label": "5% Sample"
        },
        {
          "value": "flights1p",
          "label": "1% Sample"
        }
      ]
    },
    {
      "vspace": 10
    },
    {
      "plot": [
        {
          "mark": "raster",
          "data": {
            "from": "$data"
          },
          "x": "time",
          "y": "delay",
          "pixelSize": 4,
          "pad": 0,
          "imageRendering": "pixelated"
        },
        {
          "mark": "regressionY",
          "data": {
            "from": "$data"
          },
          "x": "time",
          "y": "delay",
          "stroke": "gray"
        },
        {
          "mark": "regressionY",
          "data": {
            "from": "$data",
            "filterBy": "$query"
          },
          "x": "time",
          "y": "delay",
          "stroke": "firebrick"
        },
        {
          "select": "intervalXY",
          "as": "$query",
          "brush": {
            "fillOpacity": 0,
            "stroke": "currentColor"
          }
        }
      ],
      "xDomain": [
        0,
        24
      ],
      "yDomain": [
        -60,
        180
      ],
      "colorScale": "symlog",
      "colorScheme": "blues",
      "colorDomain": "Fixed"
    }
  ]
};