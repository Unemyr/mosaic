import { Spec } from '@uwdata/mosaic-spec';

export const spec : Spec = {
  "meta": {
    "title": "Sorted Bars",
    "description": "Sort and limit an aggregate bar chart of gold medals by country.\n"
  },
  "data": {
    "athletes": {
      "file": "data/athletes.parquet"
    }
  },
  "vconcat": [
    {
      "input": "menu",
      "label": "Sport",
      "as": "$query",
      "from": "athletes",
      "column": "sport",
      "value": "aquatics"
    },
    {
      "vspace": 10
    },
    {
      "plot": [
        {
          "mark": "barX",
          "data": {
            "from": "athletes",
            "filterBy": "$query"
          },
          "x": {
            "sum": "gold"
          },
          "y": "nationality",
          "fill": "steelblue",
          "sort": {
            "y": "-x",
            "limit": 10
          }
        }
      ],
      "xLabel": "Gold Medals",
      "yLabel": "Nationality",
      "yLabelAnchor": "top",
      "marginTop": 15
    }
  ]
};
