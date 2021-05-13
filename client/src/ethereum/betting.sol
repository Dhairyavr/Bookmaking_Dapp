// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
//add amounts in WEI i.e 10^18 times WEI
contract Betting {
    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    struct Poll {
        address payable bookmaker;
        string match_id;
        uint team_A_id;
        uint team_B_id;
        uint winner_id;
        uint bookie_margin;
        uint team_A_odds;
        uint team_B_odds;
        uint team_A_payout;
        uint team_B_payout;
        uint team_A_bet_amount;
        uint team_B_bet_amount;
    }
    
    uint public poll_id=0;
    
    mapping (uint => Poll ) public polls;
    
    event Bet(address indexed better_address,uint indexed poll_id,uint indexed team_id,string team_name,string date ,string round,uint amount) ;
    
    function createPoll (string memory _match_id,uint _team_A_id, uint _team_B_id ,uint _team_A_odds,uint _team_B_odds,uint _margin) payable public {
        
        Poll memory poll=Poll(msg.sender,_match_id,_team_A_id,_team_B_id,0,_margin,_team_A_odds,_team_B_odds,0,0,0,0);
        polls[poll_id]=poll;
        poll_id+=1;
    }
    

    function placeBet (uint _poll_id,uint _team_id,uint _amount ,string memory team_name,string memory date,string memory _round) payable public {
        
        Poll memory poll=polls[_poll_id];
        
        if(_team_id==poll.team_A_id) {
            
        emit Bet(msg.sender,_poll_id,_team_id,team_name,date,_round,_amount);
        poll.team_A_payout+=((_amount*poll.team_A_odds)/10);
        poll.team_A_bet_amount+=_amount;
        }
        
        else {
            
        emit Bet(msg.sender,_poll_id,_team_id,team_name,date,_round,_amount);
        poll.team_B_payout+=((_amount*poll.team_B_odds)/10);
        poll.team_B_bet_amount+=_amount;
        }
        
        polls[_poll_id]=poll;
        
    }
    
    function getWinnerDetails (uint _poll_id) public view returns(string memory,uint,uint) {
        if(polls[_poll_id].winner_id==polls[_poll_id].team_A_id){
            
            return(polls[_poll_id].match_id,polls[_poll_id].team_A_odds,polls[_poll_id].winner_id);
        }
        else {
            return(polls[_poll_id].match_id,polls[_poll_id].team_B_odds,polls[_poll_id].winner_id);
        }
    }
    
    function setWinner(uint256 _poll_id, uint256 _result) public returns (uint,uint) {
        
        Poll memory poll = polls[_poll_id];
        poll.winner_id=_result;
        uint bookmaker_profit;
        if(poll.winner_id == poll.team_A_id) {
        
            bookmaker_profit=(poll.bookie_margin-poll.team_A_payout)+poll.team_B_bet_amount;
        }
        else {
            
            bookmaker_profit=(poll.bookie_margin-poll.team_B_payout)+poll.team_A_bet_amount;
        }
        poll.bookmaker.transfer(bookmaker_profit);
        polls[_poll_id]=poll;
        return(_poll_id,poll.winner_id);

} 

    function addMargin(uint _poll_id,uint _amount) public payable {
        
        Poll memory poll=polls[_poll_id];
        poll.bookie_margin+=_amount;
        polls[_poll_id]=poll;
    }

    function getBalance () public view returns(uint) {
        return address(this).balance;
    }
    
    function transferBetProfit (address payable _better,uint _amount) public {
        _better.transfer(_amount);
    }
    
    function pollDetails(uint _poll_id) public view returns (string memory,uint,uint,uint,uint){
        
        return(polls[_poll_id].match_id , polls[_poll_id].team_A_id , polls[_poll_id].team_B_id , polls[_poll_id].team_A_odds , polls[_poll_id].team_B_odds);
    }
    
    function validationBeforeBet(uint _poll_id) public view returns(uint,uint,uint) {
        
        return(polls[_poll_id].bookie_margin,polls[_poll_id].team_A_payout,polls[_poll_id].team_B_payout);
    }
}

