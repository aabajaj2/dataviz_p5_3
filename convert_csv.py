import pandas as pd

df = pd.read_csv('facebook/348.edges',sep='\s+',header=None)
df
df.to_csv('348edges.csv',header=None)
