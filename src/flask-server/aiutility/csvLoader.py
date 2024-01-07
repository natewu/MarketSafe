import csv
def csvToJSON(csvfile):
    reader = csv.reader(csvfile, delimiter=' ', quotechar='|')
    for row in reader:
        print(row["user"], )

