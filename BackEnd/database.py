import pandas as pd

df = pd.read_csv("../Daily_Port_Activity_Data_and_Trade_Estimates.csv")
print(df.head())
print(df.columns)
print(df.info())