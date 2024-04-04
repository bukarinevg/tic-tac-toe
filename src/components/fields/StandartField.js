function StandartField({key, id,  value,  manageTurn}){
    return (
        <input key={key}  id={id} onClick={() => manageTurn(id)} value={value} className='field' maxLength={1} readOnly={true} />
    )
  }

export default StandartField;