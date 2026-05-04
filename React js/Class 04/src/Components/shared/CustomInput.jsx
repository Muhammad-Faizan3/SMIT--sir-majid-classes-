function CustomInput(title = 'label') {
    return(
        <>
        <div className="w-[35%] h-[30vw] flex border-2 p-2 ml-[30%] mt-[10%]">
        <p>{title}</p>
        <input className="border-2 w-[80%] h-[3vw] ml-1" type="text"  />
        </div>
        </>
    )
}
export default CustomInput;