#!/bin/bash
# Uses mongoimport to read the CSV files and import it ro a database
cols=( circuits constructor_results constructor_standings constructors driver_standings driver lap_times pit_stops qualifying races results seasons status )
for col in "${cols[@]}"
do mongoimport -d piquet -c $col --type csv --file $col.csv --headerline
done