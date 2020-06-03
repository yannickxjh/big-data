library(tidyverse)

df=file.choose()

dataset <- read_csv(df)
support <- dataset %>% 
select (name,sex,number,year)
na.omit(support)

set.seed(2811)
km_model <- support %<%
cluster<-kmeans(support[3:4],center=9,nstart = 20)
o=order (cluster$cluster)
data.frame(dataset$name,cluster$cluster)

plot(dataset$year,dataset$number,type='n',xlim=c(1880,2015),xlab="year",ylab="number")
text(x=dataset$year,y=dataset$number,labels=dataset$name,col=cluster$cluster+1)
