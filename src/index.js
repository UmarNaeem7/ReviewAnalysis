import React from "react";
import ReactDOM from "react-dom";

function checkSentiment(comment){
  var Sentiment = require('sentiment');
  var sentiment = new Sentiment();
  var result = sentiment.analyze(comment);

  if (result.score>=1){
      return 'Positive';
  }
  else if (result.score>=0){
    return 'Neutral';
  }
  else{
      return 'Negative';
  }
}

function filterProfanity(comment){
  var Filter = require('bad-words');
  var customFilter = new Filter({ placeHolder: '#'});
  var newBadWords = ['gandu', 'bsdk', 'bullshit'];  //add as many bad words to this list
  customFilter.addWords(...newBadWords);
  return customFilter.clean(comment);
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    var filteredComment = filterProfanity(this.state.value);
    var mSentiment = checkSentiment(this.state.value);
    if (filteredComment!==this.state.value && mSentiment!=='Negative'){
      mSentiment = 'Negative';  //comment was filtered so it should be negative
    }
    alert('Analysed sentiment for \'' + this.state.value + '\': ' + mSentiment);
    alert('Filtered output for \'' + this.state.value + '\': ' + filteredComment);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <div >
          <label >
            Type review:
            <input type="text" value={this.state.value} size="100" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Check sentiment" />
        </div>
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);