import styles from "../styles/pages.module.scss";
import navItem from "../common/nav-item";
import PageHead from "../components/page-head";

export default function Missionaries() {
  const nav = navItem("Missionaries");
  return (
    <div className={styles["container"]}>
      <PageHead nav={nav} />
      <h1>{nav.name}</h1>
      <p>
        click{" "}
        <a
          className={styles["message-link"]}
          href='https://docs.google.com/spreadsheets/d/1foGFyfCL9TykGL2s0ISRaaQ9siVpIXU1XZ0K2Nn4jGI/edit'
          rel='noreferrer noopener'
          target='_blank'>
          here
        </a>{" "}
        to sign up to attend lessons with the missionaries
      </p>
      <p>
        &ldquo;Visit our facebook page at{" "}
        <a
          className={styles["message-link"]}
          href='https://www.facebook.com/Steadfastinlascrucesandelpaso'
          rel='noreferrer noopener'
          target='_blank'>
          fb.me/Steadfastinlascrucesandelpaso
        </a>
        . We have a livestream every Friday at 7pm called &quot;Moving Mountains&quot;
        where there is a topic each week and the speakers talk about it. We are
        encouraging everyone to watch it whenever they can and share it with
        their friends!
      </p>
      <p>
        Also, if anyone would be interested in being on Moving Mountains as
        speakers or would like to share their talents (singing, share their
        testimony, etc.) during the interludes to let us know and we can set
        things up!&rdquo;
      </p>
    </div>
  );
}
