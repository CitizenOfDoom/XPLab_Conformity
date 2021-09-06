#analysis_outgroup_plan
install.packages("sjmisc")
#Iniial set-up ---------------
library(sjmisc)
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
full_data <- read_csv("C:/Users/sarah/Desktop/psylab/clean_df.csv")

#Create readable labels for plotting.
#full_data <- mutate(full_data, condition = ifelse(ingroupNorm==1 & bothShown==0, "Ingroup norm favoured \n leaving robber alone \n Only ingroup norm shown",
                                                  #ifelse(ingroupNorm==0 & bothShown==0, "Ingroup norm favoured \n calling the police \n Only ingroup norm shown",
                                                         #ifelse(ingroupNorm==1 & bothShown==1, "Ingroup norm favoured \n leaving robber alone \n Both norms shown",
                                                               # "Ingroup norm favoured \n calling the police \n Both norms shown"))))
#full_data$responseLabels <- ordered(full_data$response, labels = c("1 = Definitely call the police", "2", "3", "4", "5", "6 = Definitely leave the robber alone"))

#Remove unusable participants (answered understanding check wrong or didn't identify an ingroup/outgroup in later experiments.)
#useable_data <- filter(full_data,
                       #understandingCheckResponse==1,
                       #RepublicanRating!=DemocraticRating | is.na(RepublicanRating!=DemocraticRating), #Exclude participants who were indifferent between the parties for Exp 2
                       t#opIssueRating!=5 | is.na(topIssueRating!=5) #Exclude participants who were indifferent to their chosen issue in Exp 3 and 4
#)
#Create separate dataframes for each experiment
#data1 <- useable_data[useable_data$expNum=="Exp 1",]
#data2 <- useable_data[useable_data$expNum=="Exp 2",]
#data3 <- useable_data[useable_data$expNum=="Exp 3",]
#data4 <- useable_data[useable_data$expNum=="Exp 4",]


full_data <- mutate(full_data, bothShown = ifelse(str_contains(full_data['condition'],"Approximately 85% of participants in a previous study who disagreed with you"), "1", "0"))
full_data <- mutate(full_data, ingroupNorm = ifelse(str_contains(full_data['condition'], "60% of the other participants who agree with you on  your chosen issue chose to let the robber go"), "1", "0"))
full_data <- mutate(full_data, ingroupAgree = ifelse((full_data['preference']>0 & str_contains(full_data['condition'], "60% of the other participants who agree with you on  your chosen issue chose to let the robber go")) | full_data['preference']<0 & str_contains(full_data['condition'], "60% of the other participants who agree with you on  your chosen issue chose to report the robber"),"1","0"))
full_data <- mutate(full_data, outgroupDisagree = ~full_data["ingroupAgree"])
View(full_data)

#Frequentist Analysis----------------
ordinal <- clm(as.factor(preference)~ingroupNorm*bothShown, data=full_data)



#source("functions/produce_mean_and_count_bar_plot.R")
#plot_1 <- produce_mean_and_count_bar_plot(data1, bar_width_means=0.5, bar_width_response=0.3)
#ggsave(file="plot_1.png", plot=plot_1, width=190, height = 110, units="mm")  
#plot_2 <- produce_mean_and_count_bar_plot(data2, bar_width_means=0.5, bar_width_response=0.3)
#ggsave(file="plot_2.png", plot=plot_2, width=190, height = 110, units="mm")  
#plot_3 <- produce_mean_and_count_bar_plot(data3, bar_width_means=0.5, bar_width_response=0.3)
#ggsave(file="plot_3.png", plot=plot_3, width=190, height = 110, units="mm")  
#plot_4 <- produce_mean_and_count_bar_plot(data4, bar_width_means=0.5, bar_width_response=0.3)
#ggsave(file="plot_4.png", plot=plot_4, width=190, height = 110, units="mm")  


#Bayesian analysis------------
#--Set up data for stan.
useable_data <- useable_data %>%
  select(preference, ingroupNorm, bothShown, ingroupAgree, outgroupDisagree) %>% #select relevant columns
  mutate(ingroupAgree = ifelse(is.na(ingroupAgree), 1, ingroupAgree), #For experiments 1 and 2 we assumed that participants identified with the ingroup and not with the outgroup.
         outgroupDisagree = ifelse(is.na(outgroupDisagree), 1, outgroupDisagree)
         )
stan_data_all <- as.list(c(useable_data, N = dim(useable_data)[1]))



#--Fit models
fit_SCT_1 <- stan(file = "analysis/stan_models/SCT.stan", data=stan_data1, iter=10000, chains=4, seed = 123, control=list(adapt_delta = 0.99))
fit_herding_1 <- stan(file = "analysis/stan_models/herding.stan", data=stan_data1, iter=10000, chains=4, control=list(adapt_delta = 0.99))

