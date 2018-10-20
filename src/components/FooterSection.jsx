import React from 'react';

function Footer() {
  return(
    <div style={styles.main}>
      <ul style={styles.ul}>
        <li style={styles.li}>About</li>
        <li style={styles.li}>Sitemap</li>
        <li style={styles.li}>Privacy Policy</li>
        <li style={styles.li}>Terms and Conditions</li>
      </ul>
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

export default Footer;
