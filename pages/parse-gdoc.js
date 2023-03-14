import styles from "../styles/pages.module.scss";
import navItem from "../common/nav-item";
import PageHead from "../components/page-head";

import { useState, useEffect } from "react";
import parse from "html-react-parser";

export default function ParseGdoc() {
  const nav = navItem("Parse GDoc");
  const [docContents, setDocContents] = useState();

  const docId = "1SsoOb5Tv2NymjUnTcTQ2u5YVJoF-MmlUOr9dvsoT6Oc";
  // const docId = "foo";

  const fetchDocContents = () => {
    const requestURI = `/api/googledoc?${new URLSearchParams({
      docId: docId,
    })}`;
    // const requestURI = `/api/googledoc`;
    const myRequest = new Request(requestURI);
    fetch(myRequest)
      .then(async (res) => {
        if (!res.ok) {
          const errBody = await res.json();
          if (errBody.errors) {
            console.log(errBody);
            throw new Error(
              `${res.status}: ${errBody.errors
                .map((error) => error.message)
                .join("\n")}`
            );
          } else {
            console.log(errBody);
            throw new Error(`${res.status}: ${errBody}`);
          }
          // setDocContents(error);
        } else {
          return res.json();
        }
      })
      .then((result) => {
        setDocContents(<>{result.map((item) => parse(item))}</>);
      })
      .catch((e) => {
        setDocContents(e.message);
        console.log(e);
      });
  };

  useEffect(() => {
    fetchDocContents();
  }, []);

  return (
    <>
      <PageHead nav={nav} />
      <div className={styles["container"]}>
        <button onClick={fetchDocContents}>refresh</button>
        <div className={styles["doc-widget"]}>{docContents}</div>
      </div>
    </>
  );
}
