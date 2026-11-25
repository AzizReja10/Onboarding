export default function Step({steps,current}){
    return(
        <ol className="steps">
            {steps.map((label,i)=>(
                <li key={label} className={i===current?"active":i<current?"done":""}>
                    <span className="dot">{i+1}</span>
                    <span className="label">{label}</span>
                </li>
            ))}
        </ol>
    );
}
