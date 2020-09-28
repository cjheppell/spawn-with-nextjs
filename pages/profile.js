import Link from 'next/link'

function ProfilePage({ error, profile }) {
  if(error){
    return <div>Error: {error}</div>
  }
  return (
    <>
      <div>
        <img src={`https://github.com/${profile.avatar}.png`} />
        <h1>{profile.name}</h1>
        <p>{profile.address}</p>
        <p>{profile.email}</p>
        <Link href="/">
          <a>← Back to profiles</a>
        </Link>
      </div>
    </>
  )
}

export async function getServerSideProps({ req, query }) {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers['x-forwarded-host'] || req.headers.host

  const res = await fetch(`${protocol}://${host}/api/profile?id=${query.id}`)

  try {
    const data = await res.json()
    return { props: { ...data, error: null } }
  } catch (error) {
    return { props: {
      profiles: [],
      error: 'Unable to retrieve profile'
    } }
  }
}

export default ProfilePage