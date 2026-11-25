import Field from "../components/Field";
import { emptyLocation } from "../constants/options";
export default function LocationStep({data,onChange}){
    const updateRow=(i,key,value)=>onChange(data.map((row,idx)=>(idx===i?{...row,[key]:value}:row)));
    const addRow=()=>onChange([...data,{...emptyLocation}]);
    const removeRow=(i)=>onChange(data.filter((_,idx)=>idx!=i));
    return(
        <div>
            {data.map((row,i)=>(
                <div className="row-card" key={i}>
                    <div className="row-head">
                        <strong>
                            Site {i+1}
                        </strong>
                        {data.length>1&&(
                            <button className="link-btn" onClick={()=>removeRow(i)}>Remove</button>
                        )}
                    </div>
                    <div className="grid">
                        <Field label="Site name">
                            <input value={row.label} onChange={(e)=>updateRow(i,"label",e.target.value)} type="text" />
                        </Field>
                        <Field label="City">
                            <input type="text" value={row.city} onChange={(e)=>updateRow(i,"city",e.target.value)} />
                        </Field>
                        <Field label="State">
                            <input type="text" value={row.state} onChange={(e)=>updateRow(i,"state",e.target.value)} />
                        </Field>
                        <Field label="Pincode">
                            <input inputMode="numeric" maxLength={6} value={row.pincode} onChange={(e) => updateRow(i, "pincode", e.target.value.replace(/\D/g, ""))}/>
                        </Field>
                    </div>
                </div>
            ))}
            <button className="secondary" onClick={addRow}>+ Add Another Site</button>
        </div>
    )
}