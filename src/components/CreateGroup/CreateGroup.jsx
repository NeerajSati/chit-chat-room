import React, { useRef, useState } from 'react'
import {RiImageAddFill} from 'react-icons/ri'
import {FaSearch} from 'react-icons/fa';
import {MdOutlineRemoveCircle} from 'react-icons/md';
import { toast } from 'react-toastify';
import {chatActions} from '../../redux/chatSlice'
import { useDispatch, useSelector } from 'react-redux'

function CreateGroup() {
    const [uploadedFile,setUploadedFile] = useState("")
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [searchUsername, setSearchUsername] = useState("");
    const searchedUsers = useSelector((state) => state.chat.searchedUsers);
    const [selectedMembersList, setSelectedMembersList] = useState([])
    const inputFile = useRef();
    const dispatch = useDispatch();

    const imageUploadHandler = (e) => {
        if(e.target.files[0]){
            setUploadedFile(URL.createObjectURL(e.target.files[0]))
        }
    }

    const searchUsernameHandler = async() =>{
        if(searchUsername){
            console.log("hdhdhd",searchUsername)
            await dispatch(chatActions.searchUsers({searchUsername}))
        }
    }

    const selectUserHandler = (memberId, username, makeAdmin) =>{
        if(memberId){
            setSelectedMembersList((list)=>{
                return [...list, {userId: memberId, username, isAdmin: makeAdmin}]
            })
        }
    }
    const selectUserRemoveHandler = (memberId) =>{
        if(memberId){
            setSelectedMembersList((list)=>{
                const arr = list.filter((el) => el.userId !== memberId);
                return [...arr]
            });
        }
    }

    const validateGroupData = () =>{
        if(!groupName){
            toast.error('Group Name is required!',{autoClose: 2000, theme: "dark"});
            return true;
        }
        if(!groupDescription){
            toast.error('Group Description is required!',{autoClose: 2000, theme: "dark"});
            return true;
        }
        if(!selectedMembersList || !selectedMembersList.length){
            toast.error('Select at least one member!',{autoClose: 2000, theme: "dark"});
            return true;
        }
        if(!uploadedFile){
            toast.error('Select upload profile Image!',{autoClose: 2000, theme: "dark"});
            return true;
        }
    }

    const createGroupHandler = () =>{
        if(validateGroupData()){
            return;
        }
        console.log(selectedMembersList, groupName, uploadedFile)
    }

  return (
    <div onClick={(e)=>{e.stopPropagation()}} className='py-2 px-2 w-[600px] max-h-[90vh] max-md:w-screen max-md:h-screen max-md:max-h-screen bg-[#ffffff] overflow-y-auto'>
        <div className='py-2 pb-5 font-bold w-full text-center text-[20px]'>Create a group!</div>
        <div className='grid grid-cols-6'>
            <div className='col-start-1 col-end-3 flex items-center justify-center'>
                {
                    uploadedFile ? (<img alt="profileImage" 
                    onClick={()=>{inputFile.current.click();}}
                    className='cursor-pointer rounded-full border-2 border-gray-500 w-[150px] h-[150px] max-md:w-[90px] max-md:h-[90px]' 
                    onError={(e)=>{e.target.onerror = null; e.target.src=process.env.REACT_APP_FALLBACK_IMAGE}}
                    src={uploadedFile}
                    ></img>) : (
                        <div onClick={()=>{inputFile.current.click();}} className='cursor-pointer rounded-full w-[150px] h-[150px] max-md:w-[60px] max-md:h-[60px] bg-gray-700 flex items-center justify-center text-white text-[100px]'>
                            <RiImageAddFill/>
                        </div>
                    )
                }  
            </div>
            <div className='col-start-3 col-end-7 flex flex-col items-start justify-center'>
                <div className='py-2 font-semibold'>Enter Group Name: 
                    <input value={groupName} onChange={(e)=>{setGroupName(e.target.value)}} className='ml-1 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='DSA Discussion'></input>
                </div>
                <div className='py-2 font-semibold'>Enter Group Description: 
                    <input value={groupDescription} onChange={(e)=>{setGroupDescription(e.target.value)}} className='ml-1 border-b-2 border-gray-300 outline-none font-normal' type="text" placeholder='Any description here...'></input>
                </div>
            </div>
        </div>
        <div>
            <div className='px-5 pt-5 font-semibold'>Search members:
                <div className='mt-2 w-full h-[50px] rounded-lg px-4 pr-2 py-2 flex flex-row justify-between items-center border-2 border-gray-700'>
                    <input placeholder='Type username!' 
                    value={searchUsername} 
                    onChange={(e)=>{setSearchUsername(e.target.value)}} 
                    onKeyDown={(e) => {if (e.key === "Enter") {searchUsernameHandler()}}}
                    className='outline-none w-[90%] pr-5'></input>
                    <div onClick={searchUsernameHandler} className='bg-[#09794a] cursor-pointer w-[40px] h-[40px] rounded-full flex items-center justify-center mr-3'>
                        <FaSearch className='text-[25px] text-white'/>
                    </div>
                </div>
            </div>
            <div className='w-full bg-white rounded-md px-5 searchedMemberList max-h-[130px] overflow-y-auto'>
                {
                    searchedUsers && searchedUsers.map((member)=>{
                        if(selectedMembersList.find((selected)=>selected.userId === member._id)){
                            return null;
                        }
                        return <div className='w-full h-[45px] bg-[#e2e3e397] border-2 border-gray-300 mt-2 rounded-sm px-2 flex flex-row items-center justify-between' key={member._id}>
                            <div className='flex flex-row items-center justify-center'>
                                <img alt="profileImage" 
                                    onClick={()=>{inputFile.current.click();}}
                                    className='rounded-full border-2 border-gray-500 w-[40px] h-[40px]' 
                                    onError={(e)=>{e.target.onerror = null; e.target.src=process.env.REACT_APP_FALLBACK_IMAGE}}
                                    src={uploadedFile}
                                ></img>
                                <div className='pl-2 font-bold'>@{member.username}</div>
                            </div>
                            <div className='flex flex-row items-center justify-center'>
                                <button onClick={()=>{selectUserHandler(member._id, member.username, false)}} className='px-2 bg-blue-300 rounded-sm ml-3 text-[14px] font-semibold'>Add</button>
                                <button onClick={()=>{selectUserHandler(member._id, member.username, true)}} className='px-2 bg-[#84e881] rounded-sm ml-3 text-[14px] font-semibold'>Admin</button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        
        {
        selectedMembersList && selectedMembersList.length ?
            <div className='px-5 pt-6 font-semibold'>Selected members:</div> : <></>
        }
        <div className='px-5 searchedMemberList overflow-y-auto flex flex-row flex-wrap'>
            {
                selectedMembersList && selectedMembersList.map((member)=>{
                    return <div onClick={()=>{selectUserRemoveHandler(member.userId)}} style={{backgroundColor:member.isAdmin ? '#b4e1b4' : '#e2e3e397'}} className='cursor-pointer h-[35px] mr-2 border-2 border-gray-300 mt-2 rounded-sm px-1 flex flex-row items-center justify-center' key={member.userId}>
                            <div className='font-semibold text-[14px]'>@{member.username}</div>
                            <button className='text-[#ce2727] mt-1 ml-2'><MdOutlineRemoveCircle/></button>
                    </div>
                })
            }
        </div>
        <div className='w-full flex items-center justify-center mt-2'>
            <button onClick={createGroupHandler} className='bg-[#09794A] text-white px-4 py-1 rounded-md'>Create Group</button>
        </div>
        <input type='file' id='file' accept='image/*' ref={inputFile} onChange={imageUploadHandler} style={{display: 'none'}}/>
    </div>
  )
}

export default CreateGroup