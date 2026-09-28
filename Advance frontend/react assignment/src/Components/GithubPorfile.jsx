import { useState } from "react";

const GithubProfile = () => {
    const [userName, setUserName] = useState("");
    const [githubData, setGithubData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const seachHandler = async () => {
        const name = userName.trim();

        if (name === "") {
            setError("Pehle user name likhein");
            return;
        }

        setLoading(true);
        setError("");
        setGithubData(null);

        try {
            const response = await fetch(`https://api.github.com/users/${name}`);
            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "User nahi mila");
                return;
            }

            setGithubData(data);
        } catch {
            setError("Network error, dobara try karein");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="container">
        <h1 className="title">Github Profile</h1>

        <form onSubmit={(e) => { e.preventDefault(); seachHandler(); }}>
            <input
                className="input"
                type="text"
                placeholder="Enter Github UserName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button className="btn" type="submit" disabled={loading}>Search</button>
        </form>

        {loading && <p className="msg">Loading...</p>}
        {error && <p className="msg error">{error}</p>}

        {githubData && (
            <div className="card">
                <img className="avatar" src={githubData.avatar_url} alt={githubData.login} />
                <h2 className="name">{githubData.name}</h2>
                <p className="username">@{githubData.login}</p>
                <p className="bio">{githubData.bio}</p>
                <div className="stats">
                    <span><b>{githubData.followers}</b> Followers</span>
                    <span><b>{githubData.following}</b> Following</span>
                    <span><b>{githubData.public_repos}</b> Repos</span>
                </div>
                <a className="link" href={githubData.html_url} target="_blank" rel="noreferrer">
                    View Profile
                </a>
            </div>
        )}
    </div>
  )
}
export default GithubProfile
