document.addEventListener("DOMContentLoaded", async () => {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  } else {
    console.error("Please install MetaMask to use this dApp!");
    return;
  }

  const web3 = new Web3(window.ethereum);
  const contractABI = [
    /* Copy the ABI from the contract JSON file here */

    {
      stateMutability: "payable",
      type: "receive",
      payable: true,
    },
    {
      inputs: [],
      name: "contractBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "sendEtherToContract",
      outputs: [],
      stateMutability: "payable",
      type: "function",
      payable: true,
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "redeemEtherToAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "sendEtherToAddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const contractAddress = "0xfcFbc8d968Daae76942338250eEB0c01cb6ef801";
  ("/* Copy the deployed contract address from the truffle output here */");
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  document.getElementById("connect").onclick = async () => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    document.getElementById("account").innerText = `Account: ${account}`;

    web3.eth.getBalance(account, (err, balance) => {
      if (err) {
        console.error(err);
        return;
      }
      document.getElementById(
        "balance"
      ).innerText = `Balance: ${web3.utils.fromWei(balance, "ether")} ETH`;
    });
  };

  document.getElementById("getContractBalance").onclick = async () => {
    const balance = await contract.methods.contractBalance().call();
    document.getElementById(
      "contractBalance"
    ).innerText = `Contract Balance: ${web3.utils.fromWei(
      balance,
      "ether"
    )} ETH`;
  };

  document.getElementById("sendEtherToContract").onclick = async () => {
    const amount = document.getElementById("sendEtherToContractAmount").value;
    const account = (await web3.eth.getAccounts())[0];
    await contract.methods
      .sendEtherToContract()
      .send({ from: account, value: web3.utils.toWei(amount, "ether") });
  };

  document.getElementById("redeemEtherFromContract").onclick = async () => {
    const amount = document.getElementById("redeemEtherAmount").value;
    const recipient =
      document.getElementById("redeemEtherRecipient").value ||
      (await web3.eth.getAccounts())[0];
    await contract.methods
      .redeemEtherToAddress(recipient, web3.utils.toWei(amount, "ether"))
      .send({ from: recipient });
  };

  document.getElementById("sendEther").onclick = async () => {
    const amount = document.getElementById("sendEtherAmount").value;
    const recipient = document.getElementById("sendEtherRecipient").value;
    const account = (await web3.eth.getAccounts())[0];
    await web3.eth.sendTransaction({
      from: account,
      to: recipient,
      value: web3.utils.toWei(amount, "ether"),
    });
  };
});
