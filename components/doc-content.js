import styles from "../styles/pages.module.scss";

import { useState, useEffect } from "react";
import parse from "html-react-parser";

export default function DocContent(props) {
  const [docContents, setDocContents] = useState();

  const fetchDocContents = async docId => {
    if (docId) {
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
    }
  };

  let inner;
  if (!props.docId) {
    inner = "error: no docId provided.";
  } else {
    inner = docContents;
  }

  useEffect(() => {
    fetchDocContents(props.docId);
  }, []);

  return (
    <>
      <button onClick={()=>fetchDocContents(props.docId)}>refresh</button>
      <div className={styles["doc-widget"]}>{inner}</div>
    </>
  );
}
