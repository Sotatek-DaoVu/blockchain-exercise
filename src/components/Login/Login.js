import { useState, useEffect } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";

const Login = (props) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState(window.ethereum);
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);

  useEffect(() => {
    setProvider(detectProvider());
  }, []);

  useEffect(() => {
    if (provider) {
      if (provider !== window.ethereum) {
        console.error(
          "Not window.ethereum provider. Do you have multiple wallet installed ?"
        );
      }
      setIsMetamaskInstalled(true);
    }
  }, [provider]);

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.warn("No Ethereum browser detected! Check out MetaMask");
    }
    return provider;
  };

  const onLoginHandler = async () => {
    setIsConnecting(true);
    await provider.request({
      method: "eth_requestAccounts",
    });
    setIsConnecting(false);
    props.onLogin(provider);
  };

  return (
    <Card className={classes.login}>
      {isMetamaskInstalled ? (
        <button
          onClick={onLoginHandler}
          className={classes.button}
          type="button"
        >
          {!isConnecting && "Connect"}
          {isConnecting && "Loading..."}
        </button>
      ) : (
        <a href="https://metamask.io/" target="_blank">
          Install Metamask
        </a>
      )}
    </Card>
  );
};

export default Login;
