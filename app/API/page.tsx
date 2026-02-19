export default async function Showpost()
{
    const res=await getPost();
    console.log(res);
    return(
       <main>
        <div>
          <h1>Hello bd</h1>
        </div>

       </main>
    )
}