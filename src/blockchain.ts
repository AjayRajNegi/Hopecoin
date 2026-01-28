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
};

const calculateHash = (
  index: number,
  previousHash: string,
  timeStamp: number,
  data: string,
): string =>
  CryptoJS.SHA256(index + previousHash + timeStamp + data).toString();

export default calculateHash;
