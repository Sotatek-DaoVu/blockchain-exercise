import { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Web3 from "web3";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [provider, setProvider] = useState(window.ethereum);
  const [balance, setBalance] = useState(0);
  const [inputAmount, setInputAmount] = useState("");

  const onLogin = async (provider) => {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
      const accBalanceEth = web3.utils.fromWei(
        await web3.eth.getBalance(accounts[0]),
        "ether"
      );
      setChainId(chainId);
      setProvider(provider);
      setBalance(Number(accBalanceEth).toFixed(6));
      setIsConnected(true);
    }
  };

  useEffect(() => {
    const handleAccountChanged = async (accounts) => {
      if (accounts.length === 0) {
        onLogout();
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
      }
    };

    const handleChainChanged = async (netWorkId) => {
      setChainId(netWorkId);
    };

    if (isConnected) {
      provider.on("accountChanged", handleAccountChanged);
      provider.on("chainChanged", handleChainChanged);
    }
    return () => {
      if (isConnected) {
        provider.removeListener("accountChanged", handleAccountChanged);
        provider.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [isConnected]);

  const onLogout = () => {
    setIsConnected(false);
    setCurrentAccount(null);
  };

  const handleTranfer = () => {
    const web3 = new Web3(provider);
  };

  return (
    <div>
      <header className="main-header">
        <h1>React &#8364; Web3</h1>
        <nav className="nav">
          <ul>
            <li>
              <a href="/">{currentAccount}</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {!isConnected && <Login onLogin={onLogin} onLogout={onLogout} />}
        {isConnected && (
          <Home
            currentAccount={currentAccount}
            balance={balance}
            currentNetwork={chainId}
            handleTranfer={handleTranfer}
            inputAmount={inputAmount}
            setInputAmount={setInputAmount}
          />
        )}
      </main>
    </div>
  );
}

export default App;
