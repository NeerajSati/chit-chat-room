import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ListItemLoading() {
  return (
    <div className='flex w-full border-b-2 border-gray-700 pb-2 text-gray-200'>
                <div className='w-[70px] flex items-center justify-between pl-2'>
                    <div className='w-[50px] h-[50px]'>
                        <Skeleton circle={true} className='w-full h-full' enableAnimation={true} direction='ltr' highlightColor='white' baseColor='#828282'/>
                    </div>
                </div>
                <div className='my-4 flex flex-col pr-4 pl-2 w-full'>
                    <div className='flex items-center justify-between pt-2'>
                        <div className='w-full'><Skeleton enableAnimation={true} direction='ltr' highlightColor='white' baseColor='#828282'/></div>
                    </div>
                    <div className='flex items-center justify-between pt-1'>
                        <div className='w-[80%]'><Skeleton enableAnimation={true} direction='ltr' highlightColor='white' baseColor='#828282'/></div>
                    </div>
                </div>
            </div>
  )
}

export default ListItemLoading