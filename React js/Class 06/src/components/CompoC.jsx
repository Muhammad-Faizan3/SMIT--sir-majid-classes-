import CompoB from "./CompoB";

function CompoC({name}) {
    return(
        <>
        <h2>This is Component C</h2>
        <CompoB name={name} />
        </>
    )
}
export default CompoC;