fit_SCT_2 <- stan(file = "analysis/stan_models/SCT.stan", data=stan_data2, iter=10000, chains=4, seed = 123, control=list(adapt_delta = 0.99))
fit_herding_2 <- stan(file = "analysis/stan_models/herding.stan", data=stan_data2, iter=10000, chains=4, control=list(adapt_delta = 0.99))

fit_SCT_3 <- stan(file = "analysis/stan_models/SCT.stan", data=stan_data3, iter=10000, chains=4, seed = 123, control=list(adapt_delta = 0.99))
fit_herding_3 <- stan(file = "analysis/stan_models/herding.stan", data=stan_data3, iter=10000, chains=4, control=list(adapt_delta = 0.99))

fit_SCT_4 <- stan(file = "analysis/stan_models/SCT.stan", data=stan_data4, iter=10000, chains=4, seed = 123, control=list(adapt_delta = 0.99))
fit_herding_4 <- stan(file = "analysis/stan_models/herding.stan", data=stan_data4, iter=10000, chains=4, control=list(adapt_delta = 0.99))

fit_SCT_all <- stan(file = "analysis/stan_models/SCT.stan", data=stan_data_all, iter=10000, chains=4, seed = 123, control=list(adapt_delta = 0.99))
fit_herding_all <- stan(file = "analysis/stan_models/herding.stan", data=stan_data_all, iter=10000, chains=4, control=list(adapt_delta = 0.99))


#----Check diagnostics
#launch_shinystan(fit_SCT_1)

#--Compare models using Bayes Factors
marg_lik_SCT_1 <- bridge_sampler(samples = fit_SCT_1)
marg_lik_herding_1 <- bridge_sampler(samples = fit_herding_1)
bf(marg_lik_herding_1,marg_lik_SCT_1)

marg_lik_SCT_2 <- bridge_sampler(samples = fit_SCT_2)
marg_lik_herding_2 <- bridge_sampler(samples = fit_herding_2)
bf(marg_lik_herding_2,marg_lik_SCT_2)

marg_lik_SCT_3 <- bridge_sampler(samples = fit_SCT_3)
marg_lik_herding_3 <- bridge_sampler(samples = fit_herding_3)
bf(marg_lik_herding_3,marg_lik_SCT_3)

marg_lik_SCT_4 <- bridge_sampler(samples = fit_SCT_4)
marg_lik_herding_4 <- bridge_sampler(samples = fit_herding_4)
bf(marg_lik_herding_4,marg_lik_SCT_4)

marg_lik_SCT_all <- bridge_sampler(samples = fit_SCT_all)
marg_lik_herding_all <- bridge_sampler(samples = fit_herding_all)
bf(marg_lik_herding_all,marg_lik_SCT_all)


#Create prior-posterior plots-------
source("analysis/plot_priors_posteriors.R")


#Plot which issues people cared about and the extent to which they agreed with them-------
issue_plot_3 <- ggplot(data3, aes(x=factor(topIssue, labels = c("Gun \n control", 
                                                "Feminism", 
                                                "Donald \n Trump", 
                                                "Immigration",
                                                "Transgender \n rights",
                                                "Drug \n legalization",
                                                "Colin \n Kaepernick",
                                                "Fur is \n wrong",
                                                "Religion \n Tax")),
                  y = topIssueRating, 
                  colour = factor(topIssue),
                  fill = factor(topIssue))) + 
  geom_dotplot(binaxis = "y", stackdir = "center", binwidth = 0.15) +
  labs(x = "Issue", y="Agreement") + 
  guides(color=FALSE, fill=FALSE)+
  scale_y_continuous(breaks=c(0,5,10), labels = c("Strongly disagree", "Neutral", "Strongly agree"))
ggsave("issue_plot_3.png", issue_plot_3, width=34, height=13, units="cm")

issue_plot_4 <- ggplot(data4, aes(x=factor(topIssue, labels = c("Gun \n control", 
                                                                "Feminism", 
                                                                "Donald \n Trump", 
                                                                "Immigration",
                                                                "Transgender \n rights",
                                                                "Drug \n legalization",
                                                                "Colin \n Kaepernick",
                                                                "Fur is \n wrong",
                                                                "Religion \n Tax")),
                                  y = topIssueRating, 
                                  colour = factor(topIssue),
                                  fill = factor(topIssue))) + 
  geom_dotplot(binaxis = "y", stackdir = "center", binwidth = 0.15) +
  labs(x = "Issue", y="Agreement") + 
  guides(color=FALSE, fill=FALSE)+
  scale_y_continuous(breaks=c(0,5,10), labels = c("Strongly disagree", "Neutral", "Strongly agree"))
ggsave("issue_plot_4.png", issue_plot_4, width=34, height=13, units="cm")
