import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Home = (props) => {
  const handleInputAmount = (e) => {
    const valueInput = e.target.value;
    props.setInputAmount(valueInput);
  };
  const handleInputAddress = (e) => {
    const addressInput = e.target.value;
    props.setAddressInput(addressInput);
  };
  return (
    <Card className={classes.home}>
      <h1>Welcome</h1>
      <p>{props.currentAccount}</p>
      <p>{props.balance} ETH</p>
      <p>Current Network: {props.currentNetwork}</p>
      <input
        type="text"
        value={props.currentAccount}
        className={classes.input}
        disabled={true}
      />
      <input
        type="text"
        className={classes.input}
        placeholder="enter a address to"
        onChange={(e) => handleInputAddress(e)}
      />
      <input
        type="text"
        className={classes.input}
        placeholder="enter amount"
        onChange={(e) => handleInputAmount(e)}
      />

      <button
        className={classes.button}
        onClick={props.handleTranfer}
        disabled={!props.inputAmount}
      >
        Transfer
      </button>
    </Card>
  );
};
export default Home;
