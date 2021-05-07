import web3 from "./web3";

const address = "0xB3Fe6eD71Cf024215534bcf3DdE855658ec4fb0f";

//0x57610cb8e6744043a1bc9a78fa7c8c649d5fcb0f;

const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "better_address",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "poll_id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "team_id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "team_name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "date",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "round",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Bet",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poll_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "addMargin",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_match_id",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_team_A_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_team_B_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_team_A_odds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_team_B_odds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_margin",
        type: "uint256",
      },
    ],
    name: "createPoll",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poll_id",
        type: "uint256",
      },
    ],
    name: "getWinnerDetails",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poll_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_team_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "team_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "date",
        type: "string",
      },
      {
        internalType: "string",
        name: "_round",
        type: "string",
      },
    ],
    name: "placeBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poll_id",
        type: "uint256",
      },
    ],
    name: "pollDetails",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poll_id",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "polls",
    outputs: [
      {
        internalType: "address payable",
        name: "bookmaker",
        type: "address",
      },
      {
        internalType: "string",
        name: "match_id",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "team_A_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "team_B_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "winner_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bookie_margin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "team_A_odds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "team_B_odds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "team_A_payout",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "team_B_payout",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "team_A_bet_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "team_B_bet_amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poll_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_result",
        type: "uint256",
      },
    ],
    name: "setWinner",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_better",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferBetProfit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_poll_id",
        type: "uint256",
      },
    ],
    name: "validationBeforeBet",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export default new web3.eth.Contract(abi, address);
