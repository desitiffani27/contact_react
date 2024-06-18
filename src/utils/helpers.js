const myFunction = () => {
  return 'myFunction';
};
const currencyFormat = num => {
  return 'RM ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
export {myFunction, currencyFormat};
