// In this file you can create your own custom view templates


// A view template is a function that returns a view,
// this functions gets some config (e.g. trial_data, name, etc.) information as input
// A view is an object, that has a name, CT (the counter of how many times this view occurred in the experiment),
// trials the maximum number of times this view is repeated
// and a render function, the render function gets CT and the magpie-object as input
// and has to call magpie.findNextView() eventually to proceed to the next view (or the next trial in this view),
// if it is an trial view it also makes sense to call magpie.trial_data.push(trial_data) to save the trial information


//customized view based on the sentence choice template which allows the choice between more than two options
//used both for the topic selection view and for the understanding check later on during the experiment

const sentence_customized = function (config){
  const view = {
    name: config.name,
    CT: 0,
    trials: config.trials,
    render: function (CT, magpie) {
      $('main').html(`<div class='magpie-view-answer-container'>
               <p class='magpie-view-question'>${config.data[CT].question}</p>
               <label for='s1' class='magpie-response-sentence' >${config.data[CT].option1}</label>
               <input type='radio' name='answer' id='s1' value="${config.data[CT].option1}" />
               <label for='s2' class='magpie-response-sentence' '>${config.data[CT].option2}</label>
               <input type='radio' name='answer' id='s2' value="${config.data[CT].option2}" />
               <label for='s3' class='magpie-response-sentence' '>${config.data[CT].option3}</label>
               <input type='radio' name='answer' id='s3' value="${config.data[CT].option3}" />
               <label for='s4' class='magpie-response-sentence' '>${config.data[CT].option4}</label>
               <input type='radio' name='answer' id='s4' value="${config.data[CT].option4}" />
               <label for='s5' class='magpie-response-sentence' '>${config.data[CT].option5}</label>
               <input type='radio' name='answer' id='s5' value="${config.data[CT].option5}" />
              </div>`);
    
        $("input[name=answer]").on("change", function() {
           let trial_data = {
               trial_name: config.name,
               trial_number: CT + 1,
               response: $("input[name=answer]:checked").val(),
               id: $("input[name=answer]:checked").attr('id'),

           };
        trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);
        magpie.trial_data.push(trial_data);
        magpie.findNextView();
      });

    }
  };
 
  return view;
};


//custom view for the part of the experiment where the user rates a statement about their previously chosen topic 
//based on the rating scale trial template, modified to include more choice options
const topic_customized = function (config){
  const view = {
    name: config.name,
    CT: 0,
    trials: config.trials,
    render: function (CT, magpie) {
      console.log(magpie);
      console.log(magpie.trial_data[0].id);
      $('main').html(`<div class='magpie-view-answer-container'>
          <p class='magpie-view-question'>${config.data[CT][magpie.trial_data[0].id]}</p>
          <strong class='magpie-response-rating-option magpie-view-text'>${config.data[CT].optionLeft}</strong>
          <label for="1" class='magpie-response-rating'>-5</label>
          <input type="radio" name="answer" id="1" value="-5" />
          <label for="2" class='magpie-response-rating'>-4</label>
          <input type="radio" name="answer" id="2" value="-4" />
          <label for="3" class='magpie-response-rating'>-3</label>
          <input type="radio" name="answer" id="3" value="-3" />
          <label for="4" class='magpie-response-rating'>-2</label>
          <input type="radio" name="answer" id="4" value="-2" />
          <label for="5" class='magpie-response-rating'>-1</label>
          <input type="radio" name="answer" id="5" value="-1" />
          <label for="6" class='magpie-response-rating'>0</label>
          <input type="radio" name="answer" id="6" value="0" />
          <label for="7" class='magpie-response-rating'>+1</label>
          <input type="radio" name="answer" id="7" value="+1" />
          <label for="8" class='magpie-response-rating'>+2</label>
          <input type="radio" name="answer" id="8" value="+2" />
          <label for="9" class='magpie-response-rating'>+3</label>
          <input type="radio" name="answer" id="9" value="+3" />
          <label for="10" class='magpie-response-rating'>+4</label>
          <input type="radio" name="answer" id="10" value="+4" />
          <label for="11" class='magpie-response-rating'>+5</label>
          <input type="radio" name="answer" id="11" value="+5" />
          <strong class='magpie-response-rating-option magpie-view-text'>${config.data[CT].optionRight}</strong>
      </div>`);

      $("input[name=answer]").on("change", function() {
         let trial_data = {
             trial_name: config.name,
             trial_number: CT + 1,
             response: $("input[name=answer]:checked").val(),

         };
      trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);
      magpie.trial_data.push(trial_data);
      magpie.findNextView();
    });
   
    }
  }
  return view;
};

//modified version of the rating scale view, used for the moral dilemma portion of the experiment
//the view does not only include the rating scale but also varying text depending on one of the four sentence conditions defined in 04_trials. 
const moral_dilemma = function (config){
  const view = {
    name: config.name,
    cointoss: config.cointoss,
    CT: 0,
    trials: config.trials,
    render: function (CT, magpie) {
      $('main').html(`
              <div class='magpie-view'>
                    <section class="magpie-text-container">
                        <p class="magpie-view-text">${config.data[CT].text2}</p>
                        <p class="magpie-view-text">${config.data[CT].text1}</p>


                    </section>
              </div>;
              <div class='magpie-view-answer-container'>
                <p class='magpie-view-question'>${config.data[CT].question}</p>
                <strong class='magpie-response-rating-option magpie-view-text'>${config.data[CT].optionLeft}</strong>
                <label for="1" class='magpie-response-rating'>---</label>
                <input type="radio" name="answer" id="1" value="-3" />
                <label for="2" class='magpie-response-rating'>--</label>
                <input type="radio" name="answer" id="2" value="-2" />
                <label for="3" class='magpie-response-rating'>-</label>
                <input type="radio" name="answer" id="3" value="-1" />
                <label for="4" class='magpie-response-rating'>+</label>
                <input type="radio" name="answer" id="4" value="+1" />
                <label for="5" class='magpie-response-rating'>++</label>
                <input type="radio" name="answer" id="5" value="+2" />
                <label for="6" class='magpie-response-rating'>+++</label>
                <input type="radio" name="answer" id="6" value="+3" />
                <strong class='magpie-response-rating-option magpie-view-text'>${config.data[CT].optionRight}</strong>
              </div>`);
    
        $("input[name=answer]").on("change", function() {
           let trial_data = {
               trial_name: config.name,
               trial_number: CT + 1,
               response: $("input[name=answer]:checked").val(),
               id: $("input[name=answer]:checked").attr('id'),//i

           };
        trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);
        console.log(config.cointoss);
        magpie.trial_data.push(trial_data);
        magpie.findNextView();
      });


  
    }
  };
 
  return view;
};
