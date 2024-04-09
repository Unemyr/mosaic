#!/bin/sh
npm run build
yalc publish packages/inputs
yalc publish packages/plot
yalc publish packages/sql
yalc publish packages/vgplot
