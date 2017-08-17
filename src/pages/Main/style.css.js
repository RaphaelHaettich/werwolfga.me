const styles = {
  centered: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  centeredSmallScreen: {
    position: 'fixed',
    top: '50%',
    left: '40%',
    transform: 'translate(-30%, -50%)',
  },
  buttonPaddingRight: {
    paddingRight: '5px',
  },
  notSelectable: {
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
    padding: '0 10px 10px 10px',
    cursor: 'default',
  },
};

export default styles;
