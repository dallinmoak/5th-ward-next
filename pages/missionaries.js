import styles from "../styles/pages.module.scss";
import navItem from "../common/nav-item";
import PageHead from "../components/page-head";
import DocContent from "../components/doc-content";

export default function Missionaries() {
  const nav = navItem("Missionaries");
  return (
    <div className={styles["container"]}>
      <PageHead nav={nav} />
      <DocContent docId="1SsoOb5Tv2NymjUnTcTQ2u5YVJoF-MmlUOr9dvsoT6Oc"/>
    </div>
  );
}
