import styles from "./commonHeader.module.scss";

type HeaderProps = {
  pageName: string;
};

const CommonHeader = ({ pageName }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <h2>{pageName}</h2>
    </header>
  );
};

export default CommonHeader;
