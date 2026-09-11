import { useState } from "react"

const Loading = () => {
    const [loading,setLoading] = useState(true)

    const foo = () => {
        setTimeout(() => {
            setLoading(false)
        },5000)
    }
    foo()
    if(loading) {
        return <h1>Loading...</h1>
    }

    
    return(
        <>
        <h1>Hello world</h1>
        <h1>Hello React</h1>
        <h1>Hello saylani</h1>
        </>
    )
}

export default Loading