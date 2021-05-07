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
        uint256 team_A_id;
        uint256 team_B_id;
        uint256 winner_id;
        uint256 bookie_margin;
        uint256 team_A_odds;
        uint256 team_B_odds;
        uint256 team_A_payout;
        uint256 team_B_payout;
        uint256 team_A_bet_amount;
        uint256 team_B_bet_amount;
    }

    uint256 public poll_id = 0;

    mapping(uint256 => Poll) public polls;

    event Bet(
        address better_address,
        uint256 poll_id,
        uint256 team_id,
        uint256 amount
    );

    function createPoll(
        string memory _match_id,
        uint256 _team_A_id,
        uint256 _team_B_id,
        uint256 _team_A_odds,
        uint256 _team_B_odds
    ) public {
        Poll memory poll =
            Poll(
                msg.sender,
                _match_id,
                _team_A_id,
                _team_B_id,
                0,
                0,
                _team_A_odds,
                _team_B_odds,
                0,
                0,
                0,
                0
            );
        polls[poll_id] = poll;
        poll_id += 1;
    }

    function placeBet(
        uint256 _poll_id,
        uint256 _team_id,
        uint256 _amount
    ) public payable {
        Poll memory poll = polls[_poll_id];

        if (_team_id == poll.team_A_id) {
            require(
                poll.bookie_margin >=
                    (((_amount * poll.team_A_odds) / 10) + poll.team_A_payout),
                "Insuffient funds from bookmaker within this pool"
            );
            emit Bet(msg.sender, _poll_id, _team_id, _amount);
            poll.team_A_payout += ((_amount * poll.team_A_odds) / 10);
            poll.team_A_bet_amount += _amount;
        } else {
            require(
                poll.bookie_margin >=
                    (((_amount * poll.team_B_odds) / 10) + poll.team_B_payout),
                "Insuffient funds from bookmaker within this pool"
            );
            emit Bet(msg.sender, _poll_id, _team_id, _amount);
            poll.team_B_payout += ((_amount * poll.team_B_odds) / 10);
            poll.team_B_bet_amount += _amount;
        }

        polls[_poll_id] = poll;
    }

    function pollDetails(uint256 _poll_id)
        public
        view
        returns (
            string memory,
            uint256,
            uint256
        )
    {
        if (polls[_poll_id].winner_id == polls[_poll_id].team_A_id) {
            return (
                polls[_poll_id].match_id,
                polls[_poll_id].team_A_odds,
                polls[_poll_id].winner_id
            );
        } else {
            return (
                polls[_poll_id].match_id,
                polls[_poll_id].team_B_odds,
                polls[_poll_id].winner_id
            );
        }
    }

    function setWinner(uint256 _poll_id, uint256 _result)
        public
        returns (uint256, uint256)
    {
        Poll memory poll = polls[_poll_id];
        poll.winner_id = _result;
        uint256 bookmaker_profit;
        if (poll.winner_id == poll.team_A_id) {
            bookmaker_profit =
                (poll.bookie_margin - poll.team_A_payout) +
                poll.team_B_bet_amount;
        } else {
            bookmaker_profit =
                (poll.bookie_margin - poll.team_B_payout) +
                poll.team_A_bet_amount;
        }
        poll.bookmaker.transfer(bookmaker_profit);
        polls[_poll_id] = poll;
        return (_poll_id, poll.winner_id);
    }

    function addMargin(uint256 _poll_id, uint256 _amount) public payable {
        Poll memory poll = polls[_poll_id];
        poll.bookie_margin += _amount;
        polls[_poll_id] = poll;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function transferBetProfit(address payable _better, uint256 _amount)
        public
    {
        _better.transfer(_amount);
    }
}
