import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

function IncomingQuestions(props) {
  return(
    <div style={styles.main}>
      <h1>Question Queue:</h1>
      {props.threads.map(thread => {
        return thread.messages.map(message => {
          return(
            <div style={styles.list}>
              {message.body}
              <div>
                <Button>Claim</Button>
                <Button>Cancel</Button>
              </div>
            </div>
          )
        })
      })}
    </div>
  );
}

IncomingQuestions.propTypes = {
  body: PropTypes.string
};

const styles = {
  main: {
    backgroundColor: '#D3D3D3',
    padding: '20px',
    fontSize: '20px',
    color: 'black'
  },
  list: {
    padding: '10px',
    margin: '10px'
  }
};

export default IncomingQuestions;
