import React, { useEffect, useRef, useState } from 'react'

function Infinitescroll({renderListItems ,textContent,getData,listData}){

	const pageNo = useRef(1);
	const[loading , setLoading] = useState(false);
	useEffect(()=>{
		setLoading(true);
		getData(textContent , pageNo.current).finally(()=>{
			setLoading(false);
		});

	} , [textContent]);

	return (
	<div>Infinitescroll</div>
  )
}

export default Infinitescroll