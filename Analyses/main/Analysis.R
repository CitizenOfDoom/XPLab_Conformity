#install.packages("Bridge Sampling")
#library(bridgesampling)
#bf(x1, x2, log = FALSE, ...)
devtools::install_github("tidyverse/readr")
library(tidyverse)
library(brms)
library(ordinal)
library(rstan)
library(bridgesampling)
data <- read_csv("C:/Users/sarah/Desktop/psylab/clean_df.csv")

     
as_tibble(data)
view(data)
# condition 1: only ingroup norm, report robber
# condition 2: only ingroup norm, let robber go
# condtion 3: both norms, report robber
# condition 4: both norms, let robber go
data %>% mutate(ingroup_agree=)
data %>% mutate(log_odds=b_in*ingroup_agree + b_both + b_out*outgroup_agree)
fit_model <- brm(
  formula=condition ~ log_odds,
  data=data,
  prior=
)
