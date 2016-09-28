
import sys
import os
from dateutil import rrule
from datetime import datetime

start_day = sys.argv[1]
until_day = sys.argv[2]

year = start_day[:4]
path = os.path.join('.', year)

usage = """
python checkfetch.py <start day> <until day>
example: python checkfetch.py 20160101 20161231

crawl data from githubarchive between 20160101 20161231 to ./2016/
the files size will be put in ./2016.csv each file download with entry on the csv file
ignore download if the file existed
"""
print(usage)

number_file = 0
total_size = 0
with open(year + ".csv", 'w') as f:
    for dt in rrule.rrule(rrule.DAILY,
                          dtstart=datetime.strptime(start_day, '%Y%m%d'),
                          until=datetime.strptime(until_day, '%Y%m%d')):
        for hour in xrange(0, 24):
            filename = dt.strftime('%Y-%m-%d-') + str(hour) + '.json.gz'
            try:
                size = os.path.getsize(year + '/' + filename)
                f.write(filename + ',' + str(size) + '\n')
            except OSError:
                # print('wget http://data.githubarchive.org/' + filename)
                cmd = 'wget -P ./' + year + ' http://data.githubarchive.org/' + filename
                response = os.popen(cmd).read()
                number_file += 1
                print(response)

print(str(number_file) + ' files downloaded ')
