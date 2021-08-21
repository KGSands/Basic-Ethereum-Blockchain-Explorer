import moment from 'moment';
import i18n from "i18next";
import 'moment/locale/ko';
import styles from "./languageSelect.module.scss";
import { Dispatch, SetStateAction } from 'react';

type LanguageSelectProps = {
    setHasLanguageChanged: Dispatch<SetStateAction<boolean>>;
};

const LanguageSelect = ({setHasLanguageChanged}: LanguageSelectProps) => {


    const changeLanguage = (language: string) => {
        moment.locale(language === 'korean' ? 'ko' : 'en-US')
        i18n.changeLanguage(language)
        setHasLanguageChanged(true)
    }

    return (
        <div className={styles.languagePicker}>
            <div className={styles.language}>
                <span onClick={() => changeLanguage('english')} className={styles.languageSpan}>
                    English
                </span>
            </div>
            <div className={styles.language}>
                <span onClick={() => changeLanguage('korean')} className={styles.languageSpan}>
                    한국어
                </span>
            </div>
        </div>
    )
}

export default LanguageSelect;