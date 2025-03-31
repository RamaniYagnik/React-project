import React from 'react'
import { useState, useContext } from 'react'
import Mycontext from '../../context/Mycontext';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  
    const context = useContext(Mycontext);
    const { getAllProduct } = context

    const [search,setSearch] = useState('');
    const filterSearchData = getAllProduct.filter((obj) => obj.title.toLowerCase().includes(search)).slice(0,8)

    const navigate = useNavigate();

    return (
    
    <div>
        <div className='input flex justify-center'>
            <input type='text' placeholder='Search Here' onChange={(e) => setSearch(e.target.value)} className='bg-white p-2 w-96 outline-none rounded-lg' />
        </div>
        <div className='flex justify-center'>
            {search && <div className='block absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg p-2'>{filterSearchData.length > 0 ? 
                <>
                    {filterSearchData.map((item,index) => {
                        return (
                            <div key={index} className='p-2' onClick={() => navigate(`/productinfo/${item.id}`)}>
                                <div className='flex items-center gap-2'>
                                    <img className='w-10' src={item.productImageUrl} alt='' />
                                        {item.title}
                                </div>
                            </div>
                        )
                    })}
                </> 
                
                : 
                
                <>
                    <div className='flex justify-center'>
                        <img className=" w-20" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="" />
                    </div>
                </>
                }
            </div>
            }
        </div>
    </div>

  )
}
export default Searchbar