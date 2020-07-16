import React, { useState } from 'react';
import commonStyles from "./directus-common.module.css";
import styles from "./directus-add-comments.module.css";

enum State { Initial, Loading, Error, Success }

export const DIRECTUS_URL = 'https://directus-dev.balsys.eu.org/_';

const AddComment = ({ path, fetchComments }) => {
  const [author, setAuthor] = useState('Anonymous');
  const [body, setBody] = useState('');
  const [state, setState] = useState(State.Initial);
  const [errorMessage, setErrorMessage] = useState(null);

  const send = async () => {
    setState(State.Loading);
    try {
      const response = await fetch(`${DIRECTUS_URL}/items/comments`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ path, author, body }),
      });

      const json = await response.json();

      if (json.error) {
        setErrorMessage(json.error.message || 'Unknown error');
        setState(State.Error);
      } else {
        await fetchComments();
        setState(State.Success);
      }
    } catch(e) {
      setErrorMessage(e.message);
      setState(State.Error);
    }
  }

  const render: {[key in State]: React.ReactNode} = {
    [State.Initial]: (
      <>
        <div className={styles.metadata}>
          <label className={styles.author}>
            Name:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
          <button onClick={send}>Send</button>
        </div>
        <label className={styles.body}>
          Comment:
          <textarea value={body} onChange={({ target }) => setBody(target.value)} />
        </label>
      </>
    ),
    [State.Loading]: 'Loading...',
    [State.Error]: (
      <>
        <p>Error: {errorMessage}</p>
        <button onClick={() => setState(State.Initial)}>Try again</button>
      </>
    ),
    [State.Success]: 'Success. Waiting for approvement..',
  }

  return (
    <div className={commonStyles.container}>
      {render[state]}
    </div>
  );
};

export default AddComment;
