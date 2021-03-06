// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = magpieViews.view_generator("intro", {
  trials: 1,
  name: 'intro',
  // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
  text: `Hello and Welcome to our experiment for the Experimental Psychology Lab 2021!
            <br />
            <br />
            We are reproducing an experiment about a moral dilemma and how you feel making that choice.
            <br />
            <br />
            This experiment should take about five minutes. Please make sure you aren't disturbed.
            <br />
            <br />
            All data collected is purely for statistical purposes, anonymous, and will be deleted once the analysis of the experiment is complete.
            <br />
            <br />
            We will first ask some demographic questions before the experiment actually starts.
            <br />
            <br />
            Your participation is entirely voluntary and can be ended at any time. `,
  buttonText: 'begin the experiment',
});

// For most tasks, you need instructions views
const instructions = magpieViews.view_generator("instructions", {
  trials: 1,
  name: 'instructions',
  title: 'Experiment Instructions',
  text: `Thank you for making it this far!
            <br />
            <br />
            In the following you will be introduced to the actual experiment. We will present you with a moral dilemma, and you need to decide a course of action.
            <br />
            After you've decided what you would do in such a situation, we will ask you how you feel about the choice you just made.`,
  buttonText: 'proceed'
});


// In the post test questionnaire you can ask your participants addtional questions
const post_test = magpieViews.view_generator("post_test", {
  trials: 1,
  name: 'post_test',
  title: 'Demographic information',
  text: 'Answering the following questions is optional, but your answers will greatly help us analyze our results.',

  // You can change much of what appears here, e.g., to present it in a different language, as follows:
  // buttonText: 'Weiter',
   age_question: 'Age',
   gender_question: 'Gender',
   gender_male: 'male',
   gender_female: 'female',
   gender_other: 'divers',
  // edu_question: 'H??chster Bildungsabschluss',
  // edu_graduated_high_school: 'Abitur',
  // edu_graduated_college: 'Hochschulabschluss',
  // edu_higher_degree: 'Universit??rer Abschluss',
  // languages_question: 'Muttersprache',
  // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
   comments_question: 'Further Comments'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = magpieViews.view_generator("thanks", {
  trials: 1,
  name: 'thanks',
  title: 'Thank you for taking part in this experiment!',
  prolificConfirmText: 'Press the button'
});

/** trial (magpie's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _magpie (e.g. for use with a progress bar)
            and the name of the trial as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
      More about trial life cycle - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

    - hook: object - option to hook and add custom functions to the view
      More about hooks - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

* All about the properties of trial views
* https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#trial-views
*/

//view data for the topic choice, trial-data included here for ease of overview, as there is only one
const sentence_choice_2B = sentence_customized({
  name: "sentence_customized",
  trials: 1,
  data: [
    {
      question: "Which out of these topics do you care about the most?",
      option1: 'Animal Products',
      option2: 'Protesting',
      option3: 'Vaccine against Covid-19',
      option4: 'Abortion',
      option5: 'Political Orientation'
    }
  ],

});

//view data for the rating of a statement of a chosen topic, trial-data included here for ease of overview, as there is only one
const rating_choice = topic_customized({
  name: "rating_choice",
  trials: 1, 
  data: [ 
    {
      optionLeft: 'Strongly Disagree',
      optionRight: 'Strongly Agree',
      s1: "People should not buy or eat animal products",
      s2: "It is alright if political protesters use violence to enforce their demands", //etc
      s3: "Everybody who is medically suited to receive a vaccination against Covid-19 should get such a vaccination",
      s4: "Abortion should be illegal",
      s5: "I am politically oriented towards the left",
    }
  ],

});


//view data for the understanding check, trial-data included here for ease of overview, as there is only one
const understanding_choice = sentence_customized({
  name: "understanding_choice",
  trials: 1,
  data: [
    {
      question: "To ensure you understood the assignment, please click on which of the following statements is true.",
      option1: 'Participants chose which action they preferred.',
      option2: 'Due to a computer error, participants were not allocated equally to imagine performing the different actions.',
      option3: 'No data was saved during the experiment.',
      option4: 'The participants completed the experiment with their eyes closed.',
      option5: "I don't understand what is happening here."
    }
  ],

});

//view data for the moral dilemma, trial-data NOT included here for ease of overview, as the code got out of hand. please refer to 04_trials
const moral_dilemma_2A = moral_dilemma({
  name: "moral_dilemma_2A",
  trials: 1,
  data: moral_dilemma_data,

});

//view data for the emotions rating, trial-data included here for ease of overview, as there is only one
const emotions_fake = magpieViews.view_generator("rating_scale", {
  trials: 1,
  name: 'emotions_fake',
  data: [
  {
    question: "How do you feel about your choice?",
    optionLeft: 'happy',
    optionRight: 'sad',
  }],
});








// There are many more templates available:
// forced_choice, slider_rating, dropdown_choice, testbox_input, rating_scale, image_selection, sentence_choice,
// key_press, self_paced_reading and self_paced_reading_rating_scale
