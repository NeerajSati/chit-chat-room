import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { BsCheckAll } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

function MessageLoading() {
  return (
        (Math.random()*10 > 5) ? (
            <div className='w-full pt-2 flex flex-row items-center justify-end pr-5'>
                <div className='flex w-full text-gray-200'>
                    <div className='w-[50px] flex items-center justify-between pl-2'>
                        <div className='w-[40px] h-[40px]'>
                            <Skeleton circle={true} className='w-full h-full' enableAnimation={true} direction='ltr' highlightColor='white' baseColor='#828282'/>
                        </div>
                    </div>
                    <div className='my-1 flex flex-col pr-4 pl-2 w-full'>
                        <div className='flex items-center justify-between pt-2'>
                            <div className='max-w-[40%] w-[250px]'><Skeleton enableAnimation={true} direction='ltr' highlightColor='white' baseColor='#828282'/></div>
                        </div>
                        <div className='flex items-center justify-between pt-1'>
                            <div className='max-w-[20%] w-[150px]'><Skeleton enableAnimation={true} direction='ltr' highlightColor='white' baseColor='#828282'/></div>
                        </div>
                    </div>
                </div>
            </div>) : (
            <div className='w-full flex flex-row items-center pl-5'>
                    <div className='py-1 flex flex-col pr-4 pl-2 w-full'>
                        <div className='flex items-center justify-end pt-2'>
                            <div className='max-w-[40%] w-[250px]'><Skeleton className='h-[20px]' enableAnimation={true} direction='ltr' highlightColor='white' baseColor='#828282'/></div>
                        </div>
                    </div>
            </div>)
  )
}

export default MessageLoading