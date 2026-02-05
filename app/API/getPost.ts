async function getPost()
{
    const response = await fetch('/api/post');
    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }else
    {
        return response.json();
    }
}