import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('hello');
    const [body, setBody] = useState('');
    const [author, setauthor] = useState('yoshi');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
      e.preventDefault();
      const blog = { title, body, author };

      setIsPending(true);
      
      fetch('https://api.jsonbin.io/v3/b/66e170bfe41b4d34e42d7dc3', {
        method: 'POST',
        headers: { "Content-Type": "application/json",  'X-Master-Key': '$2a$10$QIgl5qZFHtaLMiJePCogu./Hau8C3Y6M5vh5MDX5pW5yCqATcMv7m' },
        body: JSON.stringify(blog)
      }).then(() => {
        console.log('new blog added')
        setIsPending(false);
        //history.go(1);
        history.push('/');
      })
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                  typr="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                <select
                  value={author}
                  onChange={(e) => setauthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button>Add Blog</button> }
                { isPending && <button disabled>Adding blog...</button> }
            </form>
        </div>
     );
}
 
export default Create;