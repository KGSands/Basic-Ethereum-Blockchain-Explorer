import './App.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Ethereum } from './entities/Ethereum.class';
import BlockTable from './components/BlockTable/BlockTable';
import CommonHeader from './components/CommonHeader/CommonHeader.component';
import RecentBlockInfo from './components/RecentBlockInfo/RecentBlockInfo.component';
import LanguageSelect from './components/LanguageSelect/LanguageSelect.component';
import moment from 'moment';


const App = () => {
  const web3: Web3 = new Web3('https://mainnet.infura.io/v3/d46b89815ada409a8cc914bb15d2f9a9')
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [latestEthBlock, setLatestEthBlock] = useState<Ethereum>(() => new Ethereum());
  const [latestEthBlocks, setLatestEthBlocks] = useState<Ethereum[]>([]);
  const [gasPrice, setGasPrice] = useState<string>('');
  const [hasLanguageChanged, setHasLanguageChanged] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (!hasLanguageChanged && firstLoad) {
      moment.locale('en-US') // default language

      const recentEthBlocks: Ethereum[] = [];
      fetchLatestBlock().then(async (success: any) => {
        const mostRecentBlock: Ethereum = Ethereum.build(success)
        setLatestEthBlock(mostRecentBlock)
        recentEthBlocks.push(mostRecentBlock)

        fetchGasPrice().then(async (gasPrice: any) => {
          setGasPrice((gasPrice / 1000000000).toFixed(1) + " Gwei") // 10^9 wei is a gwei
        })

        for (let i = 1; i < 10; i++) {
          const block: Ethereum = await fetchLatestBlock(success.number - i)
          recentEthBlocks.push(Ethereum.build(block))
        }

        setLatestEthBlocks(recentEthBlocks)
        setIsLoading(false)
        setFirstLoad(false)
      })
    } else {
      latestEthBlocks.forEach((block: Ethereum) => {
        block.setTimestamp(block.timestamp);
      })
      setHasLanguageChanged(false)
    }
  }, [hasLanguageChanged])

  const fetchLatestBlock = (index: number = 0): Promise<any> => {
    return web3.eth.getBlock(index === 0 ? 'latest' : index)
  }

  const fetchGasPrice = (): Promise<string> => {
    return web3.eth.getGasPrice()
  }

  return (
    <div>
      <CommonHeader pageName={t("pages.eth")}></CommonHeader>
      <RecentBlockInfo block={latestEthBlock} gasPrice={gasPrice}></RecentBlockInfo>
      {!isLoading ? <BlockTable blocks={latestEthBlocks} hasLanguageChanged={hasLanguageChanged}></BlockTable> : <h2>{t("loading")}</h2>}
      <LanguageSelect setHasLanguageChanged={setHasLanguageChanged}></LanguageSelect>
    </div>
  );
}

export default App;
