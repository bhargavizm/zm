import React from 'react';

const Template4 = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.hanover}>HANOVER</span>
        <span style={styles.and}> AND </span>
        <span style={styles.tyke}>TYKE</span>
      </div>
      
      <div style={styles.elevateContainer}>
        <div style={styles.elevateLine}></div>
        <div style={styles.elevateText}>Elevate</div>
        <div style={styles.elevateLine}></div>
      </div>
      
      <div style={styles.yourLook}>Your Look</div>
      
      <div style={styles.discount}>
        ENJOY A SPECIAL 10% OFF
      </div>
      
      <div style={styles.available}>
        AVAILABLE UNTIL 8 NOVEMBER 2030
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '40px 20px',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    color: '#333',
    textAlign: 'center' ,
  },
  header: {
    marginBottom: '30px',
    fontSize: '24px',
    letterSpacing: '2px',
  },
  hanover: {
    fontWeight: 'bold',
    color: '#000',
  },
  and: {
    fontWeight: 'normal',
    color: '#666',
  },
  tyke: {
    fontWeight: 'bold',
    color: '#000',
  },
  elevateContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '300px',
  },
  elevateLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#ccc',
  },
  elevateText: {
    padding: '0 15px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase' ,
  },
  yourLook: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '30px',
    letterSpacing: '1px',
  },
  discount: {
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    marginBottom: '10px',
    color: '#333',
  },
  available: {
    fontSize: '10px',
    letterSpacing: '1px',
    color: '#666',
  }
};

export default Template4;