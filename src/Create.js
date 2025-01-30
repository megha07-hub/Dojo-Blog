import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('hello');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('yoshi');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
      e.preventDefault();
      const blog = { title, body, author };
    
      setIsPending(true);

      // Step 1: Fetch current data
      fetch('https://api.jsonbin.io/v3/b/66e170bfe41b4d34e42d7dc3/blogs', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": "$2a$10$QIgl5qZFHtaLMiJePCogu./Hau8C3Y6M5vh5MDX5pW5yCqATcMv7m",
          "X-Access-Key": "$2a$10$6.VQ0.KBcfdm4Zyc8Oj62OfDPskeBiAbwhZ/u7AHZx8seSSwaw.zW"
        },
        body: JSON.stringify(blog)
      })
        .then(res => {
          if (!res.ok) {
            throw Error('Could not fetch the data for that resource');
          }
          return res.json();
        })
        .then(data => {
          let newBlog = data.record.blogs[data.record.blogs.length - 1]; // Get the latest added blog

          // Step 2: Update the data
          const updatedBlogs = [...data.record.blogs, newBlog];
    
          // Step 3: Send updated data
          return fetch('https://api.jsonbin.io/v3/b/66e170bfe41b4d34e42d7dc3', {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key": "$2a$10$QIgl5qZFHtaLMiJePCogu./Hau8C3Y6M5vh5MDX5pW5yCqATcMv7m",
              "X-Access-Key": "$2a$10$6.VQ0.KBcfdm4Zyc8Oj62OfDPskeBiAbwhZ/u7AHZx8seSSwaw.zW"
            },
            body: JSON.stringify({ blogs: updatedBlogs }),
          });
        })
        .then(() => {
          console.log('New blog added');
          setIsPending(false);
          history.push('/');
        })
        .catch(err => {
          console.error('Error:', err);
          setIsPending(false);
        });
    };
    
    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                  type="text"
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
                  onChange={(e) => setAuthor(e.target.value)}
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