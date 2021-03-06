// In this file you can specify the trial data for your experiment

//trial information for the first sentence choice view, where participants pick a topic they are the most interested in
const trial_info = {
    sentence_choice_trials: [
      {
        question: "Which out of these topics do you care about the most?",
        option1: 'Animal Products',
        option2: 'Protesting',
        option3: 'Vaccine against Covid-19',
        option4: 'Abortion',
        option5: 'Political Orientation'
      }

    ],
    

};

//used to randomly generate which experiment condition the participant is going to experience
const view_cond = _.sample([1,2,3,4]);

//the data for the moral dilemma view
//includes both the set text for the dilemma all participants will see and the variations, chosen at random as defined above
const moral_dilemma_data = [
  moral_dilemma_trial(view_cond)
];

function moral_dilemma_trial(view_cond) {

  const view =
  {
    text2: "Imagine you have witnessed someone rob a bank. However, you then saw them do something unexpected with the money. They donated it all to a run-down orphanage that would benefit greatly from the money. You must decide whether to call the police and report the robber or do nothing and leave the robber alone.",
    question: "What do you do?",
    optionLeft: 'Call the police and report the robbery.',
    optionRight: 'Nothing, and let the robber be on their way.',
  }
  if (view_cond == 1) {
    view.text1 = " <br/><br/>Approximately 60% of the other participants who agree with you on your chosen issue chose to let the robber go."
  } else if (view_cond == 2) {
    view.text1 = " <br/><br/>Approximately 60% of the other participants who agree with you on your chosen issue chose to report the robber."
  } else if (view_cond == 3) {
    view.text1 = " <br/><br/>Approximately 60% of the other participants who agree with you on  your chosen issue chose to let the robber go. <br/><br/> Approximately 85% of participants in a previous study who disagreed with you on  your chosen issue chose to report the robber."
  } else {
    view.text1 = " <br/><br/>Approximately 60% of the other participants who agree with you on  your chosen issue chose to report the robber. <br/><br/> Approximately 85% of participants in a previous study who disagreed with you on  your chosen issue chose to let the robber go."
  }

return view;
};


