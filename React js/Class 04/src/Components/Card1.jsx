function Card1({name='Faizan',age=20,profession='Developer',experience=1,city='Karachi',img= sc}) {
    // let sum = (a , b) => {
    //     console.log(a+b);
    // }
    // sum(1,2)

    return(
        <>
        <p>{name}</p>
        <p>{age}</p>
        <p>{profession}</p>
        <p>{experience}</p>
        <p>{city}</p>
        <img src={img} alt="" />
        </>
    )
}
export default Card1