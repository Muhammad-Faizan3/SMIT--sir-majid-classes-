import CompoA from "./CompoA";

function CompoB({name}) {
    return(
        <>
        <h2>This is Component B</h2>
        <CompoA name={name} />
        </>
    )
}
export default CompoB;