import { NextPage } from 'next'
import React, { useState } from 'react'
import FuncStyle from '../../components/FuncStyle'
import { fileUpload } from '../../modules/reducers/fileSlice'
import { useAppDispatch } from '../../modules/store'

type Props = {}

// 허용 가능한 확장자 목록
const ALLOW_FILE_EXTRENSION = 'jpg,jpeg,png'
const FILE_SIZE_MAX_LIMIT = 5*1024*1024 // 5mb

const funcStyle :NextPage = () => {
    const [file, setFile] = useState<File>();
    const dispatch = useAppDispatch
    // 파일 선택에 대한 Event Handler - 파일 선택되면 유효성 검사 후 state에 담음.
    const fileUploadValidHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        const files = (target.files as FileList)[0];

        //파일 없을 경우 무효화
        if(files === undefined) {
            return;
        }
        // 확장자 체크
        if(!fileExtensionValid(files)) {
            target.value = '';
            console.log(`업로드 불가능 확장자 [가능 확장자 : ${ALLOW_FILE_EXTRENSION}]`)
            return;
        }
        //파일 용량 체크
        if (files.size > FILE_SIZE_MAX_LIMIT){
            target.value = '';
            console.log('업로드 최대 용량은 5MB')
            return;
        }
        // validation 통과한 file은 state에 담아 dispatching
        setFile(files)
    }
    // 파일 업로드 버튼 클릭 Handler - dispatching
    const fileUploadHandler = () => {
        const formData = new FormData()
        file !== undefined ? formData.append('file', file) : console.log('Reducer로 보낼 파일 없음.');
        dispatch(fileUpload(formData))
    }
  return (
    <FuncStyle onChange = {fileUploadValidHandler} onClick = {fileUploadHandler}/>
  )
}


export default funcStyle

// 이벤트 처리 외에 파일 확장자 검사 함수
// return true 가능 확장자, false 불가능 확장자
const fileExtensionValid = ({name}: {name: string}):boolean => {
    const extension = removeFileName(name)
    // 허용 가능 확장자가 있는지 확인 여부는 indexOf 사용
    // 허용 가능 확장자가 있는 경우, ALLOW_FILE_EXTENSION 상수의 해당 확장자의
    // 첫 인덱스 위치값을 반환함.
    if(!(ALLOW_FILE_EXTRENSION.indexOf(extension)> -1 )|| extension === '') {
        // 해당 if문 수행 조건은 1. 허용하지 않는 확장자 2. 확장자가 없는 경우
        return false;
    }
    return true;
}

// .을 제거한 수수 파일 확장자를 return 하는 함수
// orginalFileName 업로드할 파일명을 파라미터로 & .을 제거한 순수 파일 확장자를 리턴으로
const removeFileName = (originFileName: string) :string => {
    // 마지막 .의 위치를 구함
    // 마지막 .의 위치 다음이 파일 확장자 의미
    const lastIndex = originFileName.lastIndexOf(".");
    // 파일 이름에 .이 존재하지 않는 경우
    // 이 경우 파일 확장자가 존재하지 않는 경우를 의미함.
    if(lastIndex < 0){
        return ""
    }
    return originFileName.substring(lastIndex+1).toLowerCase()
    // subString 을 함수를 이용해 확장자만 자른다.
    // LastIndex의 값은 마지막 . 의 위치이기 때문에 해당 위치 다음부터 끝까지 문자열까지 자른다.
    // 문자열을 자른 후 소문자로 변경시켜 확장자값을 리턴함.
}