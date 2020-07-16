import React, { useEffect, useState } from 'react';
import AddComment, { DIRECTUS_URL } from "./directus-add-comment"
import commonStyles from "./directus-common.module.css";
import styles from "./directus-comments.module.css";

enum State { Loading, Error, Success }

const Comment = ({ author, body }) => (
  <div className={styles.comment}>
    <h2 className={styles.author}>{author}</h2>
    <p className={styles.body}>{body}</p>
  </div>
)

const Comments = ({ path }) => {
  const [state, setState] = useState(State.Loading);
  const [errorMessage, setErrorMessage] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    setState(State.Loading);
    try {
      const params = new URLSearchParams(Object.entries({
        'filter[path][eq]': path,
        'filter[status][eq]': 'published',
      }));
      const response = await fetch(`${DIRECTUS_URL}/items/comments?${params}`);
      const json = await response.json();

      setComments(json.data || []);
      setState(State.Success);
    } catch (e) {
      setErrorMessage(e.message);
      setState(State.Error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [path]);

  const render: {[key in State]: React.ReactNode} = {
    [State.Loading]: 'Loading...',
    [State.Error]: (
      <>
        <p>Error: {errorMessage}</p>
        <button onClick={fetchData}>Try again</button>
      </>
    ),
    [State.Success]: comments.map(
      ({ id, ...rest }) => <Comment key={id} {...rest} />
    ),
  }

  return (
    <div>
      <AddComment path={path} fetchComments={fetchData} />
      <div className={commonStyles.container}>
        {render[state]}
      </div>
    </div>
  );
};

export default Comments;
