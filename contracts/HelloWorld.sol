pragma solidity ^0.6.10;

contract HelloWorld{
    
    uint256 private state;
    event Set(uint256 info, address sender);
    function set(uint256 _state) external {
        state = _state;
        emit Set(_state, msg.sender);
    }

    function get() external view returns(uint256){
        return state;
    }
}