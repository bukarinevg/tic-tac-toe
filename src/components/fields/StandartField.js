function StandartField({ id,  value,  manageTurn}){
    return (
        <input key={id}  id={id} onClick={() => manageTurn(id)} value={value} className='field' maxLength={1} readOnly={true} />
    )
  }

export default StandartField;