import styles from "./blockTable.module.scss";
import { useTranslation } from "react-i18next";
import { Ethereum } from "../../entities/Ethereum.class";
import { useEffect, useState } from "react";
import moment from "moment-timezone";

type BlockTableProps = {
  blocks: Ethereum[] // TODO- Future work - this would be a BaseBlock class
  hasLanguageChanged: boolean
};

const BlockTable = ({ blocks, hasLanguageChanged }: BlockTableProps) => {
    const { t } = useTranslation();
    const [updateTimestamp, setUpdateTimestamp] = useState<number>(0)
    const [updateTime, setUpdateTime] = useState<string>('')
    const [firstLoad, setFirstLoad] = useState(true)
    useEffect(() => {
      if (firstLoad) {
        setUpdateTimestamp(moment().unix())
        setFirstLoad(false)
      }
      setUpdateTime(moment(updateTimestamp * 1000).tz(moment.tz.guess()).format('lll z'))
    }, [firstLoad, updateTimestamp, hasLanguageChanged])

    return (
    <div className={styles.wrapper}>
      <h2>{t("block_table.title")}</h2>
      <div className={styles.container}>
        <div className={styles.table}>
          <div className={styles.updateTime}>
           {t("block_table.last_updated", {time: updateTime})}
          </div>
          <div className={styles.titles}>
            <h3 className={styles.title}>{"#"}</h3>
            <h3 className={styles.title}>{t("block_table.date")}</h3>
            <h3 className={styles.title}>{t("block_table.hash")}</h3>
            <h3 className={styles.title}>{t("block_table.miner")}</h3>
          </div>
          {blocks.length > 0 ?
            blocks.map((block: any) => (
              <div key={block.blockNumber} className={styles.blocks}>
                <span className={styles.blockValue} title={block.blockNumber}>
                    {block.blockNumber}
                </span>
                <span className={styles.blockValue} title={block.date}>
                    {block.date}
                </span>
                <span className={styles.blockValue} title={block.hash}>
                    {block.hash}
                </span>
                <span className={styles.blockValue} title={block.miner}>
                    {block.miner}
                </span>
              </div>
            )) : <div className={styles.noBlocks}>{t('block_table.fail')}</div> }
        </div>
      </div>
    </div>
    )
}

export default BlockTable;