#analysis_outgroup_plan
install.packages("sjmisc")
install.packages("here")
#Iniial set-up ---------------
library(sjmisc)
library(here)
library(ordinal)
library(tidyverse)
library(rstan)
library(bridgesampling)
library(shinystan)
rstan_options(auto_write = TRUE)
options(mc.cores = parallel::detectCores())
set.seed(123)


#--Set APA theme to use with ggplot
theme_set(theme_bw(18)+
            theme(panel.grid.major=element_blank(),
                  panel.grid.minor=element_blank(),
                  panel.border=element_blank(),
                  strip.background=element_blank(),
                  strip.text = element_text(face="bold"),
                  axis.line=element_line(),
                  text=element_text(family="serif")))

#Read in data
full_data <- read_csv("C:/Users/sarah/Documents/Documents/Uni/Experimental_psychology_lab/Our_project/XPLab_Conformity/Analyses/main/df_for_modeling.csv")

#Create readable labels for plotting.
#full_data <- mutate(full_data, condition = ifelse(ingroupNorm==1 & bothShown==0, "Ingroup norm favoured \n leaving robber alone \n Only ingroup norm shown",
                                                  #ifelse(ingroupNorm==0 & bothShown==0, "Ingroup norm favoured \n calling the police \n Only ingroup norm shown",
                                                         #ifelse(ingroupNorm==1 & bothShown==1, "Ingroup norm favoured \n leaving robber alone \n Both norms shown",
                                                               # "Ingroup norm favoured \n calling the police \n Both norms shown"))))
#full_data$responseLabels <- ordered(full_data$response, labels = c("1 = Definitely call the police", "2", "3", "4", "5", "6 = Definitely leave the robber alone"))





full_data["response"] <- full_data["preference"]
View(full_data)
#Frequentist Analysis----------------
ordinal <- clm(as.factor(preference)~ingroupNorm*bothShown, data=full_data)
summary(ordinal)





#Bayesian analysis------------
#--Set up data for stan.
useable_data <- full_data %>%
  select(response, ingroupNorm, bothShown, ingroupAgree, outgroupDisagree) %>% #select relevant columns
  mutate(ingroupAgree = ifelse(is.na(ingroupAgree), 1, ingroupAgree), #For experiments 1 and 2 we assumed that participants identified with the ingroup and not with the outgroup.
         outgroupDisagree = ifelse(is.na(outgroupDisagree), 1, outgroupDisagree)
         )
stan_data_all <- as.list(c(useable_data, N = dim(useable_data)[1]))



#--Fit model

fit_SCT_all <- stan(file = "C:/Users/sarah/Documents/Documents/Uni/Experimental_psychology_lab/Our_project/XPLab_Conformity/Analyses/main/stan_models/SCT.stan", data=stan_data_all, iter=10000, chains=4, seed = 123, control=list(adapt_delta = 0.99))
fit_herding_all <- stan(file = "C:/Users/sarah/Documents/Documents/Uni/Experimental_psychology_lab/Our_project/XPLab_Conformity/Analyses/main/stan_models/herding.stan", data=stan_data_all, iter=10000, chains=4, control=list(adapt_delta = 0.99))


#----Check diagnostics
launch_shinystan(fit_SCT_all)

#--Compare models using Bayes Factors

marg_lik_SCT_all <- bridge_sampler(samples = fit_SCT_all)
marg_lik_herding_all <- bridge_sampler(samples = fit_herding_all)
bf(marg_lik_herding_all,marg_lik_SCT_all)


#Create prior-posterior plots-------
source("analysis/plot_priors_posteriors.R")


