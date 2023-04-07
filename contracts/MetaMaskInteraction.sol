// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MetaMaskInteraction {
    receive() external payable {}

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function sendEtherToContract() public payable {}

    function redeemEtherToAddress(
        address payable recipient,
        uint256 amount
    ) public {
        require(
            amount <= address(this).balance,
            "Insufficient contract balance"
        );
        recipient.transfer(amount);
    }

    function sendEtherToAddress(
        address payable recipient,
        uint256 amount
    ) public {
        require(amount <= msg.sender.balance, "Insufficient sender balance");
        recipient.transfer(amount);
    }
}
