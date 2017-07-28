#!/bin/bash

city="$1"
year="$2"
frommonth="$3"
tomonth="$4"

minimumsize=20

mkdir $city$year

# http://api.wunderground.com/api/f968cf63e81e75f0/history_20150101/q/CN/Shanghai.json
# http://api.wunderground.com/api/f968cf63e81e75f0/history_20150101/q/Bejjing.json
# http://api.wunderground.com/api/f968cf63e81e75f0/history_20150101/q/CN/Shanghai.json
# Shanghai ZSSS
# Beijing  ZBAA
for month in $(seq -f "%02g" $frommonth $tomonth)
do
	for day in $(seq -f "%02g" 1 31)
	do

		if [ ! -f "./$city$year/$city$year$month$day.json" ]; then

			url="http://api.wunderground.com/api/f968cf63e81e75f0/history_$year$month$day/q/CN/$city.json"
			echo "./$city$year/$city$year$month$day.json not exist"
			echo "fetch $url"
			curl "$url" > "./$city$year/$city$year$month$day.json"
			sleep 7
		fi
		actualsize=$(du -k "./$city$year/$city$year$month$day.json" | cut -f 1)
		if [ $actualsize -le $minimumsize ]; then
			url="http://api.wunderground.com/api/f968cf63e81e75f0/history_$year$month$day/q/CN/$city.json"
			echo "$url"
			curl "$url" > "./$city$year/$city$year$month$day.json"
			sleep 7
		fi		
    done
done

# 
