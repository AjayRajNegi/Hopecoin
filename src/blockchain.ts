import CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public timeStamp: number;
  public data: string;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    timeStamp: number,
    data: string,
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timeStamp = timeStamp;
    this.data = data;
  }
}

const genesisBlock: Block = new Block(
  0,
  "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7",
  "",
  1465154705,
  "my genesis block!!",
);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const generateNextBlock = (blockData: string) => {
  const previousBlock: Block = getLatestBlock();
  const nextIndex: number = previousBlock.index + 1;
  const nextTimeStamp: number = new Date().getTime() / 1000;

  const nextHash: string = calculateHash(
    nextIndex,
    previousBlock.hash,
    nextTimeStamp,
    blockData,
  );
  const newBlock: Block = new Block(
    nextIndex,
    nextHash,
    previousBlock.hash,
    nextTimeStamp,
    blockData,
  );

  addBlock(newBlock);
  //broadcastLatest()
  return newBlock;
};

const calculateHashForBlock = (block: Block): string =>
  calculateHash(block.index, block.previousHash, block.timeStamp, block.data);

const calculateHash = (
  index: number,
  previousHash: string,
  timeStamp: number,
  data: string,
): string =>
  CryptoJS.SHA256(index + previousHash + timeStamp + data).toString();

const addBlock = (block: Block) => {
  if (isValidNewBlock(block, getLatestBlock())) {
    blockchain.push(block);
  }
};

const isValidBlockStructure = (block: Block): boolean => {
  return (
    typeof block.index === "number" &&
    typeof block.hash === "string" &&
    typeof block.previousHash === "string" &&
    typeof block.timeStamp === "number" &&
    typeof block.data === "string"
  );
};

const isValidNewBlock = (newBlock: Block, previousBlock: Block): boolean => {
  if (!isValidBlockStructure(newBlock)) {
    console.log("Is invalid newBlock structure.");
    return false;
  }
  if (newBlock.index !== previousBlock.index + 1) {
    console.log("Is invalid newBlock.");
    return false;
  } else if (newBlock.previousHash !== previousBlock.hash) {
    console.log("Is invalid newBlock.");
    return false;
  } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
    console.log(
      typeof newBlock.hash + " " + typeof calculateHashForBlock(newBlock),
    );
    console.log(
      "invalid hash: " + calculateHashForBlock(newBlock) + " " + newBlock.hash,
    );
    return false;
  }
  return true;
};

const isValidChain = (blockchainToValidate: Block[]): boolean => {
  const isValidGenesis = (block: Block): boolean => {
    return JSON.stringify(block) === JSON.stringify(genesisBlock);
  };

  if (!isValidGenesis(blockchainToValidate[0])) {
    return false;
  }

  for (let i = 1; i < blockchainToValidate.length; i++) {
    if (
      !isValidNewBlock(blockchainToValidate[i], blockchainToValidate[i - 1])
    ) {
      return false;
    }
  }
  return true;
};

export default calculateHash;
