import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('https://api.jsonbin.io/v3/b/66e170bfe41b4d34e42d7dc3/${id}');
  const history = useHistory();

  const handleClick= () => {
    fetch('https://api.jsonbin.io/v3/b/66e170bfe41b4d34e42d7dc3/${id}', {
      method: 'DELETE'
    }).then (() => {
      history.push('/');
    })
  }

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
        <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;