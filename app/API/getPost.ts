async function getPost()
{
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }else
    {
        return response.json();
      
    }
}