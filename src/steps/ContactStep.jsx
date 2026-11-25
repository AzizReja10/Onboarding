import Field from "../components/Field";
export default function ContactStep({data,onChange}){
    const set=(key)=>(e)=>onChange({...data,[key]:e.target.value});
    return(
        <div className="grid">
            <Field label="Company Name">
                <input value={data.company} onChange={set("company")}/>
                </Field>
                <Field label="Contact person">
                    <input value={data.person} onChange={set("person")}/>
                </Field>
                <Field label="Email">
                    <input value={data.email} onChange={set("email")}/>
                </Field>
                <Field label="Phone">
                    <input type="tel" value={data.phone} onChange={set("phone")}/>
                </Field>
        </div>
    );
}
