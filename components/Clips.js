import React from 'react'
import Image from 'next/image'

export default function Clips({ clips, staticData2 }) {
    return (
        <div className='clipsContainer'>

            {clips ? clips.data.map((item) => (
                <div className='clipWrapper'>
                    <p>{item.title}</p>
                    <p>Views: {item.view_count}</p>
                    <a key={item.id} href={item.url}><Image src={item.thumbnail_url} height={200} width={360} layout="fixed" /></a>
                </div>
                
            )) : staticData2.data.map((item) => (
                <div className='clipWrapper'>
                    <p>{item.title}</p>
                    <p>Views: {item.view_count}</p>
                    <a key={item.id} href={item.url}><Image src={item.thumbnail_url} height={200} width={360} layout="fixed" /></a>
                </div>
                
            ))}
            
        </div>
    )
}
