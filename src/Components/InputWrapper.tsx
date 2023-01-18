interface IProp{
    children: React.ReactNode;
    label: string
}


export const InputWrapper : React.FC<IProp> = ({children, label}) => {
    return (<div style={{display:'flex', padding:"20px 0"}}>
        <div style={{flex:2}}>{label}</div>
        {children}
    </div>);
}