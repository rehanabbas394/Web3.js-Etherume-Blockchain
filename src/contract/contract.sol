// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Demo {
    uint public x = 10;

    function set(uint _x) public { 
        x = _x;
    }
}