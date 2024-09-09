import React, { useCallback, useEffect, useRef, useState } from 'react'

function Infinitescroll({renderListItems ,textContent,getData,listData}){

	const pageNo = useRef(1);
	const[loading , setLoading] = useState(false);
	useEffect(()=>{
		setLoading(true);
		getData(textContent , pageNo.current).finally(()=>{
			setLoading(false);
		});

	} , [textContent]);

	const renderList = useCallback(()=>{
		return listData.map((item , index)=>(
			 renderListItems(item, index , null)
		))
		},[]);

	return (
	<div>
		{renderList()}
	</div>
  )
}

export default Infinitescroll