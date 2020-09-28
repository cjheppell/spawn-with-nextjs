import Link from 'next/link'

function HomePage({ profiles, error, page, pageCount }) {
  if(error){
    return <div>Error: {error}</div>
  }
  return (
    <>
      <h1>Profiles</h1>
      <ul>
        {profiles.map((p) => (
          <li className="profile" key={p.id}>
            <Link href={`/profile?id=${p.id}`}>
              <a>
                <span>{p.name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <nav>
        {page > 1 && (
          <Link href={`/?page=${page - 1}&limit=9`}>
            <a>Previous</a>
          </Link>
        )}
        {page < pageCount && (
          <Link href={`/?page=${page + 1}&limit=9`}>
            <a className="next">Next</a>
          </Link>
        )}
      </nav>
    </>
  )
}

export async function getServerSideProps({ req, query }) {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const page = query.page || 1
  const limit = query.limit || 9

  const res = await fetch(
    `${protocol}://${host}/api/profiles?page=${page}&limit=${limit}`
  )
  
  try {
    const data = await res.json()
    return { props: { ...data, error: null } }
  } catch (error) {
    return { props: {
      profiles: [],
      error: 'Unable to retrieve profiles'
    } }
  }

}

export default HomePage