import React from 'react';

function Nav() {
  return(
    <div style={styles.main}>
      <div>
        <p>Cool LOGO</p>
      </div>
      <div>
        <ul style={styles.ul}>
          <li style={styles.li}>Participating Organizations</li>
          <li style={styles.li}>Resources</li>
          <li style={styles.li}>Sign Up</li>
          <li style={styles.li}>Log In</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  main: {
    backgroundColor: 'black',
    color: 'white',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center'
  },
  ul: {
    listStyle: 'none',
    display: 'flex'
  },
  li: {
    paddingRight: '20px'
  }
};

export default Nav;
