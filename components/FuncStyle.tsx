import React from 'react'


type Props ={
    onChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
}

const FuncStyle = ({onChange, onClick}: Props) => {
    
  return (
    <>
      <h1>파일 업로드 페이지</h1>
      <input type="file" onChange={onChange}/>
      <br/><br/><br/>
      <button onClick={onClick}>파일 업로드 하기</button>
      <hr/>
    </>
  )
}

export default FuncStyle