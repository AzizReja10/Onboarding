import Field from "../components/Field";
import { TYPES,FORMS,FREQUENCY,emptyNeed } from "../constants/options";
export default function NeedsStep({data,onChange}){
    const updateRow=(i,key,value)=>onChange(data.map((row,idx)=>(idx==i?{...row,[key]:value}:row)));
    const addRow=()=>onChange([...data,{...emptyNeed}]);
    const removeRow=(i)=>onChange(data.filter((_,idx)=>idx!=i));
    return(
        <div>
            {data.map((row, i)=>(
            <div className="row-card" key={i}>
                <div className="row-head">
                    <strong>
                        Requirement {i+1}
                    </strong>
                    {data.length>1&&(
                        <button className="link-btn" onClick={()=>removeRow(i)}>
                            Remove
                        </button>
                    )}
                </div>
                <div className="grid">
                    <Field label="Biomass type">
                        <select value={row.type} onChange={(e)=>updateRow(i,"type",e.target.value)} id="">
                            <option value="">Select..</option>
                            {TYPES.map((t)=><option key={t}>{t}</option>)}
                        </select>
                    </Field>
                    <Field label="Preferred form">
                        <select value={row.form} onChange={(e)=>updateRow(i,"form",e.target.value)} id="">
                            <option value="">Select...</option>
                            {FORMS.map((f)=><option key={f}>{f}</option>)}
                        </select>
                    </Field>
                    <Field label="Quantity (tons/month)">
                        <input type="number" min="0" value={row.quantityTonsPerMonth} onChange={(e)=>updateRow(i,"quantityTonsPerMonth", e.target.value)} />
                    </Field>
                    <Field label="Supply  Frequency">
                        <select value={row.frequency} onChange={(e)=>updateRow(i,"frequency",e.target.value)} id="">
                            <option value="">Select...</option>
                            {FREQUENCY.map((f)=> <option key={f}>{f}</option>)}
                        </select>
                    </Field>
                </div>
            </div>
        ))}
        <button className="secondary" onClick={addRow}>+ Add another biomass type</button>
        </div>
    );
}