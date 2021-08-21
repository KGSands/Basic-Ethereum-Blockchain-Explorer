import moment from "moment-timezone";

export class Ethereum {

    // TODO: Future work - this would extend a BaseBlock class to add different types of block
    public blockNumber: number;
    public difficulty: string;
    public timestamp: number;
    public date: string;
    public hash: number;
    public miner: number;

    setBlockNumber(blockNumber: number): this {
        this.blockNumber = blockNumber;
        return this
    }

    setDifficulty(difficulty: number): this {
        this.difficulty = (difficulty / 1000000000000).toFixed(2) + ' TH';
        return this
    }

    setTimestamp(timestamp: number): this {
        this.date = moment(timestamp*1000).tz(moment.tz.guess()).format('lll z');
        this.timestamp = timestamp;
        return this
    }

    setHash(hash: number): this {
        this.hash = hash;
        return this
    }

    setMiner(miner: number): this {
        this.miner = miner;
        return this
    }

    public static build(blockInfo: any) {
        return new Ethereum()
            .setBlockNumber(blockInfo['number'])
            .setDifficulty(blockInfo['difficulty'])
            .setTimestamp(blockInfo['timestamp'])
            .setHash(blockInfo['hash'])
            .setMiner(blockInfo['miner'])
    }

}