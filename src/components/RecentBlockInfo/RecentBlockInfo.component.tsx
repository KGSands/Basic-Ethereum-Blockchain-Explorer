import { useTranslation } from "react-i18next";
import { Ethereum } from "../../entities/Ethereum.class";
import styles from "./recentBlockInfo.module.scss";

type RecentBlockInfoProps = {
    block: Ethereum,
    gasPrice: string
};

const RecentBlockInfo = ({block, gasPrice}: RecentBlockInfoProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.wrapper}>
            <h2>{t("basic_info.latest_block")}</h2>
            <div className={styles.container}>
                <div className={styles.infoWrapper}>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoTitle}>
                            #
                        </div>
                        {block.blockNumber}
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoTitle}>
                            {t("basic_info.gas_price")}
                        </div>
                        {gasPrice}
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoTitle}>
                            {t("basic_info.difficulty")}
                        </div>
                        {block.difficulty}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentBlockInfo;